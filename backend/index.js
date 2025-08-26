require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const uri = process.env.MONGO_URL;
const cors = require("cors");

mongoose.connect(uri)
.then(() => console.log("connected to db successfully"))
.catch((err) => console.log(`error connecting to db ${err}`))
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true 
}));

//so that express can read json format data from request body
app.use(express.json());
//for reading form data
app.use(express.urlencoded({extended:true}));
const studentRoutes = require("./routes/student");
const tutorRoutes = require("./routes/tutor");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

app.use("/students", studentRoutes)
app.use("/tutors", tutorRoutes)
app.use(authRoutes)
app.use(userRoutes)

app.listen((PORT), () => {
    console.log(`server is running at port ${PORT}`);
})