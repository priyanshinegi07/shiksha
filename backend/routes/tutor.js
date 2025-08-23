const express = require("express");
const router = express.Router();
const tutorModel = require("../models/Tutor");
const auth = require("../middlewares/auth")

//get details of particular student
router.get("/tutors/:id", auth, async (req, res) => {
    try {
        const tutor = await tutorModel.findById(req.params.id);
        if(!tutor) return res.status(404).json({ message: "tutor not found" });
        res.json(tutor);
    }
    catch(err) {
        res.send(`error fetching data ${err}`);
    }
})

//add a new tutor
router.post("/tutors", auth, async (req, res) => {
    try{
        const {name, subjects, feePerHour, mode, location, contactInfo, experienceYears, qualification} = req.body;
        const newtutor = await tutorModel.create({name, subjects, feePerHour, mode, location, contactInfo, experienceYears, qualification, createdBy: req.user.id});
         
        return res.status(201).json({
        message: "tutor added successfully",
        tutor: newtutor
        });
    }
    catch(err) {
        res.send(`error adding tutor ${err}`)
    }
})

router.patch("/tutors/:id", auth, async (req, res) => {
    try{
        const id = req.params.id;
        const tutor = await tutorModel.findById(req.params.id);
        if (!tutor) return res.status(404).json({ message: "Tutor not found" });

        if (tutor.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not allowed to update this tutor" });
        }
        const updatedTutor = await tutorModel.findByIdAndUpdate(
            id,
            {$set : req.body},
            {new : true}
        )
        
        res.json({
            message : "details updated",
            tutor : updatedTutor
        })
    }
    catch(err) {
        res.send(`error updating data ${err}`)
    }
})

router.delete("/tutors/:id",auth, async (req, res) => {
    try{
        const id = req.params.id;
        const tutor = tutor.findById(id);
        if (!tutor) return res.status(404).json({ message: "Tutor not found" });

        if (tutor.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not allowed to delete this tutor" });
        }
        await tutor.deleteOne();
        res.send("tutor deleted");
    }
    catch(err) {
        res.send("error deleting tutor");
    }

})

module.exports = router;