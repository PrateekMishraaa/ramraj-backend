import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Mobile: {
        type: Number,
        required: true,
        minLength: 10,
        unique: true
    },
    Address: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model("Users", UserSchema);
export default User;
