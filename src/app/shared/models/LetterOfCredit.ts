import { ProductDetails } from "./ProductDetails";

export class LetterOfCredit {
    private letterId: string;
    private applicant: string;
    private beneficiary: string;
    private issuingBank: string;
    private exportingBank: string;
    private status:string;
    private productDetails_obj:ProductDetails;
    private approval=[];
    private rules=[];
    constructor(obj:any,letterId?: string,){
        if(obj!=undefined||null){
            if(obj["letterId"]!=undefined||null)
                this.letterId=obj["letterId"];
            if(obj["applicant"]!=undefined||null)
                this.applicant=obj["applicant"].split('#')[1];
            if(obj["beneficiary"]!=undefined||null)
                this.beneficiary=obj["beneficiary"].split('#')[1];
            if(obj["issuingBank"]!=undefined||null)
                this.issuingBank=obj["issuingBank"].split('#')[1];
            if(obj["exportingBank"]!=undefined||null)
            this.exportingBank=obj["exportingBank"].split('#')[1];
            if(obj["status"]!=undefined||null)
            this.status=obj["status"];
            if(obj["productDetails"]!=undefined||null)
                this.productDetails_obj=new ProductDetails(obj["productDetails"]);
            if(obj["approval"]!=undefined||[]||null)
                {
                    for(var i=0;i<obj["approval"].length;i++)
                    {
                        this.approval.push(obj["approval"][i]);
                        //console.log(i,this.approval[i]);
                    }
                }
                if(obj["rules"]!=[])
                {
                    for(var i=0;i<obj["rules"].length;i++)
                    {
                        this.rules.push(obj["rules"][i]["ruleText"]);
                        //console.log("Rules",i,this.rules[i]);
                    }
                }
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
    setProdObj(productDetails_obj:ProductDetails){
        this.productDetails_obj = productDetails_obj;
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
        return this.productDetails_obj;
    }
}