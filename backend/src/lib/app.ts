import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
// import routes from './routes'

dotenv.config();

export function createApp() {
  const app: Application = express();

  // setup middlewares
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  // app.use('/api', routes)

  app.get("/", (_req: Request, res: Response) => {
    res.send({
      message: "Welcome to Triply!",
    });
  });

  /**
   * For any other route that is not defined, return docs endpoint
   */
  app.all("*", (_request: Request, response: Response, _next: NextFunction) => {
    response.status(404).json({
      message: "Page not found",
      docs: "/api-docs/",
    });
  });

  return app;
}
