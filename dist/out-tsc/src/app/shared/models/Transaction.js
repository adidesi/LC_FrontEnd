import { reject, approve, CREATE } from '../constant';
var Transaction = /** @class */ (function () {
    function Transaction(obj, status, letterId) {
        if (status != undefined || null)
            this.status = status;
        if (obj != undefined || null) {
            if (obj["loc"] != undefined || null)
                this.letterId = obj["loc"];
            if (obj["timestamp"] != undefined || null) {
                this.timestamp = obj["timestamp"];
                this.date = this.timestamp.split('T')[0];
                this.time = this.timestamp.split('T')[1].split('\.')[0];
            }
            if (status == reject) {
                if (obj["closeReason"] != undefined || null)
                    this.closeReason = obj["closeReason"];
            }
            else if (status == approve) {
                if (obj["approvingParty"] != undefined || null) {
                    this.approvingParty = obj["approvingParty"].split('#')[1];
                }
            }
            else if (status == CREATE) {
                this.approvingParty = obj["applicant"].split('#')[1];
            }
        }
        if (letterId != undefined || null)
            this.letterId = letterId;
    }
    ;
    return Transaction;
}());
export { Transaction };
//# sourceMappingURL=Transaction.js.map