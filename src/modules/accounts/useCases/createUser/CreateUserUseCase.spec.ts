import { AppError } from "@errors/AppError";
import { UsersRepositoryInMemory } from "@modules/accounts/infra/typeorm/repositories/in-memory/UsersRepositoryInMemory";
import { ValidateProvider } from "@shared/container/providers/ValidateProvider/implementations/ValidateProvider";
import { CreateUserUseCase } from "./CreateUserUseCase";




let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let validateProvider: ValidateProvider

describe("Create User", () => {

    beforeEach(() => {
        validateProvider = new ValidateProvider()
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(
            usersRepositoryInMemory,
            validateProvider
        );
    });

    it("Should be able to create a new user", async () => {
        const user = {
            name: "John",
            lastname: "Doe",
            email: "johndoe@gmail.com",
            password: "john123",
            avatar: "https://image.com"
        }

        await createUserUseCase.execute({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            avatar: user.avatar
        });

        const userCreated = await usersRepositoryInMemory.findByEmail(user.email)
        expect(userCreated).toHaveProperty("id");
    })

    it("Should not be able to create a new user with email exists", () => {

        expect(async () => {

            const user = {
                name: "John",
                lastname: "Doe",
                email: "johndoe@gmail.com",
                password: "john123",
            }

            await createUserUseCase.execute({
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
            })

            await createUserUseCase.execute({
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
            })

        }).rejects.toBeInstanceOf(AppError)

    })
})

