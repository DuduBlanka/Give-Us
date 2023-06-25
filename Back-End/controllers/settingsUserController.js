const UserSettingsModal = require('../models/settingsUser');

// Function to update user settings and notifications
exports.updateNotification = async (req, res) => {
  try {
    const { name, email, phone, type, emailAgree, phoneAgree } = req.body;
    console.log("details:" ,name, email, phone, emailAgree, phoneAgree );
    // Check if the user already exists
    let userSettings = await UserSettingsModal.findOne({ email });
    console.log("user: " + userSettings);
    if (userSettings === null) {
      // Create a new user settings entry if the user doesn't exist
      userSettings = new UserSettingsModal({
        name,
        email,
        phone,
        type,
        emailAgree,
        phoneAgree,
      });
    } else {
      // Update the user settings if the user exists
      userSettings.name = name;
      userSettings.phone = phone;
      userSettings.type = type
      userSettings.emailAgree = emailAgree;
      userSettings.phoneAgree = phoneAgree;
    }

    // Save the updated user settings
    await userSettings.save();

    res.status(200).json({ message: 'User settings updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
