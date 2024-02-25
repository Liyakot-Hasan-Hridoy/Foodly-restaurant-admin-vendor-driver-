const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true, default: "none" },
    password: { type: String, required: true },
    verification: { type: Boolean, default: false },
    phone: { type: String, default: "01315054794" },
    phoneVerification: { type: Boolean, default: false },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: false

    },

    userTypes: { type: String, required: true, default: "Client", enum: ["Client", "Admin", "Vendor", "Driver"] },
    profile: { type: String, default: "https://scontent.fdac151-1.fna.fbcdn.net/v/t39.30808-6/399447443_946973340181866_3948201242798537464_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHAA1exjoWpfdddhNbPW7Ftpfhay3DZNi6l-FrLcNk2Lu2NPlDBtOLqN_8mdo0N3Ap--Wu6olYIrTpKVNACH2XV&_nc_ohc=iDyMrq22dx4AX-fQOTG&_nc_ht=scontent.fdac151-1.fna&oh=00_AfD8CU2K-G8q0kJRPWjOO6czvwLVC2XDKzk_WLPvzc-Adw&oe=65DF40E2" }



},
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);