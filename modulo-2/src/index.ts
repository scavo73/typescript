import { ApiClient } from "./services/api-client.js";
import type { Estudiante } from "./domain/types/estudiante.js";

const apiClient = new ApiClient();

async function main(): Promise<void> {
  const respuesta = await apiClient.obtenerRecurso<Estudiante[]>("/estudiantes");
  console.log(respuesta);
}

main();