# Vista: Perfil de Usuario

Este componente de Vue.js se encarga de mostrar y gestionar los perfiles de usuario en la aplicación.

## Objetivo

El objetivo de esta vista es proporcionar a los usuarios la capacidad de ver y actualizar sus perfiles de usuario, así como también permitir a los administradores gestionar los perfiles de otros usuarios.

## Funcionalidades

- Visualizar información general del perfil.
- Visualizar información mis solicitudes.
- Visualizar información mis documentos.
- Visualizar información mis reconocimientos.
- Visualizar información mis cargas familiares.
- Editar información de perfil.
- Eliminar perfiles de usuario (solo para administradores).
- Editar perfiles (campos especificos) de usuario (solo para administradores).

## Componentes UI, bibliotecas y vuex Utilizados

    import { mapGetters } from "vuex";
    import Card from '../../../../../components/UI/Card/Card.vue';
    import CardBasic from '../../../../../components/UI/Card/CardBasic.vue';
    import ButtonBasic from '../../../../../components/UI/Button/ButtonBasic.vue';
    import TabsDinamicas from '../../../../../components/UI/Tab/TabsDinamicas.vue';
    import perfiles from '../../../../../components/UI/IndexSVG/svg';

## Mejoras Futuras

- Agregar una función de búsqueda para facilitar la localización de perfiles.
- Implementar una funcionalidad de formatos de fechas.

## Autores

- Diana Raquel Diaz Tapia

## Información de la Versión

- Versión: 1.0.0
- Última Edición: 21 de Septiembre de 2023
