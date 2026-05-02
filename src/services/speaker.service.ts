import { SpeakerRepository } from "@/repository/speaker.repository";

export class SpeakerService {
    constructor(private speaker_repository: SpeakerRepository) {}

    async get_all_speakers() {
        return this.speaker_repository.find_all_speakers();
    }

    async get_speaker_by_id(id: string) {
        return this.speaker_repository.find_speaker_by_id(id);
    }

    async get_sessions_by_speaker(id: string) {
        return this.speaker_repository.find_sessions_by_speaker(id);
    }
}