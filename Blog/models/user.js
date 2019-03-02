var mongoose=require("mongoose"),
	passportLocalMongoose=require("passport-local-mongoose");

var UserSchema=new mongoose.Schema({
	username:String,
	image:String,
	password:String,
	// posts:[
 //    	id:{
 //    		type:mongoose.Schema.Types.ObjectId,
 //    		ref:"Post"
 //    	}
 //    ]
	
});
UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);