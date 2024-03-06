const router = require("express").Router();
const ratingController = require("../controller/ratingController");
const middleware = require("../middleware/verifyToken");

 router.post("/",middleware.verifyTokenAndAuthorization,ratingController.addrating);
 router.get("/",middleware.verifyTokenAndAuthorization,ratingController.checkUserRating);


module.exports = router;