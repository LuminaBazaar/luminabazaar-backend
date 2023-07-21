const formidable = require("formidable");
const fs = require("fs");
const productModel = require("../model/productModel");

const getProduct = async (req, res) => {
    try {
        const data = await productModel
            .find()
            .select({ photo: 0 })
            .populate("category", "name");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getProductById = async (req, res) => {
    try {
        const data = await productModel
            .findById(req.params.id)
            .select({ photo: 0 })
            .populate("category", "name");
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getFilterProduct = async (req, res) => {
    const filter = req.body;
    const arg = {};

    for (let i in filter) {
        if (filter[i].length > 0) {
            if (i === "category") {
                arg["category"] = {
                    $in: filter[i],
                };
            }
        }
        if (filter[i].length > 0) {
            if (i === "price") {
                if (filter[i][0]) {
                    arg["price"] = {
                        $gte: filter[i][0],
                    };
                }
                if (filter[i][1]) {
                    arg["price"] = {
                        $lte: filter[i][1],
                    };
                }
            }
        }
    }
    try {
        const data = await productModel
            .find(arg)
            .select({ photo: 0 })
            .populate("category", "name");
        //console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getPhotoById = async (req, res) => {
    try {
        const data = await productModel
            .findById({ _id: req.params.id })
            .select({ photo: 1 });

        res.set("Content-Type", data.photo.contentType);
        res.send(data.photo.data);
    } catch (error) {
        console.log(error);
    }
};

const createProduct = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) return res.status(404).send("something went wrong!!!");

        const product = new productModel(fields);
        fs.readFile(files.photo.filepath, async (error, result) => {
            if (error) return res.status(404).send("something went wrong!!!");
            product.photo.data = result;
            product.photo.contentType = files.photo.mimetype;
            const data = await product.save();

            res.send(fields);
        });
    });
};

const updateProduct = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    const product = await productModel
        .findById(req.params.id)
        .select({ photo: 0 });

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(404).send("something went wrong!!!");

        for (let i in fields) {
            product[i] = fields[i];
        }

        if (files.photo) {
            if (files.photo.originalFilename) {
                fs.readFile(files.photo.filepath, async (err, result) => {
                    product.photo.data = result;
                    product.photo.contentType = files.photo.mimetype;

                    try {
                        product.save();
                        res.send(fields);
                    } catch (error) {
                        console.log(error);
                    }
                });
            } else {
                try {
                    product.save();
                    res.send(fields);
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            try {
                product.save();
                res.send(fields);
            } catch (error) {
                console.log(error);
            }
        }
    });
};

const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        res.send(product);
    } catch (error) {
        console.log(error);
    }
};

module.exports.getProduct = getProduct;
module.exports.getProductById = getProductById;
module.exports.getFilterProduct = getFilterProduct;
module.exports.getPhotoById = getPhotoById;
module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
