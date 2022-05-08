import { Request, Response } from "express";
class ProfileUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        return response.status(200).json({
            id: id,
            name: "Priscilla",
            lastname: "Alcantara",
            email: "priscilla@gmail.com",
            avatar: "https://github.com/ninkua.png"
        })
    }

}
export { ProfileUserController };