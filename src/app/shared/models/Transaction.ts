import { Timestamp } from "rxjs";
import { reject, approve, CREATE, SHIP, CLOSE } from '../constant'

export class Transaction {
    private loc: string;//loc
    private timestamp: string;
    private date: string;
    private time: string;
    private status: string;
    private approvingParty: string;//if transaction is approved
    private closeReason: string;//if transaction is rejected
    private evidence: string;
    constructor(obj: any, status: string, loc?: string) {
        if (status != undefined || null)
            this.status = status;
        if (obj != undefined || null) {
            if (obj["loc"] != undefined || null)
                this.loc = obj["loc"];
            if (obj["timestamp"] != undefined || null) {
                this.timestamp = obj["timestamp"];
                this.date = this.timestamp.split('T')[0];
                this.time = this.timestamp.split('T')[1].split('\.')[0];
            }
            if (status == reject || CLOSE) {
                if (obj["closeReason"] != undefined || null)
                    this.closeReason = obj["closeReason"]
            } else if (status == approve) {
                if (obj["approvingParty"] != undefined || null) {
                this.approvingParty = obj["approvingParty"].split('#')[1];
                }
            } else if (status == CREATE){
                this.approvingParty = obj["applicant"].split('#')[1];
            } else if (status == SHIP)
                this.evidence = obj["evidence"];
        }
        if (loc != undefined || null)
            this.loc = loc;
    };
}