const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "product",
            required: true,
        },
        user: { type: Schema.Types.ObjectId, ref: "user", required: true },
        price: Number,
        quantity: { type: Number, min: 1, max: 5, default: 1 },
    },
    { timestamps: true }
);

const cartModel = model("cart", cartSchema);

module.exports = cartModel;
