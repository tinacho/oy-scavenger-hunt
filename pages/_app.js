import { ApolloProvider } from '@apollo/client'
import client from '../api/apolloClient'
import Layout from "../components/Layout";
import "../globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
