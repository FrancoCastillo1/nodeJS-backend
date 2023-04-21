import productClass from "../DAO/factory.js"
const addProducts = async(obj) =>{
    console.log("imprimo",productClass)
    const instance = new productClass()
    let validate = true
    const array = Object.values(obj)
    array.length = 5
    const validaciones = [5,13,1,1,4]

    if(array.at(-1) == false) return false;

    for(let i =0;i<array.length;i++){
        if(typeof array[i] == "number"){
            let string = array[i].toString()
            array[i] = string
        }
        if(array[i].length < validaciones[i]){
            validate = false
            break
        }
    }
   if(validate) await instance.addProducts(obj)
   return validate
}

export default addProducts