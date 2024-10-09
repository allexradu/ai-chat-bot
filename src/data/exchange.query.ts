import StockQuery from '@/data/stock-query'

class ExchangeQuery {
    code: string
    stockExchange: string
    topStocks?: StockQuery[]

    constructor(payload: ExchangeQuery) {
        this.code = payload.code
        this.stockExchange = payload.stockExchange
        this.topStocks = payload.topStocks
    }
}

export default ExchangeQuery
