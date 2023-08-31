<template>
    <div class="dashboard">
        <b-row>
            <b-colxx xxs="12">
                <piaf-breadcrumb :heading="$t('menu.dashboardsales')" />
                <div class="separator mb-5"></div>
            </b-colxx>
        </b-row>
        <b-row class="specials">
            <b-colxx xl="6" lg="12">
                <b-card :title="$t('gps.special-offers')">
                  asdasdasdads
                </b-card>
            </b-colxx>
            <b-colxx lg="12" xl="6" class="mb-4">
                <b-card :title="$t('gps.top-rate')">
                </b-card>   
            </b-colxx>
        </b-row>
        <b-row>
            <b-colxx xl="5" lg="12">
                <b-card :title="$t('gps.confirmations')">
                    <vue-perfect-scrollbar
                    class="scroll dashboard-list-with-user"
                    :settings="{ suppressScrollX: true, wheelPropagation: false }">
                        <b-table
                            ref="custom-table"
                            class="vuetable t"
                            striped 
                            :fields="bootstrapTable.fields"
                            :items="items"
                            
                        >
                         <template slot="reference" slot-scope="props">
                            {{props.items.reference}}{{props.items.clMail}}
                        </template>
                        <template slot="status" slot-scope="props">
                            <b-badge class="mb-1" >{{props.items.status}}</b-badge>
                        </template>
                        </b-table>
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
                    
                    
                    </vue-perfect-scrollbar>
                </b-card>
            </b-colxx>
            <b-colxx lg="12" xl="7" class="mb-4">
                <b-card :title="$t('gps.pax-in-country')">
                </b-card>   
            </b-colxx>
        </b-row>
        <b-row>
            <b-colxx xl="5" lg="12">
                <b-card :title="$t('gps.recents-activites')">
                </b-card>
            </b-colxx>
            <b-colxx lg="12" xl="7" class="mb-4">
                <b-card :title="$t('gps.quotes')">
                </b-card>   
            </b-colxx>
        </b-row>
    </div>
</template>

<script>
import { apiUrl } from '../../../../constants/config'
import axios from 'axios'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePaginationBootstrap from '../../../../components/Common/VuetablePaginationBootstrap'

export default {
  components: {
    'vuetable' : Vuetable,
    'vuetable-pagination-bootstrap' : VuetablePaginationBootstrap
  },
  data () {
    return {
      vuetableItems: {
        apiUrl: apiUrl + '/cakes/fordatatable',
        fields: [
          {
            name: 'title',
            sortField: 'title',
            title: 'Name',
            titleClass: '',
            dataClass: 'list-item-heading'
          },
          {
            name: 'sales',
            sortField: 'sales',
            title: 'Sales',
            titleClass: '',
            dataClass: 'text-muted'
          },
          {
            name: 'stock',
            sortField: 'stock',
            title: 'Stock',
            titleClass: '',
            dataClass: 'text-muted'
          },
          {
            name: 'category',
            sortField: 'category',
            title: 'Category',
            titleClass: '',
            dataClass: 'text-muted'
          }
        ]
      },

      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      items: [
        { id: 1, filecode: 'ATC-21-139', reference: 'Zinsley 4 PAX', clMail:'audley@audley.com', atcuser: 'Lisa', startdate: '30 Nov 2020', status: 'C' },
        { id: 2, filecode: 'ATC-21-140', reference: 'Carlson x2', clMail:'audley@audley.com', atcuser: 'Santiago', startdate: '30 Nov 2020', status: 'C' },
        { id: 3, filecode: 'ATC-21-143', reference: 'Zinsley 4 PAX', clMail:'audley@audley.com', atcuser: 'Carla', startdate: '30 Nov 2020', status: 'C' }
      ],
      bootstrapTable: {
        selected: [],
        selectMode: 'multi',
        fields: [
          { key: 'filecode', label: 'File code', sortable: false, sortDirection: 'asc', tdClass: 'list-item-heading' },
          { key: 'reference', label: 'Reference', sortable: false, tdClass: 'text-muted' },
          { key: 'atcuser', label: 'ATC User', sortable: false, tdClass: 'text-muted' },
          { key: 'startdate', label: 'Start date file', sortable: false, tdClass: 'text-muted' },
          { key: 'status', label: 'Status', sortable: false, tdClass: 'text-muted' }
          //{ key: 'clMail', tdClass: 'text-muted' }
        ]
       
      }
    }
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
  }
}
</script>
