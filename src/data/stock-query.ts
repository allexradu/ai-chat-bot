class StockQuery {
    code: string
    stockName: string
    price: number

    constructor(payload: StockQuery) {
        this.code = payload.code
        this.stockName = payload.stockName
        this.price = payload.price
    }
}

export default StockQuery
