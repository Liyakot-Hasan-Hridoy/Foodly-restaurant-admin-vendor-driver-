const Food = require("../model/foodSchema");


module.exports = {

    addFood: async (req, res) => {

        const { title, time, foodTag, category, foodType, code, restaurant, rating, ratingCount, description, price, addictives, imageUrl } = req.body;

        try {


            const food = await Food(req.body);
            await food.save();
            res.status(201).json({ status: true, message: "Food Created Successfully" })


        } catch (error) {
            res.status(500).json({ status: false, message: error.message })
        }

    },

    getFoodById: async (req, res) => {

        const id = req.params.id;

        try {

            const foods = await Food.findById(id);
            res.status(200).json({ data: foods });

        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }

    },

    getrandomFood: async (req, res) => {
        try {

            let randomFoods = [];

            if (req.params.code) {

                randomFoods = await Food.aggregate([

                    { $match: { code: req.params.code } },
                    { $sample: { size: 3 } },
                    { $project: { __v: 0 } }
                ])

            }



            if (!randomFoods.length) {

                randomFoods = await Food.aggregate([

                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } }
                ])

            }
            if (randomFoods.length) {

                res.status(200).json({ data: randomFoods });


            }else{
                res.status(200).json({data : [],message: "No Foods Founds" });
            }

          

        } catch (error) {
            res.status(500).json({ status: true, message: error.message });
        }

    },

    getFoodsByRestaurant: async (req, res) => {

        const id = req.params.id;

        try {

            const restaurantFood = await Food.find({ restaurant: id });
            res.status(200).json({ data: restaurantFood });

        } catch (error) {

            res.status(500).json({ status: true, message: error.message });

        }

    },

    getFoodByCategoryAndCode: async (req, res) => {

        const { category, code } = req.body;

        try {

            const food = await Food.aggregate([

                { $match: { category: category, code: code, isAvailable: true } },
                { $project: { __v: 0 } },
            ]);

            if (food.length === 0) {
                res.status(200).json({ data: [] });

            }

            res.status(200).json({ data: food });


        } catch (error) {

            res.status(500).json({ status: true, message: error.message });

        }

    },

    searchfoods: async (req, res) => {

        const search = req.params.search;

        try {

            const result = await Food.aggregate([

                {
                    $search: {
                        index: "foods",

                        text: {

                            query: search,
                            path: {
                                wildcard: "*"
                            }

                        }

                    }

                }


            ]);

            res.status(200).json({ data: result });

        } catch (error) {
            res.status(500).json({ status: true, message: error.message });

        }

    },





}