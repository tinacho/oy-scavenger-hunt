import { ApolloProvider } from "@apollo/client";
import client from "../api/apolloClient";
import Layout from "../components/Layout";
import "../globals.css";
import GlobalStyles from "./GlobalStyles";

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
