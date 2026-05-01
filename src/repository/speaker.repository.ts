import { prisma } from "@/lib/prisma";

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
}