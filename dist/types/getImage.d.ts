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
export declare const getImage: (parameters: CarParameters, angleOverride?: string) => Promise<ImageResults>;
//# sourceMappingURL=getImage.d.ts.map