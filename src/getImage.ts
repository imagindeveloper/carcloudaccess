import { cleanParameters } from './helpers';
import { createURL } from './createURL';
import { getImageStatus } from './externalRequests';
import { getBaseUrl } from "./baseUrl";

export const getImage = (parameters: object, angleOverride: string = '') => {
  const baseUrl = getBaseUrl();
  const params = cleanParameters(parameters);

  // Nearmatch checking defaults to on
  const { nearmatch = 1 } = params;
  const imageURL = createURL(baseUrl, params, angleOverride);

  if (parseInt(nearmatch, 10) === 0) {
    // return getNearMatchingStatusForImage(imageURL);
    return getImageStatus(imageURL, angleOverride, params);
  }

  return Promise.resolve({
    url: imageURL,
  });
};
