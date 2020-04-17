/**
 * Possible car parameters
 * @alias CarParameters
 */
export type CarParameters = {
  /**
   * Make of car, e.g. Tesla
   */
  make: string;
  /**
   * Model of car, e.g. Model S
   */
  model: string;
};

/**
 * Results of getImage related calls
 * @alias ImageResults
 */
export type ImageResults = {
  /**
   * Generated URL
   */
  url: string;
  /**
   * Optional object with information regarding nearmatching results
   */
  resultData?: any;
};
