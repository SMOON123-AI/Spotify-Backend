const express=require('express')
const multer=require('multer')

const authMiddleware = require('../middlewares/auth.middleware')

const musicController=require('../controllers/music.controller')

const router=express.Router()

const upload=multer({
  storage:multer.memoryStorage()
})

router.post('/upload', authMiddleware.authArtist, upload.fields([
  {name:"music" , maxcount:1},
  {name:"thumbnail" , maxcount:1}]), 
  musicController.createMusic
)

router.post('/upload/album', authMiddleware.authArtist, musicController.createAlbum)

router.get('/listen', authMiddleware.authUser, musicController.getAllMusic)

router.get('/album', authMiddleware.authArtist, musicController.getAllAlbums)

router.get('/album/:albumId', authMiddleware.authUser, musicController.getAlbumById)

module.exports=router