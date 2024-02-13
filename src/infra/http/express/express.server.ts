import * as express from 'express';
import router from './routers';
import * as http from 'http';
import * as cors from 'cors';

class HttpServer {
  private app: express.Application;
  public server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    this.app.use(cors(
      {
        origin: '*',
        methods: 'GET,HEAD,POST',
        preflightContinue: false,
        optionsSuccessStatus: 204
      }
    ));
    this.app.use(express.json());
    this.app.use(router);
  }

  public start(port: number) {
    this.server.listen(port, () => {
      console.log(`HTTP Server is running on port ${port}`);
    });
  }
}

export default HttpServer;
