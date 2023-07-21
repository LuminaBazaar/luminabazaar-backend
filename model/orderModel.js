const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        product: [
            {
                productId: { type: Schema.Types.ObjectId, ref: "product" },
                price: { type: Number },
                quantity: { type: Number, default: 1 },
            },
        ],
        total: { type: Number, required: true },
        shipping: { type: Object, required: true },
        done: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const orderModel = model("order", orderSchema);

module.exports = orderModel;
