import Book from "./book.class";
import * as BooksApi from "../services/books.api";
class Books {
  constructor() {
    this.data = [];
  }
  async populate() {
    const libros = await BooksApi.getDBBooks();

    libros.forEach((libro) => {
      this.data.push(new Book(libro));
    });
  }
  async addBook(datos) {
    const newBook = new Book(await BooksApi.addDBBook(datos));
    this.data.push(newBook);

    return newBook;
  }
  async removeBook(id) {
    this.data = this.data.filter((book) => book !== this.getBookById(id));
    await BooksApi.removeDBBook(id);
  }
  async changeBook(newBook) {
    const index = this.getBookIndexById(newBook.id);
    this.data[index] = new Book(await BooksApi.changeDBBook(newBook));
    return this.data[index];
  }
  getBookById(bookId, books = this.data) {
    const libro = books.find((book) => book.id == bookId);
    if (!libro) {
      throw "No existe ese libro";
    }
    return libro;
  }

  getBookIndexById(bookId, books = this.data) {
    const indexLibro = books.findIndex((book) => book.id == bookId);
    if (indexLibro === -1) {
      throw "No existe ese indice";
    }
    return indexLibro;
  }
  async bookExists(userId, moduleCode, books = this.data) {
    /*const libros = this.booksFromModule(
      moduleCode,
      this.booksFromUser(userId, books)
    );*/
    const libros=await BooksApi.bookExist(moduleCode,userId);
    return libros.length > 0 ? true : false;
  }
  booksFromUser(userId, books = this.data) {
    const libros = books.filter((book) => book.userId == userId);
    if (!libros) {
      throw "Este usuario no tiene libros";
    }
    return libros;
  }
  booksFromModule(moduleCode, books = this.data) {
    const libros = books.filter((book) => book.moduleCode == moduleCode);
    if (!libros) {
      throw "Este modulo no tiene libros";
    }
    return libros;
  }
  booksFromPublisher(publisher, books = this.data) {
    const libros = books.filter((book) => book.publisher == publisher);
    return libros;
  }
  booksCheeperThan(price, books = this.data) {
    const libros = books.filter((book) => book.price <= price);
    return libros;
  }
  booksWithStatus(status, books = this.data) {
    const libros = books.filter((book) => book.status === status);
    if (!libros) {
      throw "No existen libros con este estado";
    }
    return libros;
  }
  averagePriceOfBooks(books = this.data) {
    let numLibros = books.length;
    let avrgPrice =
      books.reduce((total, book) => (total += book.price), 0) / numLibros;
    if (numLibros == 0) {
      avrgPrice = 0;
    }
    let strPrice = "" + avrgPrice.toFixed(2) + " €";
    return strPrice;
  }
  booksOfTypeNotes() {
    let moduloApuntes = "Apunts";
    const libros = this.booksFromPublisher(moduloApuntes);
    return libros;
  }
  booksNotSold() {
    const libros = this.data.filter((book) => book.soldDate === "");
    if (!libros) {
      throw "No hay libros disponibles";
    }
    return libros;
  }
  toString() {
    return this.data.toString();
  }
}

export default Books;
