import { cleanParameters, convertToArray } from './helpers';
import { getImage } from './getImage';

const defaultAngles = {
  all: [1, 5, 9, 13, 17, 21, 23, 25, 29, 51],
  exterior: [1, 5, 9, 13, 17, 21, 23, 25, 29, 51],
  interior: [41, 42, 43],
  interiorThumb: [40],
  rim: convertToArray(55, 59),
  rimThumb: [50]
};
const defaultCarCloudAccessAngles = {
  all: convertToArray(1, 59),
  exterior: convertToArray(1, 39),
  interior: convertToArray(41, 49),
  interiorThumb: [40],
  rim: convertToArray(51, 59),
  rimThumb: [50],
};

export const getListOfImages = (parameters:any= <any>{}) => {
  const params = cleanParameters(parameters);

  return new Promise((resolve) => {
    let type = 'all';
    if (params.hasOwnProperty('getexterior') && params.getexterior === true) {
      type = 'exterior';
    } else if (params.hasOwnProperty('getinterior') && params.getinterior === true) {
      type = (params.hasOwnProperty('getthumb') && params.getthumb === true ? 'interiorThumb' : 'interior');
    } else if (params.hasOwnProperty('getrim') && params.getrim === true) {
      type = (params.hasOwnProperty('getthumb') && params.getthumb === true ? 'rimThumb' : 'rim');
    }

    const getImageCalls: any[] = [];
    const anglesToUse = (params.hasOwnProperty('defaultangles') && params.defaultangles === true ? defaultCarCloudAccessAngles[type] : defaultAngles[type]);
    // @ts-ignore
    anglesToUse.forEach((angle) => {
      if (angle < 10) {
        angle = `0${angle}`;
      }
      getImageCalls.push(getImage(params, angle));
    });
    Promise.all(getImageCalls).then((values) => {
      resolve(values);
    });
  });
};
