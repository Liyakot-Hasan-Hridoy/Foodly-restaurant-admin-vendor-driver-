const User = require("../model/userSchema");
const Address = require("../model/addressSchema");

module.exports = {

    addAddress: async (req, res) => {
        const newAddress = new Address({
            userId: req.user.id,
            addressLine1: req.body.addressLine1,
            postalcode: req.body.postalcode,
            default: req.body.default,
            deliveryInstruction: req.body.deliveryInstruction,
            lattitude: req.body.lattitude,
            lungitude: req.body.lungitude,
        });

        try {

            if (req.body.default === true) {
                await Address.updateMany({ userId: req.user.id }, { default: false });
            }
            await newAddress.save();
            return res.status(201).json({ status: true, message: "New Address has been added" });

        } catch (err) {
            return res.status(500).json({ status: false, message: err.message });
        }
    },


    getAddresses: async (req, res) => {
        try {
            const addresses = await Address.find({ userId: req.user.id });
            res.status(200).json(addresses);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }

    },

    deleteAddress: async (req, res) => {
        try {
            await Address.findByIdAndDelete(req.params.id);
            return res.status(200).json({ status: true, message: "Deleted Successfully!" });
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    },

    setAddressDefault: async (req, res) => {
        try {
            await Address.updateMany({ userId: userId }, { default: false });
            const updateAddress = await Address.findByIdAndUpdate(addressId, { default: true });

            if (updateAddress) {
                await User.findOneAndUpdate(userId, { address: addressId });
                return res.status(200).json({ status: true, message: "Address successfully set as Default!" });
            } else {
                return res.status(400).json({ status: false, message: "Address not found." });
            }

        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    },

    getDefaultAddress: async(req,res)=>{
        const userId = req.user.id;
        try{
            const  address = await Address.findOne({userId : userId ,default :true});
            res.status(200).json(address);
            
        }catch(err){
            res.status(500).json({status :false,message : err.message});
        }
        
    },


};