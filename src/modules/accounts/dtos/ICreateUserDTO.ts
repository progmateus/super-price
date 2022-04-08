interface ICreateUserDTO {
    id?: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    avatar?: string;
}
export { ICreateUserDTO };