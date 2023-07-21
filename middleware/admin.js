module.exports = (req, res, next) => {
    if (req.user.role !== "admin")
        res.status(404).send("something went wrong!!!");
    next();
};
