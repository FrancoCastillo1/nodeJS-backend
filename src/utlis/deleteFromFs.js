import fs from "fs/promises"

export const deleteFs = async(file) =>{
    try{
        return await fs.unlink(file)
    }catch(err){
        throw new Error(err)
    }
}