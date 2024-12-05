const SERVER = import.meta.env.VITE_URL_API;

async function getDBUsers() {
  try {
    const respuesta = await fetch(SERVER + "/users");
    if (!respuesta.ok) {
      throw `Error ${respuesta.status} de la BBDD: ${respuesta.statusText}`;
    }
    return await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}
async function getDBUser(id) {
  try {
    const respuesta = await fetch(SERVER + "/users/" + id);
    if (!respuesta.ok) {
      throw `Error ${respuesta.status} de la BBDD: ${respuesta.statusText}`;
    }
    return await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}
async function addDBUser(book) {
  try {
    const respuesta = await fetch(SERVER + "/users", {
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
async function removeDBUser(id) {
  try {
    const respuesta = await fetch(SERVER + "/users/" + id, {
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
async function changeDBUser(user) {
  try {
    const respuesta = await fetch(SERVER + "/users/" + user.id, {
      method: "PUT", // o 'PUT', 'GET', 'DELETE'
      body: JSON.stringify(user),
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
async function changeDBUserPassword(id, newPassword) {
  try {
    const respuesta = await fetch(SERVER + "/users/" + id, {
      method: "PATCH", // o 'PUT', 'GET', 'DELETE'
      body: JSON.stringify({ password: newPassword }),
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
  getDBUsers,
  getDBUser,
  addDBUser,
  removeDBUser,
  changeDBUser,
  changeDBUserPassword,
};
