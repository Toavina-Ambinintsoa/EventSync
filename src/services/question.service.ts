import { prisma } from "../lib/prisma";
import { questionRepository } from "../repository/question.repository";

export const questionService = {
  getBySession(sessionId: string) {
    return questionRepository.findBySession(sessionId);
  },
  
  async create(
    sessionId: string,
    content: string,
    authorName?: string
  ) {
    // Vérifier si session existe
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new Error("Session not found");
    }

    // Vérifier si session est LIVE
    const now = new Date();

    const isLive =
      now >= session.startTime && now <= session.endTime;

    if (!isLive) {
      throw new Error("Session is not live");
    }

    //Créer question
    return questionRepository.create({
      content,
      authorName,
      sessionId,
    });
  },
};