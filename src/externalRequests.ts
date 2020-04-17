import { ImageResults } from './typeDefinitions';

export const getNearMatchingStatusForImage = (imageURL: string) => {
  return new Promise(resolve => {
    const imageRequest = new XMLHttpRequest();
    imageRequest.open('HEAD', `${imageURL}?${new Date().getTime()}`, true);
    imageRequest.setRequestHeader('x-carcloudaccess-nearmatchresult', 'yes');
    imageRequest.onreadystatechange = function() {
      if (this.readyState === this.HEADERS_RECEIVED) {
        let nearMatchingStatus =
          parseInt(
            <string>this.getResponseHeader('x-carcloudaccess-nearmatching')
          ) || 0;
        if (!nearMatchingStatus || isNaN(nearMatchingStatus)) {
          nearMatchingStatus = 0;
        }
        resolve({
          url: imageURL,
          nearMatchingStatus
        });
      }
    };
    imageRequest.send();
  });
};

export const getImageStatus = (
  imageURL: string,
  angleOverride: string,
  params: any = <any>{},
  getMethod: string = 'getImage'
): Promise<ImageResults> => {
  return new Promise(resolve => {
    const apiRequest = new XMLHttpRequest();
    let carcloudFileType =
      params.hasOwnProperty('filetype') && params.filetype != 0
        ? params.filetype
        : 'png';
    if (carcloudFileType !== 'jpg' || carcloudFileType !== 'png') {
      carcloudFileType = 'png';
    }
    let carcloudWidth = params.hasOwnProperty('width') ? params.width : 0;
    if (!carcloudWidth) {
      carcloudWidth = 1200;
    }
    let carcloudSize = params.hasOwnProperty('bodysize') ? params.bodysize : '';
    if (!carcloudSize) {
      carcloudSize = '';
    }
    let apiURL = 'https://carcloudaccess.imagin.studio/get-image-api';
    apiURL += `?method=${getMethod}`;
    apiURL += `&customer=${params.tailoring}&make=${params.make}&model=${params.model}`;
    // This one is ridiculous, unmaintainable
    apiURL += `&angle=${
      typeof angleOverride !== 'undefined'
        ? angleOverride
        : params.hasOwnProperty('angle')
        ? params.angle
        : params.getexterior
        ? '01'
        : params.getinterior
        ? '41'
        : params.getrim
        ? '51'
        : '01'
    }`;
    apiURL += `&filetype=${carcloudFileType}`;
    apiURL += `&compare=${
      params.hasOwnProperty('compare') && params.compare != 0
        ? params.compare
        : 'original'
    }`;
    apiURL += `&width=${carcloudWidth}&tailoring=${params.tailoring}`;
    apiURL += `&dome=${
      params.hasOwnProperty('dome') && params.dome != 0 ? params.dome : 'opq'
    }`;
    apiURL += `&steering=${
      params.hasOwnProperty('steering') && params.steering != 0
        ? params.steering
        : 'lhd'
    }`;
    apiURL += `&modelyear=${
      params.hasOwnProperty('modelyear')
        ? params.modelyear
        : new Date().getFullYear()
    }`;
    apiURL += `&transmission=${
      params.hasOwnProperty('transmission') ? params.transmission : 0
    }`;
    apiURL += `&bodyvariant=${
      params.hasOwnProperty('bodyvariant') ? params.bodyvariant : 5
    }`;
    apiURL += `&bodysize${carcloudSize}`;
    apiURL += `&interior=${
      params.hasOwnProperty('interior') ? params.interior : 0
    }`;
    apiURL += `&trim=${params.hasOwnProperty('trim') ? params.trim : 0}`;
    apiURL += `&bodycolor=${
      params.hasOwnProperty('bodycolor') ? params.bodycolor : 0
    }`;
    apiURL += `&roofcolor=${
      params.hasOwnProperty('roofcolor') ? params.roofcolor : 0
    }`;
    apiURL += `&rimid=${params.hasOwnProperty('rimid') ? params.rimid : 0}`;
    apiURL += `&nearmatch=${
      params.hasOwnProperty('nearmatch') ? params.nearmatch : 1
    }`;
    apiURL += `&fallback=${
      params.hasOwnProperty('fallback') ? params.fallback : 1
    }`;

    apiRequest.open('POST', apiURL);
    apiRequest.responseType = 'json';
    apiRequest.onreadystatechange = function() {
      if (apiRequest.readyState === 4) {
        let resultData = '';
        try {
          const result = apiRequest.response.result;
          if (typeof result[0] !== 'undefined') {
            resultData = result[0];
            if (imageURL === resultData) {
              resultData = result[0];
            }
          }
        } catch (e) {
          //
        }
        resolve({
          url: imageURL,
          resultData
        });
      }
    };
    apiRequest.send(null);
  });
};
