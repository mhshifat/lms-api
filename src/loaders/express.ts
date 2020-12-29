import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "../config";
import { errMiddleware, notFoundMiddleware } from "../middlewares";
import routes from "../routes";

export default () => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(morgan("tiny"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(env.apiPrefix, routes);
  app.use(notFoundMiddleware);
  app.use(errMiddleware);

  return app;
};
