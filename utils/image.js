import cloudinary from "cloudinary-core";

class ImageHelper {
  constructor() {
    this.s3BaseUrl = process.env.NEXT_PUBLIC_AMAZON_S3_BASE_URL;

    this.cloudinary = cloudinary.Cloudinary.new({
      cloud_name: process.env.NEXT_PUBLIC_Cloudinary.cloudName,
    });
  }

  /**
   * Generates a cloudinary image URL from a relative path, a folder name
   * and a bunch of image transformation options.
   *
   * @param {String} sentPath Image path
   * @param {String} folder Image folder
   * @param {Object} sentOptions Image transformation options
   * @returns {string}
   */

  cloudinaryImageUrl(sentPath, folder, sentOptions = {}) {
    const defaultOptions = {
      class: "img-responsive",
      quality: "auto:eco",
      secure: true,
    };
    const options = { ...defaultOptions, ...sentOptions };

    let path = sentPath[0] === "/" ? sentPath : `/${sentPath}`;
    //path = folder + path;
    return `${sentOptions.source}${path}`;
    //  return this.cloudinary.url(path, options);
  }

  /**
   * Generate a cloudinary URL from the relative path to an S3 image.
   *
   * @param {String} sentPath    Relative path to S3 image.
   * @param {Object} sentOptions Cloudinary image transformation options.
   * @returns {string}
   */

  getCloudinaryUrlFromS3Path(sentPath, sentOptions = {}) {
    const options = { ...sentOptions, source: this.s3BaseUrl };
    let path = sentPath;

    if (sentPath?.indexOf(this.s3BaseUrl) !== -1) {
      path = sentPath?.replace(this.s3BaseUrl, "");
    }

    return this.cloudinaryImageUrl(
      path,
      process.env.NEXT_PUBLIC_Cloudinary.s3Folder,
      options
    );
  }

  /**
   * Generate a cloudinary image URL from the relative path to a CC image.
   *
   * @param {String} path Relative path to CC image.
   * @param {Object} sentOptions Cloudinary image transformation options.
   * @returns {string}
   */

  getCloudinaryUrlFromCcPath(path, sentOptions = {}) {
    const options = {
      ...sentOptions,
      source: process.env.NEXT_PUBLIC_CC.PREVIEW_BASE_URL,
    };

    if (process.env.NEXT_PUBLIC_DEBUG === "true") {
      return options.source + path;
    }

    return this.cloudinaryImageUrl(
      path,
      process.env.NEXT_PUBLIC_Cloudinary.ccFolder,
      options
    );
  }

  /**
   * Load S3 or CC preview images from cloudinary.
   *
   * (I don't get it either; ask @kheengz)
   *
   * @param {String}  path    Preview image path
   * @param {boolean} isS3    Whether or not the preview image is stored on S3
   * @param {Object}  options Cloudinary image transformation options
   * @returns {string}
   */

  cdnImageUrl(path, isS3 = true, options = {}) {
    if (isS3) {
      return this.getCloudinaryUrlFromS3Path(path, options);
    }

    return this.getCloudinaryUrlFromCcPath(path, options);
  }
}

export default new ImageHelper();
