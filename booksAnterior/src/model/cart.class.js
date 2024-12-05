import Book from "./book.class";

export default class Cart {
  constructor() {
    this.data = [];
  }
  populate() {}
  getBookById(bookId, books = this.data) {
    const libro = books.find((book) => book.id == bookId);
    if (!libro) return {};
    return libro;
  }
  addItem(book) {
    const newBook = new Book(book);
    if (this.getBookById(newBook.id) instanceof Book) {
      throw new Error("Este libro ya esta en el carrito");
    }
    this.data.push(newBook);
  }
  removeItem(id) {
    if (this.getBookById(id) instanceof Book) {
      this.data = this.data.filter((book) => book !== this.getBookById(id));
    }
    throw new Error("Este libro no existe");
  }
  toString() {
    return this.data.toString();
  }
}
