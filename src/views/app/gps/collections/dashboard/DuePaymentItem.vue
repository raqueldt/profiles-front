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
						Vence: <strong>
							<!-- {{ payment.cppFecha }} -->
							{{ moment(payment.cppFecha).format("DD MMM YYYY, ddd") }}
						</strong>
					</small>
				</span>
			</div>



		</div>



		<div>
			<div class="text-right">
				<strong>

					<b-badge
						style="background: rgb(212 220 247) !important; color: rgb( 37 38 37); font-size: 85%">{{ payment.cppMonto | currency }}</b-badge>


				</strong><br>
				<span class="text-muted">
					<small>{{ payment.daysRemaining }} días</small>
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
