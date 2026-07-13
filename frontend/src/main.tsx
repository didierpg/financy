import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/lib/apollo";
import { env } from "@/config/env";
import App from "./App";
import "./index.css";

console.log(
  `🚀 Front-end conectado e monitorando Back-end em: ${env.VITE_BACKEND_URL}`,
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
