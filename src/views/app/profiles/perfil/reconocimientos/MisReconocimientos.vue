<template>
	<div>
		<div class="d-flex align-items-center mb-3"></div>
		<b-card>
			<b-container>


					<b-table :items="reconocimientos" :fields="fields" show-empty striped responsive="sm" class="my-table">

						<template v-slot:table-colgroup>
							<col style="width: 10rem" class="my-auto">
							<col style="width: 8rem">
							<col style="width: 6rem">
							<col style="width: 30rem">
							<!-- add as many <col> elements as needed -->
						</template>


						<!-- MENSAJE DATOS VACIOS -->
						<template #empty="scope">
							<center>
								<span class="text-center">No existen registros disponibles</span>
							</center>
						</template>

						<!-- CABECERA -->
						<template v-slot:head(fecha)="data">
							<div class="text-center">{{ data.label }}</div>
						</template>
						<template v-slot:head(nombre_autor)="data">
							<div class="text-center">{{ data.label }}</div>
						</template>
						<!-- <template v-slot:head(nombre_reconocimiento)="data">
                                    <div class="text-center">{{ data.label }}</div>
                                </template> -->
						<template v-slot:head(imagen_reconocimiento)="data">
							<div class="text-center">{{ data.label }}</div>
						</template>
						<template v-slot:head(motivo)="data">
							<div class="text-center">{{ data.label }}</div>
						</template>

						<!-- DETALLES -->
						<template #cell(fecha)="row">


							{{ formatFecha(row.item.fecha) }}

						</template>
						<!-- <template #cell(imagen_reconocimiento)="row">

                        <img class="img-thumbnail mx-auto d-block rounded " width="55" height="75" data-toggle="tooltip"
                            data-placement="top" :title="row.item.nombre_reconocimiento"
                            :src="getImagePath(row.item.imagen_reconocimiento) " /><br>

                    </template> -->

						<template #cell(catalogo_reconocimiento_id)="row">


							<div v-for="(item, index) in row.item.catalogo_reconocimiento_id" :key="index"
								class="d-inline-flex">
								<span v-if="item > 0" class="">
									<span>
										<img class="img-thumbnail mx-auto rounded " width="55" height="75"
											data-toggle="tooltip" data-placement="top" :title="item"
											:src="getImagePath(item)" />
									</span>
								</span>
							</div>

						</template>

						<template #cell(acciones)="row">
							<b-button variant="danger" size="xs" @click="confirmDelete(row.item.mes, row.item.anio)">
								<i class="fa fa-trash" aria-hidden="true"></i>
							</b-button>
						</template>
					</b-table>



			</b-container>

		</b-card>
	</div>
</template>

<script>
import ReconocimientosServices from "../../../../../services/profiles/reconocimientos/ReconocimientosServices";
import moment from "moment";

export default {
	props: ["id"],
	data() {
		return {
			catalogs: [],
			reconocimientos: [],
			fields: [{
				key: 'fecha',
				label: 'Fecha',
				tdClass: 'align-middle text-center'
			},
			{
				key: 'nombre_autor',
				label: 'Te reconoció',
				tdClass: 'align-middle text-center'
			},
			{
				key: 'catalogo_reconocimiento_id',
				label: 'Reconocimiento',
				tdClass: 'align-middle text-center'
			},
			{
				key: 'motivo',
				label: 'Motivo',
				tdClass: 'text-justify'
			},
			]
		};
	},

	methods: {
		getMisReconocimientos() {

			ReconocimientosServices.getMisReconocimientos(this.id)
				.then(response => {
					this.reconocimientos = response.data.data;
				})
				.catch(error => {
					console.log(error);
				});
		},
		getImagePath(path) {
			let url = ReconocimientosServices.urlPlaceImage + '/' + path;
			return url;
		},
		formatFecha(fecha) {
			return moment(fecha).format('dddd, D MMMM  YYYY')
		},
		getNameImageFromCatalog() {
			ReconocimientosServices.getNameImageFromCatalog()
				.then(response => {
					this.catalogs = response.data.data;
				})
				.catch(error => {
					console.log(error);
				});
		},
		urlImage(id) {
			return this.catalogs.filter(f => f.catalogo_id == id).map(a => a.catalogo_imagen)
		},
		getImagePath(id) {
			let path = this.urlImage(id);
			if (path) {
				let url = ReconocimientosServices.urlPlaceImage + '/' + path;
				return url;
			}
		},
	},

	mounted() {
		this.getMisReconocimientos();
		this.getNameImageFromCatalog();
	},
};

</script>
