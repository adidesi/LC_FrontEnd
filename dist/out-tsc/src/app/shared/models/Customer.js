import { Bank } from "./Bank";
var Customer = /** @class */ (function () {
    function Customer(obj, personId) {
        if (obj != undefined || null) {
            if (obj["personId"] != undefined || null)
                this.personId = obj["personId"];
            if (obj["companyName"] != undefined || null)
                this.companyName = obj["companyName"];
            if (obj["lastName"] != undefined || null)
                this.lastName = obj["lastName"];
            if (obj["name"] != undefined || null)
                this.name = obj["name"];
            if (obj["bank"] != undefined || null) {
                if (obj["bank"].toString().search('#') != -1)
                    this.bank = obj["bank"].split('#')[1];
                else
                    this.bank = obj["bank"];
            }
            if (obj["bankObj"] != undefined || null) {
                this.bankObj = new Bank(obj["bankObj"]);
            }
            if (obj["$class"] != undefined || null) {
                this.className = obj["$class"];
            }
        }
        if (personId != undefined || null)
            this.personId = personId;
    }
    ;
    Customer.prototype.setBank = function (bank) {
        this.bank = bank;
    };
    Customer.prototype.setBankObj = function (bankObj) {
        this.bankObj = bankObj;
    };
    Customer.prototype.setCompanyName = function (comapanyName) {
        this.companyName = comapanyName;
    };
    Customer.prototype.setLastName = function (lastName) {
        this.lastName = lastName;
    };
    Customer.prototype.setName = function (name) {
        this.name = name;
    };
    Customer.prototype.setIsImporter = function (isImporter) {
        this.isImporter = isImporter;
    };
    Customer.prototype.getPersonId = function () {
        return this.personId;
    };
    Customer.prototype.getBank = function () {
        return this.bank;
    };
    Customer.prototype.getBankObj = function () {
        return this.bankObj;
    };
    Customer.prototype.getCompanyName = function () {
        return this.companyName;
    };
    Customer.prototype.getLastName = function () {
        return this.lastName;
    };
    Customer.prototype.getName = function () {
        return this.name;
    };
    Customer.prototype.getIsImporter = function () {
        return this.isImporter;
    };
    return Customer;
}());
export { Customer };
//# sourceMappingURL=Customer.js.map