const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        unique: true,
        required: true,
    },
    phone: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    postcode: Number,
    country: String,
});

const profileModel = mongoose.model("profile", profileSchema);

module.exports.profileModel = profileModel;
