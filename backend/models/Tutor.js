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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

    
}, { timestamps: true });

module.exports = mongoose.model("Tutor", tutorSchema);

[
  {
    name: "Rohit Sharma",
    feePerHour: 500,
    mode: "online",
    location: "Delhi",
    contactInfo: "rohit@example.com",
    experienceYears: 3,
    qualification: "B.Ed",
    subjects: ["Math", "Physics"],
    createdBy: new mongoose.Types.ObjectId() // replace with actual User ID
  },
  {
    name: "Sneha Verma",
    feePerHour: 400,
    mode: "student_home",
    location: "Mumbai",
    contactInfo: "sneha@example.com",
    experienceYears: 5,
    qualification: "M.Sc",
    subjects: ["Chemistry", "Biology"],
    createdBy: new mongoose.Types.ObjectId()
  },
  {
    name: "Amit Kumar",
    feePerHour: 600,
    mode: "tutor_home",
    location: "Bengaluru",
    contactInfo: "amit@example.com",
    experienceYears: 7,
    qualification: "PhD",
    subjects: ["Computer Science", "Math"],
    createdBy: new mongoose.Types.ObjectId()
  },
  {
    name: "Priya Singh",
    feePerHour: 450,
    mode: "online",
    location: "Kolkata",
    contactInfo: "priya@example.com",
    experienceYears: 4,
    qualification: "M.A",
    subjects: ["English", "History"],
    createdBy: new mongoose.Types.ObjectId()
  },
  {
    name: "Vikram Joshi",
    feePerHour: 550,
    mode: "student_home",
    location: "Chennai",
    contactInfo: "vikram@example.com",
    experienceYears: 6,
    qualification: "M.Sc",
    subjects: ["Physics", "Chemistry"],
    createdBy: new mongoose.Types.ObjectId()
  }
]
