import { Timestamp } from "rxjs";
import {reject,approve} from '../constant'

export class Transaction {
    private letterId: string;//loc
    private timestamp: string;
    private date:string;
    private time:string;
    private status:string;
    private approvingParty:string;//if transaction is approved
    private closeReason:string;//if transaction is rejected
    constructor(obj:any,status:string,letterId?: string){
        if(status!=undefined||null)
            this.status=status;
        if(obj!=undefined||null){
            if(obj["loc"]!=undefined||null)
                this.letterId=obj["loc"];
            if(obj["timestamp"]!=undefined||null){
                this.timestamp=obj["timestamp"];
                this.date = this.timestamp.split('T')[0];
                this.time = this.timestamp.split('T')[1].split('\.')[0];
            }
            if(status=reject){
                if(obj["closeReason"]!=undefined||null)
                    this.closeReason=obj["closeReason"]
            }else if (status=approve){
                if(obj["approvingParty"]!=undefined||null)
                    this.approvingParty=obj["approvingParty"].split('#')[1];
            }
        }
        if(letterId!=undefined||null)
            this.letterId=letterId;
    };
}