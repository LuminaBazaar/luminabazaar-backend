const userRouter = require("../router/userRouter");
const categoryRouter = require("../router/categoryRouter");
const productRouter = require("../router/productRouter");
const cartRouter = require("../router/cartRouter");
const orderRouter = require("../router/orderRouter");
const profileRouter = require("../router/profileRouter");
const paymentRouter = require("../router/paymentRouter");

module.exports = (app) => {
    app.use("/user/", userRouter);
    app.use("/category", categoryRouter);
    app.use("/product", productRouter);
    app.use("/cart", cartRouter);
    app.use("/order", orderRouter);
    app.use("/profile", profileRouter);
    app.use("/payment", paymentRouter);
};
