const router = require("express").Router();
const restaurantController = require("../controller/restaurantController");

router.post("/", restaurantController.addRestaurant);
router.get("/:id", restaurantController.getRestaurantById);
router.get("/:code", restaurantController.getRandomRestaurant);
router.get("/all/:code", restaurantController.getAllNearbyRestaurant);


module.exports = router;