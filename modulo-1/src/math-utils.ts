// Media Aritmetica
export function calcMediaAritmetica(array: number[]): number | null {
   if (array.length === 0) {
    return null;
   }
   let i: number  = 0;
   array.forEach(num => i += num);
   return i / array.length;
}

// Mediana
export function calcMediana(array: number[]): number | null {
    if (array.length === 0) {
        return null;
    }
     // Crear copia ordenada 
  const ordenados = [...array].sort((a, b) => a - b);
  const mitad = Math.floor(ordenados.length / 2);
  
  if (ordenados.length % 2 === 0) {
    // Par: promedio de los dos centrales
    return ((ordenados[mitad - 1] ?? 0) + (ordenados[mitad] ?? 0)) / 2;
  } else {
    // Impar: valor central
    return ordenados[mitad] ?? 0;
  }
}

// filtrar valores atipicos

export function filtrarValoresAtipicos(
    array: number[],
    limite: number = 1.5
  ): { inferiores: number[]; superiores: number[] } {
    if (array.length === 0) {
      return { inferiores: [], superiores: [] };
    }
  
    const ordenados = [...array].sort((a, b) => a - b);
  
    const mitad = Math.floor(ordenados.length / 2);
  
    const mitadInferior = ordenados.slice(0, mitad);
    const mitadSuperior =
      ordenados.length % 2 === 0
        ? ordenados.slice(mitad)
        : ordenados.slice(mitad + 1);
  
    const quartil1 = calcMediana(mitadInferior) ?? 0;
    const quartil3 = calcMediana(mitadSuperior) ?? 0;
  
    const iqr = quartil3 - quartil1;
  
    const limiteInferior = quartil1 - limite * iqr;
    const limiteSuperior = quartil3 + limite * iqr;
  
    const inferiores: number[] = [];
    const superiores: number[] = [];
  
    for (const num of array) {
      if (num < limiteInferior) {
        inferiores.push(num);
      } else if (num > limiteSuperior) {
        superiores.push(num);
      }
    }

    return { inferiores, superiores };
  }