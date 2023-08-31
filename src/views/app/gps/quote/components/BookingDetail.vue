<template>
  <div>
    <!--     {{booking_details.slots}} -->
    <div>
      <!-- TABS PARA INFORMACION DE CABINA E ITINERARIO AL HACER CLICK EN EL OJO DE VISULIZACION -->
      <b-tabs content-class="mt-3"  justified>
        <b-tab title="Cabin information" active>
          <b-list-group-item class="flex-column align-items-start py-2" v-for="slot in booking_details.slots"
            :key="slot.bosId">
            <booking-detail-slot :slot-booking="slot" />
          </b-list-group-item>
        </b-tab>
        <b-tab title="Itinerary information">
          <itinerary-info-table :depId="depId"></itinerary-info-table>
        </b-tab>
      </b-tabs>
      <!-- FIN TABS PARA INFORMACION DE CABINA E ITINERARIO AL HACER CLICK EN EL OJO DE VISULIZACION -->
    </div>

  </div>
</template>
<script>
  import BookingServices from "../../../../../services/gps/booking/BookingServices.js";

  export default {
    props: ["bokId"],
    components: {

      "BookingDetailSlot": () => import('@/views/app/gps/quote/components/BookingDetailSlot')

    },
    data() {
      return {
        depId: "",
        booking_details: [],
        booking_details_children: "",
        fields: [{
            key: "condition",
            label: "",
            sortable: false,
            sortDirection: "desc",
            tdClass: "list-item-enddate text-center",
          },
          {
            key: "description",
            label: "Description",
            sortable: false,
            sortDirection: "desc",
            tdClass: "list-item-enddate",
          },
          /*{
			          	key: "season",
			          	label: "Season",
			          	sortable: false,
			          	sortDirection: "desc",
			          	tdClass: "list-item-enddate",
			        },
			        {
			          	key: "discount",
			          	label: "Discounts",
			          	sortable: false,
			          	sortDirection: "desc",
			          	tdClass: "list-item-enddate text-center",
			        },*/
          {
            key: "total",
            label: "Total",
            sortable: false,
            sortDirection: "desc",
            tdClass: "list-item-enddate",
          },
        ],
      };
    },
    methods: {
      bookingDetails() {
        BookingServices.getBookingDetails(this.bokId)
          .then((response) => {
            this.booking_details = response.data;
            this.booking_details_children = this.booking_details.booking;
            this.depId = this.booking_details.booking.depId;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    mounted() {
      this.bookingDetails();
    },
  };

</script>
