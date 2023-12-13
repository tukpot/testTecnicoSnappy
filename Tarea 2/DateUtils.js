class DateUtils{
	static formatMiliseconds(ms){
		let seconds = Math.floor(ms/1000);
		let minutes = Math.floor(seconds/60);
		let hours	= Math.floor(minutes/60);
		const days	= Math.floor(hours/24);

		// Remainders from each conversion
		hours	= hours % 24;
		minutes = minutes % 60; 
		seconds = seconds % 60;
		const  miliseconds= ms % 1000;

		return {
			days:			days,
			hours: 			hours,
			minutes: 		minutes,
			second: 		seconds,
			miliseconds: 	miliseconds
		}
	}

};

module.exports = {
    DateUtils
};

