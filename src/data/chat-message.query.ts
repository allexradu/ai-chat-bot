import ChatMessageOptionQuery from '@/data/chat-message-option.query'

class ChatMessageQuery {
    message: string
    isBot: boolean
    options?: ChatMessageOptionQuery[]

    constructor(payload: ChatMessageQuery) {
        this.message = payload.message
        this.isBot = payload.isBot
        this.options = payload.options
    }
}

export default ChatMessageQuery
