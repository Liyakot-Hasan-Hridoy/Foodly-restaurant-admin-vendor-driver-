const Restaurent = require("../model/restaurantSchema");


module.exports = {

    addRestaurant: async (req, res) => {

        const { title, time, imageUrl, food, pickUp, isAvailable, owner, code, logoUrl, rating, ratingCount, verification, verificationMessage, coords } = req.body;

        try {
            const newrestaurant = await Restaurent(req.body);
            await newrestaurant.save();
            res.status(201).json({ status: true, message: "Restaurant has been created successfully" });

        } catch (error) {
            res.status(500).json({ status: false, message: error.message });

        }
    },

    getRestaurantById: async (req, res) => {

        const id = req.params.id;
        try {

            const restaurants = await Restaurent.findById(id);
            res.status(200).json({ data: restaurants });

        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }

    },

    getRandomRestaurant: async (req, res) => {

        const code = req.params.code;

        try {

            let randomrestaurant = [];

            if (code) {
                randomrestaurant = await Restaurent.aggregate([

                    { $match: { code: code }, isAvailable: true },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } }

                ]);
            }

            if (randomrestaurant.length === 0) {
                randomrestaurant = await Restaurent.aggregate([

                    { $match: { isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } }

                ]);
            }

            res.status(200).json({ data: randomrestaurant });



        } catch (error) {
            res.status(500).json({ status: false, message: error.message });

        }
    },

    getAllNearbyRestaurant: async (req, res) => {

        const code = req.params.code;

        try {

            let randomrestaurant = [];

            if (code) {
                randomrestaurant = await Restaurent.aggregate([

                    { $match: { code: code }, isAvailable: true },
                    { $project: { __v: 0 } }

                ]);
            }

            if (randomrestaurant.length === 0) {
                randomrestaurant = await Restaurent.aggregate([

                    { $match: { isAvailable: true } },
                    { $project: { __v: 0 } }

                ]);
            }

            res.status(200).json({ data: randomrestaurant });



        } catch (error) {
            res.status(500).json({ status: false, message: error.message });

        }
    },


}