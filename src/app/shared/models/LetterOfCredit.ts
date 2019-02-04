import { ProductDetails } from "./ProductDetails";

export class LetterOfCredit {
    private letterId: string;
    private applicant: string;
    private beneficiary: string;
    private issuingBank: string;
    private exportingBank: string;
    private status:string;
    private productDetails:ProductDetails;
    private approval=[];
    private rules=[];
    private transactionId:string;
    constructor(obj?:any,letterId?: string,){
        if(obj!=undefined||null){
            this.letterId=(obj["letterId"]!=undefined||null)?obj["letterId"]:''
            this.applicant=(obj["applicant"]!=undefined||null)?obj["applicant"].split('#')[1]:'';
            this.beneficiary=(obj["beneficiary"]!=undefined||null)?obj["beneficiary"].split('#')[1]:'';
            this.issuingBank=(obj["issuingBank"]!=undefined||null)?obj["issuingBank"].split('#')[1]:'';
            this.exportingBank=(obj["exportingBank"]!=undefined||null)?obj["exportingBank"].split('#')[1]:'';
            this.status=(obj["status"]!=undefined||null)?obj["status"]:'';
            this.productDetails=(obj["productDetails"]!=undefined||null)?new ProductDetails(obj["productDetails"]):new ProductDetails();
            this.transactionId=(obj["transactionId"]!=undefined||null)?obj["transactionId"]:'';
            if(obj["approval"]!=undefined||null){
                    for(var i=0;i<obj["approval"].length;i++){
                        this.approval.push(obj["approval"][i]);
                    }
            }else{
                this.approval=new Array();
            }
            if(obj["rules"]!=undefined||null){
                for(var i=0;i<obj["rules"].length;i++){
                    this.rules.push(obj["rules"][i]["ruleText"]);
                }
            }else{
                this.rules=new Array();
            }
        }else{
            this.letterId= '';
            this.applicant= '';
            this.beneficiary= '';
            this.issuingBank= '';
            this.exportingBank= '';
            this.status='';
            this.transactionId='';
            this.productDetails = new ProductDetails();
            this.approval=[];
            this.rules=new Array();
        }
        if(letterId!=undefined||null)
            this.letterId=letterId;
    };
    setApplicant(applicant:string){
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
    setProdObj(productDetails:ProductDetails){
        this.productDetails = productDetails;
    }
    setTransactionId(transactionId:string){
        this.transactionId = transactionId;
    }
    getLetterId() {
        return this.letterId;
    }
    getApplicant() {
        return this.applicant;
    }
    getExportingBank(){
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
    getProdObj(){
        return this.productDetails;
    }
    getTransactionId(){
        return this.transactionId;
    }

    
}