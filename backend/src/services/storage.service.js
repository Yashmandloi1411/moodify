const ImageKit = require("imagekit");

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile({ buffer, filename, folder = "" }) {
  const file = await client.upload({
    file: buffer.toString("base64"),
    fileName: filename,
    folder: folder,
  });
  return file;
}

module.exports = {
  uploadFile,
};
