const express = require("express");
//const { validate } = require("./validation");
const router = express.Router();

const userController = require("../controllers/userController");

//post
router.post("/loginUser", userController.loginUser);
router.post("/createUser", userController.createUser);
router.post("/deleteUser", userController.deleteUser);
router.post("/updateUser", userController.updateUser);


//get
router.get("/displayUser", userController.displayUser);
router.get("/getUsers", userController.getUsers);
router.get("/getUsersByType", userController.getUsersByType);
router.get("/getAssociationSelectByCityAndType", userController.getAssociationSelectByCityAndType);
router.get("/getAssociationSelectByType", userController.getAssociationSelectByType);

// router.post("/forgotPassword", userController.forgotPassword);
// router.post("/resetPassword", userController.resetPassword);
// router.get("/resetPasswordTokenAndEmail/:email/:token", userController.resetPasswordTokenAndEmail);


module.exports = router;
