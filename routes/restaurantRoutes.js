const router = require("express").Router();
const restaurantController = require("../controller/restaurantController");
const middleware = require("../middleware/verifyToken");

router.post("/",middleware.verifyTokenAndAuthorization, restaurantController.addRestaurant);
router.get("/:id", restaurantController.getRestaurantById);
router.get("/:code", restaurantController.getRandomRestaurant);
router.get("/all/:code", restaurantController.getAllNearbyRestaurant);


module.exports = router;