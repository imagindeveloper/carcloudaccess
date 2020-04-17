/**
 @module Image
 */
import { cleanParameters } from './helpers';
import { createURL } from './createURL';
import { getImageStatus } from './externalRequests';
import { getBaseUrl } from './baseUrl';
import { CarParameters, ImageResults } from './typeDefinitions';

/**
 * Generates the full image URL
 *
 * @param {CarParameters} parameters The provided parameters
 * @param {string} angleOverride Optional angle override
 * @return {Promise<ImageResults>}
 *
 * @example
 * import { getImage } from '@imagindeveloper/carcloudaccess';
 * const { url } = await getImage({ make: 'Tesla', model: 'Model S', ... });
 */
export const getImage = (
  parameters: CarParameters,
  angleOverride: string = ''
): Promise<ImageResults> => {
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
    url: imageURL
  });
};
