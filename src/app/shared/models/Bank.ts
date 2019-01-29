import { StringifyOptions } from "querystring";

export class Bank {
    private bankId: string;
    private name: string;
    constructor(obj:any,bankId?: string){
        if(obj!=undefined||null){
            if(obj["bankID"]!=undefined||null)
                this.bankId=obj["bankID"];
            if(obj["name"]!=undefined||null)
                this.name=obj["name"];
        }
        if(bankId!=undefined||null)
            this.bankId = bankId;  
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
}