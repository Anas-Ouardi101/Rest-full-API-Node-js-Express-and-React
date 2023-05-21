const express = require("express")
const router = express.Router()
const devController = require("../controllers/devController")
const {protect} = require("../middleware/authMiddleware")

router.route("/").get(protect,devController.getDev).post(protect,devController.postDev)
router.route("/:id").put(protect,devController.putDev).delete(protect,devController.deleteDev)



module.exports = router