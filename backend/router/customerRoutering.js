const express = require("express");
require("../db/conn");
const cors = require("cors");
const customer = require("../models/customer");
const app = express();
const router = new express.Router();
router.post("/customer", async(req, res) => {
    try {
        const newcustomer = await new customer(req.body)
        console.log("Data" + newcustomer);
        newcustomer.save().then(() => {
            res.status(201).send(newcustomer);
            console.log('catched');
        }).catch((e) => {
            console.log(e);
            res.status(404).send(e);
        })
    } catch (e) {
        console.log(e);
    }
})
router.get("/customer", async(req, res) => {
    const newdata = await customer.find();
    // console.log(newdata);
    res.send(newdata);
})
router.patch("/customer/:email", async(req, res) => {
    const email = req.params.email;
    const newdata = await customer.updateOne({ email }, req.body);
    res.send(newdata);
})
router.delete("/customer/:id", async(req, res) => {
    const id = req.params.id;
    const name = await customer.findByIdAndDelete(id);
    res.send(name);
})
app.use(router);
module.exports = router;