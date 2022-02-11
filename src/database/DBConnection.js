const mongoose = require("mongoose");

const uri = "mongodb+srv://oscarrcs123:jAV8TJQa8wdP@curso-mongodb.z8q4g.mongodb.net/crm-clientes";

const DBConnection = async () => {
    try {
        await mongoose.connect(uri);
        console.log("DB is connected");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to initialize database");
    }
};

module.exports = DBConnection;
