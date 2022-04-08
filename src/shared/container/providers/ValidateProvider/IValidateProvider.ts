interface IValidateProvider {
    validateName(name: string): boolean;
    ValidateEmail(email: string): boolean;
}

export { IValidateProvider }