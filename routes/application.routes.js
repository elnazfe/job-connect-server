const router = require("express").Router();

const Application = require("../models/Application.model");
const Job = require("../models/Job.model");
const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/application", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.payload;

    let allJobs = await Job.find({
      status: "open",
      user: _id,
    });

    const jobsIds = allJobs.map((a) => a._id.toString());

    let applications = await Application.find({
      job: { $in: jobsIds },
    });

    res.json(applications);
  } catch (error) {
    res.json(error);
  }
});

// POST /api/application ROUTE that Creates a new job application
router.post("/application/apply", isAuthenticated, async (req, res) => {
  const { jobId } = req.body;
  const { _id } = req.payload;

  try {
    let response = await Application.create({
      job: jobId,
      user: _id,
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.put("/application/:applicationId", isAuthenticated, async (req, res) => {
  const { applicationId } = req.params;
  const { notes, column } = req.body;

  try {
    let response = await Application.findByIdAndUpdate(
      applicationId,
      { notes, column },
      { new: true }
    );
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// Route to get the applied jobs on the platform
router.get("/myapplications", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.payload;

    console.log({ _id });
    let allApplications = await Application.find({
      user: _id,
    });

    const response = await Promise.all(
      allApplications.map(async (a) => {
        const user = await User.findById(a.user);
        const job = await Job.findById(a.job);

        return await {
          ...a._doc,
          user,
          job,
        };
      })
    );

    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
