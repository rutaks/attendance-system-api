import { handleError } from "./utils/ErrorHandler";
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import config from "./configs/config";

async function runServer() {
  createConnection()
    .then(async (connection) => {
      const app = express();
      await connection.runMigrations();
      app.use(cors());
      app.use(helmet());
      app.use(bodyParser.json());
      app.use("/", routes);
      app.listen(config.port, () => {
        console.log(`Server started on port ${config.port}`);
      });
      app.use(
        (
          err: any,
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          handleError(err, res);
        }
      );
    })
    .catch((error) => console.log(error));
}

runServer();
