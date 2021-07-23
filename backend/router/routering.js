const express = require("express");
require("../db/conn");
const cors = require("cors");
const student = require("../models/students");
const app = express();
const router = new express.Router();
router.post("/student", async(req, res) => {
    try {
        const newstudent = await new student(req.body)
        console.log("Data" + newstudent);
        newstudent.save().then(() => {
            res.status(201).send(newstudent);
            console.log('catched');
        }).catch((e) => {
            console.log(e);
            res.status(404).send(e);
        })
    } catch (e) {
        console.log(e);
    }
})
router.get("/student", async(req, res) => {
    const newdata = await student.find();
    // console.log(newdata);
    res.send(newdata);
})
router.patch("/student/:email", async(req, res) => {
    const email = req.params.email;
    const newdata = await student.updateOne({ email }, req.body);
    res.send(newdata);
})
router.delete("/student/:id", async(req, res) => {
    const id = req.params.id;
    const name = await student.findByIdAndDelete(id);
    res.send(name);
})
app.use(router);
module.exports = router;