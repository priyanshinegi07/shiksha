
const mongoose = require("mongoose");
const Student = require("./models/student");
require("dotenv").config();
const students = [{
    name: "Ravi Kumar",
    classLevel: 10,
    subject: "Mathematics",
    feePerHour: 500,
    mode: "online",
    location: "Delhi",
    contactInfo: "9876543210"
  },
  {
    name: "Neha Sharma",
    classLevel: 9,
    subject: "Science",
    feePerHour: 600,
    mode: "student_home",
    location: "Mumbai",
    contactInfo: "9123456789"
  },
  {
    name: "Aditya Singh",
    classLevel: 12,
    subject: "Physics",
    feePerHour: 700,
    mode: "tutor_home",
    location: "Bengaluru",
    contactInfo: "9988776655"
  },
  {
    name: "Priya Patel",
    classLevel: 11,
    subject: "Chemistry",
    feePerHour: 650,
    mode: "online",
    location: "Chennai",
    contactInfo: "9001122334"
  },
  {
    name: "Saurabh Verma",
    classLevel: 8,
    subject: "English",
    feePerHour: 400,
    mode: "student_home",
    location: "Kolkata",
    contactInfo: "9870011223"
  }
]

mongoose.connect(process.env.MONGO_URL)
.then(async () => {
    console.log("connected to db");
    await Student.deleteMany();
    await Student.insertMany(students);
    console.log("seeded students");
    return mongoose.connection.close();
})
.catch(err => console.log(`error seeding ${err}`))