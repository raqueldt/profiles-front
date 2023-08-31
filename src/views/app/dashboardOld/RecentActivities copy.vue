<template>
  <b-card class="recent-activities">
     <template #header>
      <div class="d-flex col-lg-12 p-0 m-0">
        <h6 class="col mb-0 3">Recent activities</h6>
        <div class="col form-group has-float-label custom-selects mb-0 mt-2">
          <multiselect
          v-model="selectedFilterYatchs"
          :options="filterYatchsList"
          :multiple="true"
          :close-on-select="true"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Select yacht"
          label="cruName"
          track-by="cruId"
          :preselect-first="true"
          >
          </multiselect>
        </div>
        <div class="col form-group has-float-label custom-selects mb-0 mt-2">
          <multiselect
            v-model="actions"
            :options="statusList"
            :multiple="true"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="false"
            placeholder="Pick an Action"
            label="metAuxiliar"
            track-by="metCodigo"
            :preselect-first="false"
            >			
          </multiselect>
        </div>
      </div>
      
    </template>
    <!--b-row>

      <b-colxx md="4">
		  
      </b-colxx>
      <b-colxx md="4">
		  
      </b-colxx>
    </b-row-->
     
      <div v-if="filteredOriginalRowdata">

            <table class="table table-striped table-bordered table-hover table-sm dsh-resent">
              <vue-perfect-scrollbar
                    class="scroll dashboard dashboard-list-with-thumbs"
                    :settings="{ suppressScrollX: true, wheelPropagation: false }"
                    > 
                <tr class="text-center">
                    <th scope="col"  style="width: 13%;">Yatch</th>
                    <th scope="col">Reference</th>
                </tr>
                
                <tr v-for="(activities, index) in filteredOriginalRowdata" :key="index" 
					>
                  <td class="text-center" valign="middle">
                    {{ activities.cruName }}					
                  </td>
                  <td>
                    <small class="text-left"><strong>Atc user: {{ activities.name }}</strong></small>
                    <small class="text-muted">							
                      <strong> {{moment(activities.audFecha).format("ddd, MMMM Do YYYY")}}</strong>
                    </small>
                    <span :class="formatColorAction(activities.audEstado)+' status'">
                      {{formatAction(activities.audEstado)}}
                    </span>
                    <br>
                    <span class="text-left"><br>
                    <small><strong>Client: {{ activities.razon_social }}</strong></small>
                    </span><br>
                    <span class="mt-2 text-muted text-small">{{ activities.audNota }}</span>
                  </td>
				
                </tr>
                </vue-perfect-scrollbar>
            </table>
      </div>
      <div v-else>
          <div class="bg-warning p-3 mt-4 mx-3 rounded-1">
            <i class="glyph-icon simple-icon-globe"></i> No results. Please choose different filter and try again.
          </div>
      </div>

    
  </b-card>
</template>

<script>
import DashboardServices from "../../../services/gps/dashboard/DashboardServices.js";
import CruiseServices from "../../../services/gps/cruise/CruiseServices.js";
import MetadataServices from "../../../services/gps/metadata/MetadataServices.js";
import moment from "moment";
export default {
  name: "RecentActivities",
  data() {
    return {
      resentActivities: "",
      filterYatchsList: "",
      statusList: "",
      selectedFilterYatchs: [],
      filterYatchs: [],
      value: "",
      actions: []
    };
  },
  computed: {
    filteredOriginalRowdata: function() {
		if(this.resentActivities.length>0){
			var resultado = this.resentActivities
					.filter(this.filterByYatchs)
					.filter(this.filterByActions);
				return resultado;
		}      
    },
  },
  methods: {
    getBookingsAudits() {
      DashboardServices.getBookingsAudits()
        .then(response => {
          this.resentActivities = response.data.data;
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    },

    getAllCruises() {
      CruiseServices.getCruises()
        .then(response => {
          this.filterYatchsList = response.data.data;
        })
        .catch(error => {
          console.log("Error: " + error);
        });

      this.getAllStatus();
    },
    getAllStatus() {
      MetadataServices.getMetadataByGroup(18)
        .then(response => {
          this.statusList = response.data.data;
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    },
    formatAction(status) {
      switch (status) {
        case 2:
          return "Hold";
        case 3:
          return "Preconfirm";
        case 4:
          return "Cancel";
        case 5:
          return "Confirm with payment";
        case 6:
          return "Allowment";
        case 10:
          return "Timed out of Time Limit";
        case 11:
          return "Change Time Limit";
        default:
          return "No defined";
      }
    },
	formatColorAction(status) {
      switch (status) {
        case 2:   //Hold
          return "badge badge-warning ";
        case 4:   // Cancel
          return "badge badge-danger";
        case 6:   // Allotment
          return "badge badge-info";
        default:  // Default
          return "badge badge-info";
      }
    },
	
    filterByYatchs: function(item) {
      if (this.selectedFilterYatchs.length === 0) {
        return true;
      } else {
        var selectedYatchs = this.selectedFilterYatchs;
        let filterArray = selectedYatchs.map(a => a.cruId);
        return filterArray.includes(item.cruId);
      }
    },
    filterByActions: function(item) {
      if (this.actions.length === 0) {
        return true;
      } else {
        var selectedActions = this.actions;
        let filterArray = selectedActions.map(a => a.metCodigo);
        return filterArray.includes(item.audEstado);
      }
    }
  },
  mounted() {
    this.getBookingsAudits();
    this.getAllCruises();
  }
};
</script>
