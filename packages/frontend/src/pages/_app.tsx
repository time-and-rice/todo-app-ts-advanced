import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { getAppName } from "@packages/common";
import type { AppProps } from "next/app";
import { useEffect } from "react";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log(`${getAppName()} frontend ready`);
  }, []);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
