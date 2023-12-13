const {ShopifyStoreManager}		= require('./ShopifyStoreManager');
const {SnappyOrder}				= require('./SnappyOrder');
const {SnappyProduct}	 		= require('./SnappyProduct');


class SnappyStore{
	constructor(storeManager){
		this._storeManager = storeManager; //This can be improved by removing the default store manager and adding different managers for different external websites
		this._snappyOrders = []; //this can also be modified so as it is in each external webstoreManager instead of all here
	};

	async addOrderToStore(orderNumber){
		const snappyOrder = await this._storeManager.getSnappyOrder(orderNumber);
		if (this._snappyOrders.includes(await snappyOrder)){return}; //validates if order already exist in the array
		this._snappyOrders.push(snappyOrder);
	};

	async getOrderPrice(orderId){
		const 	order = await this.getOrderById(orderId);
		let 	orderPrice = 0;
		order.getProducts().forEach(
			function(snappyProduct){
				orderPrice = orderPrice + snappyProduct.getBulkPrice();
			}
		);

		return orderPrice;
	};

	async getOrderById(id){ //This gets an order that was added previously. It also updates it just in case it has changed. If the order isn't in the array, it returns the order WITHOUT adding it
		let order= this._snappyOrders.find(
			function(snappyOrder){
				return snappyOrder.getId()==id;
			}
		);

		if (order!=undefined){
			let position = this._snappyOrders.findIndex(
				function(snappyOrder){
					return snappyOrder.getId()==id;
				}
			);
			order= await this._updateOrder(position);
		}
		else{
			order= await this._storeManager.getSnappyOrderById(id);
		}

		return order;
	};

	async _updateOrder(position){
		let id= this._snappyOrders[position].getId();
		this._snappyOrders[position]= await this._storeManager.getSnappyOrderById(id) || this._snappyOrders[position];
		return await this._snappyOrders[position];
	};



	
};

module.exports = {
    SnappyStore
};