<script>
export default {
  name: "AddBok",
}
</script>
<template>
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
        <input type="number" id="price" min="0" step="0.01" required />
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
</template>
