import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required!"]
    },
    userName: {
        type: String,
        required: [true, "userName is required!"],
        unique: [true, 'userName should be unique!']
    },
    email: {
        type: String,
        required: [true, "email is required!"],
        unique: [true, "email should be unique!"]
    },
    password: {
        type: String,
        required: [true, "password is required!"]
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    }
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)