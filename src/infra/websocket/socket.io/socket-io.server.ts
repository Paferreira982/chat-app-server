import { Server, Socket } from 'socket.io';
import http from 'http';
import UserHandler from './handlers/user.handler';
import { WebSocketInterface } from '..';
import MessageHandler from './handlers/message.handler';

class WebSocketServer implements WebSocketInterface {
  private io: Server;

  constructor(httpServer: http.Server) {
    this.io = new Server(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: false
      }
    });

    this.setupSocketEvents();
  }

  public on(event: string, callback: (socket: any) => void): void {
    this.io.on(event, callback);
  }

  public emit(event: string, data: any): void {
    this.io.emit(event, data);
  }

  private setupSocketEvents() {
    this.io.on('connection', (socket: Socket) => {
      MessageHandler.register(this.io, socket);
      UserHandler.register(this.io, socket);

      socket.on('disconnect', () => {});
    });
  }
}

export default WebSocketServer;
