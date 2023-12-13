class Message{
	constructor(sender,text,dateTime){
		this._sender=sender; 
		// con el json provisto no hay forma de saber si hay más de una persona con el mismo nombre
		// asumo que personas con el mismo nombre usarán modificadores como carlota01 o carlota777, siendo el sender un username irrepetible
		this._text=text;
		this._dateTime=dateTime;
	};

	getSender(){
		return this._sender;
	};

	getText(){
		return this._text;
	};

	getDateTime(){
		return this._dateTime;
	};

}

module.exports = {
    Message
};