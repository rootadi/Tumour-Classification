var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var User=require("../models/user");
var middleware=require("../middleware");
//INDEX - show all campgrounds
router.get("/campgrounds", function(req, res){
    //get all campgrounds from the database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }   else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds,currentUser:req.user});
        }
    });
});

//CREATE - add new campground to DB
router.post("/campgrounds",middleware.isLoggedIn,function(req, res){
    //get data from form and add to campground array or now DB
    
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author={
      id: req.user._id,
      username:req.user.username
    }
    var newCampground = {name: name, image: image, description: desc ,author:author};  //we made this js object because our array is having js objects...
    //create a new campground and save it to the database
    Campground.create(newCampground, function(err, newlyCreatedCampground){
        if(err){
            console.log(err);
        }   else{
               //redirect back to campgrounds page
               res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/campgrounds/new",middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");    
});

// SHOW - shows more info about one campground
router.get("/campgrounds/:id", function(req, res){
    // find the campground with provided ID
    // Campground.findById(id, callback)
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       }  else{
                  
                //render show template with that campground
                   /* User.findOne({_id: req.params.id}, function(err, user){
                      if(err){
                          console.log(err);
                      }else{
                      Campground.findOne({author: req.params.id}, function(err, blogs){
                        console.log(foundCampground);
                        console.log(blogs);
                          res.render("campgrounds/show", {campground: foundCampground, user: user});
                          
                            });
                    }
                      
                    }); */
 Campground.findById(req.params.id,function(err,foundCampground){
if(err){
           console.log(err);
       }  else{
                  User.findOne({_id: foundCampground.author.id}, function(err, user){
                      if(err){
                          console.log(err);
                      }else{
                        Comment.find({_id:foundCampground.comments},function(err, allComments){
                                                      if(err){
                                                            console.log(err);
                                                              }   else{
                                                                console.log(foundCampground);
                        console.log(user);
                        console.log(allComments);
                        res.render("campgrounds/show", {campground: foundCampground, user: user,comments:allComments});
}
});
}
});
}
});
}
})
});
                        





















//EDIT CAMPGROUND
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
             res.render("campgrounds/edit",{campground: foundCampground});
                    });
});
  
//UPDATE CAMPGROUND
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    }else{
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
  
});

//DESTROY CAMPGROUND
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
  Campground.findByIdAndRemove(req.params.id,function(err){
    if(err){
      res.redirect("/campgrounds");
    }else{
      res.redirect("/campgrounds");
    }
  })
});



module.exports=router;