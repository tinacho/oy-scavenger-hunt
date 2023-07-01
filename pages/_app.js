import { ApolloProvider } from "@apollo/client";
import client from "../api/apolloClient";
import Layout from "../components/Layout";
import "../globals.css";
import GlobalStyles from "./GlobalStyles";
import { FeedbackDisplay, FeedbackProvider } from "@/components/Feedback";

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <FeedbackProvider>
        <GlobalStyles />
        <FeedbackDisplay />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FeedbackProvider>
    </ApolloProvider>
  );
}
