const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: "giveus2706@gmail.com",
                pass: "kexvgxgwntfttkvl",
            },
        });

        await transporter.sendMail({
            from: "giveus2706@gmail.com",
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;