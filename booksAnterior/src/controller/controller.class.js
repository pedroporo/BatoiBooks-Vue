import Modules from "../model/modules.class";
import Users from "../model/users.class";
import Books from "../model/books.class";
import View from "../view/view.class";
import Cart from "../model/cart.class";
export default class Controller {
  constructor() {
    this.model = {
      modules: new Modules(),
      users: new Users(),
      books: new Books(),
      cart: new Cart(),
    };
    this.view = new View();
  }
  async init() {
    await Promise.all([
      this.model.modules.populate(),
      this.model.users.populate(),
      this.model.books.populate(),
    ]);

    this.model.cart.populate();
    this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
    this.view.setBookButtonsHandler(this.handleButtonsBook.bind(this));
    this.handleRenderBooks();
    this.view.renderModulesOptions(this.model.modules.data);
    this.view.renderModulesRadiobutton();
  }
  handleButtonsBook(buttonType, id) {
    switch (buttonType) {
      case "remove":
        this.handleRemoveBook(id);
        break;
      case "edit":
        this.handleEditBook(id);
        break;
      case "add-to-cart":
        this.handleCartBook(id);
        break;
    }
  }
  async handleSubmitBook(payload) {
    try {
      const module = await this.model.modules.getModuleByCode(
        payload.moduleCode
      );
      if (payload.id != "") {
        const modBook = await this.model.books.changeBook(payload);
        modBook.moduleName = module.cliteral;
        this.view.renderBook(modBook);
        this.view.renderMessage("success", "Libro modificado con exito");
      } else {
        delete payload["id"];
        payload["userId"]=5;
        if (
          await this.model.books.bookExists(payload["userId"], payload["moduleCode"])
        ) {
          const mod=document.getElementById("id-module");
          mod.setCustomValidity('Ya tienes un libro de este modulo')
          mod.nextElementSibling.innerHTML=mod.validationMessage;
          
        } else {
          const newBook = await this.model.books.addBook(payload);
          newBook.moduleName = module.cliteral;
          this.view.renderBook(newBook);
          this.view.renderMessage("success", "Libro añadido con exito");
        }
      }
    } catch (error) {
      this.view.renderMessage("error", error);
    }
  }
  async handleCartBook(payload) {
    try {
      this.model.cart.addItem(this.model.books.getBookById(payload));
      this.view.renderMessage("success", "Libro añadido al carrito con exito");
    } catch (error) {
      this.view.renderMessage("error", error);
    }
  }
  async handleEditBook(payload) {
    try {
      const bookRaw = this.model.books.getBookById(payload);
      this.view.renderFormHandeler(bookRaw);
    } catch (error) {
      this.view.renderMessage("error", error);
    }
  }
  async handleRemoveBook(payload) {
    try {
      if (confirm("Estas seguro de eliminar el libro con id" + payload)) {
        await this.model.books.removeBook(payload);
        this.view.removeBook(payload);
        this.view.renderMessage("success", "Libro eliminado con exito");
      }
    } catch (error) {
      this.view.renderMessage("error", error);
    }
  }
  handleRenderBooks() {
    this.model.books.data.forEach(async (book) => {
      const module = await this.model.modules.getModuleByCode(book.moduleCode);
      book.moduleName = module.cliteral;
      this.view.renderBook(book);
    });
  }
}
