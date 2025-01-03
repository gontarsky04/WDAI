const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "7s2kFJvL3nMeQ8R1Pz0XyW4vT9gB6dCjH5aN1mOoV2k";

const registerUser = async (userData) => {
    const { email, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ email, password: hashedPassword });
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Nieprawidłowe dane.");
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: "1h",
    });

    return { token };
};

const getUserProfile = async (userId) => {
    const user = await User.findByPk(userId, { attributes: ["id", "email"] });
    if (!user) {
        throw new Error("Nie znaleziono użytkownika.");
    }
    return user;
};

module.exports = { registerUser, loginUser, getUserProfile };