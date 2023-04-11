import '/styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { withAuth } from "../components/Auth/withAuth";

import MoonTime from '@next/font/local'
import Benedict from '@next/font/local'

const benedict = Benedict({
  src: '../assets/Benedict-Regular.otf',
  weight: '400',
  variable: '--benedict'
})

const moonTime = MoonTime({
  src: [
    { path: '../assets/MoonTime-Regular.ttf', weight: '400' },
    { path: '../assets/MoonTime-Regular.otf', weight: '400' }
  ],
  variable: '--moon-time'
})

function App({ Component, pageProps }) {
  return (<main className={`${benedict.variable} ${moonTime.variable}`}>
    <Component {...pageProps} />
  </main>)
}

export default withAuth(App)