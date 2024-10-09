import styled, { DefaultTheme } from 'styled-components'
import Image from 'next/image'
import { Size } from '@/infrastructure/theme/sizes'
import ChatBubble from '@/components/chat-bubble'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/data/stores'
import { useEffect } from 'react'
import { ScaleLoader } from 'react-spinners'

const Page = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    background: ${(p: DefaultTheme) => p.theme.colors.ui.background};
    height: 100vh;
`

const Header = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    width: 100%;
    height: 60px;
    background: ${(p: DefaultTheme) => p.theme.colors.ui.header};
    font-family: ${(p: DefaultTheme) => p.theme.fonts.body};
    font-size: 36;
    padding: ${(p: DefaultTheme) => p.theme.sizes[Size.Medium]};
    gap: ${(p: DefaultTheme) => p.theme.sizes[Size.Medium]};
    color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    font-weight: ${(p: DefaultTheme) => p.theme.fontWeights.semiBold};
`

const ChatBox = styled.div`
    flex: 1;
    width: 100%;
    padding: ${(p: DefaultTheme) => p.theme.sizes[Size.Medium]};
    overflow-y: auto;
    background: ${(p: DefaultTheme) => p.theme.colors.ui.chatBackground};
`

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: ${(p: DefaultTheme) => p.theme.sizes[Size.Small]};
    background: ${(p: DefaultTheme) => p.theme.colors.ui.inputBackground};
    border-top: 1px solid ${(p: DefaultTheme) => p.theme.colors.ui.border};
`

const InputMessage = styled.div`
    flex: 1;
    padding: ${(p: DefaultTheme) => p.theme.sizes[Size.Medium]};
    font-size: 16px;
    border: none;
    outline: none;
    border-radius: 10px;
    color: black;
    background: white;
`

const SendButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    margin-left: ${(p: DefaultTheme) => p.theme.sizes[Size.Small]};
`

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const Home = observer(() => {
    const { chatStore } = useStore()

    useEffect(() => {
        ;(async () => {
            await chatStore.loadMessages()
        })()
    }, [])

    return (
        <Page>
            <Header>
                <Image
                    src="/images/roboicon.png"
                    alt="Robo Icon"
                    width={50}
                    height={50}
                />
                <div>LSEG Chatbot</div>
            </Header>

            <ChatBox>
                {!chatStore._haveMessagesBeenLoaded ? (
                    <LoaderWrapper>
                        <ScaleLoader
                            color="#000"
                            loading={true}
                            width={8}
                            height={75}
                        />
                    </LoaderWrapper>
                ) : (
                    chatStore.messages.map((message, index) => (
                        <ChatBubble
                            key={index}
                            message={message.message}
                            isBot={message.isBot}
                            options={message.options}
                            onSelectedOption={(option) =>
                                chatStore.onOptionSelected(option)
                            }
                        />
                    ))
                )}
            </ChatBox>

            <InputContainer>
                <InputMessage>Please chose an option</InputMessage>
                <SendButton>
                    <Image
                        src="/images/send-message.png"
                        alt="Send"
                        width={30}
                        height={30}
                    />
                </SendButton>
            </InputContainer>
        </Page>
    )
})

export default Home
