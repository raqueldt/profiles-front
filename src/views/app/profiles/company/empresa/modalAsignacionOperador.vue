<template>
    <div class="container windowModal">

        <div class="modal modal-mask" style="display: block" id="dialogo1">

            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content p-4">
                    <div class="modal-header">
                        <slot name="header"></slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body"></slot>
                        <!-- {{mailMarketingAndSales}} -->

                        <div class="row">
                            <div class="col-lg-3 form-group">
                                <label for="titulo" class="control-label">Sales account:
                                </label>
                                <span class="badge badge-info">*</span>
                                <select name="users_id" id="users_id" required="required"
                                    v-model="form.accountManager" class="form-control mb-3" placeholder="Category">
                                    <option value="">-- Select marketing / sales mail --</option>
                                    <option v-for="(option,
                                        index) in mailMarketingAndSales" :key="index" v-bind:value="option.id">
                                        {{ option.name }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-md-4 form-group">
                                <label for="users_id" class="control-label">Marketing representative:
                                </label>
                                <span class="badge badge-info">*</span>

                                <select name="users_id" id="users_id" required="required" v-model="form.marketingRepresentative"
                                    class="form-control mb-3" placeholder="Category">
                                    <option value="">-- Select marketing / sales mail --</option>
                                    <option v-for="(option,
                                        index) in mailMarketingAndSales" :key="index" v-bind:value="option.id">
                                        {{ option.name }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-md-3 form-group">
                                <label for="users_id" class="control-label">Account backup email:
                                </label>
                                <span class="badge badge-info">*</span>
                                <select name="users_id" id="users_id" required="required" v-model="form.accountBackup"
                                    class="form-control mb-3" placeholder="Category" >
                                    <option value="">-- Select marketing / sales mail --</option>
                                    <option v-for="(option,
                                        index) in mailMarketingAndSales" :key="index" v-bind:value="option.id">
                                        {{ option.name }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-md-2 form-group">
                                <label for="users_id" class="control-label">Lead/Client:
                                </label>
                                <span class="badge badge-info">*</span>
                                <select name="users_id" id="users_id" required="required" v-model="form.statusId"
                                    class="form-control mb-3" placeholder="Status" >
                                    <option value="">-- Select status --</option>
                                    <option v-for="(option,
                                        index) in status" :key="index" v-bind:value="option.id">
                                        {{ option.status }}
                                    </option>
                                </select>
                            </div>
                            
                            <div class="col-md-3 form-group">
                                <label for="users_id" class="control-label">Sales potential:
                                </label>
                                <input  placeholder="Type sales potential" 
                                v-model="form.salesPotential"
                                maxlength="2"
                                name="sales potential" 
                                type="text"                               
                                id="potential" 
                                class="form-control">                                 
                            </div>                            
                            <div class="col-md-3 form-group">
                                <label for="users_id" class="control-label">Sales volume:
                                </label>
                                <input  placeholder="Type sales volume" 
                                v-model="form.salesVolume"
                                maxlength="2"
                                name="sales volume" 
                                type="text"                               
                                id="volume" 
                                class="form-control">                                 
                            </div>                                                        

                            <button class="btn btn-success text_white btn-block btn-md btn-responsive"
                                @click="actionUpdate()" :disabled=" !this.enableSendButton()">

                                <i class="fas fa-save"></i> Update
                            </button>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer"> </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* *** SERVICES *** */
    import InternoServices from "../../services/interno/InternoServices.js";
    import EmpresaServices from "../../services/empresa/EmpresaServices.js";
    import VacacionesServices from "../../services/vacaciones/VacacionesServices.js";
    import StatusServices from "../../services/status/StatusServices.js";
    /* *** SERVICES *** */

    /* Mensajes de confirmación */
    import CxltToastr from "cxlt-vue2-toastr";
    import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";
    import moment from "moment-business-days";
    moment.locale('es');

    Vue.use(CxltToastr);
    var toastrConfigs = {
        position: "top right",
        showDuration: 2000
    };
    Vue.use(CxltToastr, toastrConfigs);
    import localization from 'moment/locale/fr';

    export default {
        name: "formpermisos",
        props: ["selectedIds"],
        data() {
            return {
                //now: moment.locale('en').format("ddd, MMMM Do YYYY"),
                now: moment().format("LL"),
                enableButtonSend: false,
                form: {
                    accountManager: "",
                    accountBackup: "",
                    marketingRepresentative: "",
                    statusId: "",
                    salesPotential:"",
                    salesVolume:""
                },
                mailMarketingAndSales: [],
                status: [],
            };
        },
        computed: {

        },
        watch: {

        },
        methods: {

            validateForm() {
                if (
                    this.form.accountManager != "" ||
                    this.form.accountBackup != "" ||
                    this.form.marketingRepresentative != "" ||
                    this.form.salesPotential != "" ||
                    this.form.salesVolume != ""  ||
                    this.form.statusId != ""
                    
                ) {
                    return true;
                } else {
                    return false;
                }
            },
            enableSendButton() {
                if (this.validateForm()) {
                     return true;
                } else {
                    return false;
                }
            },

            actionUpdate(){
                this.$swal({
                    title: "Are you sure?",
                    text: "You are about to do a massive update!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Update",
                    cancelButtonText: "Cancel",
                    cancelButtonColor: "#C82333",
                    confirmButtonColor: "#218838",
                    reverseButtons: true,
                    focusConfirm: false,
                    focusCancel: true,
                }).then(result => {
                    if (result.isConfirmed) {

                        this.updateMails();
                    } else if (
                        result.dismiss === this.$swal.DismissReason.cancel
                    ) {

                    }
                });
            },

            updateMails() {
                let data = {
                    accountManager: this.form.accountManager,
                    accountBackup: this.form.accountBackup,
                    marketingRepresentative: this.form.marketingRepresentative,
                    statusId: this.form.statusId,
                    selectedIdsClients: this.selectedIds,
                    salesPotential: this.form.salesPotential,
                    salesVolume: this.form.salesVolume,
                };
                EmpresaServices.updateMasiveMails(data)
                .then(response => {
                    //this._sendPermisoCoordinador(this.users_id);    //DESCOMENTAR
                    this.displayMessage();
                    this.$parent.closeModalAfterSendPermission();
                })
                .catch(error => {
                    console.log(error);
                });
            },

            displayMessage() {
                this.$toast.success({
                    title: "Success",
                    message: "Update successful",
                    progressBar: true,
                    position: "top right",
                    showDuration: 3000,
                    timeOut: 4500
                });
            },
            getSalesAndMarketingMails(){
                InternoServices.getMailVentasAndMarketing()
                .then(response => {
                    this.mailMarketingAndSales = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
            },
            getAllStatus(){
                StatusServices.getAll()
                .then(response => {
                    this.status = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        mounted() {
            this.getSalesAndMarketingMails();
            this.getAllStatus();
        }
    };

</script>

<style>
.windowModal{
    z-index: 99999999 !important;
}

.swal2-container {
  z-index: 100000000000 !important;
}
</style>
