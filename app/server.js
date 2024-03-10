const mongoose = require("mongoose");
const app = require("../app");

const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
// const { DB_HOST } = process.env;
// const DB_HOST = process.env.MONGODB_URI;
// const client = new MongoClient(process.env["ATLAS_URI"]);

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`)
    .then(async () => {
        console.log(`http://localhost:${PORT}`);
        app.listen(PORT);
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });
