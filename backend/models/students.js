const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    // _id: Number,
    email: {
        type: String,
        required: true,
        trim: true
    },
    Pass: {
        type: String,
        required: true,
        trim: true
    }
})
const students = new mongoose.model('students', studentSchema);
module.exports = students;