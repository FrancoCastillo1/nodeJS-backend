import multer from "multer";
import __dirname from "./dirname.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const {siteB} = req.body
      cb(null, `${__dirname}/images/${siteB}`)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) 
    }
    })
  const upload = multer({ storage, })

export default upload
