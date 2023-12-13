class Credentials{
    constructor(username,password){
        this._username=   username;
        this._password=   password;
    };

    getBasicAuthorization(){
        let authorization='Basic '+ btoa(this._username+":"+this._password);
		return authorization;
    }
};

module.exports = {
    Credentials
};

