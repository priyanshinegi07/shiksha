const express = require("express");
const router = express.Router();
const studentModel = require("../models/student");
const auth = require("../middlewares/auth");
const User = require("../models/User");
const mongoose = require("mongoose")

router.get("/", async (req, res) => {
  try {
    const students = await studentModel.find({});
    res.json(students);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error fetching data: ${err}`);
  }
});

// router.get("/me", auth, async (req, res) => {
//   try {
//     const student = await studentModel.findOne({ createdBy: req.user.id });
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.json(student);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching student details" });
//   }
// });
// router.patch("/me", auth, async (req, res) => {
//   try {
//     const updatedStudent = await studentModel.findOneAndUpdate(
//       { createdBy: req.user.id },
//       { $set: req.body },
//       { new: true }
//     );

//     if (!updatedStudent) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.json({
//       message: "Details updated successfully",
//       student: updatedStudent,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating student details" });
//   }
// });

router.get("/:id",  async (req, res) => {
  try {
    const stud = await studentModel.findById(req.params.id);
    if (!stud) return res.status(404).json({ message: "Student not found" });
    res.json(stud);
  } catch (err) {
    res.status(500).send(`Error fetching data: ${err}`);
  }
});
router.get("/:id/edit",  async (req, res) => {
  try {
    console.log("insdie edit")
    // const user = await User.findById(req.params.id);
    // console.log(user)
    const stud = await studentModel.findOne({ createdBy: req.params.id });
    console.log("stud", stud);
    console.log("insdie edit2")
    console.log("stud", stud)
    if (!stud) return res.status(404).json({ message: "Student not found" });
    console.log("insdie edit3")
    res.json(stud);
    console.log(stud)
  } catch (err) {
    console.log("err", err)
    res.status(500).send(`Error fetching data: ${err}`);
  }
});


router.post("/", auth, async (req, res) => {
  console.log("student post req");
  try {
    const userData = await User.findById(req.user.id);
    if (!userData)
      return res.status(404).json({ message: "Error finding user" });

    const { classLevel, subject, feePerHour, mode, location, contactInfo } = req.body;
    const newStudent = await studentModel.create({
      name: userData.name,
      classLevel,
      subject,
      feePerHour,
      mode,
      location,
      contactInfo,
      createdBy: req.user.id,
    });

    console.log("student details saved");
    return res.status(201).json({
      message: "Student added successfully",
      student: newStudent,
    });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Error adding student", error: err.message });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    // const { id } = req.params;
    // const updatedStudent = await studentModel.findOneAndUpdate(
    //   { createdBy: id },
    //   { $set: req.body },
    //   { new: true }
    // );

    // if (!updatedStudent) {
    //   return res.status(404).json({ message: "Student not found" });
    // }

    // res.json({
    //   message: "Details updated successfully",
    //   student: updatedStudent,
    // });
    const { id } = req.params;
    const s = await studentModel.findOne({ createdBy: id });
    console.log("S", s)
    // const student = await studentModel.findById(req.params.id);
      if (!s) return res.status(404).json({ message: "student not found" });
    
    
    // const updatedStudent = await studentModel.findByIdAndUpdate(
    //       id,
    //       { $set: req.body },
    //       { new: true }
    //     );
    console.log("req.body", req.body)
    const updatedStudent = await studentModel.findOneAndUpdate(
          { createdBy: id },
          { $set: req.body },
          { new: true }
        );
        console.log("new details")
        res.json({
      message: "details updated",
      tutor: updatedStudent,
    });
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error updating student details" });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const student = await studentModel.findOne({ createdBy: req.user.id });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student details" });
  }
});

// Update logged-in student's details
router.patch("/me", auth, async (req, res) => {
  try {
    const updatedStudent = await studentModel.findOneAndUpdate(
      { createdBy: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Details updated successfully", student: updatedStudent });
  } catch (err) {
    res.status(500).json({ message: "Error updating student details" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    await studentModel.findOneAndDelete({ createdBy: id });
    await User.findByIdAndDelete(id);
    

    res.json({ message: "Student account deleted successfully" });
  } catch (err) {
    console.log(err)
    console.log("account deleted")
    res.status(500).send("Error deleting student");
  }
});

module.exports = router;
