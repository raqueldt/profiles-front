<template>
  <b-card :title="$t('gps.confirmationslabels.title-confirmation-includes')" class="shadow">

    <b-form @submit.stop.prevent @keyup.enter.shift.exact="updateIncludes()">
      <b-row class="write_message">
        
        <b-col  lg="3" md="12" xs="12" cols="12" class="pl-0">

        <!-- BOTON SNIPPETS -->
          <div class="text-right">
            <modal-snippets v-model="cfnIncluye" @insertText="value => cfnIncluye = value" > </modal-snippets>
          </div>
        <!-- FIN BOTON SNIPPETS -->

          <label class="form-group has-float-label">            
              <!-- <textarea v-model="cfnIncluye" rows="10"  maxlength="400" class="form-control w-100" />     -->
                <quill-editor ref="myTextEditor"
                              v-model="cfnIncluye"
                              :options="editorOption">
                </quill-editor>        
            <span>{{ $t("gps.confirmationslabels.confirmation-include") }}</span>
          </label>
        </b-col>

        <b-col  lg="3" md="12" xs="12" cols="12" class="pl-0 " >

        <!-- BOTON SNIPPETS -->
          <div class="text-right">
            <modal-snippets v-model="cfnNoIncluye" @insertText="value => cfnNoIncluye = value" > </modal-snippets>
          </div>
        <!-- FIN BOTON SNIPPETS -->

          <label class="form-group has-float-label">            
              <!-- <textarea v-model="cfnNoIncluye" rows="10"  maxlength="400" class="form-control w-100" />             -->
              <quill-editor ref="myTextEditor"
                              v-model="cfnNoIncluye"
                              :options="editorOption">      
              </quill-editor>                                        
            <span>{{ $t("gps.confirmationslabels.confirmation-no-include") }}</span>
          </label>
        </b-col>     

        <b-col  lg="3" md="12" xs="12" cols="12" class="pl-0 mb-2" >

        <!-- BOTON SNIPPETS -->
          <div class="text-right">
            <modal-snippets v-model="cfnPoliticas" @insertText="value => cfnPoliticas = value" > </modal-snippets>
          </div>
        <!-- FIN BOTON SNIPPETS -->

           <label class="form-group has-float-label">   
              <!-- <textarea v-model="cfnPoliticas" rows="10" maxlength="400"  class="form-control w-100" />    -->
               <quill-editor ref="myTextEditor"
                              v-model="cfnPoliticas"
                              :options="editorOption"> 
                </quill-editor>                                
              <span>{{ $t("gps.cancelation-policies-confirmation") }}</span>
            </label>   
        </b-col> 

        <b-col  lg="3" md="12" xs="12" cols="12" class="pl-0  mb-2" >

        <!-- BOTON SNIPPETS -->
          <div class="text-right">
            <modal-snippets v-model="cfnPoliticasPago" @insertText="value => cfnPoliticasPago = value" > </modal-snippets>
          </div>
        <!-- FIN BOTON SNIPPETS -->

           <label class="form-group has-float-label">   
              <!-- <textarea v-model="cfnPoliticasPago" rows="10" maxlength="400"  class="form-control w-100" />  -->
                <quill-editor ref="myTextEditor"
                              v-model="cfnPoliticasPago"
                              :options="editorOption">     
                </quill-editor>                                            
              <span>{{ $t("gps.payments-policies-confirmation") }}</span>
            </label>   
        </b-col> 

        <b-col  lg="10" md="12" xs="12" cols="12">
          <b-button
            block
            data-toggle="tooltip"
            data-placement="top"
            :title="$t('gps.confirmationslabels.update-tooltip')"
            type="submit"
            variant="primary default"
            class="mt-1 mb-2"
            @click="updateIncludes()"
          >
            <!-- <div class="glyph-icon simple-icon-check"></div> -->
            Save
          </b-button>
        </b-col>

      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import ConfirmacionServices from "../../../../../services/gps/confirmacion/ConfirmacionServices";
import ConfirmacionesSummaryServices from "../../../../../services/gps/confirmaciones/ConfirmacionesSummaryServices"
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: "SummaryConfirmationIncludes",
  props: ["cofId"],
  components: {
    'quill-editor' : quillEditor
  },   
  data() {
    return {
      summaryDetailsNotes: [],
      cfnIncluye: "",
      cfnNoIncluye: "",
      cfnPoliticas: "",
      cfnPoliticasPago: "",
      isLoadingRow: false,
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { indent: '-1' },
              { indent: '+1' }
            ]
          ]
        }
      },      
    };
  },
  mounted() {
      this.getConfirmacionesInfoSummary();
  },
  methods: {
    updateIncludes() {
      let data = {   
        cofId: this.cofId,
        cofIncluye: this.cfnIncluye,
        cofNoIncluye: this.cfnNoIncluye,
        cofPoliticas: this.cfnPoliticas,
        cofPoliticas: this.cfnPoliticas,
        cofPoliticasPago: this.cfnPoliticasPago,
        cofUsuarioId: this.$store.getters.currentUser.id,
      };
      ConfirmacionServices.updateConfirmacionIncludes(data)
        .then(() => {
          this.showMessage();
        })
        .catch(error => console.log(error))
        .finally(() => {
            this.getConfirmacionesInfoSummary();
        });
    },
      getConfirmacionesInfoSummary() {
        this.isLoadingRow = false;
        const cofId = this.cofId;
        ConfirmacionesSummaryServices.getConfirmacionesInfoSummary(cofId)
          .then(response => {
            this.summaryDetails = response.data.data;
            this.cfnIncluye = this.summaryDetails.cofIncluye;
            this.cfnNoIncluye = this.summaryDetails.cofNoincluye;
            this.cfnPoliticas = this.summaryDetails.cofPoliticas;
            this.cfnPoliticasPago = this.summaryDetails.cofPoliticasPago;
          })
          .catch(error => {
            console.log("Error: " + error);
          }).finally(() => {
            this.isLoadingRow = true;
          });
      },    
    showMessage() {
      var type = "success filled";
      var title = "Success";
      var mensaje = this.$t("gps.confirmationslabels.includes-added-successfully");
      this.$notify(type, title, mensaje, {
        duration: 2500,
        permanent: false
      });
    }
  }
};
</script>

<style scoped>
* >>>.ql-editor{
  height:300px !important;
  
}

</style>