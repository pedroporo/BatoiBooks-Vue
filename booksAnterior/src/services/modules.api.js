const SERVER = import.meta.env.VITE_URL_API;

async function getDBModules() {
  try {
    const respuesta = await fetch(SERVER + "/modules");
    if (!respuesta.ok) {
      throw `Error ${respuesta.status} de la BBDD: ${respuesta.statusText}`;
    }
    return await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}
async function getDBModule(code) {
  try {
    const respuesta = await fetch(SERVER + "/modules?code=" + code);
    if (!respuesta.ok) {
      throw `Error ${respuesta.status} de la BBDD: ${respuesta.statusText}`;
    }
    return await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}

export { getDBModules, getDBModule };
