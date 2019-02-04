import { StringifyOptions } from "querystring";
import { Bank } from "./Bank";

export class Customer {
    private personId: string;
    private name: string;
    private bank:string;
    private isIssuingBank:boolean;
    private bankObj:Bank;
    private className:string;
    constructor(obj:any,personId?: string,){
        if(obj!=undefined||null){
            if(obj["personId"]!=undefined||null)
                this.personId=obj["personId"];
            if(obj["name"]!=undefined||null)
                this.name=obj["name"];
            if(obj["bank"]!=undefined||null){
                if(obj["bank"].toString().search('#')!=-1)
                    this.bank=obj["bank"].split('#')[1];
                else
                    this.bank=obj["bank"];
            }
            if(obj["$class"]!=undefined||null){
                this.className=obj["$class"];
            }
        }
        if(personId!=undefined||null)
            this.personId=personId;
    };
    setBank(bank:string){
        this.bank = bank;
    }
    setBankObj(bankObj:Bank){
        this.bankObj = bankObj;
    }
    setName(name: string) {
        this.name = name;
    }
    setIsIssuingBank(isIssuingBank:boolean){
        this.isIssuingBank = isIssuingBank;
    }
    getPersonId() {
        return this.personId;
    }
    getBank() {
        return this.bank;
    }
    getBankObj(){
        return this.bankObj;
    }
    getName() {
        return this.name;
    }
    getIsIssuingBankr()
    {
        return this.isIssuingBank;
    }
}