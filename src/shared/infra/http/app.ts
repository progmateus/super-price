import "reflect-metadata";
import "../../../database/index"
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"
import "../../container/index"
import { router } from "./routes";
import { AppError } from "@errors/AppError";

const app = express();
app.use(express.json())

app.use(router)
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {


        if (err instanceof AppError) {
            console.log(err.message);
            return response.status(err.statusCode).json({
                message: err.message
            })
        }

        return response.status(500).json({
            status: "error",
            message: `internal server error - ${err.message}`
        })

    }
)



export { app };