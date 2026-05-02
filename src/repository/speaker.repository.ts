import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma";

export class SpeakerRepository {

    async find_all_speakers() {
        return prisma.speaker.findMany({
            orderBy: { fullName: "asc" },
        });
    }

    async find_speaker_by_id(id: string) {
        return prisma.speaker.findUnique({
            where: { id },
        });
    }

    async find_sessions_by_speaker(id: string) {
        return prisma.session.findMany({
            where: {
                speakers: {
                    some: { id },
                },
            },
            include: {
                room: true,
                speakers: true,
            },
            orderBy: { startTime: "asc" },
        });
    }
}