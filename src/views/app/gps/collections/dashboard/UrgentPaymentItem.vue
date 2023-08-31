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
						Tour: <strong>
							<!-- {{ payment.cofInicio }} -->
							{{ moment(payment.cofInicio).format("DD MMM YYYY, ddd") }}
						</strong> to <strong>
							<!-- {{ payment.cofFinal }} -->
							{{ moment(payment.cofFinal).format("DD MMM YYYY, ddd") }}
						</strong>
					</small>
				</span>
				<br>
				<span class="text-muted">
					<small>
						<strong>{{ payment.lastMinute }}</strong>
					</small>
				</span>
			</div>



		</div>



		<div>
			<div class="text-right">
				<small><span class="text-muted"><strong>{{ payment.daysToBegin }} días</strong> para
						operar</span></small><br>
				<strong>

					<b-badge
						style="background: rgb(255 232 148) !important; color: rgb(61 61 61); font-size: 85%">{{ payment.saldoConfirmacion | currency }}</b-badge>


				</strong><br>
				<span class="text-muted">
					<small>Venta: <strong>{{ payment.totalConfirmacion | currency }}</strong></small>
				</span>
			</div>
		</div>

	</div>
</template>

<script>
export default {
	props: ['payment', 'detailPath']
}
</script>
