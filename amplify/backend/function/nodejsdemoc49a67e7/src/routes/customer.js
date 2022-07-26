const router = require('express').Router();
const Modeles = require('../models')
const { checkIfFieldsPresent, generateNewPassword ,comparePassword} = require('../helpers/helperFunctions');
const {prerequest} = require('../middlewares.js/prerequest');
const ModelConsts = require('../models/modelConsts')
const Jwt = require("jsonwebtoken");
const constants = require('../helpers/constants');
const { verifyToken } = require('../middlewares.js/authentication');
const moment = require('moment')

// 8c02ba45-f8d8-48cb-bdad-52c49add2818
// 6910206b-3cf8-4cc4-a302-d9c68247de0e



router.post("/login",async function(req,res){
    try {
            console.log(req.body)
            let usersdata = await Modeles.users.findOne({where : {ur_email : req.body.ur_email,ur_type : '2'}})
            if(usersdata){ 
                let checkPassword = await comparePassword(req.body.ur_password, usersdata.ur_password)
                if(!checkPassword) {await res.json({msg : 'password not match'})}
                let tokenData ={
                    ur_type : '2',
                    ur_id : usersdata.ur_id
                }
                let token = await Jwt.sign(tokenData, constants.jwtprivatekey);

                res.json({customer:usersdata,token})
            }else {

                await res.json({msg : "user not present"})
            }
    } catch (error) {
        res.json(error.errors)
    }
})

router.get("/", async function (req, res) {
    try {
        
    let usersdata = await Modeles.users.findAll({where : {ur_type : '2',ur_isDeleted : '0'}})
    await res.json({customer : usersdata, time : moment()})
    } catch (error) {
        res.json(error.errors)
    }
})


router.get("/own/info", verifyToken, async function (req, res) {
    try {
    let usersdata = await Modeles.users.findOne({where : {ur_id : req.credentials.ur_id,ur_type : '2'}})
    let forms =  await Modeles.customerform.findAll({where : {cf_customer_id : req.credentials.ur_id}})
    res.json({customer : usersdata,forms})
    } catch (error) {
        res.json(error.errors)
    }
})


router.get("/:customerId", async function (req, res) {
    try {
        
    let usersdata = await Modeles.users.findOne({where : {ur_id : req.params.customerId}})
    let forms =  await Modeles.customerform.findAll({where : {cf_customer_id : req.params.customerId}})
    let vendorId = await Modeles.vendor_customer.findOne({where : {cf_customer_id : req.params.customerId}})
    let vendorData = await Modeles.users.users.findOne({where : {ur_id : req.params.customerId}})

    res.json({success : 'get one users',customer : usersdata,forms,vendor : vendorData})
    } catch (error) {
        res.json(error.errors)
    }
})


router.post("/", async function (req, res) {
    try {
     
    if(!req.body["cs_vn_id"]){
        res.json({msg : 'vendor not present'})
    }
    if(req.body.ur_password) {
        req.body.ur_password = await generateNewPassword(req.body.ur_password)
    }
    req.body.ur_type = '2'
    console.log("------ step 1")
    let customer = await Modeles.users.create(req.body) // <------

    console.log("------ step 2")
    console.log(customer.dataValues.ur_id)
    let vc_relation = {}
    vc_relation.vc_vendor_id =  await req.body.cs_vn_id;
    vc_relation.vc_customer_id =  await customer.ur_id
    console.log(vc_relation)

    await Modeles.vendor_customer.create(vc_relation)
    res.json({success : customer})
       
} catch (error) {
    
}
})

router.post('/customerform/:customerId',async function (req,res){
    try {
        req.body.cf_customer_id = await req.params.customerId
        let data = await Modeles.customerform.create(req.body)
        res.json(data)
    } catch (error) {
        res.json(error.errors)
    }
})

router.put('/customerform/:formId',async function (req,res){
    try {
        let data = await Modeles.customerform.update(req.body,{where : {cf_id : req.params.formId}})
        res.json({form : data})
    } catch (error) {
        res.json(error.errors)
    }
})


router.get('/customerform/:formId',async function (req,res){
    try {
        let data = await Modeles.customerform.findOne({where : {cf_id : req.params.formId}})
        res.json({form : data})
    } catch (error) {
        res.json(error.errors)
    }
})

router.get('/:customerId/allform',async function (req,res){
    try {
        // req.body.cf_customer_id = await req.params.customerId
        let data = await Modeles.customerform.findAll({where : {cf_customer_id : req.params.customerId}})
        res.json(data)
    } catch (error) {
        res.json(error.errors)
    }
})


// router.put('/customerform/:customerId',async function (req,res){
//     try {
//         req.body.cf_customer_id = await req.params.customerId
//         let data = await Modeles.customerform.create(req.body,{where : {cf_customer_id : req.params.customerId}})
//         res.json(data)
//     } catch (error) {
//         res.json(error.errors)
//     }
// })

router.put("/:customerId", async function (req, res) {
    try {
        if(req.body.ur_password) {
            req.body.ur_password = await generateNewPassword(req.body.ur_password)
        }
        let usersdata = await Modeles.users.update(req.body,{where : {ur_id : req.params.customerId}})
        res.json({success : 'update users',user : usersdata})
    } catch (error) {
        res.json(error.errors)
    }
  
})

router.delete("/:customerId", async function (req, res) {
    try {
        
    let usersdata = await Modeles.users.update({ur_isDeleted : '1'},{where : {ur_id : req.params.customerId}})
    res.json({success : 'deleted users',user : usersdata})
    } catch (error) {
        res.json(error.errors)
    }
})




module.exports = router;