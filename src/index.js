const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const DBConnection = require("./database/DBConnection");

const productRoutes = require("./routes/product.routes");
const customerRoutes = require("./routes/customer.routes");
const config = require("./config");

// Camel case


async function startExpressServer(params) {
    const app = express();

    app.use(morgan("dev"));
    app.use(cors());

    app.use(express.json());

    const baseURL = "/api/v1";

    app.use(`${baseURL}/product`, productRoutes);

    app.use(`${baseURL}/customer`, customerRoutes);

    app.get("/", (request, response) => {
        response.json({ message: "Hola desde el servidor Express.js" });
    });

    await DBConnection();

    app.listen(config.port, () => {
        console.log(`Server listo en http://localhost:${config.port}`);
    });
}

startExpressServer();
