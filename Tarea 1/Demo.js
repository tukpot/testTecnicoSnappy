const { Credentials } = require('./Credentials');
const { ShopifyStoreManager } = require('./ShopifyStoreManager');
const { SnappyProduct } = require('./SnappyProduct');
const { SnappyOrder } = require('./SnappyOrder');
const { SnappyStore } = require('./SnappyStore');


/*
Intro
A) Done
B) Done

Objetos
A) Done
B) Done
*/

//C)
async function puntoC(orderNumber) { //ACLARACIÓN, ACÁ LO PARSEO TAMBIÉN PARA PODER USAR EL MÉTODO getStatus() (que es más limpio que andar buscando campos en la orden de shopify)
	let snappyStoreLink = 'https://snappy-commerce.myshopify.com';
	let credentials = new Credentials('d28cda300f5517794e044ff353002339', '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');
	let shopifyStore = new ShopifyStoreManager(credentials, snappyStoreLink);
	let testResult = false;

	let orderResult = await shopifyStore.getSnappyOrder(orderNumber);
	let orderStatus = await orderResult.getStatus();
	console.log('Estado de la orden obtenida con el orderNumber propuesto es: ', orderStatus);
};
// puntoC(1001); //DESCOMENTAR PARA PROBAR


//D)
async function puntoD(orderNumber) {
	let snappyStoreLink = 'https://snappy-commerce.myshopify.com';
	let credentials = new Credentials('d28cda300f5517794e044ff353002339', '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');
	let shopifyStore = new ShopifyStoreManager(credentials, snappyStoreLink);
	let testResult = false;

	let orderResult = await shopifyStore.getShopifyOrder(orderNumber);
	let snappyOrder = ShopifyStoreManager._parseShopifyOrderToSnappyOrder(orderResult);
	//La línea de arriba es un método de clase (no es 100% prolijo para orientado a objetos), pero como es en realidad una función "privada", no está tan fuera de lugar (sino habría que hacer alguna cosa más complicada en este caso para un line_item.toSnappyProduct)
	console.log('Orden obtenida con el orderNumber propuesto y ya parseada:');
	console.log('Id: ', snappyOrder.getId());
	console.log('Status: ', snappyOrder.getStatus());
	console.log('SnappyProducts: ');
	snappyOrder.getProducts().forEach((snappyProduct) => console.log(snappyProduct));
};
// puntoD(1001); //DESCOMENTAR PARA PROBAR


//E) ACLARACIÓN: Si uso el ID de SnappyOrder para este ejercicio y accedo a sus productos para calcular el total, no se puede calcular el total con impuestos, ya que SnappyProduct tiene el precio sin impuestos.
//Por lo mencionado, está la versión con impuestos usando un SnappyOrder (calculando suma de snappyProducts) y otro con impuestos (directo de la orden de shopify), directo en la función puntoDTaxIncluded

async function puntoETaxFree(orderId) {
	let snappyStoreLink = 'https://snappy-commerce.myshopify.com';
	let credentials = new Credentials('d28cda300f5517794e044ff353002339', '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');
	let shopifyStore = new ShopifyStoreManager(credentials, snappyStoreLink);
	let snappyStore = new SnappyStore(shopifyStore);

	let order = await snappyStore.getOrderById(orderId);
	let subTotal = await order.getSubTotal();
	console.log('El monto sin impuestos es de: $', subTotal);
};
// puntoETaxFree(3931575124020); //DESCOMENTAR PARA PROBAR


async function puntoETaxIncluded(orderId) {
	let snappyStoreLink = 'https://snappy-commerce.myshopify.com';
	let credentials = new Credentials('d28cda300f5517794e044ff353002339', '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');
	let shopifyStore = new ShopifyStoreManager(credentials, snappyStoreLink);
	let shopifyOrder = await shopifyStore.getShopifyOrderById(orderId);
	let line_items = await shopifyOrder.line_items;

	let priceWithTaxes = 0;
	line_items.forEach(function (line_item) {
		taxPrice = line_item.tax_lines.reduce((total, currentTax) =>(total + parseFloat(currentTax.price)), 0);
		priceWithTaxes = priceWithTaxes + taxPrice + line_item.price * line_item.quantity;
	})
	console.log('El monto con impuestos es de: $',priceWithTaxes);
}
// puntoETaxIncluded(3931575124020); //DESCOMENTAR PARA PROBAR


