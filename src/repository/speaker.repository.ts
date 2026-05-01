import { prisma } from "@/lib/prisma";

export class SpeakerRepository {

    async find_all_speakers() {
        return prisma.speaker.findMany({
            orderBy: { fullName: "asc" },
        });
    }
}