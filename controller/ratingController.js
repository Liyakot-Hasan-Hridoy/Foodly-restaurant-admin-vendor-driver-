const Rating = require("../model/ratingSchema");
const Restaurant = require("../model/restaurantSchema");
const Food = require("../model/foodSchema");

module.exports = {

    addrating: async (req, res) => {

        const rating = new Rating({
            userId: req.user.userId,
            ratingType: req.body.ratingType,
            product: req.body.product,
            rating: req.body.rating
        });

        try {

            await rating.save();

            if (req.body.ratingType == "Restaurant") {

                const restaurant = await Restaurant.aggregate([

                    { $match: { ratingType: req.body.ratingType, product: req.body.product } },
                    { $group: { _id: "$product" }, avaragerating: { $avg: "$rating" } }
                ]);

                if (restaurant.length > 0) {
                    const avaragerating = restaurant[0].avaragerating;
                    await Restaurant.findByIdAndUpdate(req.body.product, { rating: avaragerating }, { new: true });


                }
            } else if (req.body.ratingType == "Food") {
                const restaurant = await Restaurant.aggregate([

                    { $match: { ratingType: req.body.ratingType, product: req.body.product } },
                    { $group: { _id: "$product" }, avaragerating: { $avg: "$rating" } }
                ]);

                if (restaurant.length > 0) {
                    const avaragerating = restaurant[0].avaragerating;
                    await Food.findByIdAndUpdate(req.body.product, { rating: avaragerating }, { new: true });


                }
            }

            res.status(200).json({status : true,message : "Rating has been added successfully"});

        } catch (error) {
         
            res.status(500).json({status : false,message : error.message});
        }
    },


    checkUserRating : async (req,res)=>{
        const ratingType = req.query.ratingType;
        const product = req.query.product;

        try {

            const existingrating  = await Rating.findOne({
                userId : req.user.userId,
                product : product,
                ratingType : ratingType,
            });

            if(existingrating){
                res.status(200).json({status : true, message : "You have already rated this restaurant"});
            }else{
                res.status(200).json({status : true, message : "User has not  rated this restaurant"});

            }
            
        } catch (error) {
            res.status(500).json({status : false,message : error.message});

        }
    }

}