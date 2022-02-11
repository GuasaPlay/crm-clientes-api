const Product = require("../schemas/Product");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        return res.status(200).json({
            ok: true,
            message: "",
            products,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Ocurrio un error con el servidor",
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, stock, price } = req.body;

        const newProduct = new Product({ name, stock, price });

        const productSaved = await newProduct.save();

        return res.status(200).json({
            ok: true,
            message: "Producto creado con éxito",
            product: productSaved,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Ocurrio un error con el servidor",
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id, name, stock, price } = req.body;

        const productExists = await Product.exists({ _id: id });

        if (!productExists)
            return res.status(404).json({
                ok: false,
                message: "No existe el producto",
            });

        const productUpdated = await Product.findByIdAndUpdate(
            id,
            {
                $set: { name, stock, price },
            },
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: "Producto actualizado con éxito",
            product: productUpdated,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Ocurrio un error con el servidor",
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;

        const userExists = await Product.exists({ _id: id });

        if (!userExists)
            return res.status(404).json({
                ok: false,
                message: "No existe el producto",
            });

        const productDeleted = await Product.deleteOne({ _id: id });

        return res.status(200).json({
            ok: true,
            message: "Producto eliminado con éxito",
            product: { _id: id, ...productDeleted },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Ocurrio un error con el servidor",
        });
    }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
