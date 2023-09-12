<template>
	<b-tabs>
		<b-tab v-for="(tab, index) in tabs" :key="index" :title="tab.nombre">
			<component :is="tab.component"></component>
		</b-tab>
	</b-tabs>
</template>

<script>
export default {
	name: 'TabsDinamicas',
	props: {
		tabs: Array,
	}
};
</script>
