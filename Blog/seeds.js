var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
        description: "Awesome place to live on, it is non less than heaven!!"
    },
    {
        name: "Desert Mesa",
        image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg",
        description: "Awesome place!! A grade desert"
    },
    {
        name: "Canyon Floor",
        image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
        description: "Paradise on Earth!"
    }
];    
    
function seedDB(){
    // REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed Campgrounds.");
        // below code is placd here, to be sure of that campgrounds must be added to the db, after all removes.
        // ADD A FEW CAMPGROUNDS
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else{
                    console.log("added a campground");
                    // create comments
                    Comment.create(
                        {
                            text: "This place is great, net problem sucks!!",
                            author: "Aakash"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        });
                }
            });    
        });
    });
}    

module.exports = seedDB;