const router = require("express").Router();
const mongoose = require('mongoose')

/* const User = require("../models/User.model"); */
const Job = require("../models/Job.model") 
/* const Dashborad = require("../models/Dashboard.model") */

const { isAuthenticated } = require("../middleware/jwt.middleware");


// POST /api/jobs ROUTE that Creates a new job
router.post('/jobs/addjob', async (req,res)=>{
    const {title, companyName, jobURL, description, status, notes} = req.body;

    try{
        let response = await Job.create(
            {title, companyName, jobURL, description, status, notes}
            );
        res.json(response);
    }
    catch(error){
        res.json(error);
    }
});

// GET /api/jobs ROUTE that Lists the Jobs
router.get('/jobs', async(req,res)=>{
    try{
        let allJobs = await Job.find()
        res.json(allJobs);
    }
    catch(error){
        res.json(error);
    }
});

// GET /api/jobs/:jobId to display specific info of a Job
router.get('/jobs/:jobId', async (req,res)=>{
    const {jobId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(jobId)){
        // status of 2xx is successful.
        // error with 4xx is client-side.
        // error with 5xx is server-side 
        res.status(400).json({message: 'Specified id is not valid'});
        return;
    }
    try{
        let foundJob = await Job.findById(jobId)
        res.status(200).json(foundJob);
    }
    catch(error){
        res.json(error);
    }
});


// PUT /api/jobs/:jobId to update info of a Job

router.put('/jobs/:jobId', async (req, res)=>{
    const {jobId} = req.params;
    const {title, companyName, jobURL, description, status, notes} = req.body;

    if(!mongoose.Types.ObjectId.isValid(jobId)){
       res.status(400).json({message: 'Specified Id is not valid'}); 
       return; 
    }

    try{
        let updatedJob = await Job.findByIdAndUpdate(jobId, 
        {title, companyName, jobURL, description, status, notes}, {new: true});
        res.json(updatedJob);
    }
    catch(error){
        res.json(error);
    }
});


// PUT /api/jobs/:jobId to delete a Job
router.delete('/jobs/:jobId', async(req,res)=>{
    const {jobId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(jobId)){
        res.status(400).json({message: 'Specified Id is not valid'}); 
        return; 
    }

    try{
        await Job.findByIdAndRemove(jobId);
        res.json({message: `Job with ${jobId} is removed.`})
    }
    catch(error){
        res.json(error);
    }
});

module.exports = router; 