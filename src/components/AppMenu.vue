<script>
export default {
  name: "AppMenu",
}
</script>
<template>
  <nav id="menu">
    <ul>
      <li><router-link to="/list">Ver Libros</router-link></li>
      <li><router-link to="/addBook">Añadir Libro</router-link></li>
      <li><router-link to="/about">Acerca de...</router-link></li>
    </ul>
  </nav>
</template>
