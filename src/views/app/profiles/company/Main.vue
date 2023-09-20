<template>
	<div class="dasboard">

		<b-row>
			<b-colxx xxs="12">
				<piaf-breadcrumb :heading="$t('profiles.company')" />
				<div class="separator mb-2"></div>
			</b-colxx>
		</b-row>


		<!-- MAIN TALENTO HUMANO -->
		<general></general>

	</div>
</template>

<script>
import general from "./general/General.vue"

export default {
	name: 'MainCompany',
	components: {
		general
	}
}

</script>
