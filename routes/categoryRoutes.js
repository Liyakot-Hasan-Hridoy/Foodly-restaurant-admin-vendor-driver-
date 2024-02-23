const router = require("express").Router();
const categoryController = require("../controller/CategoryController");

 router.post("/",categoryController.createCategory);
 router.get("/",categoryController.getAllcatgories);
 router.get("/random",categoryController.getRandomcatgory);


module.exports = router;