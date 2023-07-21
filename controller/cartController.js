const cartModel = require("../model/cartModel");

const getCartById = async (req, res) => {
    try {
        const data = await cartModel
            .find({ user: req.user.id })
            .populate("product", "name")
            .populate("user", "name");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const createCart = async (req, res) => {
    let cartItem = await cartModel.findOne({
        product: req.body.product,
        user: req.user.id,
    });

    if (cartItem) return res.status(404).send("Card already exists!!!");
    cartItem = new cartModel({
        product: req.body.product,
        price: req.body.price,
        user: req.user.id,
    });
    const data = await cartItem.save();
    res.send(data);
};

const updateCard = async (req, res) => {
    const cardItem = await cartModel.findOne({
        product: req.body.product,
        user: req.user.id,
    });
    if (!cardItem) return res.status(404).send("No card found!!!");

    const data = await cartModel.updateOne(
        { product: req.body.product, user: req.user.id },
        req.body
    );
    res.send(data);
};

const deleteCart = async (req, res) => {
    try {
        const cart = await cartModel.findByIdAndDelete(req.params.id);
        res.send(cart);
    } catch (error) {
        console.log(error);
    }
};

module.exports.getCartById = getCartById;
module.exports.createCart = createCart;
module.exports.updateCard = updateCard;
module.exports.deleteCart = deleteCart;
