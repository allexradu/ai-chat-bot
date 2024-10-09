import { ChatMessageOptionType } from '@/constants/enums'

class ChatMessageOptionQuery {
    option: string
    code: string
    type: ChatMessageOptionType
    exchangeCode?: string

    constructor(payload: ChatMessageOptionQuery) {
        this.option = payload.option
        this.code = payload.code
        this.type = payload.type
        this.exchangeCode = payload.exchangeCode
    }
}

export default ChatMessageOptionQuery
