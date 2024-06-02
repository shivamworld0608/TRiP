//verify model containing user id and otp that will remail only for 3 minutes

import mongoose from "mongoose";

const verifySchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        expires: 180,
    },
});

const Verify = mongoose.model("Verify", verifySchema);

export default Verify;

