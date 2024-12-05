const SERVER = import.meta.env.VITE_URL_API;

async function getDBBooks() {
  try {
    const respuesta = await fetch(SERVER + "/books");
    if (!respuesta.ok) {
      throw `Error ${respuesta.status} de la BBDD: ${respuesta.statusText}`;
    }
    return await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}
async function getDBBook(id) {
  try {
    const respuesta = await fetch(SERVER + "/books/" + id);

    if (!respuesta.ok) {
      throw `Error ${respuesta.status} de la BBDD: ${respuesta.statusText}`;
    }
    return await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}
async function bookExist(moduleCode, userId) {
  try {
    const respuesta = await fetch(
      SERVER + "/books/?moduleCode=" + moduleCode + "&userId=" + userId
    );

    if (!respuesta.ok) {
      throw `Error ${respuesta.status} de la BBDD: ${respuesta.statusText}`;
    }
    return await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}
async function addDBBook(book) {
  try {
    const respuesta = await fetch(SERVER + "/books", {
      method: "POST", // o 'PUT', 'GET', 'DELETE'
      body: JSON.stringify(book), // los datos que enviamos al servidor en el 'send'
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!respuesta.ok) {
      throw `Error ${respuesta.status} de la BBDD: ${respuesta.statusText}`;
    }
    return await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}
async function removeDBBook(id) {
  try {
    const respuesta = await fetch(SERVER + "/books/" + id, {
      method: "DELETE", // o 'PUT', 'GET', 'DELETE'
      //body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!respuesta.ok) {
      throw `Error ${respuesta.status} de la BBDD: ${respuesta.statusText}`;
    }
    return await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}
async function changeDBBook(book) {
  try {
    const respuesta = await fetch(SERVER + "/books/" + book.id, {
      method: "PUT", // o 'PUT', 'GET', 'DELETE'
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!respuesta.ok) {
      throw `Error ${respuesta.status} de la BBDD: ${respuesta.statusText}`;
    }
    return await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}
export {
  getDBBooks,
  getDBBook,
  addDBBook,
  removeDBBook,
  changeDBBook,
  bookExist,
};
