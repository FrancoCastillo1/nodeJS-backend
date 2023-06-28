const imagesUser = (req,res,next) => {
    const {name,site} = req.body
    console.log(site,name)
    const validateArray = ["profile", "products", "documents"];
    const validate = validateArray.find(item => item == site);
    if (!validate) return res.status(403).json({ message: "Por favor llena con los campos requeridos" });
    req.directory = site;
    next();
  }
export default imagesUser