
export class LetterOfCredit {
    private letterId: string;
    private applicant: string;
    private beneficiary: string;
    private issuingBank: string;
    private exportingBank: string;
    private status:string;
    constructor(obj:any,letterId?: string,){
        if(obj!=undefined||null){
            if(obj["letterId"]!=undefined||null)
                this.letterId=obj["letterId"];
            if(obj["applicant"]!=undefined||null)
                this.applicant=obj["applicant"];
            if(obj["beneficiary"]!=undefined||null)
                this.beneficiary=obj["beneficiary"];
            if(obj["issuingBank"]!=undefined||null)
                this.issuingBank=obj["issuingBank"];
            if(obj["exportingBank"]!=undefined||null)
            this.exportingBank=obj["exportingBank"];
            if(obj["status"]!=undefined||null)
            this.status=obj["status"];
            // if(obj["bank"]!=undefined||null)
            //     this.bank=obj["bank"].split('#')[1];
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
}