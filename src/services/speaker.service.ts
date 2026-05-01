import { SpeakerRepository } from "@/repository/speaker.repository";

export class SpeakerService {
    constructor(private speaker_repository: SpeakerRepository) {}

    async get_all_speakers() {
        return this.speaker_repository.find_all_speakers();
    }
}