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
    me: async (_: any, __: any, context: any) => {
      if (!context.user || !context.user.userId) {
        throw new GraphQLError(
          "Você precisa estar autenticado para acessar este recurso.",
          {
            extensions: { code: "UNAUTHENTICATED" },
          },
        );
      }

      const user = await prisma.user.findUnique({
        where: { id: context.user.userId },
      });

      if (!user) {
        throw new GraphQLError("Usuário não encontrado.", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    },
    categories: async (_: any, __: any, context: any) => {
      if (!context.user || !context.user.userId) {
        throw new GraphQLError("Não autenticado.", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const userCategories = await prisma.category.findMany({
        where: { userId: context.user.userId },
        orderBy: { name: "asc" },
      });

      return userCategories.map((cat) => ({
        ...cat,
        transactionCount: 0,
        totalAmount: 0,
      }));
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

    createCategory: async (_: any, args: any, context: any) => {
      if (!context.user || !context.user.userId) {
        throw new GraphQLError("Não autenticado.", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const { name, description, icon, color } = args;

      const categoryExists = await prisma.category.findUnique({
        where: {
          name_userId: {
            name,
            userId: context.user.userId,
          },
        },
      });

      if (categoryExists) {
        throw new GraphQLError(
          "Você já possui uma categoria cadastrada com este nome.",
          {
            extensions: { code: "BAD_USER_INPUT" },
          },
        );
      }

      const newCategory = await prisma.category.create({
        data: {
          name,
          description,
          icon,
          color,
          userId: context.user.userId,
        },
      });

      return {
        ...newCategory,
        transactionCount: 0,
        totalAmount: 0,
      };
    },
    updateCategory: async (_: any, args: any, context: any) => {
      if (!context.user || !context.user.userId) {
        throw new GraphQLError("Não autenticado.", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const { id, name, description, icon, color } = args;

      const category = await prisma.category.findFirst({
        where: {
          id,
          userId: context.user.userId,
        },
      });

      if (!category) {
        throw new GraphQLError(
          "Categoria não encontrada ou você não tem permissão.",
          {
            extensions: { code: "BAD_USER_INPUT" },
          },
        );
      }

      if (name !== category.name) {
        const nameExists = await prisma.category.findUnique({
          where: {
            name_userId: { name, userId: context.user.userId },
          },
        });

        if (nameExists) {
          throw new GraphQLError(
            "Você já possui uma categoria cadastrada com este nome.",
            {
              extensions: { code: "BAD_USER_INPUT" },
            },
          );
        }
      }

      const updatedCategory = await prisma.category.update({
        where: { id },
        data: { name, description, icon, color },
      });

      return {
        ...updatedCategory,
        transactionCount: 0,
        totalAmount: 0,
      };
    },
    deleteCategory: async (_: any, args: any, context: any) => {
      if (!context.user || !context.user.userId) {
        throw new GraphQLError("Não autenticado.", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const { id } = args;

      const category = await prisma.category.findFirst({
        where: {
          id,
          userId: context.user.userId,
        },
      });

      if (!category) {
        throw new GraphQLError(
          "Categoria não encontrada ou você não tem permissão.",
          {
            extensions: { code: "BAD_USER_INPUT" },
          },
        );
      }

      await prisma.category.delete({
        where: { id },
      });

      return true;
    },
  },
};
