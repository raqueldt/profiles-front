<template>
	<b-tab :title="tabTitle">
		<slot></slot>
	</b-tab>
</template>

<script>
export default {
	props: {
		tabTitle: String, // Prop para el título de la pestaña
	},
};
</script>
