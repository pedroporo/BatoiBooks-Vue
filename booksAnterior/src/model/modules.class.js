import Module from "./module.class";
import * as ModulesApi from "../services/modules.api";
class Modules {
  constructor() {
    this.data = [];
  }
  async populate() {
    const modulos = await ModulesApi.getDBModules();
    modulos.forEach((dataB) => {
      this.data.push(
        new Module(dataB.code, dataB.cliteral, dataB.vliteral, dataB.courseId)
      );
    });
  }
  async getModuleByCode(moduleCode) {
    const modulo1 = await ModulesApi.getDBModule(moduleCode);
    const modulo = new Module(
      modulo1[0].code,
      modulo1[0].cliteral,
      modulo1[0].vliteral,
      modulo1[0].courseId
    );
    //const modulo = this.data.find((modulo) => modulo.code == moduleCode);
    if (!modulo) {
      throw "No existe ese modulo";
    }
    return modulo;
  }
  toString() {
    return this.data.toString();
  }
}
export default Modules;
