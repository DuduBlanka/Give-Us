const { Console } = require("console");
const UserModal  = require("../models/Users");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const dayjs  = require("dayjs");
const crypto = require("crypto");
const Joi = require("joi");


//
exports.sendResetPassword = async (req, res) => {
    const { email } = req.body;
    try {
      //console.log("rech send reset password-------");
  
      let user = await UserModal.findOne({ email });
      if (user === null) {
        res.json({ message: "User not found" });
        return;
      }
  
      let token = crypto.randomBytes(32).toString("hex");
  
      // Find the userToken document by email
      let userToken = await Token.findOne({ email });
  
      if (!userToken) {
        // If userToken document doesn't exist, create a new one
        userToken = new Token({ email, token, createdAt: new Date() });
      } else {
        // If userToken document exists, update the existing token
        userToken.token = token;
        userToken.createdAt = new Date();
      }
  
      await userToken.save();
  
      const link = `http://127.0.0.1:5500/client/General/resetPassword.html?email=${email}&token=${token}`;
  
      await sendEmail(user.email, "Password reset", link);
  
      res.json({ message: "Password reset link sent to your email account" });
    } catch (error) {
      res.send("An error occurred");
      console.log(error);
    }
};
//
exports.resetPassword = async (req, res) => {
    
    const { email, token: linkToken } = req.params;
  
    try {
        const dbToken = await Token.findOne({ email });
        //console.log("user token schema: ", user);

        const expiryDate =  dayjs(dbToken.createdAt).add(10,"minutes");
        const isExpried = dayjs().isAfter(expiryDate);
        if (!dbToken || linkToken !== dbToken.token || isExpried) {
            await Token.deleteOne({ email });
            return res.status(400).send("Invalid link or expired");
        }

        const userPassword = await UserModal.findOne({ email });
        userPassword.password = req.body.password;

        await userPassword.save();
        await Token.deleteOne({ email }); // Delete the record from the Token schema

        const user2 = await Token.findOne({ email });
        //console.log("user2: ", user2);

        res.json({ message: "Password reset successfully." });
    } catch (error) {
        res.json({ message: "An error occurred"});
        console.log("error: ", error);
    }
};
