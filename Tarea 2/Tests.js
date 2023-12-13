const {Conversation}			= require('./Conversation');
const {Message}					= require('./Message');



function testGetAmountOfInteractionsByUser(){
	snappyTask2ProvidedMessages = [
		{
		  "sender": "pepe",
		  "text": "a",
		  "dateTime": "2016-03-09T08:19:22.860968"
		},
		{
		  "sender": "EteSech",
		  "text": "a",
		  "dateTime": "2016-03-09T08:30:04.860968"
		},
		{
		  "sender": "pepe",
		  "text": "a",
		  "dateTime": "2016-03-09T08:31:50.860968"
		},
		{
		  "sender": "tilin",
		  "text": "a",
		  "dateTime": "2016-03-09T08:31:35.860968"
		},
		{
		  "sender": "javier",
		  "text": "a",
		  "dateTime": "2016-03-09T08:20:23.860968"
		},
		{
		  "sender": "jorge",
		  "text": "a",
		  "dateTime": "2016-03-09T08:21:20.860968"
		},
		{
		  "sender": "coquiArgento",
		  "text": "a",
		  "dateTime": "2016-03-09T08:20:50.860968"
		},
		{
		  "sender": "marvin",
		  "text": "a",
		  "dateTime": "2016-03-09T08:31:20.860968"
		},
		{
		  "sender": "pepe",
		  "text": "a",
		  "dateTime": "2016-03-09T08:18:20.860968"
		}
	];
	let testConversation = new Conversation();
	let sum = 0;
	let result = false;

	snappyTask2ProvidedMessages.forEach(
		function (message){
			newMessage= new Message(message.sender,message.text,message.dateTime);
			testConversation.addMessage(newMessage);
		}
	);
	testConversation.getAmountOfInteractionsByParticipant().forEach(
		function(item){
			sum = sum + item.interactions;
		}
	);
	if (sum == 9){
		result = true;
	};

	return result;
};

function testDifferenceBetweenDates(){
	snappyTask2ProvidedMessages = [
		{
		  "sender": "Pepe",
		  "text": "a",
		  "dateTime": "2016-03-09T08:19:22.860968"
		},
		{
		  "sender": "EteSech",
		  "text": "a",
		  "dateTime": "2016-03-10T08:30:04.860968"
		}
	];
	let testConversation = new Conversation();
	let result = false;
	let duration;

	snappyTask2ProvidedMessages.forEach(
		function (message){
			newMessage= new Message(message.sender,message.text,message.dateTime);
			testConversation.addMessage(newMessage);
		}
	);

	duration= testConversation.getDuration();

	if ((duration.days==1) && (duration.hours==0) && (duration.minutes==10) && (duration.second==42) && (duration.miliseconds==0)){
		result= true;
	};

	return result;
}

function testGetLastMessageSent(){
	snappyTask2ProvidedMessages = [
		{
		  "sender": "Pepe",
		  "text": "a",
		  "dateTime": "2016-03-09T08:19:22.860968"
		},
		{
		  "sender": "EteSech",
		  "text": "este es el último mensaje",
		  "dateTime": "2016-03-10T08:30:04.860968"
		}
	];
	let testConversation = new Conversation();
	let result = false;

	snappyTask2ProvidedMessages.forEach(
		function (message){
			newMessage= new Message(message.sender,message.text,message.dateTime);
			testConversation.addMessage(newMessage);
		}
	);

	if (testConversation.getLastMessageSent().text=="este es el último mensaje"){
		result= true;
	}

	return result;
}

//Se pueden añadir más tests pero estos son los más básicos
function testAll(){
	console.log('Test: testGetAmountOfInteractionsByUser Passed:',testGetAmountOfInteractionsByUser(),'\n');

	console.log('Test: testDifferenceBetweenDates Passed:',testDifferenceBetweenDates(),'\n');

	console.log('Test: testGetLastMessageSent Passed:',testGetLastMessageSent(),'\n')
};

testAll();