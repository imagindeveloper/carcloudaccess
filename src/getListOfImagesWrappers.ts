import { getListOfImages } from './getListOfImages';

export const getListOfInteriorImages = (parameters: any = <any>{}) => {
  const params = parameters || {};
  params.getexterior = false;
  params.getinterior = true;
  params.getrim = false;
  params.getthumb = false;
  return getListOfImages(params);
};

export const getListOfInteriorThumbs = (parameters: any = <any>{}) => {
  const params = parameters || {};
  params.getexterior = false;
  params.getinterior = true;
  params.getrim = false;
  params.getthumb = true;
  return getListOfImages(params);
};

export const getListOfExteriorImages = (parameters: any = <any>{}) => {
  const params = parameters || {};
  params.getexterior = true;
  params.getinterior = false;
  params.getrim = false;
  params.getthumb = false;
  return getListOfImages(params);
};

export const getListOfRimImages = (parameters: any = <any>{}) => {
  const params = parameters || {};
  params.getexterior = false;
  params.getinterior = false;
  params.getrim = true;
  params.getthumb = false;
  return getListOfImages(params);
};

export const getListOfRimThumbs = (parameters: any = <any>{}) => {
  const params = parameters || {};
  params.getexterior = false;
  params.getinterior = false;
  params.getrim = true;
  params.getthumb = true;
  return getListOfImages(params);
};
