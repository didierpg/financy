import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    health: async () => {
      try {
        await prisma.$queryRaw`SELECT 1`;
        
        return {
          status: "UP",
          database: "CONNECTED"
        };
      } catch (error) {
        return {
          status: "UP",
          database: `DOWN: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
      }
    }
  }
};