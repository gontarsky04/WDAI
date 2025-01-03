const express = require("express");
const userService = require("../services/userService");
const { authenticateToken } = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/api/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Brak wymaganych danych wejściowych.");
    }

    try {
        const newUser = await userService.registerUser({ email, password });
        res.status(201).json({ id: newUser.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Brak wymaganych danych wejściowych.");
    }

    try {
        const { token } = await userService.loginUser(email, password);
        res.json({ token });
    } catch (error) {
        res.status(401).send(error.message);
    }
});

router.get("/api/profile", authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const user = await userService.getUserProfile(userId);
        res.json(user);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;