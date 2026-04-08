import type { Estudiante } from "../domain/types/estudiante.js";
import type { Asignatura } from "../domain/types/asignatura.js";

interface RespuestaAPI<T> {
    codigoEstado: number;
    exito: boolean;
    datos: T | null;
    errores?: string[];
  }


  const estudiantesMock: Estudiante[] = [
    {
      id: "es-001",
      nombreCompleto: "Ana Torres",
      activo: true,
    },
    {
      id: "es-002",
      nombreCompleto: "Luis Pérez",
      activo: true,
    }
  ];
  
  const asignaturasMock: Asignatura[] = [
    {
      id: "as-001",
      nombre: "Bases de Datos",
    },
    {
      id: "as-002",
      nombre: "Arquitectura de Software",
    }
  ];
  
  const baseDatosMock : Record<string, unknown> = {
    "/estudiantes": estudiantesMock,
    "/asignaturas": asignaturasMock
  };
  
  function esEstudiante(valor: unknown): valor is Estudiante {
    if (typeof valor !== "object" || valor === null) {
      return false;
    }
  
    const candidato = valor as Estudiante;
  
    return (
      typeof candidato.id === "string" &&
      typeof candidato.nombreCompleto === "string" &&
      typeof candidato.activo === "boolean"

    );
  }
  
  function esAsignatura(valor: unknown): valor is Asignatura {
    if (typeof valor !== "object" || valor === null) {
      return false;
    }
  
    const candidato = valor as Asignatura;

    return (
      typeof candidato.id === "string" &&
      typeof candidato.nombre === "string"
    );
  }
  
  function validarEndpoint(endpoint: string, datos: unknown): boolean {
    switch (endpoint) {
      case "/estudiantes":
        return Array.isArray(datos) && datos.every(esEstudiante);
  
      case "/asignaturas":
        return Array.isArray(datos) && datos.every(esAsignatura);
  
      default:
        return false;
    }
  }
  
  export class ApiClient {
    obtenerRecurso<T>(endpoint: string): Promise<RespuestaAPI<T>> {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!(endpoint in baseDatosMock)) {
            resolve({
              codigoEstado: 404,
              exito: false,
              datos: [] as T,
              errores: [`El endpoint ${endpoint} no existe`]
            });
            return;
          }
  
          const recurso = baseDatosMock[endpoint];
  
          if (!validarEndpoint(endpoint, recurso)) {
            resolve({
              codigoEstado: 500,
              exito: false,
              datos: [] as T,
              errores: ["Los datos no cumplen el contrato esperado"]
            });
            return;
          }
  
          resolve({
            codigoEstado: 200,
            exito: true,
            datos: recurso as T
          });
        }, 800);
      });
    }
    
  }

  