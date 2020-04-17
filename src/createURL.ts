const availableSizes = [150, 400, 800, 1200, 1600, 2600, 4096];

export const createURL = (
  baseUrl: string,
  params: any = <any>{},
  angleOverride: string
) => {
  let carcloudFileType =
    params.hasOwnProperty('filetype') && params.filetype != 0
      ? params.filetype
      : 'png';
  if (carcloudFileType !== 'jpg' || carcloudFileType !== 'png') {
    carcloudFileType = 'png';
  }
  const carcloudCompare =
    params.hasOwnProperty('compare') && params.compare != 0
      ? params.compare
      : 'original';
  let carcloudWidth = params.hasOwnProperty('width') ? params.width : 0;
  if (!carcloudWidth) {
    carcloudWidth = 1200;
  }
  if (carcloudWidth == 4000) {
    carcloudWidth = 4096;
  }
  const carcloudTailoring =
    params.hasOwnProperty('tailoring') && params.tailoring != 0
      ? params.tailoring
      : 'leaseplan';
  const carcloudDome =
    params.hasOwnProperty('dome') && params.dome != 0 ? params.dome : 'opq';
  const carcloudSteering =
    params.hasOwnProperty('steering') && params.steering != 0
      ? params.steering
      : 'lhd';
  const carcloudMake = params.make;
  const carcloudModel = params.model;
  const carcloudModelYear = params.hasOwnProperty('modelyear')
    ? params['modelyear']
    : params.hasOwnProperty('year')
    ? params['year']
    : new Date().getFullYear();
  const carcloudTransmission = params.hasOwnProperty('transmission')
    ? params.transmission
    : 0;
  const carcloudVariant = params.hasOwnProperty('bodyvariant')
    ? params['bodyvariant']
    : 0;
  let carcloudSize = params.hasOwnProperty('bodysize') ? params.bodysize : '';
  if (!carcloudSize) {
    carcloudSize = '';
  }
  const carcloudTrim = params.hasOwnProperty('trim') ? params.trim : 0;
  const carcloudInterior = params.hasOwnProperty('interior')
    ? params.interior
    : 0;
  const carcloudBodyColorId = params.hasOwnProperty('bodycolor')
    ? params.bodycolor
    : 0;
  const carcloudRoofColorId = params.hasOwnProperty('roofcolor')
    ? params.roofcolor
    : 0;
  const carcloudRimId = params.hasOwnProperty('rimid') ? params.rimid : 0;
  let carcloudAngle =
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
      : '01';
  if (!carcloudAngle) {
    carcloudAngle = '01';
  }
  let carcloudLayers = '';
  if (carcloudWidth === 'mstr') {
    carcloudLayers = '-100-01';
    carcloudFileType = 'png';
  } else if (
    isNaN(parseInt(carcloudWidth)) ||
    availableSizes.indexOf(parseInt(carcloudWidth)) === -1
  ) {
    let widthToUse = Math.max.apply(null, availableSizes);
    for (let i = 0; i < availableSizes.length; i++) {
      if (
        availableSizes[i] >= carcloudWidth &&
        availableSizes[i] < widthToUse
      ) {
        widthToUse = availableSizes[i];
      }
    }
    carcloudWidth = widthToUse;
  }
  return `${baseUrl}/${carcloudCompare}/${carcloudWidth}/${carcloudTailoring}/${carcloudDome}/${carcloudSteering}/${carcloudMake}/${carcloudModel}/${carcloudModelYear}/${carcloudTransmission}/${carcloudVariant}${carcloudSize}/${carcloudTrim}/${carcloudInterior}/${carcloudBodyColorId}/${carcloudRoofColorId}/${carcloudRimId}/${carcloudMake}-${carcloudModel}-${carcloudTrim}-${carcloudBodyColorId}-${carcloudRimId}-${carcloudAngle}${carcloudLayers}.${carcloudFileType}`;
};
