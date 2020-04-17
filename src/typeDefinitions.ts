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
   * Make of car, e.g. Tesla
   */
  url: string;
  /**
   * Model of car, e.g. Model S
   */
  resultData?: any;
};