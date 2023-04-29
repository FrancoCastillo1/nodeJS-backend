const generateDocument = (...doc) =>{
    return `
    One or more properties were incomplete or not valid
    List of requierd properties
    ${typeof doc == "string"?`${item} is no valid because length or dont exist` 
    :doc.map((item,i) =>{
      return `${i}) ${item} is no valid because length or dont exist`
    })}
    `
}

export default generateDocument
