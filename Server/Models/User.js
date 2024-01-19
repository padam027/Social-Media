  
const mongoose = require('mongoose');




const userSchema = mongoose.Schema({

    email:{

        type: String,
        required:true,
        unique:true,
        lowercase:true,
        
        

    },

    password:{
        type:String,
        required: true,
        select: false,
        
    },

    name:{
        type:String,
        required:true
    },

    phone:{
        type:Number,
        required:true
    },

    gender: {
        
        type: String,
        
    
      },


    bio:{
        type: String
    },


    
        avatar: {

           publicId:{type:String, default:'user_h1ndwp'},
            url: {type:String, default:'https://res.cloudinary.com/dtvy6cu1t/image/upload/v1702827148/ProfileImg/user_h1ndwp.png'
        }
    },

        
    
    


    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],

    followings:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"

        }
    ],

    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"post"

        }
    ]
    
    
      
    
}, {
    timestamps: true  // Saves createdAt and updatedAt as dates. Creates them in ISO 8601 format y
});


module.exports = mongoose.model('user', userSchema);