import "./style.css";
import batoiLogo from "/logoBatoi.png?url";
import Controller from "./src/controller/controller.class";

document.querySelector("#app").innerHTML = `
<header>
  <img src="${batoiLogo}" class="logo" alt="Logo Batoi" />

  <h1>BatoiBooks</h1>
</header>
<nav id="menu">
  <ul>
    <li><a href="#list" id="linkList">Ver Libros</a></li>
    <li><a href="#form" id="linkForm">Añadir Libro</a></li>
    <li><a href="#about">Acerca de...</a></li>
  </ul>
</nav>
<div id="messages"></div>
<div id="list" class="page hidden"></div>
<div id="form" class="page hidden">
  <p>Añadir libro</p>
  <form id="bookForm" novalidate>
    <div class="hidden">
      <label for="id-book" id="label-id-book">Id:</label>
      <input type="text" id="id-book" disabled />
    </div>

    <div>
      <label for="id-module">Módulo:</label>
      <select id="id-module" required>
        <option default hidden value="">- Selecciona un módulo -</option>
      </select>
      <span class="errorM"></span>
    </div>

    <div>
      <label for="publisher">Editorial:</label>
      <input type="text" id="publisher" required />
      <span class="errorM"></span>
    </div>

    <div>
      <label for="price">Precio:</label>
      <input type="number" id="price" min="0" step="0.01" required/>
      <span class="errorM"></span>
    </div>

    <div>
      <label for="pages">Páginas:</label>
      <input type="number" id="pages" required min="0" step="1" />
      <span class="errorM"></span>
    </div>

    <div id="status">
      <label>Estado:</label>
      <!-- Aquí poned un radiobutton para cada estado -->
      <span class="errorM"></span>
    </div>

    <div>
      <label for="comments">Comentarios:</label>
      <textarea id="comments"></textarea>
    </div>

    <button type="submit">Añadir</button>
    <button type="reset">Reset</button>
  </form>
</div>
<div id="about" class="page hidden">
<footer>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nulla atque
  eaque, soluta aliquid deleniti magni nemo aliquam itaque eos quis voluptate
  optio aperiam quasi, repellat dolorum qui consectetur unde.
</footer>
</div>


  
`;
document.addEventListener("DOMContentLoaded", () => {
  const myController = new Controller();
  myController.init();
});
