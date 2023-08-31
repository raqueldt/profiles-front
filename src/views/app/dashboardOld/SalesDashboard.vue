<template>

<!-- OBSOLETO. 
ARCHIVO HABIL: MainDashboard -->

	<div class="dasboard">
	    
	    <b-row>
	      <b-colxx xxs="12">
	        <piaf-breadcrumb :heading="$t('gps.dashboard')"/>
	        <div class="separator mb-5"></div>
	      </b-colxx>
	    </b-row>		

	    <b-row>
		  <b-colxx xl="5" lg="12" class="mb-4">
		  	 	<!-- <pax-country></pax-country> -->
				<pax-in-country-dashboard></pax-in-country-dashboard>
				<div class="separator mb-2"></div>
				<recent-activities></recent-activities>
	      </b-colxx>
	      <b-colxx xl="7" lg="12" class="mb-4">
	      	<!-- <last-confirmations></last-confirmations> -->
			  <quotes-dashboard></quotes-dashboard>
			  <div class="separator mb-2"></div>
			  <confirmations-dashboard></confirmations-dashboard>
			<!-- <confirmations></confirmations>		 -->
				<div class="separator mb-2"></div>
			<quotes-to-expire-dashboard></quotes-to-expire-dashboard>	      	 
	      </b-colxx>	      
	    </b-row>	

	    <!-- <b-row>
		  <b-colxx xl="6" lg="12" class="mb-4">
	      	<recent-activities></recent-activities>
	      </b-colxx>
	      <b-colxx xl="6" lg="12" class="mb-4">
	      	 <last-confirmations></last-confirmations>
	      </b-colxx>	      
	    </b-row>	 -->

	    <!-- <b-row>
	    	<b-colxx xl="7" lg="12" class="mb-4">
	    		<special-offers></special-offers>
	    	</b-colxx>
	    	<b-colxx xl="5" lg="12" class="mb-4">
	    		<top-rates-products></top-rates-products>
	    	</b-colxx>	    	
	    </b-row>     -->


	</div>
</template>

<script>


	import QuotesToExpire from '../dashboard/QuotesToExpire';
	import LastConfirmations from '../dashboard/LastConfirmations';
	import SpecialOffers from '../dashboard/SpecialOffers';
	import TopRatesProducts from '../dashboard/TopRatesProducts';
	import RecentActivities from '../dashboard/RecentActivities';
	import PaxCountry from '../dashboard/PaxCountry';
    import Confirmations from '../dashboard/Confirmations';


	export default {
		name: 'SalesDashboard',
		components: {
			"quotes-to-expire": QuotesToExpire,
			"last-confirmations": LastConfirmations,
			"special-offers": SpecialOffers,
			"top-rates-products": TopRatesProducts,
			"recent-activities": RecentActivities,
			PaxCountry,
			Confirmations,
		}
	}
</script>