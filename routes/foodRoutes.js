const router = require("express").Router();
const foodController = require("../controller/foodController");

router.post("/", foodController.addFood);
router.get("/:id", foodController.getFoodById);
router.get("/recommandation/:code", foodController.getrandomFood);
router.get("/restaurant-foods/:id", foodController.getFoodsByRestaurant);
router.get("/:category/:code", foodController.getFoodByCategoryAndCode);
router.get("/search/:search", foodController.searchfoods);


module.exports = router;