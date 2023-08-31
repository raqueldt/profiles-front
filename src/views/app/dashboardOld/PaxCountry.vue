<template>

<!-- OBSOLETO. 
ARCHIVO HABIL: PaxInCountryDashboard -->

  <b-card :title="$t('gps.pax-country')" >
  
      <table class="table table-striped table-bordered table-sm">
          <tbody>
            <tr v-for="item in pasajerosPais" :key="item.cofId">
                <td>
                    <router-link
                      :to="{ name: 'confirmationparent', params: { cofId: item.cofId } }">
                     <span class="list-item-heading">{{ item.cofCodigo }}</span>
                    </router-link>
                </td>
                <td>
                  {{ item.cofReferencia }}
                </td>
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.cofInicio }}
                </td>
            </tr>
          </tbody>
      </table>   
  </b-card>
</template>

<script>
    import DashboardServices from "../../../services/gps/dashboard/DashboardServices.js";

    export default {

        name: "PaxContry",

        data() {
          return {

            pasajerosPais: [],

          };
        },

        mounted() {
    
            this.getPaxCountry();

        },

        methods: {

            getPaxCountry() {
                DashboardServices.getPaxCountry()
                
                .then(response => {
                  this.pasajerosPais = response.data.data;

                })
                
                .catch(error => {
                  console.log("Error: " + error);
                });
            },

        },

    };

</script>