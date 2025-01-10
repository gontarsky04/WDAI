const express = require("express");
const bookService = require("../services/bookService");

const router = express.Router();

router.get("/api/books", async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).send("Błąd podczas pobierania książek.");
    }
});

router.get("/api/books/:bookId", async (req, res) => {
    const bookId = req.params.bookId;
    try {
        const book = await bookService.getBookById(bookId);
        if (!book) {
            return res.status(404).send("Nie znaleziono książki o podanym ID.");
        }
        res.json(book);
    } catch (error) {
        res.status(500).send("Błąd podczas pobierania książki.");
    }
});

router.post("/api/books", async (req, res) => {
    const { name, author, year } = req.body;
    if (!name || !author || !year) {
        return res.status(400).send("Brak wymaganych danych wejściowych.");
    }
    try {
        const newBook = await bookService.addBook({ name, author, year });
        res.status(201).json({ id: newBook.id });
    } catch (error) {
        res.status(500).send("Błąd podczas dodawania książki.");
    }
});

router.post("/api/books/bulk", async (req, res) => {
    const books = req.body;
    try {
        const createdBooks = await bookService.addBooksInBulk(books);
        res.status(201).json(createdBooks);
    } catch (error) {
        res.status(500).send("Błąd podczas dodawania książek.");
    }
});

router.delete("/api/books/:bookId", async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const deletedBook = await bookService.deleteBook(bookId);
        if (!deletedBook) {
            return res.status(404).send("Nie znaleziono książki do usunięcia.");
        }
        res.status(200).send("Pomyślnie usunięto książkę.");
    } catch (error) {
        res.status(500).send("Błąd podczas usuwania książki.");
    }
});

module.exports = router;
