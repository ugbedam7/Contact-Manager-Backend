const cloudinary = require("../config/cloudinary");

/** uploadImage function expects a file path not the file's binary content.
* 1. The cloudinary.uploader.upload() method requires the path to the file
* as an argument. It does not directly accept file buffers or streams.

2. To upload directly from binary content or streams, use Cloudinary's 
  upload_stream method instead.
*/
const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "Contact-Images"
    });

    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};

const deleteImage = async (cloudinaryId) => {
  try {
    const result = await cloudinary.uploader.destroy(cloudinaryId);

    if (result.result !== "ok" && result.result !== "not found") {
      throw new Error(`Failed to delete image: ${result.result}`);
    }
    return result;
  } catch (err) {
    console.log(err.message);
    throw new Error(`${err.message}`);
  }
};

module.exports = {
  uploadImage,
  deleteImage
};
