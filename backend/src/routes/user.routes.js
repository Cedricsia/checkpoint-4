const express = require("express");

const router = express.Router();

const usercontrollers = require("../controllers/userControllers");
const fileUpload = require("../middlewares/multer");

router.get("/user", usercontrollers.browse);
router.get("/user/:id", usercontrollers.read);
router.get("/user-all/:id", usercontrollers.searchAllFromUser);
router.put("/user/:id", fileUpload.single("file"), usercontrollers.edit);
router.post("/user", usercontrollers.add);
router.delete("/user/:id", usercontrollers.destroy);

module.exports = router;
