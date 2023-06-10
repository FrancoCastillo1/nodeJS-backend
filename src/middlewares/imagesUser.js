const imagesUser = (req, res, next) => {
    const { site } = req.body;
  
    const validateArray = ["profile", "products", "documents"];
    const validate = validateArray.find(item => item == site);
    if (!validate) return res.status(403).json({ message: "Por favor llena con los campos requeridos" });
    
    req.directory = site;
    console.log("SAAS", req.directory);
    next();
  }

export default imagesUser