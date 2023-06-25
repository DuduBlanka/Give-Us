const DonationDetailsModal = require("../models/donationDetails");
const NumberOfDonationsModal = require("../models/numberOfDonation");
const DonationDeleteModal = require("../models/donationDeleted");
const DonationPhotoModal = require("../models/donationPhoto");

const UserSettingsModal = require('../models/settingsUser');
const UserModal = require("../models/Users");

const sendEmail = require("../utils/sendEmail");

//const multer = require('multer');

//
exports.getPhoto = async (req, res) => {
  const { num, email } = req.query;
  try {
    const donationPhoto = await DonationPhotoModal.findOne({ num, email });
    if (donationPhoto) {
      res.end(donationPhoto.photo);
    }
    else{
      res.json({message: false});
    }
  } catch (error) {
    console.log("Error retrieving photo:", error);
    res.status(500).json({ error: "Error retrieving photo" });
  }
};

/**************************************************************/
//post
//
exports.createDonationDetails = async (req, res) => {
  const donation = req.body;
  let tempNotification = [];
  //console.log("donation.contactman: " + donation.contactMan);
  try {
    const newDonation = new DonationDetailsModal(donation);
    //console.log("newdonation: " + newDonation);
    await newDonation.save();
    res.json({ message: "Donation created successfully" });
    if (donation.association !== null && donation.type === "Large Organization") {
        const temp = await DonationDetailsModal.findOne({ email: donation.email, num: donation.num });
        const associationUser = await UserModal.findOne({name: temp.association});
        sendEmail(associationUser.email, "A new donation upload", "The organization " + donation.name + " sent you a donation");
    }
    else if(donation.type === "Large Organization"){
        tempNotification = await UserSettingsModal.find({ emailAgree: "YES", type: "Association" });
        for (const associationUserSettings of tempNotification) {
          const associationUser = await UserModal.findOne({ name: associationUserSettings.name });
          console.log("email: ", associationUser.email);
          sendEmail(associationUser.email, "A new donation upload", "The organization " + donation.name + " sent you a donation");
        }  
    }
    else{
      tempNotification = await UserSettingsModal.find({ emailAgree: "YES", type: "Private needy" });
        for (const privateNeedyUserSettings of tempNotification) {
          const privateNeedyUser = await UserModal.findOne({ name: privateNeedyUserSettings.name });
          console.log("email: ", privateNeedyUser.email);
          sendEmail(privateNeedyUser.email, "A new donation upload", "The organization " + donation.name + " posted a donation");
        }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//
exports.deleteDonationDetails = async (req, res) => {
  //const { num, email, association } = req.body;
  const donationDelete = req.body;
  const email = donationDelete.email;
  const num = donationDelete.num;
  //const delivered = donationDelete.delivered;

  try {
    const donation = await DonationDetailsModal.findOne({ email, num });
    if (donation) {
      await DonationDetailsModal.deleteOne({ email, num });
      res.json({ message: "The donation has been successfully deleted" });
      if (donationDelete.association !== null && donationDelete.type === "Large Organization") {
        //const temp = await DonationDetailsModal.findOne({ email: donationDelete.email, num: donationDelete.num });
        console.log("send mail!");
        const associationUser = await UserModal.findOne({name: donationDelete.association});
        console.log("email: ", associationUser.email);
        sendEmail(associationUser.email, "Donation deleted", "The organization " + donation.name + " deleted the donation");
      }
    } else {
      res.json({ message: "Donation not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//
exports.createDonationDetailsInDeleteList = async (req, res) => {
  const donation = req.body;
  try {
    const newDonation = new DonationDeleteModal(donation);
    await newDonation.save();
    res.json({ message: "Donation created in delete list successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//
exports.updateContactManInDonation = async (req, res) => {

  const updatedDonationContactMan = req.body;
  try {
    const donationOld = await DonationDetailsModal.findOne({ email: updatedDonationContactMan.email, num: updatedDonationContactMan.num });
    
    if (donationOld) {
      donationOld.nameOfContact = updatedDonationContactMan.nameOfContact;
      await donationOld.save();
      res.json({ message: "Donation details of contact man updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//
exports.updateAssociation = async (req, res) => {
  const updatedDonationAssociation = req.body;
  let tempNotification = [];

  try {
    const donationOld = await DonationDetailsModal.findOne({ email: updatedDonationAssociation.email, num: updatedDonationAssociation.num });
 
    if (donationOld) {
      donationOld.association = updatedDonationAssociation.association;
      donationOld.status = updatedDonationAssociation.status;
      await donationOld.save();
      console.log("server: Donation details updated successfully");
      console.log("association: ", updatedDonationAssociation.association);
      console.log("association: ", updatedDonationAssociation.type);
      res.json({ message: "Donation details updated successfully" });
      if (updatedDonationAssociation.association !== null && updatedDonationAssociation.type === "Large Organization") {
        console.log("update with association!");
        const temp = await DonationDetailsModal.findOne({ email: updatedDonationAssociation.email, num: updatedDonationAssociation.num });
        const associationUser = await UserModal.findOne({ name: temp.association });
        console.log("email: ", associationUser.email);
        sendEmail(associationUser.email, "The donation has been updated ", "The organization " + updatedDonationAssociation.name + " sent you a new donation");
      } else if (updatedDonationAssociation.type === "Large Organization") {
        console.log("update without association!");
        tempNotification = await UserSettingsModal.find({ emailAgree: "YES", type: "Association" });
        for (const associationUserSettings of tempNotification) {
          const associationUser = await UserModal.findOne({ name: associationUserSettings.name });
          console.log("email: ", associationUser.email);
          sendEmail(associationUser.email, "A new donation upload", "The organization " + updatedDonationAssociation.name + " posted a new donation");
        }
      }
    } else {
      res.status(404).json({ message: "Donation details not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//
exports.updateDonationDetails = async (req, res) => {
  const updatedDonationDetails = req.body;
  let tempNotification = [];
  try {
    const donationOld = await DonationDetailsModal.findOne({
      email: updatedDonationDetails.email,
      num: updatedDonationDetails.num,
    });
    if (donationOld) {
      donationOld.num = updatedDonationDetails.num;
      donationOld.name = updatedDonationDetails.name;
      donationOld.email = updatedDonationDetails.email;
      donationOld.location = updatedDonationDetails.location;
      //donationOld.association = updatedDonationDetails.association;
      //donationOld.status = updatedDonationDetails.status;
      donationOld.date = updatedDonationDetails.date;
      donationOld.createdAt = updatedDonationDetails.createdAt;
      donationOld.type = updatedDonationDetails.type;
      donationOld.numItems = updatedDonationDetails.numItems;
      donationOld.food = updatedDonationDetails.food;
      //donationOld.nameOfContact = updatedDonationDetails.nameOfContact;
      await donationOld.save();
      res.json({ message: "Donation details updated successfully" });
      if (donationOld.association !== null && updatedDonationDetails.type === "Large Organization") {
        console.log("update!!!");
        const temp = await DonationDetailsModal.findOne({ email: updatedDonationDetails.email, num: updatedDonationDetails.num });
        const associationUser = await UserModal.findOne({name: temp.association});
        console.log("email: ", associationUser.email);
        sendEmail(associationUser.email, "The donation has been updated", "The organization " + updatedDonationDetails.name + " updated the donation");
      }
      else if(updatedDonationDetails.type === "Large Organization"){
          tempNotification = await UserSettingsModal.find({ emailAgree: "YES", type: "Association" });
          for (const associationUserSettings of tempNotification) {
            const associationUser = await UserModal.findOne({ name: associationUserSettings.name });
            console.log("email: ", associationUser.email);
            sendEmail(associationUser.email, "The donation has been updated", "The organization " + updatedDonationDetails.name + " updated the donation");
          }  
      }
      else{
        tempNotification = await UserSettingsModal.find({ emailAgree: "YES", type: "Private needy" });
          for (const privateNeedyUserSettings of tempNotification) {
            const privateNeedyUser = await UserModal.findOne({ name: privateNeedyUserSettings.name });
            console.log("email: ", privateNeedyUser.email);
            sendEmail(privateNeedyUser.email, "The donation has been updated", "The organization " + updatedDonationDetails.name + " updated the donation");
          }
    }
    } else {
        res.status(404).json({ message: "Donation details not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//
exports.updateDonationCount = async (req, res) => {
    const { email, count } = req.body;
  
    try {
      const currentNumber = await NumberOfDonationsModal.findOne({ email });
  
      if (currentNumber !== null) {
        currentNumber.count = count;
        await currentNumber.save();
        res.json({ message: "The number updated successfully" });
      } else {
        const newNumber = new NumberOfDonationsModal({ email, count });
        await newNumber.save();
        res.json({ message: "New donation count created" });
      }
    } catch (error) {
      console.log("Error updating donation count:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};
//
exports.updateDonationCollect = async (req, res) => {
    const updateAssociation = req.body;
  
    try {
      const donation = await DonationDetailsModal.findOne({ email: updateAssociation.email, num: updateAssociation.num });
  
      if (donation) {
        donation.association = updateAssociation.association;
        donation.status = updateAssociation.status;
        await donation.save();
        res.json({ message: "The donation updated successfully" });
        const LargeOrg= await DonationDetailsModal.findOne({email: updateAssociation.email, num: updateAssociation.num });
        console.log("email: ", LargeOrg.email);
        sendEmail(LargeOrg.email, "The donation has been marked", "The association" + donation.association + "marked the donation for collection")
      } else {
        res.status(404).json({ message: "Donation not found" });
      }
    } catch (error) {
      console.log("Error updating donation:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};
//
exports.updateDonationNotCollect = async (req, res) => {
    const updateAssociation = req.body;
  
    try {
      const donation = await DonationDetailsModal.findOne({ email: updateAssociation.email, num: updateAssociation.num });
  
      if (donation) {
        donation.association = updateAssociation.association;
        donation.status = updateAssociation.status;
        donation.rejected= updateAssociation.rejected;
        donation.dateRejected= updateAssociation.dateRejected;
        donation.dateRejectedString = updateAssociation.dateRejectedString;
        
        await donation.save();
        res.json({ message: "The donation updated successfully" });
        const LargeOrg= await DonationDetailsModal.findOne({email: updateAssociation.email, num: updateAssociation.num });
        console.log("email: ", LargeOrg.email);
        sendEmail(LargeOrg.email, "Donation collection canceled", "The" + donation.association + "association canceled the collection of the donation, you can choose another association")
      } else {
        res.status(404).json({ message: "Donation not found" });
      }
    } catch (error) {
      console.log("Error updating donation:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};

/****************************************************************************/
//GET 
//
exports.getDonationCount = async (req, res) => {
  const { email } = req.query;

  try {
    // Fetch the donation count data from the database based on the user's email
    const numOfDonation = await NumberOfDonationsModal.findOne({ email });
    if (numOfDonation !== null) {
      // Existing donation count found
      res.json({ count: numOfDonation.count });
    } else {
      // Donation count not found
      const numDefault = 0;
      res.json({ count: numDefault });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getAllDonation = async (req, res) => {
  const { email } = req.query;
  try {
    // Fetch all donation data from the database based on the user's email
    const donations = await DonationDetailsModal.find({ email });
    if (donations.length > 0) {
      const formattedDonations = donations.map((donation) => ({
        num: donation.num,
        date: donation.date,
        createdAt: donation.createdAt,
        location: donation.location,
        association: donation.association,
        status: donation.status,
        numItems: donation.numItems,
        nameOfContact: donation.nameOfContact,
      }));
      res.json({ donations: formattedDonations });
    } else {
      res.json({ message: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//
exports.getAllDeleteDonation = async (req, res) => {
  const { email } = req.query;
  try {
    // Fetch all donation data from the database based on the user's email
    const donations = await DonationDeleteModal.find({ email });
    if (donations.length > 0) {
      const formattedDonations = donations.map((donation) => ({
        num: donation.num,
        dateMade: donation.dateMade,
        dateDelete: donation.dateDelete,
        location: donation.location,
        association: donation.association,
        status: donation.status,
        numItems: donation.numItems,
        delivered: donation.delivered,
      }));
      res.json({ donations: formattedDonations });
    } else {
      res.json({ message: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getAllDeleteDonationByAssociation = async (req, res) => {
  const { association } = req.query;
  try {
    // Fetch all donation data from the database based on the user's email
    const donations = await DonationDeleteModal.find({ association });
    if (donations.length > 0) {
      const formattedDonations = donations.map((donation) => ({
        num: donation.num,
        dateMade: donation.dateMade,
        dateDelete: donation.dateDelete,
        location: donation.location,
        association: donation.association,
        status: donation.status,
        numItems: donation.numItems,
        delivered: donation.delivered,
      }));
      res.json({ donations: formattedDonations });
    } else {
      res.json({ message: false });
    } 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//
exports.getDonationItems = async (req, res) => {
  const { email, num } = req.query;
  try {
    const donation = await DonationDetailsModal.findOne({ email, num });
    if (donation) {
      res.json({
        association: donation.association,
        numItems: donation.numItems,
        food: donation.food,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//
exports.getDonationDetails = async (req, res) => {
  const { email, num } = req.query;
  try {
    const donation = await DonationDetailsModal.findOne({ email, num });

    if (donation) {
      res.json({
        num: donation.num,
        name: donation.name,
        email: donation.email,
        location: donation.location,
        phone: donation.phone,
        association: donation.association,
        date: donation.date,
        type: donation.type,
        numItems: donation.numItems,
        food: donation.food,
        nameOfContact: donation.nameOfContact,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//
exports.getDonationDetailsContactMan = async (req, res) => {
  const { email, num } = req.query;
  try {
    const donation = await DonationDetailsModal.findOne({ email, num });
    //console.log("donation: ", donation);
    if (donation) {
      //console.log("contact man: ", donation.nameOfContact);
      res.json({
        nameOfContact: donation.nameOfContact,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//
exports.getDonationDetailsByCityAndType = async (req, res) => {
  const { city, type } = req.query;

  try {
    if (city === 'allCities') {
      // Handle "Show all donations in all cities" logic here
      const donations = await DonationDetailsModal.find({ type });

      if (donations.length > 0) {
        const donationDetails = donations.map((donation) => ({
          num: donation.num,
          name: donation.name,
          email: donation.email,
          phone: donation.phone,
          location: donation.location,
          city: donation.city,
          association: donation.association,
          status: donation.status,
          date: donation.date,
          createdAt: donation.createdAt,
          numItems: donation.numItems,
          nameOfContact: donation.nameOfContact,
        }));
        res.json({ donations: donationDetails });
      } else {
        res.json([]);
      }
    } else if (city === 'myDonations') {
      const { association } = req.query;
      const donations = await DonationDetailsModal.find({ association });

      if (donations.length > 0) {
        const donationDetails = donations.map((donation) => ({
          num: donation.num,
          name: donation.name,
          email: donation.email,
          phone: donation.phone,
          location: donation.location,
          city: donation.city,
          association: donation.association,
          status: donation.status,
          date: donation.date,
          createdAt: donation.createdAt,
          numItems: donation.numItems,
          nameOfContact: donation.nameOfContact,
        }));
        res.json({ donations: donationDetails });
      } else {
        res.json([]);
      }
    } else {
      const regex = new RegExp(`^${city}$`, 'i'); // Create a case-insensitive regular expression
      const donations = await DonationDetailsModal.find({ city: regex, type });

      if (donations.length > 0) {
        const donationDetails = donations.map((donation) => ({
          num: donation.num,
          name: donation.name,
          email: donation.email,
          phone: donation.phone,
          location: donation.location,
          city: donation.city,
          association: donation.association,
          status: donation.status,
          date: donation.date,
          createdAt: donation.createdAt,
          numItems: donation.numItems,
          nameOfContact: donation.nameOfContact,
        }));
        res.json({ donations: donationDetails });
      } else {
        res.json([]);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//
exports.getDonationItemsByEmailAndNumberAndType = async (req, res) => {
  const { email, type, num } = req.query;
  try {
    const donation = await DonationDetailsModal.findOne({ email, type, num });
    if (donation) {
      res.json({
        food: donation.food,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//
exports.getAllCityByType = async (req, res) => {
  const { type } = req.query;
  try {
    const cities = await DonationDetailsModal.distinct('city', { type });
    if (cities) {
      const sortedCities = cities.sort((a, b) => a.localeCompare(b));
      res.json({ cities: sortedCities });
    } else {
      res.json({message: false});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//
/* exports.getContactManDonation = async (req, res) => {
  const { email, num } = req.query;

  try {
    // Fetch the contact men data from the database based on the user's email
    const contactMan = await ContactManModal.find({ email, num });
    if (contactMan) {
      res.json({ contactMan });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}; */
/* const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    const fname = file.originalname;
    const valid = [".jpg", ".png", ".jpeg"].find((ext) => fname.endsWith(ext));
    cb(null, valid);
  },
}).single("photo");


exports.upload =  async (req, res, next) => {
  // Use the `upload` middleware in the route handler

  console.log("upload!!");
  let params = req.body;
  if(req.file){
    params.photo = req.file.buffer;
  }
  const newPhoto = new DonationPhotoModal(params);
  try{
    await newPhoto.save();
    res.json({message: "Photo Upload!"});
  }catch{
    console.log(newPhoto.errors);
    res.render('posts/new', {newPhoto: newPhoto});
  };
};  */