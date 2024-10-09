import path from 'path'
import fs from 'fs'
import ExchangeQuery from '@/data/exchange.query'
import StockQuery from '@/data/stock-query'

class JsonService {
    public static getExchanges(hasChildren: boolean = false): ExchangeQuery[] {
        const filePath = path.resolve('./assets/json/stock-data.json')
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const stockData = JSON.parse(fileContent)
        if (Object.keys(stockData).length === 0) {
            throw new Error('JSON data is empty')
        }
        const exchanges = []
        for (const index of Object.keys(stockData)) {
            if (!stockData[index]?.code || !stockData[index]?.stockExchange) {
                throw new Error('JSON data is invalid')
            }

            if (hasChildren && !stockData[index]?.topStocks) {
                throw new Error('JSON data is invalid')
            }

            exchanges.push(
                new ExchangeQuery({
                    code: stockData[index].code,
                    stockExchange: stockData[index].stockExchange,
                    ...(hasChildren && {
                        topStocks: stockData[index].topStocks.map(
                            (stock: any) =>
                                new StockQuery({
                                    code: stock.code,
                                    stockName: stock.stockName,
                                    price: stock.price,
                                }),
                        ),
                    }),
                }),
            )
        }
        return exchanges
    }
}

export default JsonService
