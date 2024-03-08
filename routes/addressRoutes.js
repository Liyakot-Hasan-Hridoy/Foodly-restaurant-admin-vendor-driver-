const router = require("express").Router();
const addressCotroller =require("../controller/addressController")
const middleware = require("../middleware/verifyToken");

 router.post("/",middleware.verifyTokenAndAuthorization,addressCotroller.addAddress);

 router.get("/all",middleware.verifyTokenAndAuthorization,addressCotroller.getAddresses);

 router.get("/default",middleware.verifyTokenAndAuthorization,addressCotroller.getDefaultAddress);

 router.delete("/:id",middleware.verifyTokenAndAuthorization,addressCotroller.deleteAddress);

 router.patch("/default/:id",middleware.verifyTokenAndAuthorization,addressCotroller.deleteAddress);


module.exports = router;