import { calcMediaAritmetica } from "./math-utils.js";
import { calcMediana } from "./math-utils.js";
import { filtrarValoresAtipicos } from "./math-utils.js";


const valores = [10, 12, 23, 23, 16, 23, 21, 16, 100];

console.log("valores: " + valores);
console.log("media:" + calcMediaAritmetica(valores));
console.log("mediana: " + calcMediana(valores));
console.log("valores atipicos inferiores: " + filtrarValoresAtipicos(valores, 1.5).inferiores);
console.log("valores atipicos superiores: " + filtrarValoresAtipicos(valores, 1.5).superiores);

