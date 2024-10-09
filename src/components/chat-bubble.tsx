import React from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { Size } from '@/infrastructure/theme/sizes'
import ChatMessageOptionQuery from '@/data/chat-message-option.query'

interface ChatBubbleProps {
    message: string
    isBot: boolean
    options?: ChatMessageOptionQuery[]
    onSelectedOption?: (option: ChatMessageOptionQuery) => void
}

const BubbleContainer = styled.div<{ $isBot: boolean }>`
    display: flex;
    justify-content: ${(props) => (props.$isBot ? 'flex-start' : 'flex-end')};
    margin: 10px;
`

const Bubble = styled.div<{ $isBot: boolean }>`
    max-width: 60%;
    background: ${(props) =>
        props.$isBot
            ? props.theme.colors.bubble.backgroundBot
            : props.theme.colors.bubble.backgroundUser};
    color: ${(props) =>
        props.$isBot
            ? props.theme.colors.bubble.colorBot
            : props.theme.colors.bubble.colorUser};
    padding: ${(p: DefaultTheme) => p.theme.sizes[Size.Small]};
    border-radius: 10px;
    border-bottom-left-radius: ${(props) => (props.$isBot ? '0' : '10px')};
    border-bottom-right-radius: ${(props) => (props.$isBot ? '10px' : '0')};
`

const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: ${(p: DefaultTheme) => p.theme.sizes[Size.Small]};
`

const OptionButton = styled.button`
    background: ${(props) => props.theme.colors.bubble.optionsBackgroundColor};
    border: 1px solid ${(props) => props.theme.colors.bubble.optionsBorderColor};
    color: ${(props) => props.theme.colors.bubble.optionsColor};
    border-radius: 5px;
    padding: ${(p: DefaultTheme) => p.theme.sizes[Size.Small]};
    margin: 5px 0;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background: ${(props) =>
            props.theme.colors.bubble.optionsHoverBackgroundColor};
    }
`

const ChatBubble: React.FC<ChatBubbleProps> = ({
    message,
    isBot,
    options,
    onSelectedOption,
}) => {
    return (
        <BubbleContainer $isBot={isBot}>
            <Bubble $isBot={isBot}>
                {message}
                {options && options.length > 0 && (
                    <OptionsContainer>
                        {options.map((option, index) => (
                            <OptionButton
                                key={index}
                                onClick={() =>
                                    onSelectedOption && onSelectedOption(option)
                                }
                            >
                                {option.option}
                            </OptionButton>
                        ))}
                    </OptionsContainer>
                )}
            </Bubble>
        </BubbleContainer>
    )
}

export default ChatBubble
