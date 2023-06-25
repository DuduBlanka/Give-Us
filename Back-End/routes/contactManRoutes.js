const express = require('express');
const router = express.Router();
const contactManController = require('../controllers/contactManController');

//post
// Create new contact man
router.post('/createContactMan', contactManController.createContactMan);
// Delete contact man
router.post('/deleteContactMan', contactManController.deleteContactMan);
// Update contact man
router.post('/updateContactMan', contactManController.updateContactMan);


//get
// Display contact man on screen
router.get('/displayContactMan', contactManController.displayContactMan);
// Show all selected contact men
router.get('/contactManSelect', contactManController.contactManSelect);
// Show all contact men
router.get('/getContactMan', contactManController.getContactMan);
// Show all contact men
router.get('/getContactManName', contactManController.getContactManName);
router.get('/getAllContactMan', contactManController.getAllContactMan);



module.exports = router;
