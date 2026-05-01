export interface CreateRoomDto {
  name: string;
}

export interface UpdateRoomDto {
  name?: string;
}

export interface CreateSessionDto {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  capacity?: number;
  roomId: string;
  speakerIds?: string[];
}

export interface UpdateSessionDto {
  title?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  capacity?: number;
  roomId?: string;
}

export interface SessionFilters {
  live?: boolean;
  roomId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}