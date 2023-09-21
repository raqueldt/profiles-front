# Vista: Compañias

Este componente de Vue.js se encarga de mostrar y gestionar los perfiles de compañias.

## Objetivo

El objetivo de esta vista es proporcionar a los usuarios la capacidad de ver y actualizar sus perfiles de compañias, así como también permitir a los administradores gestionar permisos para el acceso a otros sistemas.

## Funcionalidades

- Visualizar lista compañias.
- Añadir nueva.
- Editar información.
- Eliminar perfiles de compañias (solo para administradores).
- Editar perfiles (campos especificos) de compañias (solo para administradores).

## Componentes UI, bibliotecas y vuex Utilizados

    import { mapGetters } from "vuex";
    import ButtonBasic from '../../../../../components/UI/Button/ButtonBasic.vue';
    import { ClientTable } from 'vue-tables-2';

## Mejoras Futuras

- Agregar una función de búsqueda para facilitar la localización de perfiles.
- Implementar una funcionalidad de edición.
- Implementar una vista de empresas.

## Autores

- Diana Raquel Diaz Tapia

## Información de la Versión

- Versión: 1.0.0
- Última Edición: 21 de Septiembre de 2023
