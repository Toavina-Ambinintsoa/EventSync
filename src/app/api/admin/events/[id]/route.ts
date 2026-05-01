import { EventRepository } from "@/repository/event.repository";
import { EventService } from "@/services/event.service";
import { NextResponse } from "next/server";

const event_service = new EventService(new EventRepository)

export async function PUT(request: Request, {params} : {params : { id: String}}) {
    try{
        const {id} = params;
        const event = await request.json();
        const result = await event_service.put_event(event, id)
        return NextResponse.json(result, {status: 201})
    }catch (error){
        return NextResponse.json(error, {status : 400})
    }
}

export async function DELETE({params} : {params : { id: String}}) {
    try{
        const {id} = params;
        const result = await event_service.delete_event(id)
        return NextResponse.json(result, {status: 201})
    }catch (error){
        return NextResponse.json(error, {status : 400})
    }
}