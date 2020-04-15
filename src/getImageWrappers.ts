import { getImage } from './getImage';

export const getInteriorImage = (parameters:any= <any>{}) => {
  const params = parameters || {};
  params.getexterior = false;
  params.getinterior = true;
  params.getrim = false;
  params.getthumb = false;
  return getImage(params);
};

export const getInteriorThumb = (parameters:any= <any>{}) => {
  const params = parameters || {};
  params.getexterior = false;
  params.getinterior = true;
  params.getrim = false;
  params.getthumb = true;
  return getImage(params);
};

export const getExteriorImage = (parameters:any= <any>{}) => {
  const params = parameters || {};
  params.getexterior = true;
  params.getinterior = false;
  params.getrim = false;
  params.getthumb = false;
  return getImage(params);
};

export const getRimImage = (parameters:any= <any>{}) => {
  const params = parameters || {};
  params.getexterior = false;
  params.getinterior = false;
  params.getrim = true;
  params.getthumb = false;
  return getImage(params);
};

export const getRimThumb = (parameters:any= <any>{}) => {
  const params = parameters || {};
  params.getexterior = false;
  params.getinterior = false;
  params.getrim = true;
  params.getthumb = true;
  return getImage(params);
};
