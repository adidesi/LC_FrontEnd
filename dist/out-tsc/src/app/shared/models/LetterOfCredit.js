import { ProductDetails } from "./ProductDetails";
var LetterOfCredit = /** @class */ (function () {
    function LetterOfCredit(obj, letterId) {
        this.approval = [];
        this.rules = [];
        this.transactions = [];
        if (obj != undefined || null) {
            this.letterId = (obj["letterId"] != undefined || null) ? obj["letterId"] : '';
            this.applicant = (obj["applicant"] != undefined || null) ? obj["applicant"].split('#')[1] : '';
            this.beneficiary = (obj["beneficiary"] != undefined || null) ? obj["beneficiary"].split('#')[1] : '';
            this.issuingBank = (obj["issuingBank"] != undefined || null) ? obj["issuingBank"].split('#')[1] : '';
            this.exportingBank = (obj["exportingBank"] != undefined || null) ? obj["exportingBank"].split('#')[1] : '';
            this.status = (obj["status"] != undefined || null) ? obj["status"] : '';
            this.productDetails = (obj["productDetails"] != undefined || null) ? new ProductDetails(obj["productDetails"]) : new ProductDetails();
            this.transactionId = (obj["transactionId"] != undefined || null) ? obj["transactionId"] : '';
            if (obj["approval"] != undefined || null) {
                for (var i = 0; i < obj["approval"].length; i++) {
                    this.approval.push(obj["approval"][i]);
                }
            }
            else {
                this.approval = new Array();
            }
            if (obj["rules"] != undefined || null) {
                for (var i = 0; i < obj["rules"].length; i++) {
                    this.rules.push(obj["rules"][i]["ruleText"]);
                }
            }
            else {
                this.rules = new Array();
            }
        }
        else {
            this.letterId = '';
            this.applicant = '';
            this.beneficiary = '';
            this.issuingBank = '';
            this.exportingBank = '';
            this.status = '';
            this.transactionId = '';
            this.productDetails = new ProductDetails();
            this.approval = [];
            this.rules = new Array();
        }
        if (letterId != undefined || null)
            this.letterId = letterId;
    }
    ;
    LetterOfCredit.prototype.setApplicant = function (applicant) {
        this.applicant = applicant;
    };
    LetterOfCredit.prototype.setBeneficiary = function (beneficiary) {
        this.beneficiary = beneficiary;
    };
    LetterOfCredit.prototype.setStatus = function (status) {
        this.status = status;
    };
    LetterOfCredit.prototype.setIssuingBank = function (issuingBank) {
        this.issuingBank = issuingBank;
    };
    LetterOfCredit.prototype.setExportingBank = function (exportingBank) {
        this.exportingBank = exportingBank;
    };
    LetterOfCredit.prototype.setProdObj = function (productDetails) {
        this.productDetails = productDetails;
    };
    LetterOfCredit.prototype.setTransactionId = function (transactionId) {
        this.transactionId = transactionId;
    };
    LetterOfCredit.prototype.setTransactions = function (transactions) {
        this.transactions = transactions;
    };
    LetterOfCredit.prototype.getTransactions = function () {
        return this.transactions;
    };
    LetterOfCredit.prototype.getLetterId = function () {
        return this.letterId;
    };
    LetterOfCredit.prototype.getApplicant = function () {
        return this.applicant;
    };
    LetterOfCredit.prototype.getExportingBank = function () {
        return this.exportingBank;
    };
    LetterOfCredit.prototype.getBeneficiary = function () {
        return this.beneficiary;
    };
    LetterOfCredit.prototype.getStatus = function () {
        return this.status;
    };
    LetterOfCredit.prototype.getIssuingBank = function () {
        return this.issuingBank;
    };
    LetterOfCredit.prototype.getProdObj = function () {
        return this.productDetails;
    };
    LetterOfCredit.prototype.getTransactionId = function () {
        return this.transactionId;
    };
    return LetterOfCredit;
}());
export { LetterOfCredit };
//# sourceMappingURL=LetterOfCredit.js.map