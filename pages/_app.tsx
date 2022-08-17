// main tools
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "createEmotionCache";
import { AppProps } from "next/app";
import * as React from "react";
import Head from "next/head";
import { hotjar } from 'react-hotjar'

import { useEffect } from 'react'

// material ui
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// styles
import "styles/globals.scss";
import theme from "theme";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
	const hjid = parseInt(process.env.NEXT_PUBLIC_HJID||'')
	const hjsv = parseInt(process.env.NEXT_PUBLIC_HJSV||'')
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	useEffect(() => {
		hotjar.initialize(hjid, hjsv)
	}, [])
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
