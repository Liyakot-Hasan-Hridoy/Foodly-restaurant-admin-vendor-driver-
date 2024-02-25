const router = require("express").Router();
const userController = require("../controller/userController");

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/", userController.getUser);
router.get("/verifyAccount/:otp", userController.verifyAccount);
router.get("/verifyPhone/:phone", userController.verifyPhone); 

module.exports = router;
