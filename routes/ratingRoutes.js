const router = require("express").Router();
const ratingController = require("../controller/ratingController");

 router.post("/",ratingController.addrating);
 router.get("/",ratingController.checkUserRating);


module.exports = router;