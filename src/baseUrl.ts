/**
 @module Base URL
 */
let baseUrlDefined = '';

/**
 * Sets the baseUrl used by the API calls
 *
 * @method setBaseUrl
 * @category API
 * @param {string} baseUrl The full path to the base URL, e.g. `https://client.imagin.studio`
 * @example
 * import { setBaseUrl } from '@imagindeveloper/carcloudaccess';
 * setBaseUrl('https://client.imagin.studio');
 */
export const setBaseUrl = (baseUrl: string) => {
  baseUrlDefined = baseUrl;
};

/**
 * Gets the previously set baseUrl
 *
 * @method getBaseUrl
 * @private
 * @category API
 * @returns {string} baseUrl
 */
export const getBaseUrl = () => {
  return <string>baseUrlDefined;
};
