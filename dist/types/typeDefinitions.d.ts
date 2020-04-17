/**
 * Possible car parameters
 * @alias CarParameters
 */
export declare type CarParameters = {
    /**
     * Make of car, e.g. Tesla
     */
    make: string;
    /**
     * Model of car, e.g. Model S
     */
    model: string;
    angle?: any;
    filetype?: string;
    compare?: string;
    width?: any;
    tailoring?: string;
    dome?: string;
    steering?: string;
    modelyear?: string;
    transmission?: string;
    bodyvariant?: string;
    bodysize?: string;
    interior?: string;
    trim?: string;
    bodycolor?: string;
    roofcolor?: string;
    rimid?: string;
    locality?: any;
    nearmatch?: any;
    fallback?: any;
};
/**
 * Results of getImage related calls
 * @alias ImageResults
 */
export declare type ImageResults = {
    /**
     * Generated URL
     */
    url: string;
    /**
     * Optional object with information regarding nearmatching results
     */
    resultData?: any;
};
//# sourceMappingURL=typeDefinitions.d.ts.map