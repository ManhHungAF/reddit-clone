import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://vaterstetten.stepzen.net/api/right-gerbil/__graphql",
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default client;
