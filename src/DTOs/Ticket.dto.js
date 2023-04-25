class TikcetDTO{
    constructor(code,date,total,email){
        this.code = code
        this.purchase_datetime = date
        this.ammount = total
        this.purchaser = email ?? "" //hago esto para cambiarlo luego
    }
}

export default TikcetDTO