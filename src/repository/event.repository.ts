import {prisma} from "../lib/prisma.js"
import { EventCreateInput, EventUpdateInput } from "@/generated/prisma/models.js"


export class EventRepository {
    async create_event(event : EventCreateInput){
        return prisma.event.create({data : event})
    }
    async put_event(event : EventUpdateInput, id: String){
        return prisma.event.update({
            where : {
                id : id
            },
            data : {
                event
            }
        })
    }
    async delete_event(id : String){
        return prisma.event.delete({
            where : {id}
        })
    }
}

