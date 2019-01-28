import { StringifyOptions } from "querystring";

export class Customer {
    private id: string;
    private companyName: string;
    private lastName: string;
    private firstName: string;
    constructor(id: string){
    //constructor(id: string, firstName:string, lastName:string, companyName:string) {
        this.id = id;
        //this.firstName=id;
    };
    setCompanyName(comapanyName: string) {
        this.companyName = comapanyName;
    }
    setLastName(lastName: string) {
        this.lastName = lastName;
    }
    setFirstName(firstName: string) {
        this.firstName = firstName;
    }
    getId() {
        return this.id;
    }
    getCompanyName() {
        return this.companyName;
    }
    getLastName() {
        return this.lastName;
    }
    getFirstName() {
        return this.firstName;
    }
}