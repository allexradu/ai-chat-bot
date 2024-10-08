import styled from 'styled-components'

const Page = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`

export default function Home() {
    return (
        <Page>
            <h1>Home</h1>
        </Page>
    )
}
