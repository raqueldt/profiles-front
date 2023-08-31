<template>
	<div>
		<b-row>
			<b-col cols="12">
				<div class="d-flex justify-content-start mb-2 ">

					<template v-if="isModeYear">
						<b-col cols="12">

							<label for="input-year" style="font-weight: normal">Year-Month</label>
							|
							<b-button variant="link" class="p-0" @click="toggleMode">
								Date range
							</b-button>

							<b-row>
								<b-col>
									<date-picker id="input-year" v-model="chosenYear" type="year" placeholder="Select year"
										:clearable="false" style="width: 100%" @change="handleFilterMonth(chosenYear)">
									</date-picker>
								</b-col>

								<b-col hidden>
									<b-form-select v-model="selectMonth" class=" form-select text-muted"
										@change="handleFilterMonth(selectMonth)">
										<b-form-select-option :value="null" aria-selected="true"> -- All months -- &nbsp;

										</b-form-select-option>
										<b-form-select-option :value="item.number" v-for="(item, index) in months"
											:key="index">{{ item.name }}</b-form-select-option>
									</b-form-select>
								</b-col>
							</b-row>

						</b-col>
					</template>

					<template v-else>
						<b-col cols="12">

							<b-button variant="link" class="p-0" @click="toggleMode">
								Year-Month
							</b-button>
							|

							<label for="input-range" style="font-weight: normal"> Date range</label>

							<date-picker v-model="chosenYear" placeholder="Select period" :clearable="false"
								format="DD MMM YYYY" :editable="false" range @calendar-change="changeCalendar"
								:partialRange="true" class="m-1" style="width: 100%; " />

						</b-col>
					</template>
				</div>
			</b-col>

		</b-row>
		<!-- loading state -->
		<template v-if="loadingActive">
			<b-skeleton animation="wave" width="100%"></b-skeleton>
		</template>

		<template v-else>
			<!-- empty state -->
			<template v-if="isEmpty">
				<b-card body-class="text-center text-muted" class="mt-3">
					<b-card-title>
						<b-icon icon="search" font-scale="3" class="pb-2" />
						<br>
						<h1>No files to show</h1>
					</b-card-title>
					<b-card-text>
						Try adjusting your search to find what you're looking for.
					</b-card-text>
				</b-card>
			</template>

			<!-- month filter -->
			<template v-else>
				<b-row class="my-3 px-3" hidden>
					<b-col cols="1" v-for="month in months" :key="month.number" class="p-0">
						<b-button :variant="resolveVariant(month.number)" block class="p-0"
							@click="handleFilterMonth(month.number)" :disabled="resolveMonthDisabled(month.number)">
							<span :class="resolveText(month.number)"><strong>{{ month.name }}</strong></span><br>
							<small>{{ totalMonth(month.number) | currency }}</small>
						</b-button>
					</b-col>
				</b-row>
			</template>
		</template>
	</div>
</template>
<script>

import moment, { relativeTimeThreshold } from "moment"

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Datepicker from "vuejs-datepicker";

import DateRangePicker from 'vue2-daterange-picker'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
	name: "collectionAdminFilter",
	components: {
		"v-select": vSelect,
		datepicker: Datepicker,
		DatePicker,
		DateRangePicker
	},

	data() {
		return {
			// 2022-04-07 | fg | implementar filtro por periodo y rango
			chosenYear: null,
			chosenRange: null,
			dateRange: {
				startDate: new Date(),
				endDate: new Date()
			},
			locale: {
				separator: '-',
				format: 'dd mm yyyy'
			},
			monthsDisabled: [],
			shortcuts: [
				{
					text: 'Today',
					onClick() {
						const date = new Date();
						// return a Date
						return date;
					},
				},
				{
					text: 'Yesterday',
					onClick() {
						const date = new Date();
						date.setTime(date.getTime() - 3600 * 1000 * 24);
						return date;
					},
				},
			],

			modelConfig: {
				type: 'string',
				mask: 'YYYY-MM-DD',
			},
			isBusy: true,
			selectMonth: null,
			meses: [],
			year: null,
			params: {
				inicio: null,
				fin: null
			},
			isModeYear: true
		};
	},

	computed: {

		...mapGetters('collection-admin', ['getCompleteCollectionFiles', 'getSelectedMonth', 'loadingActive', 'isEmpty']),

		minDateYear() {
			return moment(this.chosenYear).startOf('year').toDate()
		},

		maxDateYear() {
			return moment(this.chosenYear).endOf('year').toDate()
		},

		showRanges() {
			return true
		},

		months() {

			const months = moment.monthsShort().map(function (month, index) {
				return { 'name': month, 'number': index + 1 }
			})
			this.meses = months
			return months
		}
	},


	watch: {
		chosenYear(newYear, oldYear) {
			if (newYear.length) {
				this.dateRange.startDate = moment(newYear[0])
				this.dateRange.endDate = moment(newYear[1])
				this.resolveVariant()
			} else {
				this.dateRange.startDate = moment(newYear[0]).startOf('year')
				this.dateRange.endDate = moment(newYear[1]).endOf('year')
				if (moment(newYear).format('YYYY') !== '2023') {
					this.dateRange.startDate = moment([moment(newYear).format('YYYY')]).startOf('year').toDate()
					this.dateRange.endDate = moment([moment(newYear).format('YYYY')]).endOf('year').toDate()
					this.handleFilterMonth(null)
				}
			}
			this.getCollectionFiles()
		},

	},

	methods: {

		toggleMode() {

			this.isModeYear = !this.isModeYear

		},

		...mapActions('collection-admin', ['loadCollectionFiles']),
		...mapMutations('collection-admin', ['setSelectedMonth', 'setSelectedClient', 'setLoadingState']),

		async getCollectionFiles() {
			this.setLoadingState(true)

			const params = {
				start: moment(this.dateRange.startDate).format('YYYY-MM-DD'),
				end: moment(this.dateRange.endDate).format('YYYY-MM-DD')
			}

			await this.loadCollectionFiles(params)

			this.setSelectedMonth(null)
			this.setSelectedClient(null)

			this.setLoadingState(false)

		},

		handleRangeChange() {
			this.getCollectionFiles()
		},


		async setInitialFilters() {
			this.chosenYear = new Date()
			this.year = new Date()


		},

		totalMonth(month) {
			const monthFilesTotal = this.getCompleteCollectionFiles.filter(file => {
				const monthFile = moment(file.start_date_file).month() + 1
				return monthFile == month
			}).map(file => Number(file.totalFile)).reduce((valorAnterior, valorActual) => valorAnterior + valorActual, 0)


			const indexMonth = this.monthsDisabled.indexOf(month)
			if (monthFilesTotal == 0) {
				if (indexMonth == -1) this.monthsDisabled.push(month)
			} else {
				if (indexMonth >= 0) this.monthsDisabled.splice(indexMonth, 1)
			}
			return monthFilesTotal
		},

		handleFilterMonth(month) {
			if (this.chosenYear.length === 2) {
				this.setInitialFilters()
			}
			this.setSelectedMonth(month)
			this.setSelectedClient(null)
			if (month == null) {
				this.selectMonth = null
			}
		},

		resolveVariant(month) {
			if (month === this.getSelectedMonth) return 'primary default'

			return 'light default'

		},

		resolveText(month) {

			if (month == this.getSelectedMonth) return ''
			if (this.chosenYear.length === 2) return 'text-muted'

			return 'text-muted'
		},

		resolveMonthDisabled(month) {
			return this.monthsDisabled.indexOf(month) >= 0
		},

		changeCalendar(value, oldValue, type) {
			console.log("-------------------- Cambiando calendario... ----------------");
			const month = value.getMonth();
			const oldMonth = oldValue.getMonth();

			if (month !== oldMonth && type != 'next-month') {
				console.log("caso 1")
				var startDate = moment([moment(value).format('YYYY'), month, 1]).toDate();
				var endDate = moment([moment(value).format('YYYY'), month]).endOf('month').toDate();
				this.searchDateRange = [startDate, endDate];
			}
		},
		handleDates() {

			let startDateOf = null
			let endDateOf = null

			if (this.filters.month != '0') {

				const date = `${this.filters.year.getFullYear()}-${this.filters.month}-1`
				startDateOf = moment(date).startOf('month').format('YYYY-MM-DD')
				endDateOf = moment(date).endOf('month').format('YYYY-MM-DD')

			} else {

				startDateOf = moment(this.filters.year).startOf('year').format('YYYY-MM-DD')
				endDateOf = moment(this.filters.year).endOf('year').format('YYYY-MM-DD')

				this.searchDateRange = [startDate, endDate];
			}

			this.params.inicio = startDateOf
			this.params.fin = endDateOf
			// reload data
			// this.updkateData()

		},
	},


	async created() {

		await this.setInitialFilters()
		await this.getCollectionFiles()
	}
}
</script>

