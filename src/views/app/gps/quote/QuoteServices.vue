<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <h1> {{$t('gps.quotes')}} </h1>
      <div class="form-group has-float-label custom-input float-right">
        <b-colxx xxs="12" class="quote-header">
          <b-row>
          <b-colxx xxs="4">
            <!-- info de cliente nombre y email -->
            <strong>Client: </strong>Audley Travel <span class="mail">audley@travel.com</span>
          </b-colxx>
          <b-colxx xxs="8" class="p-0">
            <div>
            <!-- info de referencia de bloqueo -->
             <strong>Your Reference: </strong>Lorem ipsum dolor sit amet
            </div>
            <div>
              <!-- ATC+id de pedido -->
             <strong>ATC Reference:</strong> <span class="ref">R20-01</span>
            </div>
          </b-colxx>
        </b-row>
        </b-colxx>        
      </div>
      <div class="separator mb-2"></div>
    </b-colxx>
  </b-row>
 
  <b-tabs nav-class="separator-tabs ml-0 mb-4" content-class="tab-content" :no-fade="true">

    <b-tab :title="$t('gps.quote')+1">
      <b-colxx xxs="12" class="pl-0 pr-0">
        <b-card class="mb-4 quote-content">
          <b-row>
              <b-colxx xxs="12">
                <b-row>
                  <b-colxx xxs="2">
                    <!--Id de Quote + Versión + fecha de creación-->
                    <div class="quote-name">
                      Q01 - v1<br>
                      10-12-2020
                    </div>
                  </b-colxx>
                  <b-colxx xxs="1">
                    <label class="form-group has-float-label">
                      <input type="date" class="form-control"  />
                      <span>{{$t('gps.date-services')}}</span>
                    </label>
                  </b-colxx>
                  <b-colxx xxs="1">
                    <label class="form-group has-float-label">
                      <input type="number" class="form-control" minlength="1" />
                      <span>Num pax</span>
                    </label>
                  </b-colxx>
                  <b-colxx xxs="6">
                    <b-row>
                      <b-colxx xxs="7">
                        <label class="form-group has-float-label">
                          <input type="text" class="form-control"/>
                          <span>{{$t('gps.search-services')}}</span>
                        </label>
                      </b-colxx>
                      <b-colxx xxs="1" class="pp font-weight-bold">
                        pp
                      </b-colxx>
                      <b-colxx xxs="1" class="text-success font-weight-bold pv">
                        pv
                      </b-colxx>
                      <b-colxx xxs="2" class="text-success font-weight-bold total">
                        total
                      </b-colxx>
                      <b-colxx xxs="1" class="text-primary font-weight-bold pp">
                        %
                      </b-colxx>
                    </b-row>
                  </b-colxx>
                  <b-colxx xxs="2">
                    <b-button class="mb-1" variant="primary default" size="xs">+{{ $t('gps.add') }}</b-button>
                    <b-button class="mb-1" variant="info default" size="xs">{{ $t('gps.clear') }}</b-button>
                  </b-colxx>
                </b-row>
                <div class="separator mt-3 mb-1"></div>  
              </b-colxx>
          </b-row>
           <b-row>
            <b-colxx xxs="12">
              
              <b-table striped 
              :fields="bootstrapTable.fields"
              :items="items2"
              ref="custom-table"
              class="vuetable quote"
              sort-by="title" sort-desc.sync="false">
              
                <template #cell(details)="row">
                  <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="details">
                  <i :class=" row.detailsShowing ? 'glyph-icon  simple-icon-arrow-up' : 'glyph-icon  simple-icon-arrow-down'"></i>
                  </b-button>
                <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
                </template>

                <template #row-details="row">
                  <b-row class="mt-3 mb-3 justify-content-md-center">
                    <b-card class="col-md-8">
                      <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                    </b-card>
                  </b-row>
                </template>

                <template #cell(start_date)="row">
                  <b-row>
                    <b-colxx xxs="3" class="p-0 date-label-services">
                      <div class="label">{{$t('gps.day')}}</div>
                      <div class="date-num">1</div>
                      <div class="date-days">Mon</div>
                    </b-colxx>
                    <b-colxx xxs="9" class="p-0 start-date">
                     {{row.item.start_date}}
                    </b-colxx>
                  </b-row>
                </template>
                
              </b-table>
              </b-colxx>  
          </b-row>
          <b-row>
            <b-colxx xxs="12">
              
              <b-table striped 
              :fields="bootstrapTable.fields"
              :items="items"
              ref="custom-table"
              class="vuetable quote"
              sort-by="title" sort-desc.sync="false">
              
                <template #cell(details)="row">
                  <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="details">
                  <i :class=" row.detailsShowing ? 'glyph-icon  simple-icon-arrow-up' : 'glyph-icon  simple-icon-arrow-down'"></i>
                  </b-button>
                <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
                </template>

                <template #row-details="row">
                  <b-row class="mt-3 mb-3 justify-content-md-center">
                    <b-card class="col-md-8">
                    
                      <b-table :fields="bootstrapTable2.fields" :items="items2" class="vuetable quote-detail" />
                    
                      <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                    </b-card>
                  </b-row>
                </template>

                <template #cell(start_date)="row">
                  <b-row>
                    <b-colxx xxs="3" class="p-0 date-label1">
                      <div class="label">{{$t('gps.day')}}</div>
                      <div class="date-num">1-7</div>
                      <div class="date-days">Mon-Mon</div>
                    </b-colxx>
                    <b-colxx xxs="9" class="p-0 start-date">
                     {{row.item.start_date}}
                    </b-colxx>
                  </b-row>
                </template>
              </b-table>
              
              <b-row>
                  <b-colxx xxs="12">
                      <b-row>
                        <b-colxx xxs="6">
                        </b-colxx>
                        <b-colxx xxs="6" class="quotes-summary">
                          <b-row>
                              <b-colxx class="pt-4"></b-colxx>
                              <b-colxx class="border-bottom">{{$t('gps.sub-total')}}</b-colxx>
                              <b-colxx class="border-bottom">$ 17231</b-colxx>
                          </b-row>
                           <b-row>
                              <b-colxx></b-colxx>
                              <b-colxx class="border-bottom">{{$t('gps.discounts')}}</b-colxx>
                              <b-colxx class="border-bottom disconunts">$ -100</b-colxx>
                          </b-row>
                          <b-row>
                              <b-colxx></b-colxx>
                              <b-colxx class="border-bottom">Iva 12%</b-colxx>
                              <b-colxx class="border-bottom">$ 2067.72</b-colxx>
                          </b-row>
                          <b-row>
                              <b-colxx></b-colxx>
                              <b-colxx class="border-bottom grtotal">{{$t('gps.grant-total')}}</b-colxx>
                              <b-colxx class="border-bottom grtotal grtotal-color">$ 19299</b-colxx>
                          </b-row>
                        </b-colxx>
                      </b-row>
                  </b-colxx>
              </b-row>
              <b-pagination
                  size="sm"
                  align="center"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  v-model="currentPage"
                >
                  <template v-slot:next-text>
                    <i class="simple-icon-arrow-right"/>
                  </template>
                  <template v-slot:prev-text>
                    <i class="simple-icon-arrow-left"/>
                  </template>
                  <template v-slot:first-text>
                    <i class="simple-icon-control-start"/>
                  </template>
                  <template v-slot:last-text>
                    <i class="simple-icon-control-end"/>
                  </template>
                </b-pagination>

                <b-alert v-if="bootstrapTable.selected.length>0" show variant="primary">Selected Items :<br/><pre>{{ bootstrapTable.selected }}</pre></b-alert>
            </b-colxx>  
          </b-row>
        </b-card>
      </b-colxx>
    </b-tab>
  </b-tabs>
  <b-row>
    <b-colxx xxs="12">
      <b-row>
        <b-colxx xxs="6">
        </b-colxx>
        <b-colxx xxs="6">
          <div class="float-right">
             <b-button-group class="mb-2">
              <b-button variant="info default">{{ $t('gps.preview') }}</b-button>
              <b-button variant="success default">{{ $t('gps.save-quote') }}</b-button>
              <b-button variant="danger default">{{ $t('gps.back-quote') }}</b-button>
            </b-button-group>
          </div>
        </b-colxx>
      </b-row>
    </b-colxx>
  </b-row>
  </div>
</template>
 
<script>
/* *** SERVICES *** */
import { apiUrl } from '../../../../constants/config'
import axios from 'axios'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePaginationBootstrap from '../../../../components/Common/VuetablePaginationBootstrap'


import AvailabilityServices from "../../../../services/gps/availability/availabilityServices.js";

export default {
 components: {
    'vuetable' : Vuetable,
    'vuetable-pagination-bootstrap' : VuetablePaginationBootstrap
  },
  data() {
    return {
      items: [
        {start_date: 'Mon, 03-12-2020', end_date: 'Mon, 10-12-2020', num_pax: '2', rooms: '2', item: 'Aqua Itinerary B - Naturalist 	Lower - 2', total:'4000' },
        {start_date: 'Mon, 03-12-2020', end_date: 'Mon, 10-12-2020',num_pax: '6', rooms: '2', item: 'Aqua Itinerary B - Naturalist 	Lower - 6', total:'4000' },
        {start_date: 'Mon, 03-12-2020', end_date: 'Mon, 10-12-2020', num_pax: '4', rooms: '2', item: 'Aqua Itinerary B - Naturalist 	Upper - 4', total:'5500' }
      ],
      items2: [
        {start_date: 'Mon, 03-12-2020', end_date: 'Mon, 10-12-2020', num_pax: '2', rooms: '-', item: 'Flights', pp:'168', pv:'180', total:'900', percent:'14%' },
        {start_date: 'Mon, 03-12-2020', end_date: 'Mon, 10-12-2020',num_pax: '4', rooms: '-', item: 'Transfer Lobitos', pp:'20', pv:'30', total:'150', percent:'10%' },
      ],
      vuetableItems: {
        apiUrl: apiUrl + '/cakes/fordatatable',
        
      },
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      bootstrapTable: {
        selected: [],
        selectMode: 'multi',
        fields: [
          { key: 'details', label: ' ', sortable: false, sortDirection: 'desc', tdClass: 'details' },
          { key: 'start_date', label: 'Start date', sortable: false, sortDirection: 'desc', tdClass: 'list-item-startdate' },
          { key: 'end_date', label: 'End date', sortable: false, tdClass: 'list-item-enddate' },
          { key: 'num_pax', label: 'Num Pax', sortable: false, tdClass: 'nums' },
          { key: 'rooms', label: 'Rooms', sortable: false, tdClass: 'nums' },
          { key: 'item', label: 'Item', sortable: false, thClass:'col-item', tdClass: 'text-muted' },
          { key: 'pp', label: 'PP', sortable: false, tdClass: 'pp' },
          { key: 'pv', label: 'PV', sortable: false, tdClass: 'pv' },
          { key: 'total', label: 'total', sortable: false, tdClass: 'total' },
          { key: 'percent', label: '%', sortable: false, tdClass: 'percent' },
          //{ key: 'net', label: 'Net', sortable: false, tdClass: 'pricess' },
          { key: 'actions', label: 'actions', sortable: false, tdClass: '' }
        ]
      },
     
    };
  },
  filters: {},
  computed: {

  },
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    rowSelected (items) {
      this.bootstrapTable.selected = items
    },
    dataProvider (ctx) {
      const params = this.apiParamsConverter(ctx)
      let promise = axios.get(apiUrl + '/cakes/fordatatable', { params: params })

      return promise
        .then(result => result.data)
        .then((data) => {
          this.currentPage = data.current_page
          this.perPage = data.per_page
          this.totalRows = data.total
          const items = data.data
          return items;
        }).catch(_error => {
          return []
        })
    },
    apiParamsConverter (params) {
      let apiParams = {}
      if (params.perPage !== 0) {
        apiParams.per_page = params.perPage
      }
      if (params.currentPage >= 1) {
        apiParams.page = params.currentPage
      }
      if (params.sortBy && params.sortBy.length > 0) {
        apiParams.sort = `${params.sortBy}|${params.sortDesc ? 'desc' : 'asc'}`
      }
      if (params.filter && params.filter.length > 0) {
        // Optional
      }
      return apiParams
    }
  },
  mounted() { 
    //console.log("==>Array original: " + this.rowDataHeaderAndSummarySlots.length);
  },
};
</script>

