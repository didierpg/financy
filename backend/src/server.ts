import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { env } from "./env";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

async function bootstrap() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: env.PORT },
  });

  console.log(`🚀 Servidor GraphQL pronto em: ${url}`);
}

bootstrap().catch((err) => {
  console.error("❌ Erro ao iniciar o servidor:", err);
});