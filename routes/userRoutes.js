const router = require("express").Router();
const userController = require("../controller/userController");
const middleware = require("../middleware/verifyToken");

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/",middleware.verifyTokenAndAuthorization, userController.getUser);
router.get("/verifyAccount/:otp",middleware.verifyTokenAndAuthorization, userController.verifyAccount);
router.get("/verifyPhone/:phone",middleware.verifyTokenAndAuthorization, userController.verifyPhone); 

module.exports = router;
