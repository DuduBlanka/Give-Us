const express = require("express");
const router = express.Router();

const SettingsUserController = require("../controllers/settingsUserController");

//POST
router.post("/updateNotification", SettingsUserController.updateNotification);


module.exports = router;
