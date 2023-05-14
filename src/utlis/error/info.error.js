export const generateDocument = (...doc) =>{
    return `
    One or more properties were incomplete or not valid
    List of requierd properties
    ${typeof doc == "string"?`${doc} is no valid because length or dont exist` 
    :doc.map((item,i) =>{
      return `${i}) ${item} is no valid because length or dont exist`
    })}
    `
}

export const repetedDoc = (cause) =>{
     `The properties you tried to update already exist`
     return(typeof cause == "string"?`${cause} already existed in the db`:
     `List of properties error
     ${cause.map((item,i) =>{
       return `${i}) the property ${item} it's the same`
     })}`)
}

