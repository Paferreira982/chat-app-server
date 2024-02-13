export * from './socket.io/socket-io.server';

export interface WebSocketInterface {
    on(event: string, callback: (socket: any) => void): void;
    emit(event: string, data: any): void;
}