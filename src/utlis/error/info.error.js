const generateUserErrorInfo = user =>{
    return `
    One or more properties were incomplete or not valid
    List of requierd properties
    firts_name:need to be String, received ${user.first_name}
    last_name:need to be String, received ${user.last_name}
    Email:need to be String, received ${user.email}
    `
}

export default generateUserErrorInfo
