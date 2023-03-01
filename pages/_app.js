import '/styles/globals.css'
import { withAuth } from "../components/Auth/withAuth";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withAuth(App)