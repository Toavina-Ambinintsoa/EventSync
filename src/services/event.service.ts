import { EventCreateInput, EventUpdateInput } from "@/generated/prisma/models";
import { EventRepository } from "@/repository/event.repository";

export class EventService{
    constructor( private event_repositrory : EventRepository){}

    async create_event(event : EventCreateInput){
        this.event_repositrory.create_event(event)
    }
    async put_event(event : EventUpdateInput, id : String){
        this.event_repositrory.put_event(event, id)
    }
    async delete_event(id : String){
        this.event_repositrory.delete_event(id)
    }
}