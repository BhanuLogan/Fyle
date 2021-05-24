const express = require("express");
const { getDBInstance } = require("../database");
const router = express.Router();

router.get("/", async (req, res, next) => {
    req.query.q = req.query.q || "";
    const data = { $or : [
         {branch : { $regex : `${req.query.q}`, $options : "i"}},
         {address : { $regex : `${req.query.q}`, $options : "i"}},
         {city : { $regex : `${req.query.q}`, $options : "i"}},
         {district : { $regex : `${req.query.q}`, $options : "i"}},
         {bank : { $regex : `${req.query.q}`, $options : "i"}},
         {branch : { $regex : `${req.query.q}`, $options : "i"}}
    ]};
    
    const banks = await getBanks(data, req);
    
    return res.status(200).send(banks);
});

router.get("/autocomplete", async (req, res, next) => {
    req.query.q = req.query.q || "";
    const data = { branch : { $regex : `${req.query.q}`, $options : "i" }};
    
    const banks = await getBanks(data, req);
    return res.status(200).send(banks);
});

const getBanks = async (dataObj, req) => {
    const page = req.query.offset * 1 || 0;
    const limit = req.query.limit * 1 || 5;
    //console.log(req.query);
    const skips = page * limit;
    const database = getDBInstance();
    const cursor = database.db("Fyle").collection("banks").find(dataObj, { projection: { _id : 0 }}).sort({ "ifsc" : 1}).skip(skips).limit(limit);
    const banks = await cursor.toArray();
    
    return banks;
}

module.exports = router;