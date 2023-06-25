const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes");
const donationRoutes = require("./routes/donationRoutes");
const contactManRoutes = require("./routes/contactManRoutes");
const settingsUserRoutes = require("./routes/settingsUserRoutes");
const passwordResetRoutes = require("./routes/passwordResetRoutes");

const dotenv = require('dotenv');
const cors = require('cors');
app.use(cors());
app.set('view engine', 'ejs');

const fs = require('fs');
const cron = require('node-cron');

const DonationPhotoModal = require("./models/donationPhoto");
const DonationDetailsModal = require('./models/donationDetails');
const DonationDeleteModal = require('./models/donationDeleted');
const UserSettingsModal = require('./models/settingsUser');
const UserModal = require("./models/Users");

const sendEmail = require("./utils/sendEmail");

//const users = require("./routes/usersRoutes");
const connection = require("./db");

app.use(express.json());
app.use(express.static('client/General'));

// app.use("/api/Users", userRoutes);
// app.use("/api/password-reset", passwordResetRoutes);

app.use(userRoutes);
app.use(donationRoutes);
app.use(contactManRoutes);
app.use(settingsUserRoutes);
app.use(passwordResetRoutes);

app.use(express.json());

//app.use("/api/users", users);
const multer = require('multer');
const { required } = require("joi");
//required("dotenv").config();
dotenv.config();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use("/images", express.static(path.join("server/images")));


// MongoDB connection
mongoose.connect("mongodb+srv://giveus:Lia1307@cluster0.h7ot7g6.mongodb.net/Giveus", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "giveus"
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });


///////////////////////////////////////////////////////////////////
const upload = multer({

  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: function(req, file, cb) {
    const fname = file.originalname;
    const valid = ['.jpg', '.png', '.jpeg'].find(ext => fname.endsWith(ext));
    cb(null, valid);
  }
}).single('photo');

app.post('/upload',upload, async function(req, res, next){

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
  }
});

/***********************************************************************************/
//Define a cron job- delete donations after 5 hours, small organization
cron.schedule('*/10 * * * *', async () => {
  try {
    // Calculate the timestamp for 5 hours ago
    const fiveHoursAgo = new Date(Date.now() - 5 * 60 * 60 * 1000);
    // Find donations of type "Small Organization" that have a posted timestamp earlier than five hours ago
    const donations = await DonationDetailsModal.find({ type: 'Small Organization', createdAt: { $lt: fiveHoursAgo }}).exec();

    if(donations.length > 0){
      console.log("donations- time life: ", donations);
    }
    // Process the donations
    donations.forEach(async (donation) => {
      // Calculate the time difference in hours
      const createdAt = donation.createdAt;
      const timeDifference = (new Date() - createdAt) / (1000 * 60 * 60); // Difference in hours

      if (timeDifference >= 5) {
        // More than 5 hours have passed since createdAt
        // Perform your desired actions here

        let dateTime = new Date();
        const month = dateTime.getMonth() + 1; // Adding 1 to get the correct month index
        const day = dateTime.getDate();
        const year = dateTime.getFullYear();
        const hour = dateTime.getHours();
        const minute = dateTime.getMinutes();
        
        const dateDelete = `${day}/${month}/${year}, ${hour}:${minute.toString().padStart(2, '0')}` //${period}`;
        // Create a new donationDeleted object
        const deletedDonation = new DonationDeleteModal({
          // Copy relevant fields from donationDetails to donationDeleted
          num: donation.num,
          name: donation.name,
          email: donation.email,
          location: donation.location,
          association: donation.association,
          type: donation.type,
          dateMade: donation.date,
          dateDelete,
          delivered: 'Expired', // Set the delivered status to 'No' for the deleted donation
          numItems: donation.numItems,
          food: donation.food,
        });

        // Save the deleted donation to donationDeleted collection
        await deletedDonation.save();

        // Delete the donation from donationDetails collection
        await DonationDetailsModal.deleteOne({ _id: donation._id });
      } else {
        // Less than 5 hours have passed since createdAt
        // Skip further processing or take necessary steps
      }
    });

    let dateTime = new Date();
    const month = dateTime.getMonth() + 1; // Adding 1 to get the correct month index
    const day = dateTime.getDate();
    const year = dateTime.getFullYear();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
          
    const date = `${day}/${month}/${year}, ${hour}:${minute.toString().padStart(2, '0')}` //${period}`; 
    console.log('Cron job executed successfully at dalete small donations', date);

  } catch (error) {
    console.error('An error occurred during cron job execution:', error);
  }
}); 
//Define a cron job- delete donations after 48 hours, large organization
cron.schedule('0 * * * *', async () => {
  try {
    // Calculate the timestamp for 48 hours ago
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    // Find donations of type "Large Organization" that have a posted timestamp earlier than forty-eight hours ago
    const donations = await DonationDetailsModal.find({ type: 'Large Organization', createdAt: { $lt: fortyEightHoursAgo }}).exec();

    if(donations.length > 0){
      console.log("donations - time life: ", donations);
    }
    // Process the donations
    donations.forEach(async (donation) => {
      // Calculate the time difference in hours
      const createdAt = donation.createdAt;
      const timeDifference = (new Date() - createdAt) / (1000 * 60 * 60); // Difference in hours

      if (timeDifference >= 48) {
        // More than 48 hours have passed since createdAt
        // Perform your desired actions here

        let dateTime = new Date();
        const month = dateTime.getMonth() + 1; // Adding 1 to get the correct month index
        const day = dateTime.getDate();
        const year = dateTime.getFullYear();
        const hour = dateTime.getHours();
        const minute = dateTime.getMinutes();
        
        const dateDelete = `${day}/${month}/${year}, ${hour}:${minute.toString().padStart(2, '0')}` //${period}`;
        // Create a new donationDeleted object
        const deletedDonation = new DonationDeleteModal({
          // Copy relevant fields from donationDetails to donationDeleted
          num: donation.num,
          name: donation.name,
          email: donation.email,
          location: donation.location,
          association: donation.association,
          type: donation.type,
          dateMade: donation.date,
          dateDelete,
          delivered: 'Expired', // Set the delivered status to 'No' for the deleted donation
          numItems: donation.numItems,
          food: donation.food,
        });

        // Save the deleted donation to donationDeleted collection
        await deletedDonation.save();

        // Delete the donation from donationDetails collection
        await DonationDetailsModal.deleteOne({ _id: donation._id });
      } else {
        // Less than 48 hours have passed since createdAt
        // Skip further processing or take necessary steps
      }
    });

    let dateTime = new Date();
    const month = dateTime.getMonth() + 1; // Adding 1 to get the correct month index
    const day = dateTime.getDate();
    const year = dateTime.getFullYear();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
          
    const date = `${day}/${month}/${year}, ${hour}:${minute.toString().padStart(2, '0')}` //${period}`; 
    console.log('Cron job executed successfully at delete large donations', date);

  } catch (error) {
    console.error('An error occurred during cron job execution:', error);
  }
});
//Define a cron job- If a donation is rejected - send a notification to all associations
cron.schedule('0 * * * *', async () => {
  let tempNotification = [];
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // Subtract 1 hour from the current time

  try {
    // Find donations of type "Large Organization" that have been rejected
    const donations = await DonationDetailsModal.find({ type: 'Large Organization', rejected: 'YES', dateRejected: { $lt: oneHourAgo } }).exec();
    if(donations.length > 0){
      console.log("donations- rejected: ", donations);
    }

    // Process the donations
    if (donations.length > 0) {
      // Find association users who have agreed to receive email notifications
      tempNotification = await UserSettingsModal.find({ emailAgree: 'YES', type: 'Association' });

      // Send email notifications and update the rejected field of each donation
      for (const donation of donations) {
        for (const associationUserSettings of tempNotification) {
          const associationUser = await UserModal.findOne({ name: associationUserSettings.name });
          console.log("email: ", associationUser.email);
          sendEmail(associationUser.email, "A new donation upload", "The organization " + donation.name + " sent you a donation" + " " + donation.date);
        }

        // Update the rejected field of the donation to 'NO'
        await DonationDetailsModal.updateOne({ _id: donation._id }, { rejected: 'NO' });
      }
    }

    let dateTime = new Date();
    const month = dateTime.getMonth() + 1; // Adding 1 to get the correct month index
    const day = dateTime.getDate();
    const year = dateTime.getFullYear();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
          
    const date = `${day}/${month}/${year}, ${hour}:${minute.toString().padStart(2, '0')}` //${period}`; 
    console.log('Cron job executed successfully at notification', date); 

  } catch (error) {
    console.error('An error occurred during cron job execution:', error);
  }
});

// Start the cron job
//cron.start();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});
// CORS configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//module.exports = route;
// Start the server
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
