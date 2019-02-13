export class ProductDetails {
    private productType: string;
    private quantity: string;
    private pricePerUnit: string;
    constructor(obj?: any, productType?: string) {
        if (obj != undefined || null) {
            this.productType = (obj["productType"] != undefined || null) ? obj["productType"] : '';
            this.quantity = (obj["quantity"] != undefined || null) ? obj["quantity"] : '';
            this.pricePerUnit = (obj["pricePerUnit"] != undefined || null) ? obj["pricePerUnit"] : ''
        } else {
            this.pricePerUnit = '';
            this.productType = '';
            this.quantity = '';
        }
        if (productType != undefined || null)
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