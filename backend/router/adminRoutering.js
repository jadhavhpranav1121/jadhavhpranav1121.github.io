const express = require("express");
require("../db/conn");
const cors = require("cors");
const admin = require("../models/admin");
const app = express();
const router = new express.Router();
router.post("/admin", async(req, res) => {
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
router.get("/admin", async(req, res) => {
    const newdata = await admin.find();
    // console.log(newdata);
    res.send(newdata);
})
router.patch("/admin/:email", async(req, res) => {
    const email = req.params.email;
    const newdata = await admin.updateOne({ email }, req.body);
    res.send(newdata);
})
router.delete("/admin/:id", async(req, res) => {
    const id = req.params.id;
    const name = await admin.findByIdAndDelete(id);
    res.send(name);
})
app.use(router);
module.exports = router;