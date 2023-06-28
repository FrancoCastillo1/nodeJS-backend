const cookieExtractor = req => {
    let token = null

    if(req && req.cookies){
        console.log("quien es quien", req.cookies,req.cookies["authToken"])
        token = req.cookies["authToken"]
    }
    return token
}
export default cookieExtractor