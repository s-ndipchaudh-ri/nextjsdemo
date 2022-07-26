const { checkIfFieldsPresent } = require("../helpers/helperFunctions");

const prerequest = (req,res,next) => {
    try {
        if(req.query['fields']){
            // unable to convert field query into array
            let modelName = req.baseUrl.split('/')
                let fieldName = req.query['fields'];
                JSON.stringify(fieldName)
                console.log(fieldName)
                console.log(typeof(fieldName))
                console.log(Array.isArray(fieldName))
                if(checkIfFieldsPresent(req.query['fields'],modelName[1])){
                    next()
                }else 
                {
                    res.json({field : 'wrong field'})
                } 
            
        }

    next()
    } catch (error) {
        
    }
}

module.exports = {
    prerequest : prerequest
}