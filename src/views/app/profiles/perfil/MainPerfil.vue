<template>
	<div class="dasboard">

		<b-row>
			<b-colxx xxs="12">
				<piaf-breadcrumb :heading="$t('profiles.perfil')" />
				<div class="separator mb-2"></div>
			</b-colxx>
		</b-row>
		<!-- MAIN MI PERFIL -->

		<general></general>

	</div>
</template>

<script>
import general from "./general/GeneralPerfil.vue"

export default {
	name: 'MainPerfil',
	components: {
		general
	}

}

</script>
