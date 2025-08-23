const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true
    },
    classLevel : {
        type : Number, 
        required : true
    },
    subject : {
        type : [String], 
        required : true
    },
    feePerHour : {
        type : Number, 
        required : true
    },
    mode : {
        type : String,
        enum : ["student_home", "tutor_home", "online"]
    },
    location : {
        type : String, 
        required : true
    },
    contactInfo : {
        type : String,
        required : true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);