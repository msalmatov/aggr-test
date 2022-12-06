import express from "express";
import cors from "cors";
import config from "./config";
import routes from "./routes";
import errorHandler from "./error-handler";

const app = express();

app.set("port", process.env.PORT || config.service.port);

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use(errorHandler);

export default app;