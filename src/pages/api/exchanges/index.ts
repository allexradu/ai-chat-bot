// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import JsonService from '@/services/json-service'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    try {
        const exchanges = JsonService.getExchanges()

        res.status(200).json(exchanges)
    } catch (error) {
        res.status(500).json({ error: 'Failed to load JSON data' })
    }
}
