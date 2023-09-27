const express = require("express");

const router = express.Router();

const userRentPropertycontrollers = require("../controllers/userRentPropertyController");

router.get("/userRentProperty", userRentPropertycontrollers.browse);
router.get("/userRentProperty/:id", userRentPropertycontrollers.read);
router.put("/userRentProperty/:id", userRentPropertycontrollers.edit);
router.post("/userRentProperty", userRentPropertycontrollers.add);
router.delete("/userRentProperty/:id", userRentPropertycontrollers.destroy);

module.exports = router;
