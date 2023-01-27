import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import Module1 from "../mock/creator";
import Module2 from "../mock/title";
import Module3 from "../mock/user";
// const modules: Record<string, any> = import.meta.glob("../mock/*.ts", {
//     eager: true
//   });
// console.log(...Module1, ...Module2, ...Module3);
// const mockModules = Array<any>([]);

// Object.keys(modules).forEach((key) => {
//   mockModules.push(...modules[key].default);
// });

export function setupProdMockServer() {
  createProdMockServer([...Module1, ...Module2, ...Module3]);
}
