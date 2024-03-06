const jwt = require("jsonwebtoken");

module.exports = {

    verifyToken: async (req, res, next) => {
        const authHeader = req.headers.Authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.JWTSECRET, async (err, user) => {
                if (err) {
                    return res.status(403).json({ status: false, message: "Invalid Token" });
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json({ status: false, message: "No token provide!" });
        }

    },

    
    verifyTokenAndAuthorization: async (req, res, next) => {
        // "Client", "Admin", "Vendor", "Driver"
        verifyToken(req, res, () => {
            if (req.user.userType === 'Client'
                || req.user.userType === 'Admin'
                || req.user.userType === 'Vendor'
                || req.user.userType === 'Driver') {
                next();

            } else {
                return res.status(403).json({ status: false, message: "Unauthorized User Type" });
            }
        })
    },


    verifyVendor: async (req, res, next) => {
        verifyToken(req, res, () => {
            if (req.user.userType === 'Admin'
                || req.user.userType === 'Vendor'
            ) {
                next();

            } else {
                return res.status(403).json({ status: false, message: "Unauthorized User Type" });
            }
        })
    },


    verifyAdmin: async (req, res, next) => {
        verifyToken(req, res, () => {
            if (req.user.userType === 'Admin') {
                next();

            } else {
                return res.status(403).json({ status: false, message: "Unauthorized User Type" });
            }
        })
    },


    verifyDriver: async (req, res, next) => {
        verifyToken(req, res, () => {
            if (req.user.userType === 'Driver') {
                next();

            } else {
                return res.status(403).json({ status: false, message: "Unauthorized User Type" });
            }
        })
    },




}