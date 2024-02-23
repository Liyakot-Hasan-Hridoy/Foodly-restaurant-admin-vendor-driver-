const category = require("../model/CategorySchema");

module.exports = {

    createCategory: async (req, res) => {

        const newcategory = category(req.body);

        try {
            await newcategory.save();
            res.status(201).json({ status: true, message: "Category Created Successfully" });

        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getAllcatgories: async (req, res) => {

        try {

            const categories = await category.find({ title: { $ne: "More" } }, { __v: 0 });
            res.status(200).json({ data: categories })

        } catch (error) {
            res.status(500).json({ status: false, message: error.message });

        }

    },


    getRandomcatgory: async (req, res) => {

        try {
            let catgories = await category.aggregate([

                { $match: { value: { $ne: "more" } } },
                { $sample: { size: 4 } }

            ]);

            const moreCatgory = await category.findOne({ value: "more" }, { __v: 0 })

            if (moreCatgory) {
                catgories.push(moreCatgory);
            }

            res.status(200).json({ data: catgories });



        } catch (error) {
            res.status(500).json({ status: false, message: error.message });

        }
    }
};