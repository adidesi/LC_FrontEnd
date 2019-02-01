import { StringifyOptions } from "querystring";
import { Bank } from "./Bank";

export class Customer {
    private personId: string;
    private companyName: string;
    private lastName: string;
    private name: string;
    private bank:string;
    private type:string;
    private bankObj:Bank;
    private className:string;
    constructor(obj:any,personId?: string,){
        if(obj!=undefined||null){
            if(obj["personId"]!=undefined||null)
                this.personId=obj["personId"];
            if(obj["companyName"]!=undefined||null)
                this.companyName=obj["companyName"];
            if(obj["lastName"]!=undefined||null)
                this.lastName=obj["lastName"];
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
    setCompanyName(comapanyName: string) {
        this.companyName = comapanyName;
    }
    setLastName(lastName: string) {
        this.lastName = lastName;
    }
    setName(name: string) {
        this.name = name;
    }
    setType(type:string){
        this.type = type;
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
    getCompanyName() {
        return this.companyName;
    }
    getLastName() {
        return this.lastName;
    }
    getName() {
        return this.name;
    }
}