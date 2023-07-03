class TikcetDTO{
    constructor(code,date,total,emailOrFirtsName){
        this.code = code
        this.purchase_datetime = date
        this.ammount = total
        this.purchaser = emailOrFirtsName
    }
}

export default TikcetDTO