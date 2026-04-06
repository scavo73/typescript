# Modelo de datos - módulo 2

## Entidades principales

He definido dos entidades del sistema universitario:

- `Estudiante`
- `Asignatura`

En ambos casos he usado `interface` porque representan contratos estructurales de objetos de dominio. Además, los identificadores están marcados como `readonly` para evitar modificaciones accidentales una vez creada la entidad.

## Estado de matrícula

Para modelar los posibles estados de una matrícula he usado una unión discriminada:

- `MatriculaActiva`
- `MatriculaSuspendida`
- `MatriculaFinalizada`

La propiedad discriminante es `tipo`, lo que permite a TypeScript estrechar el tipo de forma segura dentro de un `switch`. Esto evita estados ambiguos y obliga a representar solo combinaciones válidas.

## Interface vs type

He usado `interface` para las estructuras de datos (`Estudiante`, `Asignatura` y cada interfaz de matrícula) porque describen objetos concretos del dominio.

He usado `type` para `EstadoMatricula` porque en este caso necesito una unión de varios estados posibles. Aquí `type` es la opción adecuada.

## Respuesta genérica de API

He definido `RespuestaAPI<T>` para reutilizar la misma estructura de respuesta con distintos tipos de datos.

Esto permite abstraer la lógica de acceso a datos sin perder tipado. Por ejemplo, el mismo cliente puede devolver:

- `RespuestaAPI<Estudiante[]>`
- `RespuestaAPI<Asignatura[]>`

De esta forma, el método genérico `obtenerRecurso<T>` es reutilizable y mantiene seguridad de tipos.