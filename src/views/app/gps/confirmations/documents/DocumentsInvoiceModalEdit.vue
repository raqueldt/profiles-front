<template>
    <div>
        <b-form>
            <span class="text-muted">{{$t('gps.dear')}} {{loggedUserName}} {{$t('gps.new_invoice_message')}}</span><br>
            <small class="text-muted mt-5"><strong>Concept: {{invoiceConcepto}}</strong></small>
            <label class="form-group has-float-label mt-3">
                <input type="text" class="form-control" v-model="invConcepto" :placeholder="invoiceConcepto"/>
                <span>{{$t('gps.concept')}}</span>
            </label>
            <b-form-group 
            :label="invoiceCancel===0 ? 'Press the button to edit and cancel this invoice': 'Press the button to edit and active this invoice'">
                <b-form-checkbox v-if="invoiceCancel==0" v-model.number="invAnulada" value="1" switch>
                        {{$t('gps.cancel')}}
                </b-form-checkbox>
                   
                <b-form-checkbox  v-else v-model.number="invAnulada" value="0" switch>
                        {{$t('button.active')}}
                </b-form-checkbox>
            </b-form-group>
            <b-row style="justify-content: center">
                <b-button
                    squared
                    class="mb-1 success"
                    size="lg"
                    variant="success"
                    @click="update()"
                    required
                    >{{ $t("gps.pax.save-button") }}</b-button
                >
            </b-row>
        </b-form>
    </div>
</template>

<script>
import ConfirmacionesServices from "../../../../../services/gps/confirmacion/ConfirmacionServices";
import InvoiceServices from "../../../../../services/gps/invoice/InvoiceServices";
import moment from "moment";
import Switches from "vue-switches";
export default {
    name: 'edit-invoice',    
    props: ["cofId","invId"],
    components: {
        switches: Switches
    },
     data () {
        return {
            invoceDetails: [],
            invoceDetails_list: [],
            detailsInvoice:[],
            invConcepto:"",
            invAnulada:"",
            invUsuarioId:'',
            loggedUserName:'',
        }
     },
     created() {
        this.showInvoice();
        },
    methods:{
        log(arg) {
        },
        showInvoice() {
        this.isLoadingRow = false;
        const cofId = this.cofId;
        const id = this.invId;
        InvoiceServices.showInvoce(cofId, id)
          .then(response => {
            this.invoceDetails = response.data.data.invoice;
          })
          .catch(error => {
            console.log("Error: " + error);
          }).finally(() => {
            this.isLoadingRow = true;
          });
      },
        update() {
        let invId = this.invId;
        
        let data = {
            invConcepto:this.invConcepto=='' || this.invConcepto == null ? this.invoiceConcepto : this.invConcepto,
            invAnulada:this.invAnulada=='' || this.invAnulada == null ? this.invoiceCancel : this.invAnulada
        };
        InvoiceServices.update(invId, data)
            .then((response) => {
            let mensaje = response.data;
            if (mensaje.data == 200) {
                this.showSuccessMessage();
                this.$emit("updatedInvoice");
            } else {
                var type = "error filled";
                var title = "Edit Invoce";
                var message = "No update";
                this.$notify(type, title, message, {
                duration: 3000,
                permanent: false,
                });
            }
            })
            .catch((error) => {
            console.log(error);
            })
            .finally(() => {});
        },

        showSuccessMessage() {
            var type = "success filled";
            var title = "Invoice";
            var message = "Invoice Update successfully";
            this.$notify(type, title, message, {
                duration: 3500,
                permanent: false,
            });
        },
        hideModal2 (refname) {
            this.$refs[refname].hide()
        },
        
    },
    mounted () {
        this.showInvoice();
    },

    watch:{
         $loggedUserId(){
            if(Boolean(this.$loggedUserId)) this.loggedUserId=this.$loggedUserId;
        },
        $loggedUserName(){
          if(Boolean(this.$loggedUserName)) this.loggedUserName=this.$loggedUserName;
        },
    },
     computed : {
        invoiceConcepto: function(){
            let invConcepto1;
            //this.detailsInvoice = invoceDetails['invoice']
            for(let i = 0; i < this.invoceDetails.length; i++){
                invConcepto1 = this.invoceDetails[i].invConcepto;
            }
            console.log(invConcepto1);
            return invConcepto1;
            
        },
        invoiceCancel: function(){
            let invoiceCancel = 0;
            for(let i = 0; i < this.invoceDetails.length; i++){
                invoiceCancel = this.invoceDetails[i].invAnulada;
            }
            
            return invoiceCancel;
        },
        validationForm: function () {
            if(this.invoiceCancel==0){
                if(this.invAnulada==false){
                    return true                
                }
            }else if(this.invoiceCancel==1){
                if(this.invAnulada==false){
                    return true                
                }else if(this.invAnulada==0){
                    return false
                }
            }
        },
     }
}
</script>
