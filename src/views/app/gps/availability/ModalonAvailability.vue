<template>
  <b-container>

    <!-- {{inforavabucle}} -->

    <div class="row justify-content-center">
      <div class="col-md-8">
        <!--    <b-input-group prepend="Type comision (%)" class="mb-3" size="sm">
          <b-form-input v-model="comision" class="text-class-form" maxlength="2" @keypress="onlyNumber">
          </b-form-input>
        </b-input-group> -->


        <!--      <b-col cols="2" >
        <label for="discount-percent">Comisión</label>
      </b-col> -->

        <b-row class="mt-3 mb-5">
          <b-col cols="2">
            <label for="discount-percent">Comisión</label>
          </b-col>
          <b-col>
            <vue-slider ref="discount-percent" v-model="comision" :min="0" :max="40" :marks="discountMarks"
              :tooltip="'active'"></vue-slider>

          </b-col>
        </b-row>


      </div>

      <!-- containerid: {{containerid}} -->
      <div class="col-md-4">
        <b-button :disabled="!Boolean(containerid)" variant="primary" squared class=" ml-3 mr-4 pull-right btn-xs"
          @click.prevent="CopyToClipboard(containerid)">Copy</b-button>
      </div>
    </div>

    <!-- selectedDepartures -->

    <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content" :no-fade="true">


      <!-- ------------------------------------------- MINIMAL --------------------------------------------- -->
      <b-tab @click="changeidClipboard($t('gps.minimal'))" :title="$t('gps.minimal')">
        <b-row>
          <b-colxx xxs="12" lg="12" class="mb-4">
            <div>
              <table class="table  tb-rate table-bordered table-hover table-sm " :id="$t('gps.minimal')" :ref="$t('gps.minimal')">
                <!-- table table-striped tb-rate table-bordered table-hover table-sm shadow -->
                <thead>
                  <tr>
                    <th>
                      {{ $t("gps.send-yacht") }}
                    </th>
                    <th>
                      {{ $t("gps.send-cruisedates") }}
                    </th>
                    <th>
                      {{ $t("gps.send-route") }}
                    </th>
                    <th>
                      {{ $t("gps.send-grosspp") }}
                    </th>
                    <th>
                      {{ $t("gps.send-pricepp") }}
                    </th>
                    <!-- <th>
                      <b>Rate</b>
                    </th> -->
                  </tr>
                </thead>
                <tr v-for="(value, index) in inforava" :key="index">

                  <td>{{ value.cruName }}</td>
                  <td>
                    {{
                    moment(value.depStartDate).format(' D MMM YYYY, (ddd)')
                    }} -
                    {{
                    moment(value.depEndDate).format(' D MMM YYYY, (ddd)')
                    }}
                  </td>
                  <td> {{value.itiCode}}
                    <!-- ( {{ value.itiName }} ) -->
                  </td>

                  <td v-if="!value.prices.promotion">
                    {{ value.prices.standarRate.offGrossRate | currency}}
                  </td>
                  <td v-else>
                    {{ value.prices.promotion.ratePromo | currency}}
                  </td>


                  <td v-if="!value.prices.promotion">
                    {{ value.prices.standarRate.offNetRate - (comision * value.prices.standarRate.offNetRate) / 100 |
                    currency}}
                  </td>
                  <td v-else>
                    {{ value.prices.promotion.ratePromo - (comision * value.prices.promotion.ratePromo) / 100 |
                    currency}}
                  </td>
                  <!-- <td v-if="!value.prices.promotion">
                    
                    {{ value.prices.standarRate.priName}}
                  </td>

                  
                  <td v-else>
                    
                    {{ value.prices.promotion.priName}}
                  </td> -->

                  <!--   {{value.prices.standarRate.offNetRate}} -->
                    <!--   {{value.prices.standarRate.offNetRate}} -->
                  <!--  <b-badge variant="primary">{{value.prices.standarRate.priName}}</b-badge> -->
                </tr>
              </table>





            </div>
          </b-colxx>
        </b-row>
      </b-tab>
      <b-tab @click="changeidClipboard($t('gps.standard'))" :title="$t('gps.standard')">

        <!-- ------------------------------------------- STANDARD --------------------------------------------- -->
        <b-row >
          <b-colxx xxs="12" lg="12" :id="$t('gps.standard')" :ref="$t('gps.standard')" class="">
            <table class="table  tb-rate table-bordered table-hover table-sm mb-3" 
              v-for="(value, index) in inforava" :key="index">
              <tbody>
                <tr>
                  <th class="custom-standard-th">
                    {{ $t("gps.send-yacht") }}
                  </th>
                  <td>
                    <template v-if="Boolean(value.vslWebsite)">
                      <a :href="value.vslWebsite" target="_blank" class="text-primary">{{ value.cruName }} </a>
                    </template>
                    <template v-else>
                      No web site added
                    </template>
                  </td>
                </tr>
                <tr>
                  <th>
                    {{ $t("gps.send-website") }}
                  </th>
                  <td>   
                    <template v-if="Boolean(value.vslWebsite)">
                      <a :href="value.vslWebsite" target="_blank" class="text-primary">{{value.vslWebsite }}</a>
                    </template>           
                    <template v-else>
                      No web site added
                    </template>                    
                  </td>
                </tr>
                <tr>
                  <th>
                    {{ $t("gps.send-cruisedates") }}
                  </th>
                  <td>
                    <!-- {{
                      moment(value.depStartDate, "YYYY-MM-DD").format("ll")
                    }} ({{ moment(value.depStartDate).format("ddd") }})-
                    {{ moment(value.depEndDate, "YYYY-MM-DD").format("ll") }} ({{
                      moment(value.depStartDate).format("ddd")
                    }}) -->
                    {{
                    moment(value.depStartDate).format(' D MMM YYYY, (ddd)')
                    }} -
                    {{
                    moment(value.depEndDate).format(' D MMM YYYY, (ddd)')
                    }}


                  </td>
                </tr>
                <tr>
                  <th>
                    {{ $t("gps.itinerary") }}
                  </th>
                  <td> {{value.itiCode}}
                    ( {{ value.itiName }}) [ {{value.itiNights + 1}} Days / {{value.itiNights}} Nights  ]
                  </td>
                </tr>
                <tr>
                  <th>
                    {{ $t("gps.send-grosspp") }}
                  </th>


                  <td v-if="!value.prices.promotion">
                    {{ value.prices.standarRate.offGrossRate | currency}}
                  </td>
                  <td v-else>
                    {{ value.prices.promotion.ratePromo | currency}}
                  </td>

                </tr>
                <!--      <tr>
                  <th>
                    <b>{{ $t("gps.send-pricepp") }}</b>
                  </th>
                  <td>                    
                      {{ value.prices.standarRate.offNetRate - (comision * value.prices.standarRate.offNetRate) / 100 | currency}} 
                  </td>
                </tr> -->

                <tr>
                  <th>
                    {{ $t("gps.send-pricepp") }}
                  </th>

                  <td v-if="!value.prices.promotion">
                    {{ value.prices.standarRate.offNetRate - (comision * value.prices.standarRate.offNetRate) / 100 |
                    currency}}
                  </td>
                  <td v-else>
                    {{ value.prices.promotion.ratePromo - (comision * value.prices.promotion.ratePromo) / 100 |
                    currency}}
                  </td>

                </tr>

                <!-- rate -->

                <tr>
                  <!-- <th>
                    <b>Rate</b>
                  </th> -->

                  <!-- <td v-if="!value.prices.promotion"> 
                    {{ value.prices.standarRate.priName}} 
                  </td> -->
                  <!--   {{value.prices.standarRate.offNetRate}} -->

                  <!-- <td v-else>
                    {{ value.prices.promotion.priName}} 
                  </td> -->
                  <!--   {{value.prices.standarRate.offNetRate}} -->
                </tr>

              </tbody>

            </table>
          </b-colxx>
        </b-row>
      </b-tab>


      <!-- ------------------------------------------- DETALLADO --------------------------------------------- -->
      <b-tab @click="changeidClipboard($t('gps.detailed'))" :title="$t('gps.detailed')">
        <b-row>
          <b-colxx xxs="12" lg="12" class="mb-4" :id="$t('gps.detailed')" :ref="$t('gps.detailed')">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <div v-for="(value, index) in inforava" :key="index">
                <!-- <pre>{{value}}</pre> -->
                <div class="card mb-3"  style="border:solid 2px red,">
                  <!-- <table class="table table-secondary tb-rate table-bordered table-hover table-sm"> -->
                    <table class="table tb-rate table-bordered table-hover table-sm " >
                    <!-- 
                    <table class="table  tb-rate table-bordered table-hover table-sm "> -->
                    
                    <tbody>
                      <tr>
                        <th>
                          {{ $t("gps.send-yacht") }}
                        </th>
                        <td>
                          <template v-if="Boolean(value.vslWebsite)">
                            <a :href="value.vslWebsite" target="_blank" class="text-primary">{{ value.cruName }}</a>
                          </template>
                          <template v-else>
                            No web site added
                          </template>
                        </td>
                      </tr>

                       <tr>
                      <th>
                        {{ $t("gps.send-website") }}
                      </th>
                      <td>
                        <template v-if="Boolean(value.vslWebsite)">
                          <a :href="value.vslWebsite" target="_blank" class="text-primary">{{value.vslWebsite }}</a>
                        </template>           
                        <template v-else>
                          No web site added
                        </template> 
                      </td>
                    </tr>

                      <tr>
                        <th>
                          {{ $t("gps.send-cruisedates") }}
                        </th>
                        <td>
                          <!-- {{
                          moment(value.depStartDate, "YYYY-MM-DD").format("ll")
                        }} ({{ moment(value.depStartDate).format("ddd") }})-
                        {{
                          moment(value.depEndDate, "YYYY-MM-DD").format("ll")
                        }} ({{ moment(value.depStartDate).format("ddd") }}) -->

                          {{
                          moment(value.depStartDate).format(' D MMM YYYY, (ddd)')
                          }} -
                          {{
                          moment(value.depEndDate).format(' D MMM YYYY, (ddd)')
                          }}
                        </td>
                      </tr>
                      <!-- <tr>
                        <th>
                          {{ $t("gps.send-route") }}
                        </th>
                        <td> {{value.itiCode}} ( {{ value.itiName }} )</td>
                      </tr> -->
                      <tr>
                        <th>
                          {{ $t("gps.itinerary") }}
                        </th>
                        <td> {{value.itiCode}}
                          ( {{ value.itiName }}) [ {{value.itiNights + 1}} Days / {{value.itiNights}} Nights  ]
                        </td>
                      </tr>
                      <tr>
                        <th>
                          {{ $t("gps.send-grosspp") }}
                        </th>

                        <td v-if="!value.prices.promotion">
                          {{ value.prices.standarRate.offGrossRate | currency}}
                        </td>
                        <td v-else>
                          {{ value.prices.promotion.ratePromo | currency}}
                        </td>

                      </tr>
                      <tr>
                        <th>
                          {{ $t("gps.send-pricepp") }}
                        </th>
                        <td v-if="!value.prices.promotion">
                          {{ value.prices.standarRate.offNetRate - (comision * value.prices.standarRate.offNetRate) /
                          100 | currency}}
                        </td>
                        <td v-else>
                          {{ value.prices.promotion.ratePromo - (comision * value.prices.promotion.ratePromo) / 100 |
                          currency}}
                        </td>
                      </tr>

                      <!-- <tr>
                        <th>
                          <b>Rate</b>
                        </th>


                        <td v-if="!value.prices.promotion">

                          {{ value.prices.standarRate.priName}}
                        </td>
                        <td v-else>

                          {{ value.prices.promotion.priName}}
                        </td>

                      </tr> -->
                      <!--   {{value.prices.standarRate.offNetRate}} -->
                      <!--   {{value.prices.standarRate.offNetRate}} -->


                    </tbody>
                  </table>

                  <ItineraryAvailability :avaid="value.cabins.map(a => a.avaId)"></ItineraryAvailability>
                </div>
              </div>

            </div>
          </b-colxx>
        </b-row>
      </b-tab>

    </b-tabs>
  </b-container>
</template>

<script>
/* *** SERVICES *** */
import moment from "moment";

import VueSlider from "vue-slider-component"
import "vue-slider-component/theme/antd.css"

export default {
  components: {
    "vue-slider": VueSlider
  },
  name: "inforava",
  props: ["selectedDepartures"],
  data() {
    return {
      comision: "25",
      discountMarks: [15, 20, 25, 30, 35],

      tableColumns: [
        { key: "Yacht", label: "Yacht", sortable: "false " },
        { key: "Cruise", label: "Cruise Dates", sortable: "false " },
        { key: "Route", label: "Route", sortable: "false " },
        { key: "Price", label: "Price p.p", sortable: "false " },
        { key: "Gross", label: "Gross p.p", sortable: "false " }
      ],
      moment: moment,
      message: "Copy These Text",
      settings: {
        maxScrollbarLength: 60
      },
      containerid: 'Minimal',
      isLoadingItinerarios: false,
      isLoadingOffers: false,
      inforava: [],
      inforavabucle: [],
      inforitiava: [],
      inforavaitibucle: [],
      selected: ""
      /*             type : "success",
      title : "This is Notify Title",
      message : "This is Notify Message,<br>with html.", */
    };
  },

  filters: {},
  computed: {},
  methods: {

    CopyToClipboard(containerid){
      var el = document.getElementById(containerid);
        var body = document.body,
          range,
          sel;
        if (document.createRange && window.getSelection) {
          var trs = el.getElementsByTagName("tr");
          var tds = el.getElementsByTagName("td");
          el.style.border = 'solid 1px #f3f3f3';
          el.style.width = '100%';
          // el.style.fontFamily = 'Arial';
          el.style.fontSize = '12px';

          // PARA ALTERNAR COLORES ENTRE FILAS
          var elements = document.querySelectorAll("tr:nth-child(even)");
          //var elements = document.querySelectorAll("tr");
          //TR
          for (i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = "#f3f3f3";
            // elements[i].style.width = "75%";
            elements[i].style.border = 'solid 1px #f3f3f3';
            //elements[i].style.width = '150px';
          }

          for(var i = 0; i < trs.length; i++) {
            var ths = trs[i].getElementsByTagName("th");
            //THS
            for(var j = 0; j < ths.length; j++) {
              ths[j].style.border = 'solid 1px #f3f3f3';
              ths[j].style.width = '150px';
            }

            //TDS
            for(var j = 0; j < tds.length; j++) {
              tds[j].style.border = 'solid 1px #f3f3f3';
              tds[j].style.width = '593px';
            }
          }
          range = document.createRange();
          sel = window.getSelection();
          sel.removeAllRanges();
          try {
            range.selectNodeContents(el);
            sel.addRange(range);
          } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
          }
        } else if (body.createTextRange) {
          range = body.createTextRange();
          range.moveToElementText(el);
          range.select();
        }
        document.execCommand("Copy");
        this.showCopyMessage();
    },
    showCopyMessage(){
        var type = "success filled";
        var title = "Copied";        
        var mensaje = "";        
        this.$notify(type, title, mensaje, {
          duration: 750,
          permanent: false
        });
      }, 

    changeidClipboard(idcopy) {
      this.containerid = idcopy;
      //   console.log(idcopy);
    },

    formatDay(day) {
      switch (day) {
        case "1":
          return "Monday";
        case "2":
          return "Tuesday";
        case "3":
          return "Wednesday";
        case "4":
          return "Thursday";
        case "5":
          return "Friday";
        case "6":
          return "Saturday";
        case "7":
          return "Sunday";
      }
    },
    formatMeridian(meridian) {
      switch (meridian) {
        case "1":
          return "AM";
        case "2":
          return "PM";
      }
    },

    getinforByAvailabilitys() {
      this.inforava = this.selectedDepartures;
      this.inforavabucle.push(this.inforava);
      this.inforavabucle = this.inforavabucle.flat();
    },


    onlyNumber($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
      }
    },
  },
  mounted() {
    this.getinforByAvailabilitys();
  }
};
</script>


<style scoped>
   * >>>.custom-standard-th{
      width:150px !important;
   }
</style>