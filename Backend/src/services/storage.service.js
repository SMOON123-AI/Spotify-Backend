const ImageKit = require('@imagekit/nodejs');

const ImageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PVT_KEY,
});

const uploadFile = async(file)=>{
  const result = await ImageKitClient.files.upload({
    file,
    fileName: 'music_' + Date.now(),
    folder:"Spotify/music"
  })  

  return result;
}

const uploadImage = async(file)=>{
  const result = await ImageKitClient.files.upload({
    file,
    fileName: 'cover_' + Date.now(),
    folder:"Spotify/thumbnail"
  })

  return result;
}

module.exports = {uploadFile,uploadImage}
