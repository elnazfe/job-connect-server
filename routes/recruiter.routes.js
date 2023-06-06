const router = require("express").Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Recruiter = require("../models/Recruiter.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST /api/jobs ROUTE that Creates a new job
router.post("/recruiter/addresume", isAuthenticated, async (req, res) => {
  const { title, employerName, jobPosition, description, notes, user, column } =
    req.body;

  try {
    let response = await Job.create({
      title,
      employerName,
      jobPosition,
      description,
      notes,
      user: user._id,
      column,
    });

    await User.findByIdAndUpdate(user._id, {
      $push: { recieved: response._id },
    });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// GET /api/jobs ROUTE that Lists the Jobs
router.get("/employer", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.payload;

    let allEmployers = await Recruiter.find({ user: _id });

    res.json(allEmployers);
  } catch (error) {
    res.json(error);
  }
});

// GET /api/jobs/:jobId to display specific info of a Job
router.get("/employer/:employerId", isAuthenticated, async (req, res) => {
  const { employerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(employerId)) {
    // status of 2xx is successful.
    // error with 4xx is client-side.
    // error with 5xx is server-side
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  try {
    let foundEmployer = await Recruiter.findById(employerId);
    res.status(200).json(foundEmployer);
  } catch (error) {
    res.json(error);
  }
});

// PUT /api/jobs/:jobId to update info of a Job
router.put("/employer/:employerId", isAuthenticated, async (req, res) => {
  const { employerId } = req.params;
  const { title, employerName, jobPosition, description, notes, column } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(employerId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  try {
    let updatedEmployer = await Recruiter.findByIdAndUpdate(
        employerId,
      { title, employerName, jobPosition, description, notes, column },
      { new: true }
    );
    res.json(updatedEmployer);
  } catch (error) {
    res.json(error);
  }
});

// PUT /api/jobs/:jobId to delete a Job
router.delete("/employer/:employerId", isAuthenticated, async (req, res) => {
  const { employerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(employerId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  try {
    await Recruiter.findByIdAndRemove(employerId);
    res.json({ message: `Recruiter with ${employerId} is removed.` });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

