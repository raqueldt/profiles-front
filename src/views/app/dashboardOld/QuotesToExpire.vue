<template>

<!-- OBSOLETO. 
ARCHIVO HABIL: QuotesToExpireDashboard -->

      <b-card class="mb-4 shadow" :title="$t('gps.quotes-to-expire')">
      	  <b-refresh-button @click="getBookingsToExpire" />
      	  
      	  <b-skeleton animation="wave" width="100%" v-if="loading"></b-skeleton>
      	  <template v-else>
				<div style="height: auto; overflow-y: scroll;">
	      	  <template v-if="bookings.length">
						<b-list-group flush>	
							<b-list-group-item v-for="booking in bookings" :key="booking.bokId">
								<b-row>
									<b-col cols="8">
							            <router-link tag="a" to="/">	
											
							                <p class="mb-0 text-small">{{ booking.Time_Limit }} - {{ booking.ATC_ref }}  ({{ booking.Reference }}) </p>            	
							            </router-link>
									</b-col>
									<b-col class="text-right">
										<p class="text-muted mb-0 text-small">{{ booking.ATC_User }}</p>
									</b-col>
								</b-row>

								<b-row>
									<b-col>
							           <p class="text-muted mb-0 text-small">{{ booking.Client }}</p>			
									</b-col>
									<b-col>
									   <p class="text-muted mb-0 text-small text-right">{{ booking.Start_date }}</p>			
									</b-col>
								</b-row>
							</b-list-group-item>
						</b-list-group>      	  	  
	      	  </template>
				 <template v-else>
	      	     <b-alert show variant="dark">There aren't any quotes on this section</b-alert>	
	      	  </template>   
				</div>
	      	    	  	
      	  </template>



     	  
      </b-card>
  
</template>	

<script>

    import BookingServices from "../../../services/gps/booking/BookingServices.js";

	export default {

		name: 'QuotesToExpire',

		data() {

			return {
                loading: false,
				bookings: [],

			}

		},

		computed: {

		},


		methods: {

			getBookingsToExpire() {

				  this.loading = true;

			      BookingServices.getBookingsToExpire()
			        .then((response) => {
			          this.bookings = response.data.data;
			          this.loading = false;
			        })
			        .catch((error) => {
			          console.log("Error: " + error);
			        });				
			}

		},

		mounted() {


			//console.log("MOUNTED")
			this.getBookingsToExpire();


		}




	}	

</script>
