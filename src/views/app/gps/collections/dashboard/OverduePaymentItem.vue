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
						Tour:
						<!-- {{ payment.cofInicio }} -->
						{{ moment(payment.cofInicio).format("DD MMM YYYY, ddd") }}
						to
						<!-- {{ payment.cofFinal }}  -->
						{{ moment(payment.cofFinal).format("DD MMM YYYY, ddd") }}
					</small>
				</span>
				<br>
				<span class="text-muted">
					<small>
						<strong>Days to begin: {{ payment.daysToBegin }}</strong>
					</small>
				</span>
			</div>



		</div>


		<div>
			<div class="text-right">
				<small><span class="text-muted">{{ payment.paymentType }}</span></small><br>
				<strong>

					<b-badge
						style="background: rgb(249 204 204) !important; color: rgb(90 94 91); font-size: 85%">{{ payment.cppMonto | currency }}</b-badge>


				</strong><br>
			</div>
			<span class="text-danger">
				<small><strong>{{ payment.daysOverdue }} days overdue</strong></small>
			</span>
		</div>

	</div>
</template>

<script>
export default {
	props: ['payment', 'detailPath']
}
</script>
