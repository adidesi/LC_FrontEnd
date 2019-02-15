var ProductDetails = /** @class */ (function () {
    function ProductDetails(obj, productType) {
        if (obj != undefined || null) {
            this.productType = (obj["productType"] != undefined || null) ? obj["productType"] : '';
            this.quantity = (obj["quantity"] != undefined || null) ? obj["quantity"] : '';
            this.pricePerUnit = (obj["pricePerUnit"] != undefined || null) ? obj["pricePerUnit"] : '';
        }
        else {
            this.pricePerUnit = '';
            this.productType = '';
            this.quantity = '';
        }
        if (productType != undefined || null)
            this.productType = productType;
    }
    ;
    ProductDetails.prototype.setQuantity = function (quantity) {
        this.quantity = quantity;
    };
    ProductDetails.prototype.setPricePerUnit = function (pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    };
    ProductDetails.prototype.getProductType = function () {
        return this.productType;
    };
    ProductDetails.prototype.getQuantity = function () {
        return this.quantity;
    };
    ProductDetails.prototype.getPricePerUnit = function () {
        return this.pricePerUnit;
    };
    return ProductDetails;
}());
export { ProductDetails };
//# sourceMappingURL=ProductDetails.js.map