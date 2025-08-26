const express = require("express");
const router = express.Router();
const tutorModel = require("../models/Tutor");
const auth = require("../middlewares/auth");
const User = require("../models/User")
const mongoose = require("mongoose")

router.get("/", async (req, res) => {
  try{
    const tutors = await tutorModel.find({});
    res.send(tutors);
  }
  catch(err) {
    console.log(err);
    res.send("error showing tutors", err)
  }
})
//get details of particular tutor
router.get("/:id", async (req, res) => {
  console.log("inside get tutor by id");
  try {
    console.log("inside get tutor by id try");
    const tutor = await tutorModel.findById(req.params.id);
    if (!tutor) return res.status(404).json({ message: "tutor not found" });
    res.json(tutor);
  } catch (err) {
    console.log("inside get tutor by id catch");
    console.log(err);
    res.send(`error fetching data ${err}`);
  }
});

//add a new tutor
router.post("/", auth, async (req, res) => {
  try {
    const userData = await User.findById(req.user.id);
    if (!userData)
      return res.status(404).json({ message: "error finding user" });
    const {
      subjects,
      feePerHour,
      mode,
      location,
      contactInfo,
      experienceYears,
      qualification,
    } = req.body;
    const newtutor = await tutorModel.create({
      subjects,
      name: userData.name,
      feePerHour,
      mode,
      location,
      contactInfo,
      experienceYears,
      qualification,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      message: "tutor added successfully",
      tutor: newtutor,
    });
  } catch (err) {
    console.error("Error adding student:", err);
    res
      .status(500)
      .json({ message: "Error adding student", error: err.message });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const tutor = await tutorModel.findOne({ createdBy: id });
    console.log("tutor", tutor)
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });

    // if (tutor.createdBy.toString() !== req.user.id) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not allowed to update this tutor" });
    // }
    const updatedTutor = await tutorModel.findOneAndUpdate(
      { createdBy: id },
      { $set: req.body },
      { new: true }
    );
    console.log("updated tutor", updatedTutor)
    res.json({
      message: "details updated",
      tutor: updatedTutor,
    });
  } catch (err) {
    console.log("err", err)
    res.send(`error updating data ${err}`);
  }
});

router.get("/:id/edit",  async (req, res) => {
  try {
    console.log("inside try")
    console.log("insdie edit")
    // const user = await User.findById(req.params.id);
    // console.log(user)
    const tut = await tutorModel.findOne({createdBy:req.params.id});
    // console.log("insdie edit2")
    // console.log("stud", stud)
    console.log("tut", tut)
    if (!tut) return res.status(404).json({ message: "tutor not found" });
    console.log("insdie edit3")
    res.json(tut);
    // console.log(tut)
    
  } catch (err) {
    console.log("err", err)
    res.status(500).send(`Error fetching data: ${err}`);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
     await tutorModel.findOneAndDelete({ createdBy: id });

    await User.findByIdAndDelete(id);
    console.log("account deleted")

    res.json({ message: "Tutor account deleted successfully" });
  } catch (err) {
    console.log(err)
    console.log("account deleted err")
    res.send("error deleting tutor");
  }
});

module.exports = router;
