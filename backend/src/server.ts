import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { env } from "./env";

interface UserContext {
  userId?: string;
}

export interface MyContext {
  user?: UserContext;
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const authHeader = req.headers.authorization || "";

      if (authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        try {
          const decoded = jwt.verify(token, env.JWT_SECRET as string) as {
            userId: string;
          };

          return { user: { userId: decoded.userId } };
        } catch (error) {
          return {};
        }
      }

      return {};
    },
  });

  console.log(`🚀 Servidor pronto em: ${url}`);
}

startServer();
