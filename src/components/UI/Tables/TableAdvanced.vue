<!-- TableComponent.vue -->
<template>
	<div>
		<!-- <pre> {{ data }} </pre> -->
		<!-- {{ options }} -->
		<!-- <pre> {{ columns }} </pre> -->
		<v-client-table :columns="columns" :data="data" :options="options" />
	</div>
</template>

<script>

export default {

	name: "TableAdvanced",
	props: {
		data: {
			type: Array,
			required: true
		},
		columns: {
			type: Array,
			required: true
		},
		options: {
			type: Object,
			required: true
		}
	}
}
</script>
