<template>
	<div class="dasboard">

		<b-row>
			<b-colxx xxs="12">
				<piaf-breadcrumb :heading="$t('profiles.busqueda')" />
				<div class="separator mb-2"></div>
			</b-colxx>
		</b-row>

		<general></general>

	</div>
</template>

<script>
import general from "./general/General.vue"

export default {
	name: 'Main',
	components: {
		general
	}

}

</script>
