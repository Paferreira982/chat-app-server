import { Server as SocketIoServer, Socket } from 'socket.io';
import http from 'http';

class WebSocketServer {
  private io: SocketIoServer;

  constructor(httpServer: http.Server) {
    this.io = new SocketIoServer(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: false
      }
    });

    this.setupSocketEvents();
  }

  private setupSocketEvents() {
    this.io.on('connection', (socket: Socket) => {
      console.log(`WebSocket client connected: ${socket.id}`);

      socket.on('client:send-message', (message) => {
        console.log(`Message received: ${message}`);
        this.io.emit('server:message-recieved', JSON.parse(message));
      });

      socket.on('disconnect', () => {
        console.log(`WebSocket client disconnected: ${socket.id}`);
      });
    });
  }
}

export default WebSocketServer;
