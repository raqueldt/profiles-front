<template>
  <div class="modal-body">
    <b-colxx md="12">
      <!-- ICONOS INFORMATIVOS -->
                 <h5> To finish of assign discounts, click on <strong> "Save" </strong>  button to record the data  </h5> 
        <b-row class="text-left">
          
        <b-colxx>
     
          <b-card class="mb-4" :title="'Admin Extra Discount'">
          <b-button class="mb-1"  v-b-modal.modal-multi-3 variant="secondary">Delete</b-button>
          <b-button class="mb-1" v-b-modal.modal-multi-2 variant="primary">Add Discount</b-button>
       </b-card>
         </b-colxx>
       
          <b-colxx>
           <icon-card
            :title="'REF:'+
            booking.bokReference"
            icon="iconsminds-basket-coins"
            :value="parseFloat( valortotaldescuento )"
          />
        </b-colxx>
      </b-row>
  
      <b-row class="text-center">
        <p class="text-muted">
        Discounts are per slot. Select <b>Discount category</b> and then choose
        <b>Percent</b> or <b>Mount</b>
      </p>
      </b-row>
  <!--     <p class="text-muted">
        Discounts are per slot. Select <b>Discount category</b> and then choose
        <b>Percent</b> or <b>Mount</b>
      </p> -->

      <!-- FIN ICONOS INFORMATIVOS -->
  
    </b-colxx>

    <b-row v-for="item in inforslotsgeneral" :key="item.decId">
      <div :class="item.decName" class="mb-4">
        <div class="text-left h6">
          <b
            ><i class="glyph-icon simple-icon-direction"></i
            >{{ item.decName }}:</b
          >
          <hr width="450" />
        </div>
        <div
          class="btn-group float-left ml-3"
          role="group"
          aria-label="Basic example"
        >
          <div>
            <div
              v-for="(row, index) in inforslots"
              :key="index"
              class="btn-group"
              role="group"
            >
              <div
                v-for="(rows, index) in row"
                :key="index"
                class="btn-group mx-1 shadow"
                role="group"
              >
                <div v-if="rows.decId == item.decId">
                  <div>
                    <!-- ICONOS INFORMATIVOS -->
                    <b-row class="text-center">
                      <b-colxx>
                        <b-button
                          v-b-tooltip.hover.bottom
                          title="Click here to add extra Discount"
                          class="btn-block"
                          squared
                          variant="info"
                          v-b-modal.modal-multi-2
                        >
                          {{ rows.cabCode }}-{{ formatDay(rows.avsOrder) }}
                        </b-button>
                      </b-colxx>
                    </b-row>

                    <!-- FIN ICONOS INFORMATIVOS -->

                    <!-- INICIO DENTRO SLOT -->
                  <icon-card  v-if="rows.bsrAmount"  :title="'Discount Apply'" icon="iconsminds-basket-coins" 
                  :value="parseFloat( rows.bsrAmount ) " />
                  <b-button
                      v-if="rows.bsrAmount"
                      @click="deleteextradiscountbookings(rows.bsrId)"
                      class="mb-2"
                      size="sm"
                      variant="danger"
                      >Delete</b-button
                    > 
                    <multiselect
                      v-else
                      v-model="rows.value"
                      :options="filterDiscount"
                      group-values="ridName"
                      group-label="raiName"
                      :group-select="true"
                      :showNoOptions="true"
                      placeholder="Select discount category "
                      track-by="ridId"
                      label="ridName"
                    >
                      <small slot="noOptions" class="text-danger"
                        >List Empty</small
                      >
                    </multiselect>

                    <div class="container" v-if="rows.value">
                      <div class="row justify-content-md-center">
                        <div class="radio">
                          <label class="radio-inline">
                            <!-- <input
                            type="radio"
                            v-model="rows.opcion"
                            v-bind:value="true"
                          />
                          <b>Percent</b> -->
                            <b-form-radio
                              class="mr-3"
                              v-model="rows.opcion"
                              name="some-radios"
                              :value="true"
                              ><b>Percent</b>
                            </b-form-radio>
                          </label>

                          <label class="radio-inline">
                            <!-- <input
                            type="radio"
                            v-model="rows.opcion"
                            v-bind:value="false"                         
                          /> 
                          <b>Mount</b>-->
                            <b-form-radio
                              v-model="rows.opcion"
                              name="some-radios"
                              :value="false"
                              ><b>Mount</b>
                            </b-form-radio>
                          </label>
                        </div>
                      </div>

                      <div class="row justify-content-md-center">
                        <div v-if="rows.opcion" class="form-group">
                          <b-form-input
                            maxlength="2"
                            v-model.number="rows.valorporcent"
                            placeholder="Type percent (%)"
                          ></b-form-input>
                        </div>
                        <div v-else class="form-group">
                          <b-form-input
                            maxlength="5"
                            v-model.number="rows.valormount"
                            placeholder="Type mount ($)"
                          ></b-form-input>
                        </div>
                      </div>
                    </div>

                    <b-button
                      class="mb-2 rounded"
                      v-if="
                        (rows.value && rows.valorporcent) || rows.valormount
                      "
                      @click="  
                        SaveData(
                          rows.value,
                          rows.bosId,
                          rows.valorporcent,
                          rows.valormount
                        )
                      "
                      squared
                      size="sm"
                      variant="primary"
                      >Save discount</b-button
                    >
                    <!-- 
                FIN JUNTO AL SLOT -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-row>
<!-- ADMINISTRADOR DE DESCUENTOS EXTRAS -->
    <b-modal id="modal-multi-2" title="Add Extra Discount" ok-only>
      <div
        class="alert alert-success alert-dismissible fade show w-100"
        role="alert"
        id="alert"
        v-if="subcategoryMessage"
      >
        <strong>Category added!</strong> <br />
        Now you can add a subcategory. Please check in "Add Subcategory" and
        complete form
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="row justify-content-center">
        <div class="col-sm-4">
          <div class="form-group">
            <div class="radio">
              <label class="radio-inline">
                <input
                  type="radio"
                  v-model="vue.exp"
                  v-bind:value="true"
                  @click="borrarvalores()"
                />
                <b>Add Category</b>
              </label>
              <br />
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <div class="radio">
              <label class="radio-inline">
                <input
                  type="radio"
                  v-model="vue.exp"
                  v-bind:value="false"
                  @click="borrarvalores()"
                />
                <b>Add Subcategory</b>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-6">
          <div v-if="vue.exp" class="form-group">
            <b-form-group
              id="fieldset-1"
              label="Name of category"
              label-for="input-1"
              valid-feedback="Thank you!"
              :invalid-feedback="invalidFeedback"
            >
              <b-form-input id="input-1" v-model="category" trim></b-form-input>
            </b-form-group>
            <b-form-group
              id="fieldset-1"
              label="Code of category"
              label-for="input-1"
              valid-feedback="Thank you!"
              :invalid-feedback="invalidFeedback"
            >
              <b-form-input
                id="input-1"
                v-model="codecategory"
                trim
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="fieldset-1"
              label="Description of category"
              label-for="input-1"
              valid-feedback="Thank you!"
              :invalid-feedback="invalidFeedback"
            >
              <b-form-input
                id="input-1"
                v-model="descriptioncategory"
                trim
              ></b-form-input>
            </b-form-group>

            <div
              v-if="category && codecategory"
              class="row justify-content-center mt-5"
            >
              <button
                type="button"
                v-on:click="SaveCategory()"
                class="btn btn-success"
              >
                Save Category
              </button>
            </div>
          </div>

          <div v-else class="form-group">
            <b-form-select v-model="listcategory" class="mb-3">
              <b-form-select-option :value="null"
                >Please select a category</b-form-select-option
              >
              <b-form-select-option
                v-for="item in inforcategory"
                :value="item.raiId"
                :key="item.raiId"
                @click="getDataCategory(item.raiId)"
                >{{ item.raiName }}</b-form-select-option
              >
            </b-form-select>

            <b-form-group
              id="fieldset-1"
              label="Sub category"
              label-for="input-1"
              valid-feedback="Thank you!"
              :invalid-feedback="invalidFeedback"
            >
              <b-form-input id="input-1" v-model="ridName" trim></b-form-input>
            </b-form-group>
            <b-form-group
              id="fieldset-1"
              label="Sub category - Code"
              label-for="input-1"
              valid-feedback="Thank you!"
              :invalid-feedback="invalidFeedback"
            >
              <b-form-input id="input-1" v-model="ridCode" trim></b-form-input>
            </b-form-group>

            <br />
            <div class="row justify-content-center mt-5">
              <button
                v-if="ridName && ridCode "
                type="button"
                v-on:click="SaveSubCategory()"
                class="btn btn-success"
              >
                Save Sub Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>


    <!-- ADMINISTRADOR DE DESCUENTOS EXTRAS ELIMINAR -->
    <b-modal id="modal-multi-3" title="Delete Extra Discount" ok-only>
     <table class="table">
  <thead>
    <tr>
      <td><strong>Category</strong></td>
      <td><strong>Sub Category</strong></td>
     <td><strong>Actions</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in informaciondescuentostotal">
      <td> {{row.raiName}}</td>
      <td>{{row.ridName}}</td>
      <td> <i @click="removeRow(row.ridId)" class="glyph-icon simple-icon-trash"></i
            ></td>
    </tr>
  </tbody>
</table>
   
    </b-modal>
     
    
  </div>   


</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>
/* *** SERVICES *** */

import BookingServices from "../../../../services/gps/booking/BookingServices.js";
import RateItemsDetailServices from "../../../../services/gps/rateitemsdetail/RateItemsDetailServices.js";

import IconCard from '../../../../components/Cards/IconCard'

export default {
  name: "modalrates",
  props: ["bokId"],
   components: {
        'icon-card': IconCard
    },
  data() {
    return {
      inforslotsgeneral: [],
      modalShow: true,
      descuentosextras: [],
      inforslots: [],
      filterDiscount: [],
      booking: [],
      infordiscount: {},
      valor: "",
      valordescuento: "",
      discountPercentRow: "",
      discountMountRow: "",
      opcionelegida: true,
      value: null,
      inforcategory: {},
      inforselectrates: {},
      category: "",
      codecategory: "",
      descriptioncategory: "",
      montos: [],
      informaciondescuentostotal:[],
      ridName: "",
      ridCode: "",
      listcategory: {},
      subcategoryMessage: false,
      vue: {
        exp: true,
      },
          vue: {
        delete: true,
      },
      descripciondescuento: "",
      Idbos: "",
      valorporcentaje: "",
      valormonto: "",
      valortotaldescuento:[],
    };
  },
  filters: {},
  computed: {
    statecategory() {
      return this.category.length >= 4;
    },
    invalidFeedback() {
      if (this.category.length > 0) {
        return "Enter at least 4 characters.";
      }
      return "Please enter something.";
    },
  },
  methods: {
    getextradiscountdata(){
 RateItemsDetailServices.getextradiscountdata()
        .then((response) => {
          this.informaciondescuentostotal = response.data.data;
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
},
       removeRow(id){
if(confirm("Do you really want to delete?")){
     RateItemsDetailServices.deleteextradiscountbooking(id)
        .then((response) => {
          let mensaje = response.data.data;
          // console.log(response.data.data);

          if (mensaje == "OK") {
            var type = "warning";
            var title = "Deleted";
            var message = "Extra discount deleted";
            {
              this.$notify(type, title, message, {
                duration: 3000,
                permanent: false,
              });
            } // console.log("porcentaje lleno");
            this.getextradiscountdata();
            this.getRateItemsDetailss();
            this.gettotaldiscountbybooking();
          } else;
        })
        .catch((error) => {
          console.log(error);
        });

    }},
    
    getinforslotsbybookinggeneral() {
      BookingServices.getinforslotsbybookinggeneral(this.bokId)
        .then((response) => {
          this.inforslotsgeneral = response.data.data;
          //   console.log(this.rowdataslots)
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
      // console.log(this.rowdataslots);
    },
       gettotaldiscountbybooking() {
      BookingServices.gettotaldiscountbybooking(this.bokId)
        .then((response) => {
          this.valortotaldescuento = response.data.data;
          this.$emit('updateQuoteAdmin', 1);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
      // console.log(this.rowdataslots);
    },
        getinformationBooking() {
      BookingServices.getinformationBooking(this.bokId)
        .then((response) => {
          this.booking = response.data.data;
          //   console.log(this.rowdataslots)
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
      // console.log(this.rowdataslots);
    },
    SaveData(valor, bosId, porcentaje, montos) {
      if (porcentaje == undefined) {
        let porcentaje = 0;
        let data = {
          valor,
          bosId,
          porcentaje,
          montos,
        };
        BookingServices.addExtraRateSlot(data)
          .then((response) => {
            let mensaje = response.data.data;
            //   console.log(response.data.data);
            if (mensaje == "OK") {
              var type = "success filled";
              var title = "Copy";
              var message = "Extra discount apply";
              {
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
              }
              
              //  console.log("monto lleno");
              this.getinforslotsbybooking();
              this.gettotaldiscountbybooking();
            
      } else;
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (montos == undefined) {
        let montos = 0;
        let data = {
          valor,
          bosId,
          porcentaje,
          montos,
        };
        BookingServices.addExtraRateSlot(data)
          .then((response) => {
            let mensaje = response.data.data;
            // console.log(response.data.data);

            if (mensaje == "OK") {
              var type = "success filled";
              var title = "Extra Discount";
              var message = "Apply";
              {
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
              } // console.log("porcentaje lleno");
            
              this.getinforslotsbybooking();
              this.gettotaldiscountbybooking();
        
            } else;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getRateItemsDetailss() {
      BookingServices.getRateItemsDetails()
        .then((response) => {
          this.infordiscount = response.data.data;
          // Funcion para agrupar array y colocar multiselect
          let myArray = response.data.data;
          let groups = Object.create(null);
          let grouped = [];
          myArray.forEach(function (o) {
            if (!groups[o.raiName]) {
              groups[o.raiName] = [];
              grouped.push({ raiName: o.raiName, ridName: groups[o.raiName] });
            }
            groups[o.raiName].push({
              ridId: o.ridId,
              ridName: o.ridName,
            });
          });
          // Funcion para agrupar array y colocar multiselect
          this.filterDiscount = grouped;
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
    getinforslotsbybooking() {
      BookingServices.getinforslotsbybooking(this.bokId)
        .then((response) => {
          this.inforslots = response.data.data;
          //   console.log(this.rowdataslots)
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
      // console.log(this.rowdataslots);
    },
    getDataCategory(id) {
      let valor = id;
      BookingServices.getRateItemsDetailsValues(valor)
        .then((response) => {
          this.inforselectrates = response.data.data;
          // console.log("hola");
          //   console.log(this.inforselectrates);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
    //MODAL AGREGAR CATEGORIA
    getRateItemsDetailDiscount() {
      BookingServices.getCategory()
        .then((response) => {
          this.inforcategory = response.data.data;
          // console.log("hola");
          //  console.log(this.inforcategory);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
    deleteextradiscountbookings(id) {
      if(confirm("Do you really want to delete?")){
      BookingServices.deleteextradiscountbooking(id)
        .then((response) => {
          let mensaje = response.data.data;
          // console.log(response.data.data);

          if (mensaje == "OK") {
            var type = "warning";
            var title = "Deleted";
            var message = "Extra discount deleted";
            {
              this.$notify(type, title, message, {
                duration: 3000,
                permanent: false,
              });
            } // console.log("porcentaje lleno");
           
            this.getinforslotsbybooking();
            this.gettotaldiscountbybooking();
             this.$emit('updateQuoteAdmin', 1);
            
          } else;
        })
        .catch((error) => {
          console.log(error);
        });
    }},

    borrarvalores() {
      (this.category = ""),
        (this.monto = ""),
        (this.codecategory = ""),
        (this.descriptioncategory = ""),
        (this.ridName = ""),
        (this.ridCode = ""),
        (this.listcategory = "");
    },
    SaveCategory() {
      let data = {
        category: this.category,
        codecategory: this.codecategory,
        descriptioncategory: this.descriptioncategory,
      };
      let self = this;
      BookingServices.addCategoryDiscount(data)
        .then((response) => {
          let mensaje = response.data.data;
          //console.log(response.data.data);
          this.getRateItemsDetailss();
          if (mensaje == "OK") {
            var type = "success filled";
            var title = "Category";
            var message = "Add";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
            this.getRateItemsDetailDiscount();
            // this.$emit("dataCloseModal");
            self.subcategoryMessage = true;
          } else {
            var type = "info";
            var title = "Category";
            var message = "No added";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    SaveSubCategory() {
      let data = {
        listcategory: this.listcategory,
        ridName: this.ridName,
        ridCode: this.ridCode,
      };
      let self = this;
      BookingServices.addSubCategoryDiscount(data)
        .then((response) => {
          let mensaje = response.data.data;
          //console.log(response.data.data);
          if (mensaje == "OK") {
            var type = "success filled";
            var title = "Sub Category";
            var message = "Add";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });

            this.$bvModal.hide("modal-multi-2");
            this.getRateItemsDetailss();
          } else {
            var type = "info";
            var title = "Sub Category";
            var message = "No Added";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatDay(avsOrder) {
      switch (avsOrder) {
        case 1:
          return "A";
        case 2:
          return "B";
        case 3:
          return "C";
        case 4:
          return "D";
        default:
          return "No defined";
      }
      // TODO: Falta consultar si en la cabina existe un Share para colocar letra M o F
    },
  },

  mounted() {
    this.getinforslotsbybookinggeneral();
    this.getinforslotsbybooking();
    this.getRateItemsDetailss();
    this.getDataCategory();
    this.getRateItemsDetailDiscount();
    this.getinformationBooking();
    this.getextradiscountdata();
    this.gettotaldiscountbybooking();
  },
};
</script>


<style scoped>
.multiselect__option--highlight {
  background: #f4a973 !important;
}

.multiselect__option--highlight:after {
  background: #f4a973 !important;
}

.multiselect__tags {
  padding: 5px !important;
  min-height: 10px;
  border-radius: 0;
}

.multiselect__placeholder {
  margin-left: 10px;
  margin-top: 2px;
}

.multiselect__tag {
  background: #f4a973 !important;
  border: 1px solid rgba(60, 60, 60, 0.26) !important;
  color: white !important;
  margin-bottom: 0px !important;
  margin-right: 5px !important;
}

.multiselect__tag-icon:after {
  color: white !important;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: #f4a973 !important;
}

.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: red !important;
}
</style>
