const sequelize = require("../config/database");
const Book = require("./models/book");
const express = require("express");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/books");
const app = express();
const PORT = 3001;

sequelize.sync({ force: false }).then(() => {
    console.log("Baza danych zsynchronizowana!");
});

app.use(bodyParser.json());
app.use(bookRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Serwis działa na porcie ${PORT}`);
    });
});