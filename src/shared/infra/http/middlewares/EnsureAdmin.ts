import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { Request, Response, NextFunction } from "express";


export async function EnsureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {

    const { id } = request.user;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if (!user.isAdmin) {
        throw new AppError("Access denied!")
    }

    next();
}