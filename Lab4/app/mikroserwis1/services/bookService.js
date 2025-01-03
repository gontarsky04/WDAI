const Book = require("../models/book");

const getAllBooks = async () => {
    return await Book.findAll();
};

const getBookById = async (bookId) => {
    return await Book.findByPk(bookId);
};

const addBook = async (bookData) => {
    return await Book.create(bookData);
};

const addBooksInBulk = async (books) => {
    return await Book.bulkCreate(books);
};

const deleteBook = async (bookId) => {
    const rowsDeleted = await Book.destroy({ where: { id: bookId } });
    return rowsDeleted > 0;
};

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    addBooksInBulk,
    deleteBook,
};