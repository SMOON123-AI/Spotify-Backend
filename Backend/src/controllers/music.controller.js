const musicModel = require('../models/music.model')
const {uploadFile, uploadImage} = require('../services/storage.service')
const albumModel = require('../models/album.model')
const userModel = require('../models/user.model')

const createMusic = async (req,res)=>{

  const decoded = req.user;

  const {title} =req.body;

  const musicFile = req.files.music[0];
  const imageFile = req.files.thumbnail[0];
  

  const musicResult = await uploadFile(musicFile.buffer.toString('base64'))
  const imageResult = await uploadImage(imageFile.buffer.toString('base64'))

  const music = await musicModel.create({
    uri: musicResult.url,
    title,
    thumbnail:imageResult.url,
    artist:decoded.id
  })

  res.status(201).json({
    message: "Music Created successfully",
    music:{
      id:music._id,
      uri:music.uri,
      title:music.title,
      thumbnail:music.thumbnail,
      artist:music.artist
    }
  })
}


const createAlbum = async (req, res) => {

  const decoded = req.user;

  const { title, musics } = req.body;

  // Check title and musics
  if (!title || !Array.isArray(musics) || musics.length === 0) {
      return res.status(400).json({
          message: "Title and at least one music are required"
      });
  }

  // Remove duplicate music IDs
  const uniqueMusics = [...new Set(musics)];

  // Check whether all music belongs to the artist
  const musicList = await musicModel.find({
      _id: { $in: uniqueMusics },
      artist: decoded.id
  });

  if (musicList.length !== uniqueMusics.length) {
      return res.status(400).json({
          message: "One or more music IDs are invalid or don't belong to you"
      });
  }

  const album = await albumModel.create({
      title,
      musics:uniqueMusics,
      artist: decoded.id
  });

  res.status(201).json({
      message: "Album created successfully",
      album: {
          id: album._id,
          title: album.title,
          musics: album.musics,
          artist: album.artist
      }
  });
};

const getAllMusic = async(req,res)=>{

  const music = await musicModel.find().limit(2).populate("artist", "username email")

  res.status(200).json({
    message:"All music fetched successfully",
    music
  })
}

const getAllAlbums = async(req,res)=>{
  const album = await albumModel
    .find().select("title artist").populate("artist", "username email");

  res.status(200).json({
    message:"All albums fetched successfully",
    album
  })
}

const getAlbumById = async(req,res)=>{
  const albumId = req.params.albumId;

  const album = await albumModel.findById(albumId).populate("artist","username email").populate("musics","uri title thumbnail")

  return res.status(200).json({
    message:"Album fetched successfully",
    album
  })
}

module.exports = {createMusic,createAlbum,getAllMusic,getAllAlbums,getAlbumById}