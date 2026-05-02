import { NextResponse } from "next/server";
import { SpeakerRepository } from "@/repository/speaker.repository";
import { SpeakerService } from "@/services/speaker.service";

const speaker_service = new SpeakerService(new SpeakerRepository());

interface Params {
    params: { speakerId: string };
}

// GET /api/speakers/:speakerId/sessions
export async function GET(_req: Request, { params }: Params) {
    try {
        const speaker = await speaker_service.get_speaker_by_id(params.speakerId);

        if (!speaker) {
            return NextResponse.json(
                { error: "Intervenant introuvable" },
                { status: 404 }
            );
        }

        const sessions = await speaker_service.get_sessions_by_speaker(params.speakerId);
        return NextResponse.json(sessions, { status: 200 });
    } catch (error) {
        console.error("[GET /api/speakers/:speakerId/sessions]", error);
        return NextResponse.json(
            { error: "Erreur interne du serveur" },
            { status: 500 }
        );
    }
}