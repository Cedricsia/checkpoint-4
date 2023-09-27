const express = require("express");

const router = express.Router();

const propertycontrollers = require("../controllers/propertyControllers");

router.get("/property", propertycontrollers.browse);
router.get("/property/:id", propertycontrollers.read);
router.put("/property/:id", propertycontrollers.edit);
router.post("/property", propertycontrollers.add);
router.delete("/property/:id", propertycontrollers.destroy);

module.exports = router;
