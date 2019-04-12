/*
* carcloudaccess.js 1.2.6
* https://github.com/Imagin/carcloudaccess
* Copyright (c) 2019 IMAGIN (info@imagin.studio)
* Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL VALENTIN VASILYEV BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
* THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function (name, context, definition) {
  'use strict'
  if (typeof window !== 'undefined' && typeof window.define === 'function' && window.define.amd) { window.define(definition) } else if (typeof module !== 'undefined' && module.exports) { module.exports = definition() } else if (context.exports) { context.exports = definition() } else { context[name] = definition() }
})('carcloudaccess', this, function () {
  'use strict'

	var getSlug = require('speakingurl');
	
	/**
	 * CarCloudAccess client
	 */
	var convertToArray = function(start, end)
	{
		var result = [];
		for (var i = start; i <= end; i++) {
			result.push(i);
		}
		return result;
	},
	required_params = ['make', 'model', 'angle', 'filetype', 'compare', 'width', 'tailoring', 'dome', 'steering', 'modelyear', 'transmission', 'bodyvariant', 'bodysize', 'interior', 'trim', 'bodycolor', 'roofcolor', 'rimid', 'locality'],
	baseUrl = 'https://leaseplan.imagin.studio',
	availableSizes = [150, 400, 800, 1200, 1600, 2600, 4096],
	defaultAngles = {
		//all: convertToArray(1, 59),
		all: [1, 5, 9, 13, 17, 21, 23, 25, 29],
		//exterior: [1, 5, 9, 13, 17, 21, 23, 25, 29, 51],
		exterior: [1, 5, 9, 13, 17, 21, 23, 25, 29],
		interior: convertToArray(41, 49),
		interiorThumb: [40],
		rim: convertToArray(51, 59),
		rimThumb: [50]
	},
	defaultCarCloudAccessAngles = {
		//all: convertToArray(1, 59),
		all: [1, 5, 9, 13, 17, 21, 23, 25, 29],
		//exterior: [1, 5, 9, 13, 17, 21, 23, 25, 29, 51],
		exterior: [1, 5, 9, 13, 17, 21, 23, 25, 29],
		interior: convertToArray(41, 49),
		interiorThumb: [40],
		rim: convertToArray(51, 59),
		rimThumb: [50]
	};
	var CLD = {
		getImage: function(parameters)
		{
			var callback = (parameters.hasOwnProperty('callback') ? parameters.callback : null),
				getStatus = function(imageURL, imageParameters, angleOverride)
				{
					//check imageURL when nearmatching is off
					var carcloudFallbackCallback = (params.hasOwnProperty('fallbackcb') ? params['fallbackcb'] : 0);
					var carcloudNearmatch = (params.hasOwnProperty('nearmatch') ? params['nearmatch'] : 1);
					var carcloudFallback = (params.hasOwnProperty('fallback') ? params['fallback'] : 1);
					var carcloudFallbackJATO = (params.hasOwnProperty('fallbackjato') ? params['fallbackjato'] : 1);
					if ((parseInt(carcloudNearmatch) === 0 || parseInt(carcloudFallback) === 0 || parseInt(carcloudFallbackJATO) === 0) && carcloudFallbackCallback === 1) {
						getNearmatchingStatus(imageURL, imageParameters, angleOverride, true);
					} else if (callback && (typeof callback === 'function' || (typeof callback === 'string' && typeof window[callback] === 'function'))) {
						var imageRequest = new XMLHttpRequest();
						imageRequest.open('HEAD', imageURL + '?' + (new Date()).getTime(), true);
						imageRequest.setRequestHeader('x-carcloudaccess-nearmatchresult', 'yes');
						imageRequest.onreadystatechange = function()
						{
							if (this.readyState === this.HEADERS_RECEIVED) {
								var nearMatchingStatus = parseInt(this.getResponseHeader('x-carcloudaccess-nearmatching'))||0;
								if (!nearMatchingStatus || isNaN(nearMatchingStatus)) {
									nearMatchingStatus = 0;
								}
								if (typeof callback === 'string' && typeof window[callback] === 'function') {
									window[callback](imageURL, nearMatchingStatus, imageParameters);
								} else {
									callback(imageURL, nearMatchingStatus, imageParameters);
								}
							}
						};
						imageRequest.send();
					}
				},
				getNearmatchingStatus = function(imageURL, params, angleOverride) {
					var apiRequest = new XMLHttpRequest();
					var carcloudFileType = (params.hasOwnProperty('filetype') && params['filetype'] != 0 ? params['filetype'] : 'png');
					if (carcloudFileType !== 'jpg' || carcloudFileType !== 'png') {
						carcloudFileType = 'png';
					}
					var carcloudWidth = (params.hasOwnProperty('width') ? params['width'] : 0);
					if (carcloudWidth == 0 || carcloudWidth == '') {
						carcloudWidth = 1200;
					}
					var carcloudSize = (params.hasOwnProperty('bodysize') ? params['bodysize'] : '');
					if (carcloudSize == 0) {
						carcloudSize = '';
					}
					var apiURL = 'https://carcloudaccess.imagin.studio/get-image-api?method=getImage&customer='+params.tailoring+'&make='+params['make']+'&model='+params['model']+'&angle='+(typeof angleOverride != 'undefined' ? angleOverride : (params.hasOwnProperty('angle') ? params['angle'] : (params['getexterior'] ? '01' : (params['getinterior'] ? '41' : (params['getrim'] ? '51' : '01')))))+'&filetype='+carcloudFileType+'&compare='+(params.hasOwnProperty('compare') && params['compare'] != 0 ? params['compare'] : 'original')+'&width='+carcloudWidth+'&tailoring='+params.tailoring+'&dome='+(params.hasOwnProperty('dome') && params['dome'] != 0 ? params['dome'] : 'opq')+'&steering='+(params.hasOwnProperty('steering') && params['steering'] != 0 ? params['steering'] : 'lhd')+'&modelyear='+(params.hasOwnProperty('modelyear') ? params['modelyear'] : new Date().getFullYear())+'&transmission='+(params.hasOwnProperty('transmission') ? params['transmission'] : 0)+'&bodyvariant='+(params.hasOwnProperty('bodyvariant') ? params['bodyvariant'] : 5)+'&bodysize'+carcloudSize+'&interior='+(params.hasOwnProperty('interior') ? params['interior'] : 0)+'&trim='+(params.hasOwnProperty('trim') ? params['trim'] : 0)+'&bodycolor='+(params.hasOwnProperty('bodycolor') ? params['bodycolor'] : 0)+'&roofcolor='+(params.hasOwnProperty('roofcolor') ? params['roofcolor'] : 0)+'&rimid='+(params.hasOwnProperty('rimid') ? params['rimid'] : 0)+'&nearmatch='+(params.hasOwnProperty('nearmatch') ? params['nearmatch'] : 1)+'&fallback='+(params.hasOwnProperty('fallback') ? params['fallback'] : 1)+'&fallbackjato='+(params.hasOwnProperty('fallbackjato') ? params['fallbackjato'] : 1);
					apiRequest.open('POST', apiURL, (typeof async !== 'undefined' ? async : true));
					if (typeof async !== 'undefined' && async === false) {
						apiRequest.send(null);
						if (typeof apiRequest.response.result === 'undefined') {
							return '{}';
						} else {
							return apiRequest.response;
						}
					} else {
						apiRequest.responseType = 'json';
						apiRequest.onreadystatechange = function() {
							if (apiRequest.readyState === 4) {
								var resultData = '';
								try {
									if (typeof apiRequest.response.result[0] !== 'undefined') {
										resultData = apiRequest.response.result[0];
										if (imageURL === resultData) {
											resultData = apiRequest.response.result[0];
										}
									}
								} catch (e) {}
								
								if (typeof callback === 'string' && typeof window[callback] === 'function') {
									window[callback](resultData);
								} else {
									callback(resultData);
								}
							}
						};
						apiRequest.send(null);
					}
				};
			var params = JSON.parse(JSON.stringify(parameters)) || {};
			for (var key in params) {
				if (required_params.indexOf(key) != -1) {
					params[key] = (params[key] ? getSlug(params[key]) : 0);
				}
			}
			if (params.hasOwnProperty('getall') && params.getall === true) {
				var type = 'all';
				if (params.hasOwnProperty('getexterior') && params.getexterior == true) {
					type = 'exterior';
				} else if (params.hasOwnProperty('getinterior') && params.getinterior == true) {
					type = (params.hasOwnProperty('getthumb') && params.getthumb == true ? 'interiorThumb' : 'interior');
				} else if (params.hasOwnProperty('getrim') && params.getrim == true) {
					type = (params.hasOwnProperty('getthumb') && params.getthumb == true ? 'rimThumb' : 'rim');
				}
				var URLs = [];
				//check imageURL when nearmatching is off
				var carcloudNearmatch = (params.hasOwnProperty('nearmatch') ? params['nearmatch'] : 1);
				var carcloudFallback = (params.hasOwnProperty('fallback') ? params['fallback'] : 1);
				var carcloudFallbackJATO = (params.hasOwnProperty('fallbackjato') ? params['fallbackjato'] : 1);
				var carcloudFallbackCallback = (params.hasOwnProperty('fallbackcb') ? params['fallbackcb'] : 0);
				if ((parseInt(carcloudNearmatch) === 0 || parseInt(carcloudFallback) === 0 || parseInt(carcloudFallbackJATO) === 0) && carcloudFallbackCallback === 0) {
					var nearmatchingStatus = JSON.parse(getNearmatchingStatus(imageURL, params, (params.hasOwnProperty('defaultangles') && params.defaultangles === true ? defaultCarCloudAccessAngles[type] : defaultAngles[type]), false, 'getListOfExteriorImages'));
					if (typeof nearmatchingStatus.result !== 'undefined') {
						URLs = nearmatchingStatus.result;
					}
				} else {
					var anglesToUse = (params.hasOwnProperty('defaultangles') && params.defaultangles === true ? defaultCarCloudAccessAngles[type] : defaultAngles[type]);
					anglesToUse.forEach(function(angle)
					{
						if (angle < 10) {
							angle = '0' + angle;
						}
						var imageURL = CLD.createURL(baseUrl, params, angle);
						getStatus(imageURL, params, angle);
						URLs.push(imageURL);
					});
				}
				return URLs;
			} else {
				var imageURL = CLD.createURL(baseUrl, params);
				getStatus(imageURL, params);
				//check imageURL when nearmatching is off
				var carcloudNearmatch = (params.hasOwnProperty('nearmatch') ? params['nearmatch'] : 1);
				var carcloudFallback = (params.hasOwnProperty('fallback') ? params['fallback'] : 1);
				var carcloudFallbackJATO = (params.hasOwnProperty('fallbackjato') ? params['fallbackjato'] : 1);
				var carcloudFallbackCallback = (params.hasOwnProperty('fallbackcb') ? params['fallbackcb'] : 0);
				if ((parseInt(carcloudNearmatch) === 0 || parseInt(carcloudFallback) === 0 || parseInt(carcloudFallbackJATO) === 0) && carcloudFallbackCallback === 0) {
					var nearmatchingStatus = JSON.parse(getNearmatchingStatus(imageURL, params, (params.hasOwnProperty('defaultangles') && params.defaultangles === true ? defaultCarCloudAccessAngles[type] : defaultAngles[type]), false));
					if (typeof nearmatchingStatus.result !== 'undefined' && typeof nearmatchingStatus.result[0] !== 'undefined') {
						imageURL = nearmatchingStatus.result[0];
					} else {
						imageURL = '';
					}
				}
				return imageURL;
			}
		},
		getInteriorImage: function(parameters)
		{
			var params = parameters || {};
			params.getexterior = false;
			params.getinterior = true;
			params.getrim = false;
			params.getthumb = false;
			return CLD.getImage(params);
		},
		getListOfInteriorImages: function(parameters)
		{
			var params = parameters || {};
			params.getexterior = false;
			params.getinterior = true;
			params.getrim = false;
			params.getthumb = false;
			return CLD.getListOfImages(params);
		},
		getInteriorThumb: function(parameters)
		{
			var params = parameters || {};
			params.getexterior = false;
			params.getinterior = true;
			params.getrim = false;
			params.getthumb = true;
			return CLD.getImage(params);
		},
		getListOfInteriorThumbs: function(parameters)
		{
			var params = parameters || {};
			params.getexterior = false;
			params.getinterior = true;
			params.getrim = false;
			params.getthumb = true;
			return CLD.getListOfImages(params);
		},
		getExteriorImage: function(parameters)
		{
			var params = parameters || {};
			params.getexterior = true;
			params.getinterior = false;
			params.getrim = false;
			params.getthumb = false;
			return CLD.getImage(params);
		},
		getListOfExteriorImages: function(parameters)
		{
			var params = parameters || {};
			params.getexterior = true;
			params.getinterior = false;
			params.getrim = false;
			params.getthumb = false;
			return CLD.getListOfImages(params);
		},
		getRimImage: function(parameters)
		{
			var params = parameters || {};
			params.getexterior = false;
			params.getinterior = false;
			params.getrim = true;
			params.getthumb = false;
			return CLD.getImage(params);
		},
		getListOfRimImages: function(parameters)
		{
			var params = parameters || {};
			params.getexterior = false;
			params.getinterior = false;
			params.getrim = true;
			params.getthumb = false;
			return CLD.getListOfImages(params);
		},
		getRimThumb: function(parameters)
		{
			var params = parameters || {};
			params.getexterior = false;
			params.getinterior = false;
			params.getrim = true;
			params.getthumb = true;
			return CLD.getImage(params);
		},
		getListOfRimThumbs: function(parameters)
		{
			var params = parameters || {};
			params.getexterior = false;
			params.getinterior = false;
			params.getrim = true;
			params.getthumb = true;
			return CLD.getListOfImages(params);
		},
		getListOfImages: function(parameters)
		{
			var params = parameters || {};
			params.getall = true;
			return CLD.getImage(params);
		},
		createURL: function(baseUrl, params, angleOverride)
		{
			var carcloudFileType = (params.hasOwnProperty('filetype') && params['filetype'] != 0 ? params['filetype'] : 'png');
			if (carcloudFileType !== 'jpg' || carcloudFileType !== 'png') {
				carcloudFileType = 'png';
			}
			var carcloudCompare = (params.hasOwnProperty('compare') && params['compare'] != 0 ? params['compare'] : 'original');
			var carcloudWidth = (params.hasOwnProperty('width') ? params['width'] : 0);
			if (carcloudWidth == 0 || carcloudWidth == '') {
				carcloudWidth = 1200;
			}
			var carcloudTailoring = (params.hasOwnProperty('tailoring') && params['tailoring'] != 0 ? params['tailoring'] : 'leaseplan');
			var carcloudDome = (params.hasOwnProperty('dome') && params['dome'] != 0 ? params['dome'] : 'opq');
			var carcloudSteering = (params.hasOwnProperty('steering') && params['steering'] != 0 ? params['steering'] : 'lhd');
			var carcloudMake = params['make'];
			var carcloudModel = params['model'];
			var carcloudModelYear = (params.hasOwnProperty('modelyear') ? params['modelyear'] : new Date().getFullYear());
			var carcloudTransmission = (params.hasOwnProperty('transmission') ? params['transmission'] : 0);
			var carcloudVariant = (params.hasOwnProperty('bodyvariant') ? params['bodyvariant'] : 5);
			var carcloudSize = (params.hasOwnProperty('bodysize') ? params['bodysize'] : '');
			if (carcloudSize == 0) {
				carcloudSize = '';
			}
			var carcloudTrim = (params.hasOwnProperty('trim') ? params['trim'] : 0);
			var carcloudInterior = (params.hasOwnProperty('interior') ? params['interior'] : 0);
			var carcloudBodyColorId = (params.hasOwnProperty('bodycolor') ? params['bodycolor'] : 0);
			var carcloudRoofColorId = (params.hasOwnProperty('roofcolor') ? params['roofcolor'] : 0);
			var carcloudRimId = (params.hasOwnProperty('rimid') ? params['rimid'] : 0);
			var carcloudAngle = (typeof angleOverride != 'undefined' ? angleOverride : (params.hasOwnProperty('angle') ? params['angle'] : (params['getexterior'] ? '01' : (params['getinterior'] ? '41' : (params['getrim'] ? '51' : '01')))));
			if (carcloudAngle == 0) {
				carcloudAngle = '01';
			}
			var carcloudLayers = '';
			if (carcloudWidth == 'mstr') {
				carcloudLayers = '-100-01';
				carcloudFileType = 'png';
			} else if (isNaN(parseInt(carcloudWidth)) || availableSizes.indexOf(parseInt(carcloudWidth)) === -1) {
				var widthToUse = Math.max.apply(null, availableSizes);
				for (var i = 0; i < availableSizes.length; i++) {
					if (availableSizes[i] >= carcloudWidth && availableSizes[i] < widthToUse) {
						widthToUse = availableSizes[i];
					}
				}
				carcloudWidth = widthToUse;
			}
			var carcloudUrlClean = baseUrl + '/' + carcloudCompare + '/' + carcloudWidth + '/' + carcloudTailoring + '/' + carcloudDome + '/' + carcloudSteering + '/' + carcloudMake + '/' + carcloudModel + '/' + carcloudModelYear + '/' + carcloudTransmission + '/' + carcloudVariant + carcloudSize + '/' + carcloudTrim + '/' + carcloudInterior + '/' + carcloudBodyColorId + '/' + carcloudRoofColorId + '/' + carcloudRimId + '/' + carcloudMake + '-' + carcloudModel + '-' + carcloudTrim + '-' + carcloudBodyColorId + '-' + carcloudRimId + '-' + carcloudAngle + carcloudLayers + '.' + carcloudFileType;
			return carcloudUrlClean;
		},
		autoloadImages: function()
		{
			var carcloudaccessImages = document.querySelectorAll('img[data-carcloudaccess-make]');
			if (carcloudaccessImages.length > 0) {
				for (var i = 0; i < carcloudaccessImages.length; i++) {
					var carcloudaccessImage = carcloudaccessImages[i];
					// get all data-elememts
					carcloudaccessImage.setAttribute('src', CLD.getImage({
						'make': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-make')),
						'model': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-model')),
						'angle': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-angle')),
						'filetype': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-filetype')),
						'compare': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-compare')),
						'width': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-width')),
						'tailoring': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-tailoring')),
						'dome': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-dome')),
						'steering': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-steering')),
						'modelyear': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-modelyear')),
						'transmission': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-transmission')),
						'bodyvariant': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-bodyvariant')),
						'bodysize': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-bodysize')),
						'interior': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-interior')),
						'trim': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-trim')),
						'bodycolor': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-bodycolor')),
						'roofcolor': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-roofcolor')),
						'rimid': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-rimid')),
						'locality': getSlug(carcloudaccessImage.getAttribute('data-carcloudaccess-locality')),
						'callback': carcloudaccessImage.getAttribute('data-carcloudaccess-callback'),
						'nearmatch': carcloudaccessImage.getAttribute('data-carcloudaccess-nearmatch'),
						'fallback': carcloudaccessImage.getAttribute('data-carcloudaccess-fallback'),
						'fallbackjato': carcloudaccessImage.getAttribute('data-carcloudaccess-fallbackjato')
					}));
				}
			}
		},
		getCarPaintSwatches: function(params)
		{
			var callback = (params.hasOwnProperty('callback') ? params.callback : null);
			var apiRequest = new XMLHttpRequest();
			var apiURL = 'https://swatch-request.imagin.studio/get-swatch-api?make='+params['make']+'&color='+params['color'];
			apiRequest.open('GET', apiURL, true);
			apiRequest.responseType = 'json';
			apiRequest.onreadystatechange = function() {
				if (apiRequest.readyState === 4) {
					var paints = '';
					try {
						if (typeof apiRequest.response !== 'undefined') {
							paints = apiRequest.response;
						}
					} catch (e) {}
					
					if (callback && (typeof callback === 'function' || (typeof callback === 'string' && typeof window[callback] === 'function'))) {
						if (typeof callback === 'string' && typeof window[callback] === 'function') {
							window[callback](paints);
						} else {
							callback(paints);
						}
					} else if (params.hasOwnProperty('target')) { //draw
						var swatchhtml = '';
						for (var i = 0; i < paints.length; i++) {
							if (params.hasOwnProperty('target')) {
			    			swatchhtml += '<div class="carcloudaccess-swatch-container" onclick="'+params.onclickcallback+'(\''+paints[i][0]+'\', \''+paints[i][1]+'\');"'+ (params.hasOwnProperty('tooltip') && params.tooltip === true ? ' title="'+ paints[i][2] +'"' : '') +'><div class="carcloudaccess-swatch" style="background-image: linear-gradient( to bottom, '+ paints[i][3] +','+ paints[i][5] + ')"></div><div class="carcloudaccess-swatch" style=" background-image: linear-gradient( to bottom, '+ paints[i][3] + ','+paints[i][4]+')"></div>';
			    		} else {
			    			swatchhtml += '<div class="carcloudaccess-swatch-container"'+ (params.hasOwnProperty('tooltip') && params.tooltip === true ? ' title="'+ paints[i][2] +'"' : '') +'><div class="carcloudaccess-swatch" style="background-image: linear-gradient( to bottom, '+ paints[i][3] +','+ paints[i][5] + ')"></div><div class="carcloudaccess-swatch" style=" background-image: linear-gradient( to bottom, '+ paints[i][3] + ','+paints[i][4]+')"></div>';
			    		}
				    	if (paints[i][6] && paints[i][7] && paints[i][6].indexOf('#') !== -1) {
								swatchhtml += '<div class="carcloudaccess-swatch-roof" style="background-image: linear-gradient( to right, '+ paints[i][6] +','+ paints[i][7] + ')"></div>';
							}
							swatchhtml += '</div>';
						}
						
						var css = document.createElement('style');
						css.type = 'text/css';
						var styles = ':root { --carcloudaccessSwatchWidth: 70px;}';
						styles += ' .carcloudaccess-swatch-container { display: inline-block; position: relative; width: var(--carcloudaccessSwatchWidth); height: calc(var(--carcloudaccessSwatchWidth)); clip-path: circle(45% at center); }';
						styles += ' .carcloudaccess-swatch { --swatchWidth: 70px;  width: var(--carcloudaccessSwatchWidth); height: calc(var(--carcloudaccessSwatchWidth) / 2); }';
						styles += ' .carcloudaccess-swatch-roof { position: absolute; top:0px; left: 66%;	height: calc(var(--carcloudaccessSwatchWidth)); width: 33%; }	';
						if (css.styleSheet) css.styleSheet.cssText = styles;
						else css.appendChild(document.createTextNode(styles));
						document.getElementsByTagName("head")[0].appendChild(css);
							
						params.target.innerHTML = swatchhtml;
					}
				}
			};
			apiRequest.send(null);
		}
	};
	var carcloudaccess = function(method)
	{
		if (CLD[method]) {
			return CLD[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			throw 'Method ' + method + ' does not exist on carcloudaccess';
		}
	};
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = carcloudaccess;
	} else if (typeof define !== 'undefined' && define.amd) {
		define([], function ()
		{
			return carcloudaccess;
		});
	} else {
		try {
			if (w.carcloudaccess) {
				throw 'Global carcloudaccess already exists';
			} else {
				w.carcloudaccess = carcloudaccess;
			}
		} catch(e) {}
	}
	
  carcloudaccess.VERSION = '1.2.6'
  return carcloudaccess
})