<template>
    <div>
        <b-card>
            <b-card-title>
                <div class="d-flex">
                    <div>
                        Sales Travel Details
                    </div>
                    <div class="ml-auto">
                        <b-button
                            @click="handleView"
                        >
                        Back
                        </b-button>
                    </div>                    
                </div>
            </b-card-title>
            
            
            <b-table
                :items="details.data"
                :fields="fields"
                responsive="sm"
                class="mt-3"
                small
            >                

                <template #cell(cofCodigo)="row">
                    
                    <router-link            
                    :to="{name:'confirmations', params:{cofId: row.item.cofId}}"
                    >
                        <span class="text-primary">                            
                            <small><strong>{{ row.item.cofCodigo }}</strong></small>
                        </span>
                    </router-link>                     
                </template>

                <template #cell(clienteName)="row">
                    <small>{{ row.item.clienteName }}</small>
                </template>


                <template #cell(cofInicio)="row">
                    <small>
                     {{ moment(row.item.cofInicio, 'YYYY-MM-DD').format('DD MMM YYYY') }}
                     
                    </small> 
                </template>

                <template #cell(cofFinal)="row">
                    <small>
                      {{ moment(row.item.cofFinal, 'YYYY-MM-DD').format('DD MMM YYYY') }}
                    </small>
                </template>


                <template #cell(nights)="row">
                    <small>{{ row.item.nigth }}N/{{ row.item.days }}D</small>                     
                </template>

                <template #cell(dba)="row">
                    <small>{{ row.item.dba }}</small>                     
                </template>                

                <template #cell(cofPasajeros)="row">
                    <small>
                     {{ row.item.cofPasajeros ? row.item.cofPasajeros : 0 }}
                    </small>
                </template>

                <template #cell(venta)="row">
                    <small>
                     {{ row.item.venta | currency }} 
                    </small>
                </template>

                <template #cell(cofFechaVenta)="row">
                    <small>
                        {{ moment(row.item.cofFechaVenta, 'YYYY-MM-DD').format('ddd, DD MMM YYYY') }}                        
                    </small>
                </template>

                <template #cell(vendedor)="row">
                    <small>
                        {{ row.item.vendedor }}                        
                    </small>
                </template>

                <template slot="bottom-row" slot-scope="data">

                     <td colspan="6" class="text-right" style="background: antiquewhite">
                         <small>
                             <strong>
                                TOTAL
                             </strong>
                         </small>
                     </td>
                     <td class="text-right" style="background: antiquewhite">
                         <small>
                             <strong>
                                {{ details.pax}}
                             </strong>
                         </small>
                     </td>
                     <td class="text-right" style="background: antiquewhite">
                         <small>
                             <strong>
                                {{ details.sales | currency}}
                             </strong>
                         </small>
                     </td>
                     <td style="background: antiquewhite" colspan="2">

                     </td>

                </template>


            </b-table>
        </b-card>
    </div>
</template>   
<script>

import { mapMutations, mapState } from 'vuex'

export default {

    name: 'SalesTravelDetails',
    props: ['details'],
    data() {
        return {
            fields: [
              {key: 'cofCodigo', label: 'File', tdClass: 'text-left', thClass: 'text-center', sortable: true},
              {key: 'clienteName', label: 'Client', sortable: true},
              {key: 'cofInicio', label: 'Date in', tdClass: 'text-center', sortable: true},
              {key: 'cofFinal', label: 'Date out', tdClass: 'text-center', sortable: true},
              {key: 'nights', label: 'Length', tdClass: 'text-center', sortable: true},
              {key: 'dba', label: 'DBA', tdClass: 'text-right', sortable: true},
              {key: 'cofPasajeros', label: 'Pax', tdClass: 'text-right', sortable: true},
              {key: 'venta', label: 'Sale', tdClass: 'text-right', sortable: true},
              {key: 'cofFechaVenta', label: 'Confirmation', tdClass: 'text-center', sortable: true},
              {key: 'vendedor', label: 'Salesperson', tdClass: 'text-left', sortable: true},
            ]
        }
    },
    computed: {
        ...mapState('salesbyTravel',['summaryViewActive'])
    },
    methods: {
        ...mapMutations('salesbyTravel',['setSummaryViewActive']),
        handleView () {

            this.setSummaryViewActive(true)

        }
    },



    
}
</script>