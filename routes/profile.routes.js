const router = require("express").Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware")

router.get("/profile/:id", async(req,res)=>{
    const {id} = req.params;

    try{
        const userProfile = await User.findById(id)
        .populate("firstName")
        .populate("lastName")
        .populate("userType")
        .populate("profileImg")
    

    res.status(200).json(userProfile);

    } catch(error) {
        console.log(error);
    }

})

router.put("/profile/:id", isAuthenticated, async (req,res) =>{
    const {id} = req.params;
    const { firstName, lastName, profileImg, address } = req.body;

    try{
        const updateProfile = await User.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                profileImg,
                address,
            },
            { new : true }
        );

        res.status(200).json(updateProfile);
    } catch (error){
        console.log(error);
    }
})

module.exports = router;