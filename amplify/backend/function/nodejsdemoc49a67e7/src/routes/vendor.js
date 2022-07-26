const router = require('express').Router();
const Modeles = require('../models')
const { checkIfFieldsPresent, generateNewPassword,comparePassword } = require('../helpers/helperFunctions');
const { prerequest } = require('../middlewares.js/prerequest');
const ModelConsts = require('../models/modelConsts')
const Jwt = require("jsonwebtoken");
const models = require('../models');
const Sequelize = require('sequelize');
const { jwtprivatekey } = require('../helpers/constants');
const { verifyToken } = require('../middlewares.js/authentication');
// 8c02ba45-f8d8-48cb-bdad-52c49add2818

const Op = Sequelize.Op;


Modeles.vendor_customer.belongsTo(Modeles.users, {
    foreignKey: "vc_customer_id",
    targetKey: "ur_id",
    as: "customers"
});


router.post("/login",async function(req,res){
    try {
            console.log(req.body)
            let usersdata = await Modeles.users.findOne({where : {ur_email : req.body.ur_email,ur_type : '1'}})
            if(usersdata){ 

                let checkPassword = await comparePassword(req.body.ur_password, usersdata.ur_password)

                if(!checkPassword) {await res.json({msg : 'password not match'})}
                let tokenData ={
                    ur_type : '2',
                    ur_id : usersdata.ur_id
                }

                let token = await Jwt.sign(tokenData, jwtprivatekey);

                res.json({customer:usersdata,token})
            }else {

                await res.json({msg : "user not present"})
            }
    } catch (error) {
        res.json(error.errors)
    }
})

router.get("/", async function (req,res){
    try {
        let vendors = await Modeles.users.findAll({where : {ur_type : '1',ur_isDeleted:'0'}})
        await res.json({  vendors: vendors  })
    } catch (error) {
        res.json({err : error.errors})
    }
})

router.get("/:venderId", async function (req, res) {
    try {

        let usersdata = await Modeles.users.findOne({
            where: {
                ur_id: req.params.venderId, ur_type: '1',
            }
        })
        let data = await Modeles.vendor_customer.findAll({ where: { vc_vendor_id: req.params.venderId } })
        let customers =  await data.map(user => user.dataValues.vc_customer_id)
        let customerData = await Modeles.users.findAll({
            where : { ur_id: { [Op.in] : customers} }
        })
        console.log(customers)
        await res.json({ vendor: usersdata  , customers : customerData })
    } catch (error) {
        res.json(error.errors)
    }
})

router.get("/own/info", verifyToken, async function (req, res) {
    try {

        let usersdata = await Modeles.users.findOne({
            where: {
                ur_id: req.credentials.ur_id, ur_type: '1',
            }
        })
        let data = await Modeles.vendor_customer.findAll({ where: { vc_vendor_id: req.credentials.ur_id } })
        let customers =  await data.map(user => user.dataValues.vc_customer_id)
        let customerData = await Modeles.users.findAll({
            where : { ur_id: { [Op.in] : customers} }
        })
        await res.json({  vendor: usersdata  , customers : customerData })
    } catch (error) {
        res.json(error.errors)
    }
})

router.post("/", async function (req, res) {
    try {
        
    if (req.body.ur_password) {
        req.body.ur_password = await generateNewPassword(req.body.ur_password)
    }
    req.body.ur_type = '1'
    console.log(req.body)
    let vendor = await Modeles.users.create(req.body)
    console.log('--- user added')
    res.json({ success: vendor })
    } catch (error) {
        res.json({err : error.errors})
    }
})


router.put("/:vendorId", async function (req, res) {
    try {
        
    if (req.body.ur_password) {
        req.body.ur_password = await generateNewPassword(req.body.ur_password)
    }
    console.log(req.body, "=== updated")
    let vendor = await Modeles.users.update(req.body,{where : { ur_id : req.params.vendorId}})
    res.json({ success: vendor })
    } catch (error) {
        res.json({err : error.errors})
    }
})

router.delete("/:vendorId", async function (req, res) {
    let usersdata = await Modeles.users.update({ur_isDeleted : '1'},{where : {ur_id : req.params.vendorId}})
    res.json({success : 'deleted users',user : usersdata})
})








module.exports = router;