const addProducts = (obj) =>{
    let validate = true
    !obj.thumbnail && (obj.thumbnail = "Sin i") 
    const array = Object.values(obj)
    array.length = 5
    const validaciones = [3,13,1,0,11]

    if(array.at(-1) == false) return false;

    for(let i =0;i<array.length;i++){
        if(array[i].length < validaciones[i]){
            validate = false
            break
        }
    }


    
}

export default addProducts