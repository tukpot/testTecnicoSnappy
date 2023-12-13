const {Credentials}				= require('./Credentials');
const {ShopifyStoreManager}		= require('./ShopifyStoreManager');
const {SnappyProduct}			= require('./SnappyProduct');
const {SnappyOrder}				= require('./SnappyOrder');
const {SnappyStore}				= require('./SnappyStore');


async function testGetShopifyOrderWithOkOrderNumber(){
	let snappyStoreLink=	'https://snappy-commerce.myshopify.com';
	let credentials= 		new Credentials('d28cda300f5517794e044ff353002339','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');
	let shopifyStore= 		new ShopifyStoreManager(credentials,snappyStoreLink);
	let orderResult;
	let testResult = false;

	orderResult=	await shopifyStore.getShopifyOrder(1001);

	if (orderResult?.id == 3931575124020){ //Comparisson to with Id obtained via Insomnia
		testResult= true;
	}

	return testResult
};

async function testGetShopifyOrderWithInexistentOrderNumber(){
	let snappyStoreLink=	'https://snappy-commerce.myshopify.com';
	let credentials= 		new Credentials('d28cda300f5517794e044ff353002339','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');
	let shopifyStore= 		new ShopifyStoreManager(credentials,snappyStoreLink);
	let orderResult;
	let testResult = false;

	orderResult=	await shopifyStore.getShopifyOrder(69420);

	if (orderResult == null){
		testResult= true;
	}

	return testResult

};

async function testGetShopifyOrderWithFaultyURL(){
	try{
	let snappyStoreLink=	'https://elPepeEteSech.com';
	let credentials= 		new Credentials('d28cda300f5517794e044ff353002339','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');
	let shopifyStore= 		new ShopifyStoreManager(credentials,snappyStoreLink);
	let orderResult;
	orderResult=	await shopifyStore.getShopifyOrder(1001);
	}
	catch (error){
		if (error?.message=='fetch failed'){
			return true;
		}

	}

	return false
};

async function testGetShopifyOrderWithWrongUsername(){
	try{
	let snappyStoreLink=	'https://snappy-commerce.myshopify.com';
	let credentials= 		new Credentials('HOLAAAAA','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');
	let shopifyStore= 		new ShopifyStoreManager(credentials,snappyStoreLink);
	let orderResult;
	orderResult=	await shopifyStore.getShopifyOrder(1001);
	}
	catch (error){
		if (error?.message=='[API] Invalid Username provided for Basic Auth API access'){
			return true;
		}

	}

	return false
};

async function testGetOrderStatus(){
	let snappyStoreLink=	'https://snappy-commerce.myshopify.com';
	let credentials= 		new Credentials('d28cda300f5517794e044ff353002339','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');
	let shopifyStore= 		new ShopifyStoreManager(credentials,snappyStoreLink);
	let result = false;

	let orderStatus = (await shopifyStore.getSnappyOrder(1001)).getStatus();
	if (orderStatus == 'paid'){
		result = true;
	};

	return result;
};

async function testGetShopifyOrderById(){
	let snappyStoreLink=	'https://snappy-commerce.myshopify.com';
	let credentials= 		new Credentials('d28cda300f5517794e044ff353002339','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');
	let shopifyStore= 		new ShopifyStoreManager(credentials,snappyStoreLink);
	let result = false;

	let order= await shopifyStore.getShopifyOrderById(3931575124020);

	if (await order?.id == 3931575124020){
		result = true;
	};

	return result;
};

async function testGetShopifyOrderWithFaultyId(){
	let snappyStoreLink=	'https://snappy-commerce.myshopify.com';
	let credentials= 		new Credentials('d28cda300f5517794e044ff353002339','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');
	let shopifyStore= 		new ShopifyStoreManager(credentials,snappyStoreLink);
	let result = false;

	try{
	let order= await shopifyStore.getShopifyOrderById(69420);
	}
	catch(error){
		if (error.message=='Not Found'){
			result= true;
		}
	}

	return result;
};

async function testAddOrderToStore(){
	let snappyStoreLink=	'https://snappy-commerce.myshopify.com';
	let credentials= 		new Credentials('d28cda300f5517794e044ff353002339','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');
	let shopifyStore= 		new ShopifyStoreManager(credentials,snappyStoreLink);
	let snappyStore=		new SnappyStore(shopifyStore);
	let result=				false;

	await snappyStore.addOrderToStore(1001);

	if (snappyStore._snappyOrders.length==1){
		result=true;
	};
	return result;
};

async function testGetSubTotalOrderPrice(){ //This doesn't take into account taxes since it is calculated using the products in the array
	let snappyStoreLink=	'https://snappy-commerce.myshopify.com';
	let credentials= 		new Credentials('d28cda300f5517794e044ff353002339','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');
	let shopifyStore= 		new ShopifyStoreManager(credentials,snappyStoreLink);
	let result = false;

	let order= await shopifyStore.getSnappyOrderById(3931575124020);
	if (await order?.getSubTotal() == 6.0){
		result = true;
	};
	return result;

};

function testSubTotalWith2Products(){
	let snappyOrder= new SnappyOrder(123,"estado de prueba");
	let snappyProduct1= new SnappyProduct(69,'ascending shadow',69,1);
	let snappyProduct2= new SnappyProduct(420,'Moreno shadow',420,1);
	let result= false;
	snappyOrder.addProduct(snappyProduct1);
	snappyOrder.addProduct(snappyProduct2);
	let subTotal= snappyOrder.getSubTotal();
	if (subTotal==489){
		result = true;
	};
	return result;
};

async function testSnappyStoreGetOrderByIdWithIdInArray(){
	let snappyStoreLink=	'https://snappy-commerce.myshopify.com';
	let credentials= 		new Credentials('d28cda300f5517794e044ff353002339','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');
	let shopifyStore= 		new ShopifyStoreManager(credentials,snappyStoreLink);
	let snappyStore=		new SnappyStore(shopifyStore);
	let result=				false;

	await snappyStore.addOrderToStore(1001);
	let order = await snappyStore.getOrderById(3931575124020);
	if (await order?.getId()==3931575124020){
		result = true;
	}
	return result;

};

async function testSnappyStoreGetOrderByIdWithoutIdInArray(){
	let snappyStoreLink=	'https://snappy-commerce.myshopify.com';
	let credentials= 		new Credentials('d28cda300f5517794e044ff353002339','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');
	let shopifyStore= 		new ShopifyStoreManager(credentials,snappyStoreLink);
	let snappyStore=		new SnappyStore(shopifyStore);
	let result=				false;

	let order = await snappyStore.getOrderById(3931575124020);
	if (await order?.getId()==3931575124020){
		result = true;
	}
	return result;

};


//Se pueden hacer muchos más tests pero estos son los que me resultaron más importantes en el desarrollo
function testAll(){
	testGetShopifyOrderWithOkOrderNumber().then((result)=>console.log('Test: testGetShopifyOrderWithOkOrderNumber Passed:',result,'\n'));
	
	testGetShopifyOrderWithInexistentOrderNumber().then((result)=>console.log('Test: testGetShopifyOrderWithInexistentOrderNumber Passed:',result,'\n'));

	testGetShopifyOrderWithFaultyURL().then((result)=>console.log('Test: testGetShopifyOrderWithFaultyURL Passed:',result,'\n'));

	testGetShopifyOrderWithWrongUsername().then((result)=>console.log('Test: testGetShopifyOrderWithWrongUsername Passed:',result,'\n'));

	testGetOrderStatus().then((result)=>console.log('Test: testGetOrderStatus Passed:',result,'\n'));

	testGetShopifyOrderById().then((result)=>console.log('Test: testGetShopifyOrderById Passed:',result,'\n'));

	testGetShopifyOrderWithFaultyId().then((result)=>console.log('Test: testGetShopifyOrderWithFaultyId Passed:',result,'\n'));

	testGetSubTotalOrderPrice().then((result)=>console.log('Test: testGetSubTotalOrderPrice Passed:',result,'\n'));

	testAddOrderToStore().then((result)=>console.log('Test: testAddOrderToStore Passed:',result,'\n'));

	testSnappyStoreGetOrderByIdWithIdInArray().then((result)=>console.log('Test: testSnappyStoreGetOrderByIdWithIdInArray Passed:',result,'\n'));

	testSnappyStoreGetOrderByIdWithoutIdInArray().then((result)=>console.log('Test: testSnappyStoreGetOrderByIdWithoutIdInArray Passed:',result,'\n'));

	console.log('Test: testSubTotalWith2Products Passed:',testSubTotalWith2Products(),'\n');
}

testAll();