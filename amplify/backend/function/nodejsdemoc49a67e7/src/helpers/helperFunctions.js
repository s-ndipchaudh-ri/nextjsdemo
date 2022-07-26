
const ModelConsts = require('../models/modelConsts')
const bcrypt = require("bcryptjs");
const SaltSounds = 10;

module.exports = {
    checkIfFieldsPresent :  function (fieldArray,modelName){
        // console.log(Array.isArray(fieldArray))
        let data =  (fieldArray.every(col => ModelConsts[modelName].columns.includes(col))) 
        return  data;
    },
    generateNewPassword: async (text) => {
		var hash = await bcrypt.hashSync(text, SaltSounds);
		return hash;
	},
    comparePassword: async (text, hash) => {
		var hash = await bcrypt.compare(text, hash);
		return hash;
	},

}