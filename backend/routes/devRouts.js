const express = require("express")
const router = express.Router()
const devController = require("../controllers/devController")


router.route("/").get(devController.getDev).post(devController.postDev)
router.route("/:id").put(devController.putDev).delete(devController.deleteDev)



module.exports = router