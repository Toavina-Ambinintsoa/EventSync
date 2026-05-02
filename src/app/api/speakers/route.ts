import { NextResponse } from "next/server";
import { SpeakerRepository } from "@/repository/speaker.repository";
import { SpeakerService } from "@/services/speaker.service";

const speaker_service = new SpeakerService(new SpeakerRepository());
// GET /api/speakers
export async function GET() {
    try {
        const speakers = await speaker_service.get_all_speakers();
        return NextResponse.json(speakers, { status: 200 });
    } catch (error) {
        console.error("[GET /api/speakers]", error);
        return NextResponse.json(
            { error: "Erreur interne du serveur" },
            { status: 500 }
        );
    }
}