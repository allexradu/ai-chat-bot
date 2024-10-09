import { makeAutoObservable, runInAction } from 'mobx'
import ChatMessageOptionQuery from '@/data/chat-message-option.query'
import ChatMessageQuery from '@/data/chat-message.query'
import ExchangeQuery from '@/data/exchange.query'
import StockQuery from '@/data/stock-query'
import { ChatMessageOptionType } from '@/constants/enums'

class ChatStore {
    _messages: ChatMessageQuery[] = []
    _haveMessagesBeenLoaded = false
    _areStockLoading = false
    _isStockLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    get messages() {
        return this._messages
    }

    async onOptionSelected(option: ChatMessageOptionQuery) {
        if (this._areStockLoading || this._isStockLoading) {
            return
        }

        const errorMessage = new ChatMessageQuery({
            message: 'Failed to load data, please refresh the page.',
            isBot: true,
        })

        if (option.type === ChatMessageOptionType.EXCHANGE) {
            runInAction(() => {
                this._areStockLoading = true
                this._messages.push(
                    new ChatMessageQuery({
                        message: option.option,
                        isBot: false,
                    }),
                )
                this._messages.push(
                    new ChatMessageQuery({
                        message: 'Loading...',
                        isBot: true,
                    }),
                )
            })

            try {
                // Load exchange data
                const response = await fetch('/api/exchanges/' + option.code)

                if (response.ok) {
                    const data = await response.json()
                    runInAction(() => {
                        this._messages = this._messages.filter(
                            (message) => message.message !== 'Loading...',
                        )
                        this._messages.push(
                            new ChatMessageQuery({
                                message: `Please select a stock:`,
                                isBot: true,
                                options: data.topStocks?.map(
                                    (stock: StockQuery) => {
                                        return new ChatMessageOptionQuery({
                                            code: stock.code,
                                            option: stock.stockName,
                                            type: ChatMessageOptionType.STOCK,
                                            exchangeCode: option.code,
                                        })
                                    },
                                ),
                            }),
                        )
                        this._areStockLoading = false
                    })
                } else {
                    runInAction(() => {
                        this._messages = this._messages.filter(
                            (message) => message.message !== 'Loading...',
                        )
                        this._messages.push(errorMessage)
                        this._areStockLoading = false
                    })
                }
            } catch (_) {
                runInAction(() => {
                    this._messages = this._messages.filter(
                        (message) => message.message !== 'Loading...',
                    )
                    this._messages.push(errorMessage)
                    this._areStockLoading = false
                })
            }
        } else if (option.type === ChatMessageOptionType.STOCK) {
            // Load stock data
            runInAction(() => {
                this._isStockLoading = true
                this._messages.push(
                    new ChatMessageQuery({
                        message: option.option,
                        isBot: false,
                    }),
                )
                this._messages.push(
                    new ChatMessageQuery({
                        message: 'Loading...',
                        isBot: true,
                    }),
                )
            })

            try {
                const response = await fetch(
                    `/api/exchanges/${option.exchangeCode}/${option.code}`,
                )

                if (response.ok) {
                    const data = await response.json()
                    runInAction(() => {
                        this._messages = this._messages.filter(
                            (message) => message.message !== 'Loading...',
                        )
                        this._messages.push(
                            new ChatMessageQuery({
                                message: `Stock: ${data.stockName}, Price: ${data.price}`,
                                isBot: true,
                            }),
                        )
                        this._isStockLoading = false
                    })
                } else {
                    runInAction(() => {
                        this._messages = this._messages.filter(
                            (message) => message.message !== 'Loading...',
                        )
                        this._messages.push(errorMessage)
                        this._isStockLoading = false
                    })
                }
            } catch (_) {
                runInAction(() => {
                    this._messages = this._messages.filter(
                        (message) => message.message !== 'Loading...',
                    )
                    this._messages.push(errorMessage)
                    this._isStockLoading = false
                })
            }
        }
    }

    get hasMessagesBeenLoaded() {
        return this._haveMessagesBeenLoaded
    }

    set haveMessagesBeenLoaded(value: boolean) {
        this._haveMessagesBeenLoaded = value
    }

    async loadMessages() {
        const errorMessage = new ChatMessageQuery({
            message: 'Failed to load data, please refresh the page.',
            isBot: true,
        })
        runInAction(() => {
            this._haveMessagesBeenLoaded = false
        })

        try {
            const response = await fetch('/api/exchanges')
            if (response.ok) {
                const data = await response.json()
                runInAction(() => {
                    this._messages = [
                        new ChatMessageQuery({
                            message:
                                'Hello! Welcome to LSEG, how can I help you?',
                            isBot: true,
                        }),
                        new ChatMessageQuery({
                            message: 'Please select an option below:',
                            isBot: true,
                            options: data.map((exchange: ExchangeQuery) => {
                                return new ChatMessageOptionQuery({
                                    code: exchange.code,
                                    option: exchange.stockExchange,
                                    type: ChatMessageOptionType.EXCHANGE,
                                })
                            }),
                        }),
                    ]
                    this._haveMessagesBeenLoaded = true
                })
            } else {
                runInAction(() => {
                    this._messages = [errorMessage]
                })
            }
        } catch (err) {
            runInAction(() => {
                this._messages = [errorMessage]
                this._haveMessagesBeenLoaded = true
            })
        }
    }
}

const chatStore = new ChatStore()
export default chatStore
