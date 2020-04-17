export const getCarPaintSwatches = (params: any = <any>{}) => {
  const callback = params.hasOwnProperty('callback') ? params.callback : null;
  const apiRequest = new XMLHttpRequest();
  const apiURL = `https://swatch-request.imagin.studio/get-swatch-api?make=${params.make}&color=${params.color}`;
  apiRequest.open('GET', apiURL, true);
  apiRequest.responseType = 'json';
  apiRequest.onreadystatechange = function() {
    if (apiRequest.readyState === 4) {
      let paints = '';
      try {
        if (typeof apiRequest.response !== 'undefined') {
          paints = apiRequest.response;
        }
      } catch (e) {}

      if (
        callback &&
        (typeof callback === 'function' ||
          (typeof callback === 'string' &&
            typeof window[callback] === 'function'))
      ) {
        if (
          typeof callback === 'string' &&
          typeof window[callback] === 'function'
        ) {
          window[callback](paints);
        } else {
          callback(paints);
        }
      } else if (params.hasOwnProperty('target')) {
        // draw
        let swatchhtml = '';
        for (let i = 0; i < paints.length; i++) {
          if (params.hasOwnProperty('target')) {
            swatchhtml +=
              '<div class="carcloudaccess-swatch-container" onclick="' +
              params.onclickcallback +
              "('" +
              paints[i][0] +
              "', '" +
              paints[i][1] +
              '\');"' +
              (params.hasOwnProperty('tooltip') && params.tooltip === true
                ? ' title="' + paints[i][2] + '"'
                : '') +
              '><div class="carcloudaccess-swatch" style="background-image: linear-gradient( to bottom, ' +
              paints[i][4] +
              ',' +
              paints[i][6] +
              ')"></div><div class="carcloudaccess-swatch" style=" background-image: linear-gradient( to bottom, ' +
              paints[i][3] +
              ',' +
              paints[i][5] +
              ')"></div>';
          } else {
            swatchhtml +=
              '<div class="carcloudaccess-swatch-container"' +
              (params.hasOwnProperty('tooltip') && params.tooltip === true
                ? ' title="' + paints[i][2] + '"'
                : '') +
              '><div class="carcloudaccess-swatch" style="background-image: linear-gradient( to bottom, ' +
              paints[i][4] +
              ',' +
              paints[i][6] +
              ')"></div><div class="carcloudaccess-swatch" style=" background-image: linear-gradient( to bottom, ' +
              paints[i][3] +
              ',' +
              paints[i][5] +
              ')"></div>';
          }
          if (
            paints[i][7] &&
            paints[i][8] &&
            paints[i][7].indexOf('#') !== -1
          ) {
            swatchhtml +=
              '<div class="carcloudaccess-swatch-roof" style="background-image: linear-gradient( to right, ' +
              paints[i][7] +
              ',' +
              paints[i][8] +
              ')"></div>';
          }
          swatchhtml += '</div>';
        }

        const css = document.createElement('style');
        css.type = 'text/css';
        let styles = ':root { --carcloudaccessSwatchWidth: 70px;}';
        styles +=
          ' .carcloudaccess-swatch-container { display: inline-block; position: relative; width: var(--carcloudaccessSwatchWidth); height: calc(var(--carcloudaccessSwatchWidth)); clip-path: circle(45% at center); }';
        styles +=
          ' .carcloudaccess-swatch { --swatchWidth: 70px;  width: var(--carcloudaccessSwatchWidth); height: calc(var(--carcloudaccessSwatchWidth) / 2); }';
        styles +=
          ' .carcloudaccess-swatch-roof { position: absolute; top:0px; left: 66%;	height: calc(var(--carcloudaccessSwatchWidth)); width: 33%; }	';
        // @ts-ignore
        if (css.styleSheet) css.styleSheet.cssText = styles;
        else css.appendChild(document.createTextNode(styles));
        document.getElementsByTagName('head')[0].appendChild(css);

        params.target.innerHTML = swatchhtml;
      }
    }
  };
  apiRequest.send(null);
};
