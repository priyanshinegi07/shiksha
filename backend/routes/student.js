const express = require("express");
const router = express.Router();
const studentModel = require("../models/student");
const auth = require("../middlewares/auth")

//get details of particular student
router.get("/students/:id",auth, async (req, res) => {
    try {
        const stud = await studentModel.findById(req.params.id);
        if(!stud) return res.status(404).json({ message: "Student not found" });
        res.json(stud);
    }
    catch(err) {
        res.send(`error fetching data ${err}`);
    }
})

//add a new student
router.post("/students", auth, async (req, res) => {
    try{
        const {name, classLevel, subject, feePerHour, mode, location, contactInfo} = req.body;
        const newStudent = await studentModel.create({name, classLevel, subject, feePerHour, mode, location, contactInfo, createdBy: req.user.id});
         
        return res.status(201).json({
        message: "Student added successfully",
        student: newStudent
        });
    }
    catch(err) {
        res.send(`error adding student ${err}`)
    }
})

router.patch("/students/:id", auth, async (req, res) => {
    try{
        const id = req.params.id;
        const student = await studentModel.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        if (student.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not allowed to update this student" });
        }
        const updatedStud = await studentModel.findByIdAndUpdate(
            id,
            {$set : req.body},
            {new : true}
        )
        
        res.json({
            message : "details updated",
            student : updatedStud
        })
    }
    catch(err) {
        res.send(`error updating data ${err}`)
    }
})

router.delete("/students/:id", auth, async (req, res) => {
    try{
        const student = await studentModel.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        if (student.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not allowed to delete this student" });
        }

        await student.deleteOne();
        res.json({ message: "Student deleted" });

    }
    catch(err) {
        res.send("error deleting student");
    }

})

module.exports = router;