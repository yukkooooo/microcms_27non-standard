import "@/styles/globals.css";

import Layout from '../components/layout';
import { AppProps } from "next/app";
import { AuthProvider } from '@/context/authContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        {/* ここに各ページのコンポーネントが差し込 */}
        <Component {...pageProps} />
      </Layout>

    </AuthProvider>
  );
}

export default MyApp;
