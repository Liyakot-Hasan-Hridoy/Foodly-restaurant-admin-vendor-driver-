const nodeMailer = require("nodemailer");

async function sendmailer(userEmail, message) {

    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },

    });

    const mailOptions = {

        from: process.env.EMAIL,
        to: userEmail,
        subject: "Foodly Verification Code",
        html: message



    };


    try {

       await transporter.sendMail(mailOptions);



    } catch (error) {

    }

}


module.exports = sendmailer;