const {Conversation}			= require('./Conversation');
const {Message}					= require('./Message');





const snappyTask2ProvidedMessages = [
	{
	  "sender": "carlota",
	  "text": "hola amigo",
	  "dateTime": "2016-03-09T08:19:22.860968"
	},
	{
	  "sender": "carlota",
	  "text": "gracias por la invitacion pero no quiero arruinar nuestra amistad",
	  "dateTime": "2016-03-09T08:30:04.860968"
	},
	{
	  "sender": "pepito",
	  "text": "bye",
	  "dateTime": "2016-03-09T08:31:50.860968"
	},
	{
	  "sender": "carlota",
	  "text": "ok bye",
	  "dateTime": "2016-03-09T08:31:35.860968"
	},
	{
	  "sender": "pepito",
	  "text": "como estas?",
	  "dateTime": "2016-03-09T08:20:23.860968"
	},
	{
	  "sender": "pepito",
	  "text": "bien bien, queria invitarte a salir a tomar algo",
	  "dateTime": "2016-03-09T08:21:20.860968"
	},
	{
	  "sender": "carlota",
	  "text": "bien vos?",
	  "dateTime": "2016-03-09T08:20:50.860968"
	},
	{
	  "sender": "pepito",
	  "text": "bueno entonces dejemos de ser amigos :)",
	  "dateTime": "2016-03-09T08:31:20.860968"
	},
	{
	  "sender": "pepito",
	  "text": "hola",
	  "dateTime": "2016-03-09T08:18:20.860968"
	}
  ]; //Aclaración: le añadí manualmente las comas faltantes entre cada campo. No sé si la idea del task era también formatearlos para que respeten un formato json tradicional
  
let friendZoneConversation = new Conversation();
snappyTask2ProvidedMessages.forEach(
	function (message){
		newMessage= new Message(message.sender,message.text,message.dateTime);
		friendZoneConversation.addMessage(newMessage);
	}
);


console.log('a) Último mensaje de la conversación (en orden cronológico):');
console.log(friendZoneConversation.getLastMessageSent());
console.log('');


console.log('b) Cantidad de interacciones por involucrado:');
friendZoneConversation.getAmountOfInteractionsByParticipant().forEach(
	(e)=>(console.log(e))
);
console.log('');
console.log('c) Duración de la conversación:');
console.log(friendZoneConversation.getDuration()); //Este método tiene también otra forma con una complejidad O(n) menor, pero usé esta forma aprovechando las funciones ya creadas :-)


/*
VALIDAR SOLICITUD HTTP
Añadir tests
Revisar "privacidad" de las clases
Considerar versión de mejor complejidad algorítmica para "duración de la conversación"
Añadir comentario que explique por qué no hago sort directo en la conversación
considerar añadir persona (probablemente no porque es mucho laburo)

*/