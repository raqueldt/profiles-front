<template>

    <div class="mb-5">
        
    <div class="d-flex justify-content-between" style="background: rgb(235,235,235);">
    
        <div>
        <p class="m-0 p-2">

            <strong>Agency</strong>

        </p>

        </div>

        <div>
            <b-button
            variant="link"
            @click="copy"
            >
            Copy
            </b-button>
        </div>
    </div>

        
        <b-table
           id="agencyTable"
           :items="passengersAgencies"
           :fields="fields"
           sort-by="pax"
           :sort-desc="true"        
           hover
           small
        >
            <template #cell(pax)="row">
                <span class="mr-3">{{ row.item.pax }}</span>
            </template>  
        </b-table>
    </div>

    
</template>

<script>

import { groupBy } from '../utils'
import { copyToClipBoard } from '../../utils'

export default {
    
    name: 'PassengerAnalysisAgency',
    props: ['passengers'],

    data () {
        return {

            total: 0,
            
            fields: [
                { key: 'agency', label: 'Agency', sortable: true},
                { key: 'pax', label: 'Passengers', sortable: true, thStyle: { width: "25%" }, tdClass: "text-right"},
            ]
        }
    },    

    computed: {

        passengersAgencies(){

            const data = this.passengers

            // agrupar por agency/client

            const groupedPassengers = groupBy(data, 'cofClienteId', 'lpaNombre', 'clienteName')

            // procesar grupos

            const agencies = []

            for(const [agency, pax] of Object.entries(groupedPassengers)){       

                const agencyItems = agency.split('|')

                agencies.push({
                    'id': agencyItems[0],
                    'agency': agencyItems[1],
                    'pax': pax.length
                })
            }

            return agencies

        }
    },
    methods: {

      copy() {
        copyToClipBoard('agencyTable')
      }
      
    },    



}
</script>