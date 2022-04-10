import { injectable } from "tsyringe";
import { IValidateProvider } from "../IValidateProvider";

@injectable()
class ValidateProvider implements IValidateProvider {

    validateName(name: string): boolean {

        const regex = /^[a-záàâãéèêíïóôõöúçñ]+$/i

        const isValid = regex.test(name);

        return isValid
    }

    ValidateEmail(email: string): boolean {

        /* const isValidEmail =  isEmail(email)

            if(isValidEmail === false){
                return false
            } */
        const emailRegex = /^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        const validateEmail = emailRegex.test(email);

        /*  if (validateEmail === null) {
              return false
          }
  
          if (validateEmail.index === 0) {
              return true
          }
  
          if (validateEmail.index !== 0) {
              return false
          } */


        const badCharactersRegex = /[!#$%&'*()+`{|}~]/g;
        const validEmail = badCharactersRegex.test(email);
        if (validEmail === true) {
            console.log("bad Character found");
            return false
        }


        return validateEmail;
    }

    validateGtin(gtin: string): boolean {

        const regex = /^[0-9]+$/g

        const isValid = regex.test(gtin);
        return isValid;
    }

}
export { ValidateProvider };