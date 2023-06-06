const router = require("express").Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Recruiter = require("../models/Recruiter.model");

// const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST /api/ ROUTE that Creates a new employee
router.post("/recruiter/add", async (req, res) => {
  const { employeeName, jobPosition, description, notes} =
    req.body;

  try {
    let response = await Recruiter.create({
      jobPosition,
      employeeName,
      description,
      notes,
    });

   /*  await User.findByIdAndUpdate(user._id, {
      $push: { column: response._id },
    }); */
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// GET /api/ ROUTE that Lists the Employees
router.get("/recruiter", async (req, res) => {
  try {
    /* const { _id } = req.payload; */

    let allEmployees = await Recruiter.find();
    res.json(allEmployees);

  } catch (error) {
    res.json(error);
  }
});

// GET to display specific info of an employee
router.get("/recruiter/:employeeId", async (req, res) => {
  const { employeeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    // status of 2xx is successful.
    // error with 4xx is client-side.
    // error with 5xx is server-side
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  try {
    let foundEmployee = await Recruiter.findById(employeeId);
    res.status(200).json(foundEmployee);
  } catch (error) {
    res.json(error);
  }
});

// PUT /api/ to update info of an Employee
router.put("/recruiter/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  const { title, employeeName, jobPosition, description, notes, column } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  try {
    let updatedEmployee = await Recruiter.findByIdAndUpdate(
        employeeId,
      { title, employeeName, jobPosition, description, notes, column },
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    res.json(error);
  }
});

// Delete to delete an Employee
router.delete("/recruiter/:employeeId", async (req, res) => {
  const { employeeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  try {
    await Recruiter.findByIdAndRemove(employeeId);
    res.json({ message: `Recruiter with ${employeeId} is removed.` });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

