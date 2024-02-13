import HttpServer from "./infra/http/express/express.server";
import WebSocketServer from "./infra/websocket/socket.io/socket-io.server";

const httpServer = new HttpServer();
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

httpServer.start(port);

const { server } = httpServer;
const websocketServer = new WebSocketServer(server);
