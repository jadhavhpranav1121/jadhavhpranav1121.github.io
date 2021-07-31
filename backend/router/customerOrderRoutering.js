const express = require("express");
require("../db/conn");
const cors = require("cors");
const admin = require("../models/customerOrder.js");
const app = express();
const router = new express.Router();
router.post("/orders", async(req, res) => {
    try {
        const newadmin = await new admin(req.body)
        console.log("Data" + newadmin);
        newadmin.save().then(() => {
            res.status(201).send(newadmin);
            console.log('catched');
        }).catch((e) => {
            console.log(e);
            res.status(404).send(e);
        })
    } catch (e) {
        console.log(e);
    }
})
router.get("/orders", async(req, res) => {
    const newdata = await admin.find();
    // console.log(newdata);
    res.send(newdata);
})
router.patch("/orders/:name", async(req, res) => {
    const email = req.params.name;
    const newdata = await admin.updateOne({ email }, { $push: { "orders": req.body } });
    res.send(newdata);
})
router.delete("/orders/:id", async(req, res) => {
    const id = req.params.id;
    const name = await admin.findByIdAndDelete(id);
    res.send(name);
})
app.use(router);
module.exports = router;