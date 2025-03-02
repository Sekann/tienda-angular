Tienda Angular - Refactorización

Descripción
Esta es una tienda online desarrollada en Angular que permite a los usuarios ver productos y realizar compras.
Se ha refactorizado el código para mejorar su estructura, organización y seguir buenas prácticas de desarrollo.



Refactorización realizada
Durante la refactorización de la tienda en Angular, se realizaron las siguientes mejoras:

Reorganización de archivos:
Se estructuraron mejor los archivos dentro de carpetas como components/, services/, models/, mejorando la modularidad del proyecto.

Uso de módulos Angular:
Se crearon módulos específicos (ProductModule, AuthModule) para dividir la aplicación en secciones más manejables.

Implementación de servicios:
Se trasladó la lógica de productos a un servicio (ProductService), lo que mejora la reutilización del código.

Eliminación de código innecesario:
Se limpiaron archivos duplicados, funciones repetitivas y variables sin uso.

Mejora en el tipado con TypeScript:
Se añadieron interfaces para definir estructuras de datos, garantizando un código más robusto y escalable.

Ajustes en el diseño:
Se corrigieron estilos utilizando Bootstrap para lograr una mejor coherencia visual en toda la aplicación.

Mejoras en el sistema de autenticación:
Se refactorizó la pantalla de login para que coincida con el diseño del registro.
Se implementó un sistema de validación más robusto en los formularios.

Optimización del rendimiento:
Se mejoró la carga de componentes y se implementó lazy loading en los módulos principales.
Se optimizaron las peticiones a la API reduciendo el número de llamadas innecesarias.

La tienda fue desarrollada con las siguientes tecnologías:
Angular - Framework de desarrollo
TypeScript - Lenguaje de programación
Bootstrap - Librería de estilos
Angular CLI - Herramienta de línea de comandos para Angular
Git - Control de versiones