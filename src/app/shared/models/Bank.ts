import { StringifyOptions } from "querystring";

export class Bank {
    private bankId: string;
    private name: string;
    private swiftCode: string;
    private IBAN: string;
    constructor(obj?: any, swiftCode?: string, IBAN?: string, bankId?: string) {
        if (obj != undefined || null) {
            if (obj["bankID"] != undefined || null)
                this.bankId = obj["bankID"];
            if (obj["name"] != undefined || null)
                this.name = obj["name"];
        }
        if (bankId != undefined || null)
            this.bankId = bankId;
        if (swiftCode != undefined || null)
            this.swiftCode = swiftCode;
        if (IBAN != undefined || null)
            this.IBAN = IBAN;
    };
    setName(name: string) {
        this.name = name;
    }
    getBankId() {
        return this.bankId;
    }
    getName() {
        return this.name;
    }
    getIBAN() {
        return this.IBAN;
    }
    getSwiftCode() {
        return this.swiftCode;
    }
}