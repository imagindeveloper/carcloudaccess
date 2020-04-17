// @ts-ignore
import getSlug from 'speakingurl';

const requiredParams = [
  'make',
  'model',
  'angle',
  'filetype',
  'compare',
  'width',
  'tailoring',
  'dome',
  'steering',
  'modelyear',
  'transmission',
  'bodyvariant',
  'bodysize',
  'interior',
  'trim',
  'bodycolor',
  'roofcolor',
  'rimid',
  'locality'
];

export const cleanParameters = (parameters: object) => {
  const params = JSON.parse(JSON.stringify(parameters)) || {};
  Object.keys(params).forEach(key => {
    if (requiredParams.indexOf(key) !== -1) {
      params[key] = params[key] ? getSlug(params[key]) : 0;
    }
  });
  return params;
};

export const convertToArray = function(start: number, end: number) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
