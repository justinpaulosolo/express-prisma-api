import express, { NextFunction, Request, Response } from "express";
import HttpException from "./models/http-exception.model";
import routes from "./routes/routes";

const app = express();

/**
 * This is the main entry point of the application.
 * It is responsible for setting up the server and
 * listening for requests.
 *
 * The server is set up using the express framework.
 * The server is configured to listen on port 3000.
 *
 * The server is configured to use the routes defined
 * in the routes folder.
 **/

app.use(routes);

app.use(
  (
    err: Error | HttpException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err && err.name === "UnauthorizedError") {
      return res.status(401).json({
        status: "error",
        message: "missing authorization credentials",
      });
      // @ts-ignore
    } else if (err && err.errorCode) {
      // @ts-ignore
      res.status(err.errorCode).json(err.message);
    } else if (err) {
      res.status(500).json(err.message);
    }
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
