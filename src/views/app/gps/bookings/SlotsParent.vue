<template>

  <div>
    
    <!--pre>{{ item }}</pre-->

    <div v-if="this.itemSlots || this.itemSlots !== undefined">
 
      <!-- cabecera e información de salida -->
      
      <b-row>
        
        <b-colxx xxs="12">

          <!-- Componente BreadCrumb -->

            <breadcrumb-layout :heading="$t('menu.bookings')"></breadcrumb-layout>
            <!-- <div class="separator mb-2"></div> -->

          <!-- Fin Componente BreadCrumb -->
          
          
        </b-colxx>
      </b-row>

      <b-card-group class="">
        <b-card no-body class="mb-2 px-3 py-1">
          
            <b-row>
              <!-- info crucero -->
              <b-col lg="4" md="12" xs="12" class="text-left title-deck-plans" >
                <span><small><strong>{{ itemSlots.cruName | uppercase }}</strong></small></span>
                <br>

                  <b-button 
                    @click="showDeckModal()"
                    v-tooltip="{content: 'Display deck plans', placement: 'top', classes: ['itineraries'],}"
                    variant="link" 
                    class="border-0 px-0"
                    size="sm"
                    >
                    Deck plans 
                  </b-button>
                
              </b-col>

              <!-- info itinerario -->
              <b-col class="text-center"   lg="4" md="12" xs="12" >
                
                <b-container>
                  <itinerary-info-modal :iti-id="itemSlots.itiId" :iti-name="itemSlots.itiName"></itinerary-info-modal>                   
                  <span> <small><span class="text-muted">{{$t('gps.nights')}} </span><strong>{{ itemSlots.itiNights }}</strong> | <span class="text-muted">Code </span><strong>{{ itemSlots.itiCode }}</strong> | <span class="text-muted">Type </span><strong>{{ itemSlots.itineraryType }}</strong></small></span> 
                </b-container>

              </b-col>
              <!-- info salida -->
                           
              <b-col class="mr-auto title-deck-plans"  lg="4" md="12" xs="12" cols="12">  
                <formated-dates  :startDate="departureStartDate" 
                                 :endDate="departureEndDate" 
                                 align="end">
                </formated-dates> 

              </b-col>
            </b-row>
            
        </b-card>      
      </b-card-group>

      <!-- modal informaciòn deck -->

      <b-modal
        id="infoDeck"
        size="lg"
        ref="infoDeck"
        :title="$t('modal.deck-plans') + '-' + this.itemSlots.cruName"
      >
        <ModalDeckPlans :dep_id="itemSlots.depId"></ModalDeckPlans>
        <template slot="modal-footer">
          <b-button variant="secondary" @click="hideModal('infoDeck')"
            >Close
          </b-button>
        </template>
      </b-modal>

<!-- {{depId}} -->
      <!--   -->
      <b-row>

        <b-col lg="12">
          <!-- sección info cliente y resumen bloqueo  -->
          <slotsform
            :sendTotalNetRate="sendTotalNetRate"
            :sendDiscount="sendDiscount"
            :sendChoosenSlot="sendChoosenSlot"
            :itemDeparture="itemSlots"
            :depId="this.itemSlots.depId"
            :sendSummary="sendSummary"
            :sendAllotment="sendAllotment"            
            @toParentSendHeader="dataHeader"
          ></slotsform>
        </b-col >
      </b-row>  
      <b-row>  
      <div class="container-fluid pl-3 pr-3" v-show="Boolean(sendHeader) && Boolean(sendHeader.headerCompany) && Boolean(sendHeader.headerReference)">
        <b-row>
          <b-col lg="5" class="pr-0">
              <slotsdistribution                      
              :cruPaxLimit              ="itemSlots.cruPaxLimit ? itemSlots.cruPaxLimit : 16"
              :sendHeader               ="sendHeader"
              :depId                    ="itemSlots.depId"
              @toParentSendAllotment    ="dataAllotment"
              @toParentSendChoosenSlot  ="dataChoosenSlot"
              @toParentSendCharter      ="dataCharter">
              </slotsdistribution>
          </b-col>
                  <!-- :cruPaxLimit              ="itemSlots.cruPaxLimit ? itemSlots.cruPaxLimit : 16" -->
          <b-col lg="7">
              <slotssummary
                :depId                      ="itemSlots.depId"
                :sendHeader                 ="sendHeader"
                :sendCharter                ="sendCharter"
                :sendAllotment              ="sendAllotment"
                @toParentSendDiscount       ="dataDiscount"
                @toParentSendSummary        ="dataSummary"
                @updateBookingIva           ="updateBookingIva">
              </slotssummary>
          </b-col>
        </b-row>  
      </div>  
      
      <div v-if="!Boolean(sendHeader.headerCompany) || !Boolean(sendHeader.headerReference)" class="w-100">
            <!--alertsglobal 
              type='warning' 
              title='Information' 
              message='Please select a Client and write Reference in order to continue'> </alertsglobal-->
        <alertsavailability 
                title='Information' 
                img='../../../../assets/img/atc/error_booking.svg'
                message= "Please select a Client and write Reference in order to continue">
        </alertsavailability>
      </div>

      </b-row>
    </div>

  </div>

</template>

<script>
import moment from "moment";
import AvailabilityServices from "@/services/gps/availability/availabilityServices.js"


export default {

  name: 'SlotsParent',

    
  components: {
      ItineraryInfoModal: () => import("@/views/app/gps/availability/components/ItineraryInfoModal")
  },


  data() {
  
      return {
        depId : 0, // 
        item: [],  //
        roleUser: {}, //this.$store.getters.currentUser.roles[0].id, //desactivado temporalmente
        sendTotalNetRate:"",
        sendDiscount:"",
        sendCharter:"",
        sendChoosenSlot :[],
        sendHeader:[],
        sendSummary:[],
        sendAllotment:"",
        sendSummary:[],
        itemSlots:[],        
      }
  },

  computed: {
      
      departureStartDate: function () {
        //return moment(this.itemSlots.depStartDate, "YYYY-MM-DD").format( "MMM DD YYYY, ddd" )
        return this.itemSlots.depStartDate
      },
      departureEndDate: function () {
        //return moment(this.itemSlots.depEndDate, "YYYY-MM-DD").format( "MMM DD YYYY, ddd" )
        return this.itemSlots.depEndDate
      }    
  },
  
  created () {
    this.depId = this.$route.params.id  
  },
  
  mounted () {    
    
    this.getAvailabilityDeparture()
    this.checkInitialItemFromStorage()

    
  },

  methods: {

    // 2021-07-14 | fg | informacion + disponibilidad de una salida especifica
    getAvailabilityDeparture () {
          
          AvailabilityServices
               .getAvailabilityDeparture(this.depId)
               .then( response => this.itemSlots = response.data.data )
               .catch( error => console.log("ERROR DEPARTURE AVAILABILITY ", error))
    },
  
    //*********** Metodo para revisar variable guardada en sessionStorage *************** */
    checkInitialItemFromStorage () {
      
      if( !this.item ) this.itemSlots = JSON.parse(sessionStorage.getItem('slotsParent'))
      else this.itemSlots = this.item
    },
    //*********** Fin Metodo para revisar variable guardada en sessionStorage *************** */

    showDeckModal () {
      this.$refs['infoDeck'].show();
    },
    hideModal (refname) {
      this.$refs[refname].hide();
      if ( refname === "modalnestedinline" ) this.$refs["modalnested"].show();
    },
    dataAllotment (data) {
      if ( data ) this.sendAllotment = data
      else this.sendAllotment = false
    },
    dataDiscount (data) {
      if ( data.length > 0) this.sendDiscount = data
      else this.sendDiscount = []
    },
    dataChoosenSlot (data) {
      if ( data.length > 0) this.sendChoosenSlot = data
      else this.sendChoosenSlot = []
    },
    dataCharter (data) {
      if ( data) this.sendCharter = data
      else this.sendCharter = false
    },
    dataHeader (data) {      
      if ( data ) this.sendHeader = data
      else this.sendHeader = {}
    },
    dataSummary (data) {
      if (data) this.sendSummary = data
      else this.sendSummary = {}
    },
    
    //2021-08-16 | fg 
    updateBookingIva(hasIva){
      this.sendHeader.headerIva = hasIva
    }
    //
  }
};
</script>


<style scoped lang="scss">


@media (max-width: 768px) {
 .title-deck-plans{
    text-align: center !important;
  }
}

</style>
