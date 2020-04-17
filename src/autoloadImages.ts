// @ts-ignore
import getSlug from 'speakingurl';
import { getImage } from './getImage';

export const autoloadImages = () => {
  const carcloudaccessImages = document.querySelectorAll(
    'img[data-carcloudaccess-make]'
  );
  if (carcloudaccessImages.length > 0) {
    for (let i = 0; i < carcloudaccessImages.length; i++) {
      const carcloudaccessImage = carcloudaccessImages[i];
      // get all data-elememts
      getImage(
        {
          make: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-make')
          ),
          model: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-model')
          ),
          angle: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-angle')
          ),
          filetype: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-filetype')
          ),
          compare: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-compare')
          ),
          width: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-width')
          ),
          tailoring: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-tailoring')
          ),
          dome: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-dome')
          ),
          steering: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-steering')
          ),
          modelyear: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-modelyear')
          ),
          transmission: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-transmission')
          ),
          bodyvariant: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-bodyvariant')
          ),
          bodysize: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-bodysize')
          ),
          interior: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-interior')
          ),
          trim: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-trim')
          ),
          bodycolor: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-bodycolor')
          ),
          roofcolor: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-roofcolor')
          ),
          rimid: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-rimid')
          ),
          locality: getSlug(
            carcloudaccessImage.getAttribute('data-carcloudaccess-locality')
          ),
          nearmatch: carcloudaccessImage.getAttribute(
            'data-carcloudaccess-nearmatch'
          ),
          fallback: carcloudaccessImage.getAttribute(
            'data-carcloudaccess-fallback'
          )
        },
        ''
      ).then(results => {
        // @ts-ignore
        carcloudaccessImage.setAttribute('src', results.url);
      });
    }
  }
};
