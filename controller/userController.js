const User = require("../model/userSchema");
const generateOtp = require("../utils/otp_function");
const cryptoJs = require("crypto-js");
const jsonwebToken = require("jsonwebtoken");
const sendMail = require("../utils/smtp_function");



module.exports = {

    createUser: async (req, res) => {

        const emailValidtor = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        if (!emailValidtor.test(req.body.email)) {

            return res.status(400).json({ status: false, message: "Email is not valid" });
        };

        const minimumPasswordLength = 8;

        if (req.body.password < minimumPasswordLength) {

            return res.status(400).json({ status: false, message: "Password should be 8 charecter" });
        };


        try {

            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) {
                return res.status(400).json({ status: false, message: "Email Already Exits" });
            };



            // Generate Otp

            const otp = generateOtp();

            const newUser = await User({

                userName: req.body.userName,
                email: req.body.email,
                userType: "Client",
                password: cryptoJs.AES.encrypt(req.body.password, process.env.SECRET).toString(),
                otp: otp

            });

            await newUser.save();

            // Send Email Otp

            sendMail(newUser.email, otp);

            res.status(200).json({ status: true, message: "User Successfully Created" });






        } catch (error) {

            res.status(500).json({ status: true, message: error.message });


        }







    },

    loginUser: async (req, res) => {

        const emailValidtor = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        if (!emailValidtor.test(req.body.email)) {

            return res.status(400).json({ status: false, message: "Email is not valid" });
        };

        const minimumPasswordLength = 8;

        if (req.body.password < minimumPasswordLength) {

            return res.status(400).json({ status: false, message: "Password should be 8 charecter" });
        };

        try {

            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                return res.status(400).json({ status: false, message: "User Not Found" });
            }


            const decryptPassword = cryptoJs.AES.decrypt(user.password, process.env.SECRET);
            const depassword = decryptPassword.toString(cryptoJs.enc.Utf8);

            if (depassword !== req.body.password) {

                return res.status(400).json({ status: false, message: "Your Password was incorrect" });
            }

            const userToken = jsonwebToken.sign({
                id: user._id,
                userType: user.userTypes,
                email: user.email,


            }, process.env.JWTSECRET, { expiresIn: "100000d" });

            const { password, otp, ...others } = user._doc;

            res.status(200).json(...others, userToken);



        } catch (error) {
            return res.status(400).json({ status: false, message: error.message });

        }


    },

    getUser: async (req, res) => {

        try {

            const user = await User.findById(req.user.id);

            const { password, __v, createdAt, ...userData } = user._doc;

            res.status(200).json({ data: userData });


        } catch (error) {

            res.status(200).json({ status: true, message: error.message });


        }

    },

    verifyAccount: async (req, res) => {

        const userOtp = req.params.otp;

        try {

            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(200).json({ status: true, message: "User Not Found" });
            }

            if (userOtp == user.otp) {
                user.verification = true;
                user.otp = "none";
                await user.save();
                const { password, __v, otp, createdAt, ...others } = user._doc;
                res.status(200).json(...others);

            }

        } catch (error) {

            res.status(500).json({ status: true, message: error.message });

        }
    },

    verifyPhone : async (req,res)=>{

        const phone = req.params.phone;

        try {

            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(200).json({ status: true, message: "User Not Found" });
            }

           
                user.phoneVerification = true;
                user.phone = phone;
                await user.save();
                const { password, __v, otp, createdAt, ...others } = user._doc;
                res.status(200).json(...others);

         

        } catch (error) {

            res.status(500).json({ status: true, message: error.message });

        }
    }


}