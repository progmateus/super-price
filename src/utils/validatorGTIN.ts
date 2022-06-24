export class ValidatorGTIN {

    validateGTIN(value: string) {

        const gtin = value.replace("/\D/", "")

        if (gtin.length != 13) {
            return false
        }

        const pieceGTIN = gtin.substring(0, 12);

        const codeBR = gtin.substring(0, 3);

        if (codeBR !== "789") {
            return false
        }

        const lastDigit = this.lastDigitIdentifier(pieceGTIN)
        const concat = pieceGTIN.concat(lastDigit)


        return concat === value
    }


    lastDigitIdentifier(pieceGTIN: string) {

        let soma = 0;

        for (let i = 0; i < pieceGTIN.length; i++) {
            soma += (i % 2 == 0) ? Number(pieceGTIN[i]) : (Number(pieceGTIN[i]) * 3)
        }

        for (let i = 0; i <= 9; i++) {
            if ((soma + i) % 10 == 0) {
                return String(i)
            }

        }
    }
}