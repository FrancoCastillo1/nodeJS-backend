async function fetchDataShared(url,headers,method,body){
    try{
        const get = await fetch(url,{
            headers,
            method,
            body,
        })
        return get
    }catch(e){
       return e
    }
}

export default fetchDataShared