const mongoose = require("mongoose");

 const RestaurentSchema = new mongoose.Schema({
   
    
    title : {type : String ,required : true},
    time : {type : String ,required : true},
    imageUrl : {type : String ,required : true},
    food : {type : Array ,default : []},
    pickUp : {type : Boolean ,default : true},
    delivery : {type : Boolean,default : true},
    isAvailable : {type : Boolean ,default : true},
    owner : {type : String ,required : true},
    code : {type : String ,required : true},
    logoUrl : {type : String ,required : true},
    rating : {type : Number ,min : 1,max : 5,default : 3},
    ratingCount : {type : String ,default : "200"},
    verification : {type : String ,default : "Pending",enum : ["Pending","Rejected","Approved"]},
    verificationMessage : {type : String ,default : "Your restaurent is under review.we will notify you once it is verified."},
    coords : {
        id : {type : String},
        lattitude : {type : Number,required : true},
        longitude : {type : Number,required : true},
        lattitudeDelta : {type : Number,default : 0.00001111},
        longitudeDelta : {type : Number,default : 0.000000111},
        address : {type : String, required : true},
        title : {type : String, required : true}

    },


 });

  module.exports = mongoose.model("Restaurant",RestaurentSchema);