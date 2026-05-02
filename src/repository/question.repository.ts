import { prisma } from "../lib/prisma";

export const questionRepository = {
  findBySession(sessionId: string) {
    return prisma.question.findMany({
      where: { sessionId },
      orderBy: { upvotes: "desc" },
    });
  },
  
  create(data: {
    content: string;
    authorName?: string;
    sessionId: string;
  }) {
    return prisma.question.create({ data });
  },
};