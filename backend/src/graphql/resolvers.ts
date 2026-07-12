import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { GraphQLError } from "graphql/error";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    health: async () => {
      try {
        await prisma.$queryRaw`SELECT 1`;
        return { status: "UP", database: "CONNECTED" };
      } catch (error) {
        throw new GraphQLError(
          "Erro ao verificar o status do banco de dados.",
          {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
              http: { status: 500 },
            },
          },
        );
      }
    },
  },

  Mutation: {
    register: async (_: any, args: any) => {
      const { name, email, password } = args;

      const userExists = await prisma.user.findUnique({
        where: { email },
      });

      if (userExists) {
        throw new GraphQLError("Este e-mail já está cadastrado.", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: newUser.id }, env.JWT_SECRET as string, {
        expiresIn: "7d",
      });

      return {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      };
    },
    login: async (_: any, args: any) => {
      const { email, password } = args;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new GraphQLError("E-mail ou senha incorretos.", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new GraphQLError("E-mail ou senha incorretos.", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" },
      );

      return {
        token,
        user: { id: user.id, name: user.name, email: user.email },
      };
    },
  },
};
