import mongoose,{Schema} from "mongoose";

const ContactSchema = new Schema({
    Name:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:Number,
        required:true,
        unique:true,
        minLength:10
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    City:{
        type:String,
        
    },
    Message:{
        type:String,
        required:true
    }

})
const Contact = mongoose.model('ContactForm',ContactSchema);
export default Contact