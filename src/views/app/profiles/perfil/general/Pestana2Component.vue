<template>
	<div>
		{{ datos }}


	</div>
</template>

<script>
// import Card from '../../../../../components/UI/Card/Card.vue';
import CardBasic from '../../../../../components/UI/Card/CardBasic.vue';
import perfiles from '../../../../../components/UI/IndexSVG/svg';
export default {
	name: 'Pestana1Component',
	components: {
		CardBasic,
	},
	props: {
		datos: Object // Declaración de la prop datos
	},
	data() {
		return {
			perfiles: perfiles,
		}
	},
	methods: {
		getPerfilById(id) {
			return this.perfiles.find(perfil => perfil.id === id);
		},
		sumarValores(objeto) {
			const suma = parseFloat(objeto.valor1) + parseFloat(objeto.valor2) + parseFloat(objeto.valor3) + parseFloat(objeto.valor4);

			if (suma % 1 !== 0) {
				return suma.toFixed(2);
			} else {
				return suma.toString(); // Si es un número entero, devolver como string
			}
		},
	},
};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
