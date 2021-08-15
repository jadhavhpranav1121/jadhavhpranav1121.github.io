const express = require("express");
require("../db/conn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const customer = require("../models/customer");
const { consoleTestResultHandler } = require("tslint/lib/test");
const app = express();
const router = new express.Router();

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject
    next();
}
router.post("/customer", async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.Pass, salt);
        req.body.Pass = hashedPassword;
        const newcustomer = await new customer(req.body)
        newcustomer.save((error, registeredUser) => {
            if (error) {
                console.log(error);
            } else {
                let payload = { subject: registeredUser._id };
                let token = jwt.sign(payload, 'secretKey');
                console.log(token);
                res.status(200).send({ token });
                console.log('catched');
            }
        });
    } catch (e) {
        console.log(e);
    }
})


router.post("/customer/auth", async(req, res) => {
    let userData = req.body;

    customer.findOne({ "email": userData.email }, async(error, user) => {

        if (error) {
            console.log(error);
        } else {

            if (!user) {
                res.status(401).send('invalid email');
            } else {
                console.log(userData.password, user.Pass);
                const isMatch = await bcrypt.compare(userData.password, user.Pass);
                if (isMatch == false) {
                    res.status(401).send('Invalid Password')
                } else {
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({ token });
                }
            }
        }
    });

    // res.send({ token });
})
router.get("/customer", async(req, res) => {
    const newdata = await customer.find();
    // console.log(newdata);
    res.send(newdata);
})
router.patch("/customer/:email", verifyToken, async(req, res) => {
    const email = req.params.email;
    const newdata = await customer.updateOne({ email }, req.body);
    res.send(newdata);
})
router.delete("/customer/:id", verifyToken, async(req, res) => {
    const id = req.params.id;
    const name = await customer.findByIdAndDelete(id);
    res.send(name);
})
app.use(router);
module.exports = router;