<template>

<div class="mb-5">

    <div class="d-flex justify-content-between" style="background: rgb(235,235,235);">
    
        <div>
        <p class="m-0 p-2">

            <strong>Nationality</strong>

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
      id="nationalityTable"
      :items="passengersNationality"
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

    name: 'PassengerAnalysisNationality',
    props: ['passengers'],

    data () {
        return {

            
            
            fields: [
                { key: 'country', label: 'Country', sortable: true},
                { key: 'pax', label: 'Passengers', sortable: true, thStyle: { width: "25%" }, tdClass: "text-right"},
            ]
        }
    },

    computed: {


        passengersNationality(){

            

            const data = this.passengers

            // agrupar por pais

            const groupedPassengers = groupBy(data, 'paiNombre');


            // procesar grupos

            const nationalities = []

            for(const [country, pax] of Object.entries(groupedPassengers)){               
                nationalities.push({
                    'country': country == 'null' ? 'Unknown' : country,
                    'pax': pax.length
                })
            }

            return nationalities

        }
    },

    methods: {

      copy() {
        copyToClipBoard('nationalityTable')
      }
      
    },

    created(){

        
    },

    mounted() {

        
        
    },


    
}


</script>


