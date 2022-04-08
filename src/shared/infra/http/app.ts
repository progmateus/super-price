import "reflect-metadata";
import "../../../database/index"
import express from "express";
import "../../container/index"
import { router } from "./routes";

const app = express();
app.use(express.json())

app.use(router)


export { app };