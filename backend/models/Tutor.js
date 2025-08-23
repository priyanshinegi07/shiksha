const mongoose = require("mongoose");
const tutorSchema = new mongoose.Schema({
    name : {
        type : String, 
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
    experienceYears: {
        type: Number, 
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    subjects: {
        type: [String],
        required: true
    },

    
}, { timestamps: true });

module.exports = mongoose.model("Tutor", tutorSchema);