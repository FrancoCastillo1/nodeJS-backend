import multer from "multer";
import __dirname from "./dirname.js";
/* import { directorio } from "../middlewares/imagesUser.js";
console.log("es",directorio) */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const {site} = req.body
      cb(null, `${__dirname}/images/${site}`)
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, file.originalname) 
    }
    })
  const upload = multer({ storage, })

export default upload
