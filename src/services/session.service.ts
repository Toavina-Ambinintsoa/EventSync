import { title } from "process";
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

export async function createSession(eventId: string, dto: CreateSessionDto){
    await assertEventExists(eventId);
    await assertRoomExists(dto.roomId);

    return prisma.session.create({
        data: {
            title: dto.title,
            description: dto.description,
            startTime: new Date(dto.startTime),
            endTime: new Date(dto.endTime),
            capacity: dto.capacity,
            roomId: dto.roomId,
            eventId,
            ...(dto.speakerIds?.length 
                ? { speakers: { connect: dto.speakerIds.map(id => ({ id })) } } : {}),
        },
        include: SESSION_INCLUDE
    });
}

export async function updateSession(id: string, dto: UpdateSessionDto) {
    await assertSessionExists(id);
    if (dto.roomId) await assertRoomExists(dto.roomId);

    return prisma.session.update({
        where: { id },
        data: {
            ...(dto.title ? { title: dto.title } : {}),
            ...(dto.description !== undefined ? { description: dto.description } : {}),
            ...(dto.startTime ? { startTime: new Date(dto.startTime) } : {}),
            ...(dto.endTime ? { endTime: new Date(dto.endTime) } : {}),
            ...(dto.capacity !== undefined ? { capacity: dto.capacity } : {}),
            ...(dto.roomId ? { roomId: dto.roomId } : {}),
        },
        include: SESSION_INCLUDE,
    });
}

export async function deleteSession(id: string) {
  await assertSessionExists(id);
  return prisma.session.delete({ where: { id } });
}
 
export async function addSpeakerToSession(sessionId: string, speakerId: string) {
  await assertSessionExists(sessionId);
 
  const speaker = await prisma.speaker.findUnique({ where: { id: speakerId } });
  if (!speaker) throw new Error('SPEAKER_NOT_FOUND');
 
  return prisma.session.update({
    where: { id: sessionId },
    data: { speakers: { connect: { id: speakerId } } },
    include: SESSION_INCLUDE,
  });
}

export async function removeSpeakerFromSession(sessionId: string, speakerId: string) {
  await assertSessionExists(sessionId);
 
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { speakers: true },
  });
 
  if (!session || session.speakers.length <= 1) {
    throw new Error('SESSION_NEEDS_ONE_SPEAKER');
  }
 
  return prisma.session.update({
    where: { id: sessionId },
    data: { speakers: { disconnect: { id: speakerId } } },
    include: SESSION_INCLUDE,
  });
}
 