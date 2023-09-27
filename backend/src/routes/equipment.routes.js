const express = require("express");

const router = express.Router();

const equipmentcontrollers = require("../controllers/equipmentControllers");

router.get("/equipment", equipmentcontrollers.browse);
router.get("/equipment/:id", equipmentcontrollers.read);
router.put("/equipment/:id", equipmentcontrollers.edit);
router.post("/equipment", equipmentcontrollers.add);
router.delete("/equipment/:id", equipmentcontrollers.destroy);

module.exports = router;
