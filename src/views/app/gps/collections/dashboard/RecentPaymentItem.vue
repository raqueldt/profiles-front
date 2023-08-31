<template>
	<div class="d-flex justify-content-between mb-3">

		<div>

			<router-link tag="a" :to="{
				path: 'collection-file-manager',
				query: {
					c: payment.id_client,
					f: payment.cofId,
					s: payment.cofFechaVenta,
					e: payment.cofFechaVenta
				},
			}">
				<span class="text-primary">
					<strong>
						{{ payment.cofCodigo }}

					</strong>
				</span>
			</router-link>


			<br>

			<div>
				<span class="text-muted">
					<small>
						Registrado en <strong>
							{{ moment(payment.ccoFecha).format("DD MMM YYYY, ddd") }}
						</strong> por <strong>{{ payment.user }}</strong>
					</small>
				</span>
			</div>



		</div>



		<div>
			<div class="text-right">
				<strong>

					<b-badge
						style="background: #c9e7ca !important; color: #238b3a; font-size: 85%">{{ payment.datosAbono.monto | currency }}</b-badge>


				</strong><br>
			</div>
			<span class="text-muted">
				<small>Saldo {{ payment.datosAbono.saldoActual | currency }}</small>
			</span>
		</div>

	</div>
</template>

<script>
export default {
	props: ['payment', 'detailPath']
}
</script>
