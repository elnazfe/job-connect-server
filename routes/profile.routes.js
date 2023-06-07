const router = require("express").Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const fileUploader = require("../config/cloudinary.config");

router.get("/profile", async (req, res) => {
  const { id } = req.params;

  try {
    const userProfile = await User.find();

    res.status(200).json(userProfile);
  } catch (error) {
    console.log(error);
  }
});

router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userProfile = await User.findById(id);

    res.status(200).json(userProfile);
  } catch (error) {
    console.log(error);
  }
});

router.put("/profile/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, profileImg, address } = req.body;

  try {
    const updateProfile = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        profileImg,
        address,
      },
      { new: true }
    );

    res.status(200).json(updateProfile);
  } catch (error) {
    console.log(error);
  }
});

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary
router.post("/upload", fileUploader.single("profileImg"), (req, res, next) => {
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  res.json({ fileUrl: req.file.path });
});

module.exports = router;
