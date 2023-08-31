<template>

    <div class="mb-5">
        
        <p class="m-0 p-2" style="background: rgb(235,235,235);">
        <strong>Cruise length</strong>
        </p>
        
        <b-table
        :items="passengersNights"
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

export default {
    
    name: 'PassengerAnalysisCruiseLength',
    props: ['passengers'],

    data () {
        return {

            total: 0,
            
            fields: [
                { key: 'nights', label: 'Nights', sortable: true},
                { key: 'pax', label: 'Passengers', sortable: true, thStyle: { width: "25%" }, tdClass: "text-right"},
            ]
        }
    },    

    computed: {

        passengersNights(){

            const data = this.passengers

            // agrupar por pais

            const groupedPassengers = groupBy(data, 'itiNights', 'lpaNombre')


            // procesar grupos

            const cruiseLength = []

            for(const [night, pax] of Object.entries(groupedPassengers)){               
                cruiseLength.push({
                    'nights': night == 'null' ? 'Unknown' : night,
                    'pax': pax.length
                })
            }

            return cruiseLength

        }
    },



}
</script>