import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@errors/AppError";

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing!");
    }

    if (authHeader.length > 350) {
        throw new AppError("Invalid Token!", 401)
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            process.env.TOKEN
        ) as IPayload

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("Invalid Token");
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError("Invalid Token");
    }
}