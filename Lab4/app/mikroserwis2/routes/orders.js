const express = require("express");
const orderService = require("../services/orderService");

const router = express.Router();

router.get("/api/orders/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const orders = await orderService.getOrderByUserID(userId);
        if (orders.length === 0) {
            return res
                .status(404)
                .send("Nie znaleziono zamówień dla tego użytkownika.");
        }
        res.json(orders);
    } catch (error) {
        res.status(500).send("Błąd podczas pobierania zamówień.");
    }
});

router.post("/api/orders", async (req, res) => {
    const { userId, bookId, quantity } = req.body;

    if (!userId || !bookId || !quantity) {
        console.error("Brak wymaganych danych wejściowych:", req.body);
        return res.status(400).send("Brak wymaganych danych wejściowych.");
    }

    try {
        console.log("Otrzymano żądanie do utworzenia zamówienia:", req.body);
        const newOrder = await orderService.addOrder({ userId, bookId, quantity });
        res.status(201).json({ id: newOrder.id });
    } catch (error) {
        console.error("Błąd podczas dodawania zamówienia:", error.message);

        if (error.message === "Książka o podanym ID nie istnieje.") {
            return res.status(400).send(error.message);
        }

        res.status(500).send("Błąd podczas dodawania zamówienia.");
    }
});


router.delete("/api/orders/:orderId", async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const deletedOrder = await orderService.deleteOrder(orderId);

        if (!deletedOrder) {
            console.error(`Order with ID ${orderId} not found.`);
            return res.status(404).send("Nie znaleziono zamówienia do usunięcia.");
        }

        res.status(200).send("Pomyślnie usunięto zamówienie.");
    } catch (error) {
        console.error("Błąd podczas usuwania zamówienia:", error);
        res.status(500).send("Błąd podczas usuwania zamówienia.");
    }
});

router.patch("/api/orders/:orderId", async (req, res) => {
    const orderId = req.params.orderId;
    const updateData = req.body;

    try {
        const updatedOrder = await orderService.updateOrder(orderId, updateData);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).send("Błąd podczas aktualizacji zamówienia.");
    }
});

module.exports = router;
