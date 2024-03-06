const  express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const catgoryRouter = require("./routes/categoryRoutes");
const restaurantRouter = require("./routes/restaurantRoutes");
const foodroutes = require("./routes/foodRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const userRoute = require("./routes/userRoutes");

dotenv.config();



mongoose.connect(process.env.MONGOURL).then(()=> console.log("Database Connected")).catch((error)=>{
   console.log(error);
});


app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("api/catgory",catgoryRouter);
app.use("api/restaurant",restaurantRouter);
app.use("api/foods",foodroutes);
app.use("api/rating",ratingRoutes);
app.use("api/user",userRoute);

app.listen(process.env.PORT, () => {
    console.log("Local Server Connected " + process.env.PORT);
});
