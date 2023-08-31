<template>
    <div>

        <b-form>
            <span class="text-muted font-weight-bold"> {{$t('gps.dear')}} {{loggedUserName}} {{$t('gps.new_invoice_message')}}</span><br>
            <div v-if="this.invoceDetails_list.length>0 && total_amout != 0" class="text-muted small font-weight-bold mt-2" >
                <div class="text-inverse font-italic">{{$t('gps.sale_price')}}: USD {{precioValor}}</div>
                {{$t('gps.total_value_invoice')}} <span class="text-primary">USD {{total_amout}} </span> {{$t('gps.total_value_invoice_1')}} <br>
                {{$t('gps.total_value_invoice_2')}} <span class="text-primary">: <br>USD {{resTotal}}</span>
            </div>            
            
            <!-- <span class="text-muted small font-weight-bold" v-else>{{$t('gps.total_value_invoice_3')}} <span class="text-primary">USD {{precioValor}}</span></span><br> -->
            <span class="text-muted small font-weight-bold" v-else>{{$t('gps.total_value_invoice_3')}} <span class="text-primary">{{ invoiceValue | currency('$', 2, { spaceBetweenAmountAndSymbol: true }) }}</span></span><br>
            
            <!-- <hr>
            <span class="text-muted small font-weight-bold" v-if="invoiceValue != precioValor">Total invoices made: <span class="text-danger">USD {{totalInvoices}}</span></span><br>
            <span class="text-muted small font-weight-bold" v-if="invoiceValue != precioValor">Missing invoice value: <span class="text-danger">USD {{invoiceValue}}</span></span><br> -->
            
            <label class="form-group has-float-label mt-4">
                <input type="text" class="form-control" maxlength="120" v-model="invConcepto" required/>
                <span>{{$t('gps.concept')}}</span>
            </label>
            <label class="form-group has-float-label">
                <input 
                type="number" 
                class="form-control" 
                v-model.number="invValor" 
                minlength="1"
                :maxlength="precioValor"
                @keypress="onlyNumber"
                required />
                <span>{{$t('gps.amount')}}</span>
            </label>
            <!-- MENSAJES DE ERROR  -->
            <div class="w-100 mt-2 rounded" v-if="!checkPropertiesInErrorMessages">
                <!-- {{formValidationsMessage.discountsMoreThanTotal}} -->
                <div
                v-for="(messageValidation, index) in formValidationsMessage"
                :key="index"
                >
                <ul class="list-group list-group-flush" style="text-align: center">
                    <li v-if="messageValidation.length>0" class="list-group-item text-danger font-weight-bold list-group-item-danger">
                    {{ messageValidation }}
                    </li>
                </ul>
                </div>
            </div>
            <!-- FIN MENSAJES DE ERROR  -->
            <br />
            <!-- mensaje de numeros negativos -->
            <div
                v-if="invValor < 0 "
                class="alert alert-warning"
                style="text-align: center"
            >
                {{ $t("Please enter a valid value, not negative") }}
            </div>
            <b-row style="justify-content: center">
                <!-- v-if="invValor > 0 && Boolean(invConcepto)" -->
                <b-button
                    squared
                    class="mb-1 success"
                    size="lg"
                    variant="success"
                    :disabled=" validationForm || (invValor <= 0 || !Boolean(invConcepto))"                     
                    @click="store()"
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

export default {
    name: 'new-invoice',    
    props: ["cofId","totalamout", "totalInvoices"],
    components: {
        
    },
     data () {
        return {
            total_amout:this.totalamout,
            invoceDetails: [],
            invoceConfirmacion: [],
            invoceDetails_list:[],
            invClienteId:'',
            invUsuarioId:0,
            loggedUserName:'',
            invFecha:"",
            invConcepto:"",
            invValor: 0,
            loggedUserId:'',
            timestamp: '',
            formValidationsMessage: {
                amountMoreThanTotal: "",
                amountMoreThanAmount:"",
            },
            formattedNumber:'',
        }
     },
     created() {
        this.showInvoice();
        setInterval(this.getNow, 1000);
        },
    methods:{
        getNow: function() {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const dateTime = date;
            this.timestamp = dateTime;
        },
        showInvoice() {
            const cofId = this.cofId;
            InvoiceServices.show(cofId)
            .then((response) => {
                this.invoceDetails = response.data.data;
                this.invoceConfirmacion = [];
                this.invoceDetails.confirmacion.forEach((item) => {
                    let item_confirmacion = {
                        invClienteId:item.clienteId,
                        price:item.total_confirmacion
                    };
                this.invoceConfirmacion.push(item_confirmacion);
                });
                this.invoceDetails_list = [];
            
                this.invoceDetails.detalle.forEach((item) => {
                    let item_invoices = {
                    id: item.invId,
                    amount: item.invValor,
                    anulada:item.invAnulada,
                    };
                this.invoceDetails_list.push(item_invoices);
                });
            })
            .catch((error) => {
            console.log(error);
            });
        },
        store() {
       // const cofId = this.cofId;
       // InvoiceServices.store(cofId)
       
        let data = {
            cofId: this.cofId,
            invClienteId:this.clienteId,
            invUsuarioId:this.loggedUserId,
            invFecha:this.timestamp,
            invConcepto:this.invConcepto,
            invValor:this.invValor,
        };
        InvoiceServices.store(data)
            .then((response) => {
            let mensaje = response.data;
            if (mensaje.data == 200) {
                this.showSuccessMessage();
                this.$emit("updatedInvoice");
            } else {
                var type = "error filled";
                var title = "New Invoce";
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

        clearFields() {
            this.invConcepto="",
            this.invValor=0
        },
        showSuccessMessage() {
            var type = "success filled";
            var title = "Invoice";
            var message = "Invoice added successfully";
            this.$notify(type, title, message, {
                duration: 3500,
                permanent: false,
            });
            this.clearFields();

            this.$emit("closeModalNewInvoice");
            //location.reload();



        },
        onlyNumber($event) {
            let keyCode = $event.keyCode ? $event.keyCode : $event.which;
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                // 46 is dot
                $event.preventDefault();
            }
        },
         total_invoice: function () {		
		    this.formattedNumber = this.totalAmount.toFixed(2);
        },
    },
    async mounted () {
        await this.showInvoice();
    },

    watch:{
        $loggedUserId(){
            if(Boolean(this.$loggedUserId)) this.loggedUserId=this.$loggedUserId;
        },
        $loggedUserName(){
          if(Boolean(this.$loggedUserName)) this.loggedUserName=this.$loggedUserName;
        },   
        invoiceValue: {
            deep:true,
            handler(val){ 
                if(val > 0) this.invValor = val;            
            },
        },     
        

    },
     computed : {
        clienteId: function(){
            let invClienteId = 0;
            for(let i = 0; i < this.invoceConfirmacion.length; i++){
                invClienteId = (parseFloat(this.invoceConfirmacion[i].invClienteId));
            }
            return invClienteId;
        },
        /*totalAmount: function(){
            let sum = 0;
            for(let i = 0; i < this.invoceDetails_list.length; i++){
                if(this.invoceDetails_list[i].anulada==0){
                sum += parseFloat(this.invoceDetails_list[i].amount);
                }
            }
            return sum;
        },*/
        invoiceValue(){
            return  this.precioValor - this.totalInvoices
        },
        precioValor: function(){
            let sum1 = 0;
            for(let i = 0; i < this.invoceConfirmacion.length; i++){
                sum1 = (parseFloat(this.invoceConfirmacion[i].price).toFixed(2));
            }
            return sum1;
        },
        resTotal: function(){
            let rest=0;
            rest= this.precioValor - this.totalamout;
            rest= (parseFloat(rest).toFixed(2));
            return rest;
        },
        checkPropertiesInErrorMessages: function () {
            // ==> Determino si existe dentro del objeto formValidationsMessage alguna propiedad llena
            return Object.values(this.formValidationsMessage).every(
                (x) => x === null || x === ""
            );
        },

        validationForm: function () {
            return this.validationFormTotal;
        },
        validationFormTotal: function () {
                
                var precioValor = this.precioValor;
                var invValor = this.invValor;
                var totalInvoce = this.totalamout;

            // if ( this.invValor > (this.resTotal)) {
            //      this.formValidationsMessage.amountMoreThanAmount = this.$t('gps.total_value_invoice_4');
            //     return true;
            // } else if(((this.resTotal) <= this.invValor) || ((this.invValor) <= (this.resTotal))){
            //     this.formValidationsMessage.amountMoreThanAmount = "";
            //     return false;
            // }

            if ( this.invValor > (this.invoiceValue)) {
                 this.formValidationsMessage.amountMoreThanAmount = this.$t('gps.total_value_invoice_4');
                return true;
            } 
            else if(((this.invoiceValue) <= this.invValor) || ((this.invValor) <= (this.invoiceValue))){
                this.formValidationsMessage.amountMoreThanAmount = "";
                return false;
            }

        },
     }
}
</script>
