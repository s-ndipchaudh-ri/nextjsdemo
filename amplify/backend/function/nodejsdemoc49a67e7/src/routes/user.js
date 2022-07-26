const router = require('express').Router();
const Modeles = require('../models')
const { checkIfFieldsPresent, generateNewPassword,comparePassword } = require('../helpers/helperFunctions');
const {prerequest} = require('../middlewares.js/prerequest');
const ModelConsts = require('../models/modelConsts')
const Jwt = require("jsonwebtoken");
const models = require('../models');
const constants = require('../helpers/constants');

// 8c02ba45-f8d8-48cb-bdad-52c49add2818


// router.get("/:userId", async function (req, res) {
//     let usersdata = await Modeles.users.findOne({where : {ur_id : req.params.userId}})
//     res.json({success : 'get one users',user : usersdata})
// })

// router.post("/", async function (req, res) {
//     if(req.body.ur_password) {
//         req.body.ur_password = await generateNewPassword(req.body.ur_password)
//     }
//     console.log(req.body)
//     let user = await Modeles.users.create(req.body)
//     res.json({success : user})
// })

// router.put("/:userId", async function (req, res) {
//     if(req.body.ur_password) {
//         req.body.ur_password = await generateNewPassword(req.body.ur_password)
//     }
//     let usersdata = await Modeles.users.update(req.body,{where : {ur_id : req.params.userId}})
//     res.json({success : 'update users',user : usersdata})
// })

// router.delete("/:userId", async function (req, res) {
//     let usersdata = await Modeles.users.update({ur_isDeleted : '1'},{where : {ur_id : req.params.userId}})
//     res.json({success : 'deleted users',user : usersdata})
// })


router.post("/login",async function(req,res){
    try {
            console.log(req.body)
            let usersdata = await Modeles.users.findOne({where : {ur_email : req.body.ur_email}})
            if(usersdata){ 
                console.log("----- step 1")
                let checkPassword = await comparePassword(req.body.ur_password, usersdata.ur_password)
                console.log("----- step 2")
                if(!checkPassword) {await res.json({msg : 'password not match'})}
                let tokenData ={
                    ur_type : usersdata.ur_type,
                    ur_id : usersdata.ur_id
                }

                let token = await Jwt.sign(tokenData, constants.jwtprivatekey);
                console.log("----- step 3")
                res.json({user_data:usersdata,user_type: usersdata.ur_type})
            }else {

                await res.json({msg : "user not present"})
            }
    } catch (error) {
        res.json(error.errors)
    }
})




module.exports = router;