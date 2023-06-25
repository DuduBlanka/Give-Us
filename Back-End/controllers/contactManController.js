const ContactManModal = require('../models/contactMan');


exports.createContactMan = async (req, res) => {
    const user = req.body;
    
    try {
      // Check if user with the same email already exists
      const existingContactMan = await ContactManModal.findOne({ name: user.name, email: user.email });
      if (existingContactMan) {
        return res.status(409).json({ message: "Contact man already exists" });
      }
      const newContactMan = new ContactManModal(user);
      await newContactMan.save();
      res.json({ message: "Contact man created successfully" });
    } catch (error) {
      console.log("Contact man creation failed:", error);
      res.status(500).json({ message: "Contact man creation failed" });
    }
};
  
exports.updateContactMan = async (req, res) => {
    const updatedContactMan = req.body;
    try {
      // Find the existing contact man in the database based on the email
      const existingContactMan = await ContactManModal.findOne({ email: updatedContactMan.email, name: updatedContactMan.name });
  
      if (existingContactMan) {
        // Update the contact man's details
        existingContactMan.name = updatedContactMan.name;
        existingContactMan.phone = updatedContactMan.phone;
        existingContactMan.role = updatedContactMan.role;
  
        // Save the updated contact man
        await existingContactMan.save();
  
        res.json({ message: "Contact man updated successfully" });
      } else {
        res.status(404).json({ message: false });
      }
    } catch (error) {
      console.log("Update contact man failed:", error);
      res.status(500).json({ message: "Contact man update failed" });
    }
};
  
exports.displayContactMan = async (req, res) => {
    const { email, name } = req.query;
  
    try {
      const user = await ContactManModal.findOne({ email, name });
  
      if (user) {
        // User exists, return the user details
        res.json({
          fullName: user.name,
          phoneNumber: user.phone,
          role: user.role
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
exports.contactManSelect = async (req, res) => {
  const { email } = req.query;
 
  try {
    // Fetch the contact men data from the database based on the user's email
    const contactMen = await ContactManModal.find({ email });

    if (contactMen.length > 0) {
      res.json({contactMen});
    } else {
      res.json({ message: "No data found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//
exports.deleteContactMan = async (req, res) => {
    const { email, name } = req.body;
  
    try {
      const user = await ContactManModal.findOne({ email });
      
      if (user) {
        // User exists, delete the user
        await ContactManModal.deleteOne({ name });
  
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
exports.getContactMan = async (req, res) => {
    let nameOfContact = [];
    const email = req.query.email;
   
    if (typeof req.query.nameOfContact === 'string') {
      nameOfContact = req.query.nameOfContact.split(",");
    }
    
    try {
      // Fetch the contact men data from the database based on the user's email
      const contactMan = await ContactManModal.find({ email, name: { $in: nameOfContact } });
      if (contactMan ) {
        res.json({ contactMan });
      }
      else{
        res.json({message: false});
      } 
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
};
//
exports.getContactManName = async (req, res) => {
  const { email } = req.query;

  try {
    // Fetch the contact men data from the database based on the user's email
    const contactMen = await ContactManModal.find({ email });

    if (contactMen.length === 0) {
      // No contact men found
      res.json({ message: false });
    } else {
      // Extract the names from the contact men objects
      const contactManNames = contactMen.map(contactMan => contactMan.name);
      res.json({ contactMan: contactManNames });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//
exports.getAllContactMan = async (req, res) => {
  const { email } = req.query;

  try {
    // Fetch the contact men data from the database based on the user's email
    const contactMen = await ContactManModal.find({ email });
    
    console.log("contact!!");
    /* if (contactMen.length === 0) {
      // No contact men found
      res.json({ contactMen: [] }); // Return an empty array
    } */ 
    if(contactMen.length > 0) {
      // Extract the relevant contact man details
      const formattedContactMen = contactMen.map(contactMan => {
        return {
          name: contactMan.name,
          phone: contactMan.phone,
          role: contactMan.role
        };
      });
      console.log("contact!!");
      res.json({ contactMen: formattedContactMen });
    }
    else{
      res.json({message: false});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


  