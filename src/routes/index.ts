import express from "express";
import { requireAuth } from "../middlewares";

const routes = express.Router();
routes.use("/", require("./default").default);
routes.use("/auth", require("./auth").default);
routes.use("/users", requireAuth, require("./users").default);
routes.use("/books", requireAuth, require("./books").default);
routes.use("/loans", requireAuth, require("./loans").default);

export default routes;
