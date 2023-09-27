const express = require("express");

const router = express.Router();

const usercontrollers = require("../controllers/userControllers");

router.get("/user", usercontrollers.browse);
router.get("/user/:id", usercontrollers.read);
router.put("/user/:id", usercontrollers.edit);
router.post("/user", usercontrollers.add);
router.delete("/user/:id", usercontrollers.destroy);

module.exports = router;
