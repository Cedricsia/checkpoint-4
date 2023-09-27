const express = require("express");

const router = express.Router();

const propertyEquipmentControllers = require("../controllers/propertyEquipmentControllers");

router.get("/property-equipment", propertyEquipmentControllers.browse);
router.get("/property-equipment/:id", propertyEquipmentControllers.read);
router.put("/property-equipment/:id", propertyEquipmentControllers.edit);
router.post("/property-equipment", propertyEquipmentControllers.add);
router.delete("/property-equipment/:id", propertyEquipmentControllers.destroy);

module.exports = router;
