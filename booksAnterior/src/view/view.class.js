export default class View {
  constructor() {
    this.bookList = document.getElementById("list");
    this.bookForm = document.getElementById("form");
    //this.remove = document.getElementById("remove");
    this.messages = document.getElementById("messages");
    this.init();
  }
  init() {
    this.router();
    window.addEventListener("hashchange", (event) => {
      this.router(event);
    });
  }
  router(event) {
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.add("hidden");
    });
    const page = document.getElementById(event?.newURL.split("#")[1]);
    if (page) {
      page.classList.remove("hidden");
    } else {
      this.bookList.classList.remove("hidden");
    }
  }
  renderModulesOptions(modules) {
    modules.forEach((module) => {
      const option = document.createElement("option");
      option.innerHTML = module.cliteral;
      option.value = module.code;
      const select = document.getElementById("id-module");
      select.appendChild(option);
    });
  }
  renderModulesRadiobutton() {
    const states = ["new", "good", "used", "bad"];
    states.forEach((state) => {
      const radiobutton = document.createElement("input");
      radiobutton.type = "radio";
      radiobutton.classList.add("state_" + state);
      radiobutton.name = "state";
      radiobutton.value = state;
      radiobutton.setAttribute("required", true);
      const label = document.createElement("label");
      label.htmlFor = state;
      label.innerHTML = state;
      const select = document.getElementById("status").lastElementChild;
      select.before(radiobutton);
      select.before(label);
    });
  }

  renderBook(book) {
    let divLibro = document.getElementById("book-" + book.id);
    if (!divLibro) {
      divLibro = document.createElement("div");
      divLibro.className = "card";
      divLibro.id = "book-" + book.id;
    }
    divLibro.innerHTML = this.showBook(book);
    this.bookList.appendChild(divLibro);
  }
  showBook(book) {
    return `
    <img src="${book.photo}" alt="Libro ${book.id}">
    <div>
    <h3>${book.moduleName} (${book.id})</h3>
    <h4>${book.publisher}</h4>
    <p>Precio: ${book.price} &euro;</p>
    <p>Estado: ${book.status}</p>
    <p>${this.renderNowDateInfo(book.date)}</p>
    <p>Comentarios:${book.comments}</p>
    <div data-id="${book.id}">
    <button class="add-to-cart"><span class="material-icons"'>add_shopping_cart</span></button> 
    <button class="edit"'><span class="material-icons">edit</span></button> 
    <button class="remove"><span class="material-icons">delete</span></button>
    </div>
    </div>
    `;
  }
  modifyBook(book) {
    const divLibro = document.getElementById("book-" + book.id);
    divLibro.innerHTML = this.showBook(book);
    this.renderEmptyForm();
  }
  removeBook(bookId) {
    const book = document.getElementById("book-" + bookId);
    book.remove();
  }
  renderMessage(tipo, message) {
    const divMensaje = document.createElement("div");
    divMensaje.innerHTML =
      message +
      "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close' onclick='this.parentElement.remove()'>x</button>";
    divMensaje.role = "alert";
    divMensaje.classList.add(tipo);
    divMensaje.toggleAttribute("alert");
    divMensaje.toggleAttribute("alert-danger");
    divMensaje.toggleAttribute("alert-dismissible");
    this.messages.appendChild(divMensaje);
    if (tipo != "error") {
      setTimeout(() => {
        divMensaje.remove();
      }, 3000);
    }
  }

  setBookSubmitHandler(callback) {
    this.bookForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!this.validateForm()) {
        return;
      }
      const id = document.getElementById("id-book").value ?? null;
      const publisher = document.getElementById("publisher").value;
      const moduleCode = document.getElementById("id-module").value;
      const status = document.querySelector(
        "input[name='state']:checked"
      ).value;
      const price = document.getElementById("price").value;
      const pages = document.getElementById("pages").value;
      const comments = document.getElementById("comments").value;
      const book = {
        id,
        publisher,
        price,
        moduleCode,
        status,
        pages,
        comments,
      };
      callback(book);
    });
    this.bookForm.addEventListener("reset", () => {
      this.renderEmptyForm();
    });
  }
  setBookButtonsHandler(callback) {
    this.bookList.addEventListener("click", (event) => {
      const buttonClicked = event.target.closest("button");
      if (!buttonClicked) return;
      const button = buttonClicked.className;
      callback(button, buttonClicked.parentElement.dataset.id);
    });
  }
  renderNowDateInfo(date) {
    if (!date) {
      return "En venta";
    } else {
      const dateObject = new Date(date);
      return `Vendido el ${dateObject.toLocaleDateString()}`;
    }
  }
  renderEmptyForm() {
    document.getElementById("id-book").parentNode.classList.add("hidden");
    this.bookForm.firstElementChild.innerText = "Añadir libro";
    document.querySelector("button[type=submit]").innerText = "Añadir";
    document.getElementById("bookForm").reset();
  }
  renderFormHandeler(callback) {
    document.getElementById("id-book").parentNode.classList.remove("hidden");
    this.bookForm.firstElementChild.innerText = "Editar Libro";
    document.querySelector("button[type=submit]").innerText = "Editar";
    document.getElementById("id-book").value = callback.id;
    document.getElementById("id-module").value = callback.moduleCode;
    document.getElementById("publisher").value = callback.publisher;
    document.getElementById("price").value = callback.price;
    document.getElementById("pages").value = callback.pages;
    document.getElementsByClassName(
      "state_" + callback.status
    )[0].checked = true;
    document.getElementById("comments").value = callback.comments;
    /*this.bookForm.addEventListener("submit", (event) => {
      callback();
    });*/
  }
  validateForm() {
    const formDivs = document.querySelectorAll("#bookForm div");

    formDivs.forEach((div) => {
      const input = div.firstChild.nextElementSibling.nextElementSibling;
      div.lastElementChild.innerHTML = input.validationMessage;
    });
    return document.getElementById("bookForm").checkValidity();
  }
}
