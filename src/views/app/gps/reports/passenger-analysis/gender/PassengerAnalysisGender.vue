<template>

    <div class="mb-5">
        <p class="m-0 p-2" style="background: rgb(235,235,235);">
        <strong>Gender</strong>
        </p>
        
        <b-table
        :items="passengersGender"
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
    
    name: 'PassengerAnalysisGender',
    props: ['passengers'],

    data () {
        return {

            total: 0,
            
            fields: [
                { key: 'gender', label: 'Gender', sortable: true},
                { key: 'pax', label: 'Passengers', sortable: true, thStyle: { width: "25%" }, tdClass: "text-right"},
            ]
        }
    },    

    computed: {

        passengersGender(){

            const data = this.passengers

            // agrupar por pais

            const groupedPassengers = groupBy(data, 'gender');

            // procesar grupos

            const genders = []

            for(const [gender, pax] of Object.entries(groupedPassengers)){               
                genders.push({
                    'gender': gender == 'null' ? 'Unknown' : gender,
                    'pax': pax.length
                })
            }

            return genders

        }
    },



}
</script>