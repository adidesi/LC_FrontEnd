var BankEmployee = /** @class */ (function () {
    function BankEmployee(obj, personId) {
        if (obj != undefined || null) {
            if (obj["personId"] != undefined || null)
                this.personId = obj["personId"];
            if (obj["name"] != undefined || null)
                this.name = obj["name"];
            if (obj["bank"] != undefined || null) {
                if (obj["bank"].toString().search('#') != -1)
                    this.bank = obj["bank"].split('#')[1];
                else
                    this.bank = obj["bank"];
            }
            if (obj["$class"] != undefined || null) {
                this.className = obj["$class"];
            }
        }
        if (personId != undefined || null)
            this.personId = personId;
    }
    ;
    BankEmployee.prototype.setBank = function (bank) {
        this.bank = bank;
    };
    BankEmployee.prototype.setBankObj = function (bankObj) {
        this.bankObj = bankObj;
    };
    BankEmployee.prototype.setName = function (name) {
        this.name = name;
    };
    BankEmployee.prototype.setIsIssuingBank = function (isIssuingBank) {
        this.isIssuingBank = isIssuingBank;
    };
    BankEmployee.prototype.getPersonId = function () {
        return this.personId;
    };
    BankEmployee.prototype.getBank = function () {
        return this.bank;
    };
    BankEmployee.prototype.getBankObj = function () {
        return this.bankObj;
    };
    BankEmployee.prototype.getName = function () {
        return this.name;
    };
    BankEmployee.prototype.getIsIssuingBankr = function () {
        return this.isIssuingBank;
    };
    return BankEmployee;
}());
export { BankEmployee };
//# sourceMappingURL=BankEmployee.js.map