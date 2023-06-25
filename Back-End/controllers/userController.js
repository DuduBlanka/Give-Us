const UserModal = require("../models/Users");
const ContactManModal = require('../models/contactMan');
const DonationDetailsModal = require("../models/donationDetails");
const NumberOfDonationsModal = require("../models/numberOfDonation");
const DonationDeleteModal = require("../models/donationDeleted");
const UserSettingsModal = require('../models/settingsUser');
const DonationPhotoModal = require("../models/donationPhoto");
//const DonationPhotoModal = require("../models/donationPhoto");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
//const nodemailer = require("nodemailer");


//
/***********************************************************************/
//POSR
//
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModal.findOne({ email });
    //console.log("user: ", user)
    if (user) {
      
      // User exists, perform password validation
      if (password === user.password) {
        res.json({ exists: true, email: user.email, type: user.type });
      } else {
        res.json({ message: "Incorrect password"});
      }
    } 
    else{//user dosnt exixts
      res.json({message: "User doesn't exists!"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}; 
//
exports.createUser = async (req, res) => {
  const user = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await UserModal.findOne({ email: user.email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = new UserModal(user);
    await newUser.save();
    
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.log("User creation failed:", error);
    res.status(500).json({ message: "User creation failed" });
  }
}; 
// 
exports.deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModal.findOne({ email });

    if (user) {
      // User exists, delete the user
      await UserModal.deleteOne({ email });
      await UserSettingsModal.deleteMany({ email: user.email });
      
      if (user.type !== "Private needy") {
        await ContactManModal.deleteMany({ email: user.email });
      }

      res.json({ deleted: true });
    } else {
      // User does not exist
      res.json({ deleted: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//
exports.updateUser = async (req, res) => {
  const updatedUser = req.body;

  try {
    // Find the existing contact man in the database based on the email
    const existingUser = await UserModal.findOne({ email: updatedUser.oldEmail });

    if (existingUser) {
      try {
        // Update the user's details
        existingUser.email = updatedUser.email;
        existingUser.phone = updatedUser.phone;
        existingUser.address = updatedUser.address;
        existingUser.city = updatedUser.city;
        existingUser.password = updatedUser.password;

        // Save the updated user
        await existingUser.save();
      } catch (error) {
        console.log("Error updating user details:", error);
        throw error;
      }

      // Update other schemas
      if (existingUser.type === "Large Organization" || existingUser.type === "Small Organization") {
        try {
          await DonationDetailsModal.updateMany({ email: updatedUser.oldEmail }, { email: updatedUser.email, phone: updatedUser.phone });
          await DonationDeleteModal.updateMany({ email: updatedUser.oldEmail }, { email: updatedUser.email, phone: updatedUser.phone });
          await ContactManModal.updateMany({ email: updatedUser.oldEmail }, { email: updatedUser.email, phone: updatedUser.phone });
          await NumberOfDonationsModal.updateMany({ email: updatedUser.oldEmail }, { email: updatedUser.email, phone: updatedUser.phone });
          await UserSettingsModal.updateMany({ email: updatedUser.oldEmail }, { email: updatedUser.email, phone: updatedUser.phone });
          await DonationPhotoModal.updateMany({ email: updatedUser.oldEmail }, { email: updatedUser.email, phone: updatedUser.phone });
        } catch (error) {
          console.log("Error updating other schemas:", error);
          throw error;
        }
      } else if (existingUser.type === "Association") {
        try {
          await ContactManModal.updateMany({ email: updatedUser.oldEmail }, { email: updatedUser.email });
        } catch (error) {
          console.log("Error updating other schemas:", error);
          throw error;
        }
      }
      res.json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Update User failed: ", error);
    res.status(500).json({ message: "User update failed" });
  }
}; 

/*********************************************************************/
//GET
//
exports.displayUser = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await UserModal.findOne({ email });
    if (user) {
      // User exists, return the user details
      res.json({
        name: user.name,
        email: user.email,
        phoneNumber: user.phone,
        address: user.address,
        city: user.city,
        type: user.type
      });
    } else {
      // User does not exist
      res.json({ exists: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//
exports.getUsers = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await UserModal.findOne({ email });
    if (user) {
      res.json({
        name: user.name,
        phone: user.phone,
        address: user.address,
        city: user.city,
        password: user.password,
        type: user.type
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//
exports.getUsersByType = async (req, res) => {
  const { type } = req.query;

  try {
    // Fetch the users data from the database based on the user type
    const users = await UserModal.find({ type });

    // Extract the relevant user details
    const formattedUsers = users.map(user => {
      return {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
      };
    });
    res.json({ users: formattedUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//show up all select association
exports.getAssociationSelectByCityAndType = async (req, res) => {
  const { city, type } = req.query;

  try {
    const association = await UserModal.find({ city, type });
    if (association) {
      res.json({ association });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//show up all select association
exports.getAssociationSelectByType = async (req, res) => {
  const { type } = req.query;

  try {
    const association = await UserModal.find({ type });
    if (association) {
      res.json({ association });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
/*********************************************************************************************/

