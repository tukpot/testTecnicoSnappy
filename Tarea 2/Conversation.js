const {Message}			= require('./Message');
const {DateUtils}			= require('./DateUtils');

class Conversation{
	constructor(){
		this._messages= [];
	};

	addMessage(message){
		this._messages.push(message);
	};

	getMessages(){
		let result= this._messages.map(
			function(message){
				return {
					sender: 	message.getSender(),
					text:		message.getText(),
					dateTime:	message.getDateTime()
				}
			}
		);
		return result;
	};

	getAmountOfInteractionsByParticipant(){
		if (!this.getMessages) {return null};
		
		const messagesCopy = [].concat(this.getMessages()); //This creates a copy of the array that I use without modifying the original one
		messagesCopy.sort((a, b) => a.sender.localeCompare(b.sender)); //sorting by name eases control break by message sender

		const interactionsByParticipant = [];
				
		//Control break 
		let lastUser= {
			userName: messagesCopy[0].sender,
			interactions: 0
		};

		messagesCopy.forEach(message => {
			if (message.sender!=lastUser.userName){
				interactionsByParticipant.push(lastUser);
				lastUser={ //resets last user value for new user
					userName: message.sender,
					interactions: 1
				}
			}
			else{
				lastUser.interactions++;
			}
		});
		interactionsByParticipant.push(lastUser); //pushes the last user to talk

		return interactionsByParticipant;
	};

	getMessage(index,sortByDate){
		let messages = (this.getMessages());
		if (sortByDate){
			messages= [].concat(messages);
			messages.sort(
				function(a, b){ 
					return a.dateTime.localeCompare(b.dateTime)
				}
			);
		};

		return messages[index];
	};

	getLastMessageSent(){
		return this.getMessage(this.getMessages().length-1,true);
	};

	getFirstMessageSent(){
		return this.getMessage(0,true);
	}

	getDuration(){
		let 	minDate = new Date(this.getFirstMessageSent().dateTime);
		let 	maxDate = new Date(this.getLastMessageSent().dateTime);
		let		messageDate;

		// this.getMessages().forEach(
		// 	function (message){
		// 		messageDate = new Date(message.getDateTime());
		// 		if (messageDate < minDate){
		// 			minDate = messageDate;
		// 		}
		// 		else if (messageDate > maxDate){
		// 			maxDate = messageDate;
		// 		}
		// 	}
		// )
		return DateUtils.formatMiliseconds(maxDate-minDate);
	};

}

module.exports = {
    Conversation
};