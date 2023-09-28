const express = require("express");

const router = express.Router();

const propertycontrollers = require("../controllers/propertyControllers");
const fileUpload = require("../middlewares/multer");

router.get("/property", propertycontrollers.browse);

router.get("/property/:id", propertycontrollers.search);
router.put("/property/:id", propertycontrollers.edit);
router.post("/property", fileUpload.array("files"), propertycontrollers.add);
router.delete("/property/:id", propertycontrollers.destroy);

module.exports = router;
