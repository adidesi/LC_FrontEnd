export class ProductDetails {
    private productType: string;
    private quantity: string;
    private pricePerUnit:string;
    constructor(obj:any,productType?: string){
        if(obj!=undefined||null){
            if(obj["productType"]!=undefined||null)
                this.productType=obj["productType"];
            if(obj["quantity"]!=undefined||null)
                this.quantity=obj["quantity"];
            if(obj["pricePerUnit"]!=undefined||null)
            this.pricePerUnit=obj["pricePerUnit"];
        }
        if(productType!=undefined||null)
            this.productType = productType;  
    };
    setQuantity(quantity: string) {
        this.quantity = quantity;
    }
    setPricePerUnit(pricePerUnit: string) {
        this.pricePerUnit = pricePerUnit;
    }
    getProductType() {
        return this.productType;
    }
    getQuantity() {
        return this.quantity;
    }
    getPricePerUnit() {
        return this.pricePerUnit;
    }

}