const express = require("express");
const router = express.Router();

const donationController = require("../controllers/donationController");


// Upload donation photo
//router.post("/upload", donationController.upload);
router.get("/getPhoto", donationController.getPhoto);

//post 
router.post("/createDonationDetails", donationController.createDonationDetails);
router.post("/deleteDonationDetails", donationController.deleteDonationDetails);
router.post("/createDonationDetailsInDeleteList", donationController.createDonationDetailsInDeleteList);
router.post("/updateContactManInDonation", donationController.updateContactManInDonation);
router.post("/updateAssociation", donationController.updateAssociation);
router.post("/updateDonationDetails", donationController.updateDonationDetails);
router.post("/updateDonationCount", donationController.updateDonationCount);
router.post("/updateDonationCollect", donationController.updateDonationCollect);
router.post("/updateDonationNotCollect", donationController.updateDonationNotCollect);

//get
router.get("/getDonationCount",donationController.getDonationCount);
router.get("/getAllDonation", donationController.getAllDonation);
router.get("/getAllDeleteDonation", donationController.getAllDeleteDonation);
router.get("/getAllDeleteDonationByAssociation", donationController.getAllDeleteDonationByAssociation);
router.get("/getDonationItems", donationController.getDonationItems);
router.get("/getDonationDetailsContactMan", donationController.getDonationDetailsContactMan);
router.get("/getDonationDetails", donationController.getDonationDetails);
router.get("/getDonationDetailsByCityAndType", donationController.getDonationDetailsByCityAndType);
router.get("/getDonationItemsByEmailAndNumberAndType", donationController.getDonationItemsByEmailAndNumberAndType);
router.get("/getAllCityByType", donationController.getAllCityByType);

//router.get("/getContactManDonation", donationController.getContactManDonation);


module.exports = router;
