import mongoose, {Schema} from "mongoose"
import paginate from 'mongoose-paginate-v2';

const videoSchema = new Schema({
    videoFile:{
        type: String, //Cloudinary URL
        required: true,
    },
    thumbnail:{
        type: String, // Cloudinary URL
        required: true,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title:{
        type: String,
        required: true,
        index: true,
    },
    description:{
        type: String,
        required: true,
    },
    isPublished:{
        type: Boolean,
        default: true,
    },
    duration:{
        type: Number,
        required: true,
    },
    views:{
        type: Number,
        default: 0,
    }
    
}, {timestamps: true})


videoSchema.plugin(paginate);

export const Video = Schema.model("Video", videoSchema)