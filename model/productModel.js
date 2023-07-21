const { Schema, model } = require("mongoose");

const productSchema = new Schema(
    {
        name: String,
        desc: String,
        price: Number,
        category: {
            type: Schema.Types.ObjectId,
            ref: "category",
            require: true,
        },
        quantity: Number,
        photo: {
            data: Buffer,
            contentType: String,
        },
    },
    { timestamps: true }
);

const productModel = model("product", productSchema);

module.exports = productModel;
