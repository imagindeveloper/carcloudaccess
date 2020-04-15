let baseUrlDefined = '';

/**
 * Sets the baseUrl used by the API calls
 * @param {string} baseUrl The full path to the base URL
 */
export const setBaseUrl = (baseUrl: string) => {
  baseUrlDefined = baseUrl;
};

/**
 * Gets the baseUrl being used
 */
export const getBaseUrl = () => {
  return baseUrlDefined;
};
