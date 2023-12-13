const {SnappyProduct}			= require('./SnappyProduct');



class SnappyOrder{

	constructor(id,status){ 
		this._id=				id;
		this._status=			status;
		this._snappyProducts=	[];
	};

	getSubTotal(){
		let subTotal = 0;
		this._snappyProducts.forEach(
			function(snappyProduct){
				subTotal = subTotal + snappyProduct.getBulkPrice();
			}
		);
		return subTotal;
	};

	addProduct(snappyProduct){
		this._snappyProducts.push(snappyProduct);
	};


	getProducts(){
		return this._snappyProducts;
	};

	getId(){
		return this._id;
	};

	getStatus(){
		return this._status;
	}


	

	


};

module.exports = {
    SnappyOrder
};