import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ThemeProvider } from 'styled-components'
import { theme } from '@/infrastructure/theme'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>AI Chat Bot</title>
                <meta charSet="utf-8" />
                <meta name="author" content="Allex Radu" />
                <meta name="robots" content="index, follow, noodp, noydir" />
                <meta property="og:site_name" content="AI Chat Bot" />
                <meta name="dcterms.creator" content="Allex Radu" />
                <meta
                    name="dcterms.rights"
                    content="Copyright 2024, Allex Radu"
                />
                <meta name="dcterms.language" content="EN" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}
