const {Credentials} 	= require('./Credentials');
const {SnappyOrder}		= require('./SnappyOrder');
const {SnappyProduct}	= require('./SnappyProduct');

class ShopifyStoreManager{
    constructor(credentials,storeLink){
        this._credentials=	credentials;
        this._storeLink=		storeLink;
    };

	async _getOrders(){
		const headers={
			'Accept': '*/*',
			'Authorization':this._credentials.getBasicAuthorization()
		};
		const options ={
			method: 'GET',
			headers: headers
		};
		const endPointLink=	this._storeLink + '/admin/api/2023-10/orders.json?';

		try {
			let result=			await fetch(endPointLink,options);
			let orders=			await result.json();
			if (await orders?.errors) {throw new Error(orders.errors)};
			orders= orders.orders;
			return orders;
		}
		catch(error){
			throw new Error(error.message);
		};

	};

	async getShopifyOrder(orderNumber){
		const 	orders = await this._getOrders();
		let 	orderSearched = await orders.find(order => order.order_number == orderNumber);
		if (orderSearched==undefined){return null}; //returns null if order with that number doesn't exist
		return orderSearched;
	};

	static _parseShopifyOrderToSnappyOrder(shopifyOrder){
		let snappyOrder=  new SnappyOrder(shopifyOrder.id,shopifyOrder.fullfillment_status || shopifyOrder.financial_status);
		shopifyOrder.line_items.forEach(
			function(line_item){
				let snappyProduct = new SnappyProduct(line_item.id,line_item.name,parseFloat(line_item.price),line_item.quantity);
				snappyOrder.addProduct(snappyProduct);
			}
		);
		return snappyOrder;
	};

	async getSnappyOrder(orderNumber){
		const 	shopifyOrder= await this.getShopifyOrder(orderNumber);
		let snappyOrder = await ShopifyStoreManager._parseShopifyOrderToSnappyOrder(shopifyOrder);
		return snappyOrder;
	};

	async getSnappyOrderById(id){
		const shopifyOrder = await this.getShopifyOrderById(id);
		let snappyOrder = await ShopifyStoreManager._parseShopifyOrderToSnappyOrder(shopifyOrder);
		return snappyOrder

	};

	async getShopifyOrderById(id){
		const headers={
			'Accept': '*/*',
			'Authorization':this._credentials.getBasicAuthorization()
		};
		const options ={
			method: 'GET',
			headers: headers
		};
		const endPointLink=	this._storeLink + `/admin/api/2023-10/orders/${id}.json?;`;

		try {
			let result=			await fetch(endPointLink,options);
			let order=			await result.json();
			if (order?.errors) {throw new Error(order.errors)};
			order=				await order.order;
			return order;
		}
		catch(error){
			throw new Error(error.message);
		};
	}



};

module.exports = {
    ShopifyStoreManager
};