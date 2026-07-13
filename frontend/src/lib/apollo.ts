import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { env } from "@/config/env";

const httpLink = new HttpLink({
  uri: env.VITE_BACKEND_URL,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("@financy:token");

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
