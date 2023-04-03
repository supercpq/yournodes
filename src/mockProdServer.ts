import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import Module1 from "../mock/creator";
import Module2 from "../mock/title";
import Module3 from "../mock/user";

export function setupProdMockServer() {
  createProdMockServer([...Module1, ...Module2, ...Module3]);
}
