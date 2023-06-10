import multer from "multer";
import __dirname from "./dirname.js";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const {directory} = req
        cb(null, `${__dirname}/images/${directory}`)
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null, file.originalname) 
    }
  })

const upload = multer({ storage: storage })

export default upload
