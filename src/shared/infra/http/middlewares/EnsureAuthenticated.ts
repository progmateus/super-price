import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@errors/AppError";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {

    const authHeader = request.headers.authorization;
    const usersTokensRepository = new UsersTokensRepository();

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
            process.env.SECRET_REFRESH_TOKEN
        ) as IPayload

        const user = await usersTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );

        if (!user) {
            throw new AppError("Invalid Token", 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError("Invalid Token", 401);
    }
}