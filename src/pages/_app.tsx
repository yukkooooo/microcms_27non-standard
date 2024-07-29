import "@/styles/globals.css";

import Layout from '../components/layout';
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <Layout>
      {/* ここに各ページのコンポーネントが差し込 */}
      <Component {...pageProps} />
    </Layout>

  );
}

export default MyApp;
