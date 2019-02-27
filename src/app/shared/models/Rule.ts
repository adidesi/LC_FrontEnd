export class Rule {
    private ruleId: string;
    private ruleText: string;
    constructor(obj?: any) {
        if (obj != undefined || null) {
            if (obj["ruleId"] != undefined || null)
                this.ruleId = obj["ruleId"];
            if (obj["ruleText"] != undefined || null)
                this.ruleText = obj["ruleText"];
        }
        else{
            this.ruleId='2';
            this.ruleText='';
        }
    }
}