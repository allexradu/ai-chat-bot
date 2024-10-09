// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import JsonService from '@/services/json-service'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    let exchangeCode = req.query?.exchangeCode

    if (Array.isArray(exchangeCode)) {
        exchangeCode = exchangeCode[0]
    }

    if (!exchangeCode) {
        res.status(400).json({ error: 'Missing exchangeCode' })
        return
    }
    try {
        const exchanges = JsonService.getExchanges(true)
        const exchange = exchanges.find(
            (exchange) => exchange.code === exchangeCode?.toUpperCase(),
        )

        if (!exchange) {
            res.status(404).json({ error: 'Exchange not found' })
            return
        }

        res.status(200).json(exchange)
    } catch (error) {
        res.status(500).json({ error: 'Failed to load JSON data' })
    }
}
