import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isverified: {
        type: Boolean,
        default: false,
    },
});


userSchema.pre('save', function(next) {
    if (this.isNew) {
        // Schedule deletion after 3 minutes if not verified
        setTimeout(async () => {
            const user = await mongoose.model("User").findById(this._id);
            if (user && !user.isverified) {
                await mongoose.model("User").findByIdAndDelete(this._id);
                console.log(`User ${this._id} has been deleted due to unverified status of the user`);
            }
        }, 3 * 60 * 1000); // 3 minutes in milliseconds
    }
    next();
});

const User = mongoose.model("User", userSchema);
export default User;