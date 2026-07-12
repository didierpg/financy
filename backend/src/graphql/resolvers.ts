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
        include: {
          transactions: true,
        },
        orderBy: { name: "asc" },
      });

      return userCategories.map((cat) => {
        const totalAmount = cat.transactions.reduce(
          (sum, tx) => sum + tx.amount,
          0,
        );
        return {
          ...cat,
          transactionCount: cat.transactions.length,
          totalAmount,
        };
      });
    },
    transactions: async (_: any, args: any, context: any) => {
      if (!context.user || !context.user.userId) {
        throw new GraphQLError("Não autenticado.", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const { search, type, categoryId, month, year } = args;

      const whereClause: any = {
        userId: context.user.userId,
      };

      if (search) {
        whereClause.description = {
          contains: search,
        };
      }

      if (type) {
        whereClause.type = type;
      }

      if (categoryId) {
        whereClause.categoryId = categoryId;
      }

      if (month && year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        whereClause.date = {
          gte: startDate,
          lte: endDate,
        };
      }

      const list = await prisma.transaction.findMany({
        where: whereClause,
        include: {
          category: true,
        },
        orderBy: {
          date: "desc",
        },
      });

      return list.map((t) => ({
        ...t,
        date: t.date.toISOString(),
        category: {
          ...t.category,
          transactionCount: 0,
          totalAmount: 0,
        },
      }));
    },
    dashboardStats: async (_: any, args: any, context: any) => {
      if (!context.user || !context.user.userId) {
        throw new GraphQLError("Não autenticado.", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const { month, year } = args;

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59, 999);

      const monthlyTransactions = await prisma.transaction.findMany({
        where: {
          userId: context.user.userId,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      let monthlyIncome = 0;
      let monthlyExpense = 0;

      monthlyTransactions.forEach((tx) => {
        if (tx.type === "INCOME") {
          monthlyIncome += tx.amount;
        } else if (tx.type === "EXPENSE") {
          monthlyExpense += tx.amount;
        }
      });

      const totalBalance = monthlyIncome - monthlyExpense;

      return {
        totalBalance,
        monthlyIncome,
        monthlyExpense,
      };
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

      const transactionCount = await prisma.transaction.count({
        where: { categoryId: id },
      });

      if (transactionCount > 0) {
        throw new GraphQLError(
          "Não é possível excluir uma categoria que possui transações vinculadas.",
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
    createTransaction: async (_: any, args: any, context: any) => {
      if (!context.user || !context.user.userId) {
        throw new GraphQLError("Não autenticado.", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const { description, amount, type, date, categoryId } = args;

      const category = await prisma.category.findFirst({
        where: {
          id: categoryId,
          userId: context.user.userId,
        },
      });

      if (!category) {
        throw new GraphQLError(
          "A categoria informada não existe ou não pertence a você.",
          {
            extensions: { code: "BAD_USER_INPUT" },
          },
        );
      }

      const newTransaction = await prisma.transaction.create({
        data: {
          description,
          amount,
          type,
          date: new Date(date),
          userId: context.user.userId,
          categoryId,
        },
        include: {
          category: true,
        },
      });

      return {
        ...newTransaction,
        date: newTransaction.date.toISOString(),
        category: {
          ...newTransaction.category,
          transactionCount: 0,
          totalAmount: 0,
        },
      };
    },
    updateTransaction: async (_: any, args: any, context: any) => {
      if (!context.user || !context.user.userId) {
        throw new GraphQLError("Não autenticado.", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const { id, description, amount, type, date, categoryId } = args;

      const transaction = await prisma.transaction.findFirst({
        where: {
          id,
          userId: context.user.userId,
        },
      });

      if (!transaction) {
        throw new GraphQLError(
          "Transação não encontrada ou você não tem permissão.",
          {
            extensions: { code: "BAD_USER_INPUT" },
          },
        );
      }

      const category = await prisma.category.findFirst({
        where: {
          id: categoryId,
          userId: context.user.userId,
        },
      });

      if (!category) {
        throw new GraphQLError(
          "A categoria informada não existe ou não pertence a você.",
          {
            extensions: { code: "BAD_USER_INPUT" },
          },
        );
      }

      const updatedTransaction = await prisma.transaction.update({
        where: { id },
        data: {
          description,
          amount,
          type,
          date: new Date(date),
          categoryId,
        },
        include: {
          category: true,
        },
      });

      return {
        ...updatedTransaction,
        date: updatedTransaction.date.toISOString(),
        category: {
          ...updatedTransaction.category,
          transactionCount: 0,
          totalAmount: 0,
        },
      };
    },

    deleteTransaction: async (_: any, args: any, context: any) => {
      if (!context.user || !context.user.userId) {
        throw new GraphQLError("Não autenticado.", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const { id } = args;

      const transaction = await prisma.transaction.findFirst({
        where: {
          id,
          userId: context.user.userId,
        },
      });

      if (!transaction) {
        throw new GraphQLError(
          "Transação não encontrada ou você não tem permissão.",
          {
            extensions: { code: "BAD_USER_INPUT" },
          },
        );
      }

      await prisma.transaction.delete({
        where: { id },
      });

      return true;
    },
  },
};
