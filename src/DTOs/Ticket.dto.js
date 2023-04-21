class TikcetDTO{
    constructor(code,date,total,email){
        this.code = code
        this.date = date
        this.total = total
        this.email = email ?? "" //hago esto para cambiarlo luego
    }
}

export default TikcetDTO