import { ProductDetails } from "./ProductDetails";
import { Transaction } from "./Transaction";
import { Rule } from "./Rule";
// import { Rule } from "./Rule";

export class LetterOfCredit {
    private letterId: string;
    private applicant: string;
    private beneficiary: string;
    private issuingBank: string;
    private exportingBank: string;
    private status: string;
    private productDetails: ProductDetails;
    private approval = [];
    private rules: Rule[] = [];
    private transactionId: string;
    private transactions: Transaction[] = [];
    constructor(obj?: any, letterId?: string) {
        if (obj != undefined || null) {
            //console.log("in constructor ",JSON.stringify(obj))
            this.letterId = (obj["letterId"] != undefined || null) ? obj["letterId"] : ''
            this.applicant = (obj["applicant"] != undefined || null) ? (obj["applicant"].toString().search('#') != -1) ? obj["applicant"].split('#')[1] : obj["applicant"] : '';
            this.beneficiary = (obj["beneficiary"] != undefined || null) ? (obj["beneficiary"].toString().search('#') != -1) ? obj["beneficiary"].split('#')[1] : obj["beneficiary"] : '';
            this.issuingBank = (obj["issuingBank"] != undefined || null) ? (obj["issuingBank"].toString().search('#') != -1) ? obj["issuingBank"].split('#')[1] : obj["issuingBank"] : '';
            //console.log('in c',this.issuingBank)
            this.exportingBank = (obj["exportingBank"] != undefined || null) ? (obj["exportingBank"].toString().search('#') != -1) ? obj["exportingBank"].split('#')[1] : obj["exportingBank"] : '';
            this.status = (obj["status"] != undefined || null) ? obj["status"] : '';
            this.productDetails = (obj["productDetails"] != undefined || null) ? new ProductDetails(obj["productDetails"]) : new ProductDetails();
            this.transactionId = (obj["transactionId"] != undefined || null) ? obj["transactionId"] : '';
            if (obj["approval"] != undefined || null) {
                for (var i = 0; i < obj["approval"].length; i++) {
                    this.approval.push(obj["approval"][i]);
                }
            } else {
                this.approval = new Array();
            }
            if ((obj["rules"] != undefined || null) && obj["rules"].length != 0) {
                this.rules = new Array();
                for (var i = 0; i < obj["rules"].length; i++) {
                    this.rules.push(new Rule(obj["rules"][i]));
                }
            } else {
                this.rules = new Array();
            }
            if (obj["transactions"] != undefined || null) {
                for (var i = 0; i < obj["transactions"].length; i++) {
                    this.transactions.push(obj["transactions"][i]);
                }
            } else {
                this.transactions = new Array();
            }
        } else {
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
            this.transactions = new Array();
        }
        if (letterId != undefined || null)
            this.letterId = letterId;
    };
    setApplicant(applicant: string) {
        this.applicant = applicant;
    }

    setBeneficiary(beneficiary: string) {
        this.beneficiary = beneficiary;
    }
    setStatus(status: string) {
        this.status = status;
    }
    setIssuingBank(issuingBank: string) {
        this.issuingBank = issuingBank;
    }
    setExportingBank(exportingBank: string) {
        this.exportingBank = exportingBank;
    }
    setProdObj(productDetails: ProductDetails) {
        this.productDetails = productDetails;
    }
    setTransactionId(transactionId: string) {
        this.transactionId = transactionId;
    }
    setTransactions(transactions: Transaction[]) {
        this.transactions = transactions;
    }
    getTransactions() {
        return this.transactions;
    }
    getRule() {
        return this.rules
    }
    getTransactionById(index: number) {
        return this.transactions[index];
    }
    getLetterId() {
        return this.letterId;
    }
    getApplicant() {
        return this.applicant;
    }
    getExportingBank() {
        return this.exportingBank;
    }
    getBeneficiary() {
        return this.beneficiary;
    }
    getStatus() {
        return this.status;
    }
    getIssuingBank() {
        return this.issuingBank;
    }
    getProdObj() {
        return this.productDetails;
    }
    getTransactionId() {
        return this.transactionId;
    }
    addRule() {
        this.rules.push(new Rule())
    }

}