var Bank = /** @class */ (function () {
    function Bank(obj, swiftCode, IBAN, bankId) {
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
    }
    ;
    Bank.prototype.setName = function (name) {
        this.name = name;
    };
    Bank.prototype.getBankId = function () {
        return this.bankId;
    };
    Bank.prototype.getName = function () {
        return this.name;
    };
    Bank.prototype.getIBAN = function () {
        return this.IBAN;
    };
    Bank.prototype.getSwiftCode = function () {
        return this.swiftCode;
    };
    return Bank;
}());
export { Bank };
//# sourceMappingURL=Bank.js.map