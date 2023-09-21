# Vista: Team ATC

Este componente de Vue.js se encarga de mostrar y gestionar los perfiles de compañias.

## Objetivo

El objetivo de esta vista es proporcionar a los usuarios la capacidad de ver y actualizar sus perfiles de usuario, así como también permitir a los administradores gestionar permisos para el acceso a otros sistemas.

## Funcionalidades

- Visualizar lista usuarios.
- Añadir nueva.
- Editar información.
- Eliminar perfiles de usuario (solo para administradores).
- Editar perfiles (campos especificos) de usuario (solo para administradores).

## Componentes UI, bibliotecas y vuex Utilizados

	import { mapGetters } from "vuex";
	import TableBasic from '../../../../../components/UI/Tables/TableBasic.vue';
	import TableBasicEdit from '../../../../../components/UI/Tables/TableBasicEdit.vue';
	import ButtonBasic from '../../../../../components/UI/Button/ButtonBasic.vue';
	import ModalBasic from '../../../../../components/UI/Modal/ModalBasic.vue';

## Mejoras Futuras

- Agregar una función de búsqueda para facilitar la localización de perfiles.
- Implementar una funcionalidad de edición.
- Implementar la edición usuario (Modal) desde el listado.

## Autores

- Diana Raquel Diaz Tapia

## Información de la Versión

- Versión: 1.0.0
- Última Edición: 21 de Septiembre de 2023
