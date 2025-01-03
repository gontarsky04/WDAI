const express = require("express");
const sequelize = require("../config/database");
const userRoutes = require("./routes/users");

const app = express();

app.use(express.json());
app.use(userRoutes);

const PORT = 3003;

sequelize.sync({ force: false }).then(() => {
    console.log("Baza danych zsynchronizowana!");
    app.listen(PORT, () => {
        console.log(`Serwer działa na porcie ${PORT}`);
    });
});