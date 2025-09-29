const imagekit = require("imagekit");

const storageInstance = new imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

const uploadFiles = async (file, fileName) => {
  try {
    const res = await storageInstance.upload({
      file,
      fileName,
      folder: "instagram-clone",
    });
    
    return res;

  } catch (error) {
    console.log("Error in upload file", error);
  }
};


module.exports = uploadFiles