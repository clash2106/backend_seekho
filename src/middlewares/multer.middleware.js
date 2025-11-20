import multer from "multer"

//User → Multer → Cloudinary → Database → Back to User 
//in the databse the url is saved

const storage = multer.diskStorage({
    //the file upload is only with the multer or file uploader
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() )
    cb(null, file.originalname+ '-' + uniqueSuffix)
  }
})
export const upload =multer({
    //storage:storage same
    storage,

})
//Use THIS storage engine when handling file uploads
