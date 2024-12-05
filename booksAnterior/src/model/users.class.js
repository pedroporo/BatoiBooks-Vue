import User from "./user.class";
import * as UsersApi from "../services/users.api";
class Users {
  constructor() {
    this.data = [];
  }
  async populate() {
    const usuarios = await UsersApi.getDBUsers();
    usuarios.forEach((dataB) => {
      this.data.push(
        new User(dataB.id, dataB.nick, dataB.email, dataB.password)
      );
    });
  }
  async addUser(datos) {
    const newUserData = await UsersApi.addDBUser(datos);
    const newUser = new User(
      newUserData.id,
      newUserData.nick,
      newUserData.email,
      newUserData.password
    );
    this.data.push(newUser);
    return newUser;
  }
  async removeUser(id) {
    this.data = this.data.filter((user) => user !== this.getUserById(id));
    await UsersApi.removeDBUser(id);
  }
  async changeUser(newUser) {
    const index = this.getUserIndexById(newUser.id);
    const newUserData = await UsersApi.changeDBUser(newUser);
    const usuarioNuevo = new User(
      newUserData.id,
      newUserData.nick,
      newUserData.email,
      newUserData.password
    );
    this.data[index] = usuarioNuevo;
    return this.data[index];
  }
  async changeUserPassword(id, passwd) {
    const userChangedData = await UsersApi.changeDBUserPassword(id, passwd);
    console.log(userChangedData);

    const userChanged = new User(
      userChangedData.id,
      userChangedData.nick,
      userChangedData.email,
      userChangedData.password
    );
    const index = this.getUserIndexById(id);
    this.data[index] = userChanged;
    return this.data[index];
  }
  getUserById(userId, users = this.data) {
    const user = users.find((user) => user.id == userId);
    if (!user) {
      throw "Ese usuario no existe";
    }
    return user;
  }
  getUserIndexById(userId, users = this.data) {
    const indexUsuario = users.findIndex((user) => user.id == userId);
    if (indexUsuario < 0) {
      throw "No existe ese indice";
    }
    return indexUsuario;
  }
  getUserByNickName(nick, users = this.data) {
    const user = users.find((user) => user.nick == nick);
    if (!user) {
      throw "Ese usuario no existe";
    }
    return user;
  }
  toString() {
    return this.data.toString();
  }
}
export default Users;
