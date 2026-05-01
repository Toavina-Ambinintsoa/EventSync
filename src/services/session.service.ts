import { prisma } from "../lib/prisma";
import { CreateSessionDto, UpdateSessionDto, SessionFilters } from '../types';

const SESSION_INCLUDE = {
    room: {select: {id: true, name: true}},
    speakers: {select: {id: true, name: true}},
};

async function assertSessionExists(id: string) {
    const session = await prisma.session.findUnique({
        where: { id }});
        if (!session) {
            throw new Error("SESSION_NOT_FOUND");
        }
        return session;
}

async function assertEventExists(eventId:string) {
    const event = await prisma.event.findUnique({
        where: { id: eventId }
    });
    if (!event) {
        throw new Error("EVENT_NOT_FOUND");
    }
    return event;
}

async function assertRoomExists(roomId:string) {
    const room = await prisma.room.findUnique({
        where: { id: roomId }
    });
    if (!room) {
        throw new Error("ROOM_NOT_FOUND");
    }
    return room;
}

export async function getSessionsByEvent(eventId: string, filters: SessionFilters) {
    await assertEventExists(eventId);

    const now = new Date();

    return prisma.session.findMany({
        where: {
            eventId,
            ...(filters.roomId ? { roomId: filters.roomId } : {}),
            ...(filters.live
                ? {startTime: { lte: now }, endTime: { gte: now }}
                : {}),
        },
        include: SESSION_INCLUDE,
        orderBy: {startTime: "asc"}
    });
}

export async function getSessionById(id: string) {
    const session = await prisma.session.findUnique({
        where: { id },
        include: {
            ...SESSION_INCLUDE,
            questions: {
                orderBy: {upvotes: 'desc'},
            },
        },
    });
    if (!session) {
        throw new Error("SESSION_NOT_FOUND");
    }
    return session;

}