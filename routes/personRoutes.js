const express = require("express");
const router = express.Router();
const Person = require("./../models/person");
const mongoose = require("mongoose"); // Import mongoose for ObjectId validation

// Post multiple persons
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Expecting an array of person objects
    // Use insertMany for bulk insert
    const response = await Person.insertMany(data);
    console.log("Data saved");
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all persons
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a person by work type
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (["chef", "manager", "waiter"].includes(workType)) {
      const response = await Person.findOne({ work: workType });
      if (!response) {
        return res.status(404).json({ error: "Person with the specified work type not found" });
      }
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT update a person by ID
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(personId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const updatedPerson = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    
    console.log("Data updated");
    res.status(200).json(updatedPerson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete('/:id', async(req, res)=>{
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json({ error: 'Person not found'});
    }
    console.log('data deleted successfully');
    res.status(200).json({message:'person Deleted Successfully'})
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
module.exports = router;
