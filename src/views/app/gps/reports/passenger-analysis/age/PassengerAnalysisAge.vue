<template>

    <div class="mb-5">

        <div class="d-flex justify-content-between" style="background: rgb(235,235,235);">
        
          <div>
            <p class="m-0 p-2">

              <strong>Age</strong>

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
           id="ageTable"
           :items="passengersAge"
           :fields="fields"
           sort-by="pax"
           :sort-desc="true"        
           hover
           small
        >
            <template #cell(passengers)="row">
                <span class="mr-3">{{ row.item.passengers.length }}</span>
            </template>  
            
        </b-table>
    </div>

    
</template>

<script>

import { copyToClipBoard } from '../../utils'

export default {
    
    name: 'PassengerAnalysisAge',
    props: ['passengers'],

    data () {
        return {

            total: 0,
            
            fields: [
                { key: 'group', label: 'Group'},
                { key: 'passengers', label: 'Passengers',  thStyle: { width: "25%" }, tdClass: "text-right"},
            ]
        }
    },    

    computed: {

        passengersAge(){

            const data = this.passengers

            const ageGroup = [
                { 
                  group: 'Unkown', 
                  passengers: data.filter( pax => pax.age === null )
                },
                { 
                  group: '81>', 
                  passengers: data.filter( pax => pax.age >= 81)
                },
                { 
                  group: '71-80', 
                  passengers: data.filter( pax => pax.age >= 71 &&  pax.age <= 80)
                },
                { 
                  group: '61-70', 
                  passengers: data.filter( pax => pax.age >= 61 &&  pax.age <= 70)
                },
                { 
                  group: '51-60', 
                  passengers: data.filter( pax => pax.age >= 51 &&  pax.age <= 60)
                },
                { 
                  group: '41-50', 
                  passengers: data.filter( pax => pax.age >= 41 &&  pax.age <= 50)
                },
                { 
                  group: '31-40', 
                  passengers: data.filter( pax => pax.age >= 31 &&  pax.age <= 40)
                },
                { 
                  group: '21-30', 
                  passengers: data.filter( pax => pax.age >= 21 &&  pax.age <= 30)
                },
                { 
                  group: '11-20', 
                  passengers: data.filter( pax => pax.age >= 11 &&  pax.age <= 20)
                },
                { 
                  group: '0-10', 
                  passengers: data.filter( pax => pax.age <= 10 && pax.age !== null)
                },

            ]


            


            return ageGroup

        }
    },

    methods: {

      copy() {
        copyToClipBoard('ageTable')
      }
      
    }


}
</script>