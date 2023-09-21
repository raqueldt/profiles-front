# PROFILES FRONT

# Índice

# Índice

1. [PROFILES FRONT](#profiles-front)
2. [Introducción](#introducción)
3. [Funcionalidades principales](#funcionalidades-principales)
   - [Autenticación y Autorización](#autenticación-y-autorización)
   - [Gestión de Perfil](#gestión-de-perfil)
   - [Gestión de empresas](#gestión-de-empresas)
   - [Gestión de Vacaciones y Ausencias](#gestión-de-vacaciones-y-ausencias)
   - [Reconocimientos y Logros](#reconocimientos-y-logros)
   - [Publicación de Noticias (TTHH)](#publicación-de-noticias-tthh)
   - [Rol de Pago (TTHH)](#rol-de-pago-tthh)
   - [Gestión de Feriados (TTHH)](#gestión-de-feriados-tthh)
   - [Gestión de Departamentos (TTHH)](#gestión-de-departamentos-tthh)
   - [Acceso a Documentos](#acceso-a-documentos)
   - [Generación de Reportes](#generación-de-reportes)
4. [Arquitectura general del Código](#arquitectura-general-del-código)
5. [Arquitectura para crear una nueva vista](#arquitectura-para-crear-una-nueva-vista)
6. [Reglas de documentación](#reglas-de-documentación)
   - [TODO para código pendiente](#todo-para-código-pendiente)
   - [Documentación de archivos](#documentación-de-archivos)
   - [Documentación de funciones](#documentación-de-funciones)
7. [Recursos generados referenciales](#recursos-generados-referenciales)
8. [Aspectos pendientes de mejora](#aspectos-pendientes-de-mejora)


## Introducción

Este proyecto se enfoca en la creación de la interfaz de usuario del sistema Profiles en la cual se maneja Frontend de la aplicación, se analiza a distribución de accesos al sistema, se crea un patrón básico en la estructura y creación de componente: vistas, servicios, reutilización de componentes, entre otros aspectos importantes enfocado a la usuabilidad, escalabilidad, reulización y por su puesto documentación.

## Funcionalidades principales

**Autenticación y Autorización**:

    - Registro de usuarios internos.
    - Inicio de sesión con autenticación segura.
    - Gestión de roles y permisos para diferentes tipos de usuarios (por ejemplo, administradores, empleados, TTHH, etc.).

**Gestión de Perfil**:

    - Edición de información personal (nombre, contacto, etc.).
    - Actualización de contraseña.
    - Asignación de departamento y posición.
    - Subida y visualización de foto de perfil.

**Gestión de Permisos**:

    - Solicitud y aprobación de permisos (por ejemplo, acceso a ciertos documentos o funcionalidades específicas).
    - Registro y seguimiento de permisos otorgados.

**Gestión de empresas**:

    - Creación de empresas y accesos al sistema barcos.

**Gestión de Vacaciones y Ausencias**:

    - Solicitud y aprobación de vacaciones o ausencias.

**Reconocimientos y Logros**:

    - Comentarios y felicitaciones por parte de otros usuarios.

**Publicación de Noticias (TTHH)**:

    - Creación y edición de noticias y anuncios por parte del personal de TTHH.
    - Programación de fechas de publicación. 7.

**Rol de Pago (TTHH)**:

    - Ingreso y actualización de información salarial.
    - Generación de roles de pago para los empleados.

**Gestión de Feriados (TTHH)**:

Ingreso y actualización de feriados nacionales y locales.
Visualización de calendario de feriados.

**Gestión de Departamentos (TTHH)**:

    - Creación, edición y eliminación de departamentos.
    - Asignación de empleados a departamentos.

**Acceso a Documentos**:

    - Subida y descarga de documentos relevantes (por ejemplo, contratos, certificados, etc.).
    - Control de versiones y registro de cambios.
    - Generación de Reportes:
    - Capacidad para generar y descargar reportes sobre diversas acciones y datos (por ejemplo, asistencia, permisos, reconocimientos, etc.).

## Arquitectura general del Código.

```plaintext
.
.
├── src/
│   ├── components/
│   │   ├── UI/ 	<-- Biblioteca de componentes.
│   │   └── locales/
│   │       └── en/ 	<-- Biblioteca de titulos.
│   ├── services/
│   │   └── profiles/
│   ├── views/
│   │   └── app/
│   │       └── profiles/
│   ├── styles/
│   └── router.js	<-- Rutas establecidas
├── public/
│   ├── documentacion/
│   │   └── index.md
├── config/
├── tests/     <-- No realizado
└── README.md  <-- Descripción general del proyecto (Tecnologías)



```

## Arquitectura para crear una nueva vista.

```plaintext
.
.
├── src/
│   ├── views/
│   │   └── app/
│   │       └── profiles/
│   │           ├── formato/
│   │           │   └── Main.vue
│   │           ├── general/
│   │           │   └── General.vue
│   │           ├── lista/   <-- agregar folders mismo nivel
│   │           │   └── lista.vue
│   └── router.js    <-- Rutas establecidas (agregar la formato)

```

### Reglas de documentación:

A continuación se presentan las reglas de documentación.

1. Para establecer código pendiente por escribir utilice el tag TODO al iniciar un comentario simple.

```javascript
// TODO: Implementar esta función para manejar la autenticación del usuario.
function autenticarUsuario(usuario, contraseña) {
  // Código pendiente por escribir
}
```

2. Todos los archivos deben contener una descripción y los autores para referenciar a participantes encaso de requerir ayuda.

```plaintext
/**
 * docPerfil.md
 *
# Vista de Perfiles de Usuario

Este componente de Vue.js se encarga de mostrar y gestionar los perfiles de usuario en la aplicación.

## Objetivo

El objetivo de esta vista es proporcionar a los usuarios la capacidad de ver y actualizar sus perfiles de usuario, así como también permitir a los administradores gestionar los perfiles de otros usuarios.

## Funcionalidades

- Visualizar información de perfil.
- Editar información de perfil.
- Eliminar perfiles de usuario (solo para administradores).

## Mejoras Futuras

- Agregar una función de búsqueda para facilitar la localización de perfiles.
- Implementar una funcionalidad de paginación para grandes conjuntos de datos.

## Autores

- Develop 1

## Información de la Versión

- Versión: 1.0.0
- Última Edición: 21 de Septiembre de 2023

 */
```

## Recursos generados referenciales.

A continuación se presentan los links de interes que se deben tener en cuenta a la hora de participar en el refinamiento del código.

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVMpxP2OI=/?moveToViewport=-2873,-193,1824,1043&embedId=149231000845" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

<!-- - _Distribución de acccesos_: Análisis distribución accesos sistema. [Link](https://miro.com/app/board/uXjVMpxP2OI=/?share_link_id=541594429726). -->

# Reutilización.

- Verificación de archivos blade para su creación en una vista VueJs desacomplada.
- Crear un elemento reutilizable o utilizar los ya creados en:
	- /src/components/UI
