var express=require("express");
var router=express.Router();
var User=require("../models/user");
var Campground=require("../models/campground");
var middleware=require("../middleware");
//INDEX - show all campgrounds
router.get("/users", function(req, res){
    //get all campgrounds from the database
    User.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        }   else{
          console.log(allUsers);
            res.render("users/show", {users: allUsers});
        }
    });
});

router.get("/users/:id", function(req, res){
    User.findById(req.params.id,function(err, foundUser){
      if(err){
        console.log(err);
      } else{       
            console.log(foundUser);
            Campground.find({'author.id':req.params.id}, (err, campground) => {
              console.log(campground);

            res.render("users/showone", {user: foundUser,campground:campground});
              
            });
        }
      });
    });

module.exports=router;