class SnappyProduct{
	constructor(id,name,price,amount){
		this._id=		id;
		this._name=		name;
		this._price=	price;
		this._amount=	amount;
	};

	getUnitPrice(){
		return this._price;
	};

	getAmount(){
		return this._amount;
	};

	getBulkPrice(){
		return this.getAmount() * this.getUnitPrice();
	}




};

module.exports = {
    SnappyProduct
};