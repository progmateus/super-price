interface IValidateProvider {
    validateName(name: string): boolean;
    ValidateEmail(email: string): boolean;
    validateGtin(gtin: string): boolean;
}

export { IValidateProvider }