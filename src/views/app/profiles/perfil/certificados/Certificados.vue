<template>
    <div class="mt-4">

        <b-card title="">

            <div class="container mt-4">
                <div class="row justify-content-center">
                    <div class="col-md-8">

                        <b-container fluid>
                            <!-- {{certificados}} -->
                            <b-table :items="certificados" :fields="fields" show-empty striped responsive="sm"
                                class="my-table border">

                                <!-- MENSAJE DATOS VACIOS -->
                                <template #empty="scope">
                                    <center>
                                        <span class="text-center">No existen registros disponibles</span>
                                    </center>
                                </template>

                                <!-- CABECERA -->
                                <template v-slot:head(certificado)="data">
                                    <div class="text-center">{{ data.label }}</div>
                                </template>
                                <template v-slot:head(acciones)="data">
                                    <div class="text-center">{{ data.label }}</div>
                                </template>
                                <!-- <template v-slot:head(anio)="data">
                                    <div class="text-center">{{ data.label }}</div>
                                </template>
                                <template v-slot:head(total)="data">
                                    <div class="text-center">{{ data.label }}</div>
                                </template>
                                <template v-slot:head(acciones)="data">
                                    <div class="text-center">{{ data.label }}</div>
                                </template> -->

                                <!-- DETALLES -->
                                <!-- <template #cell(mes)="row">
                                    {{getNombreMes(row.item.mes)}}
                                </template> -->
                                <template #cell(acciones)="row">
                                    <b-button variant="success" size="xs" data-toggle="tooltip" data-placement="top"
                                        title="Haga click aquí para descargar el certificado"
                                        @click="confirmDescarga(id, row.item.id)">
                                        <i class="fa fa-download" aria-hidden="true"></i>
                                    </b-button>
                                </template>
                            </b-table>
                            <small>NOTA: Para que el certificado tenga validez, es necesario acercarse a Talento Humano
                                para firmarlo y sellarlo</small>
                        </b-container>

                    </div>
                </div>
            </div>

        </b-card>
    </div>
</template>

<script>
    import RolPagosServices from '../../services/rolpagos/RolPagosServices.js';
    /* Mensajes de confirmación */
    import CxltToastr from "cxlt-vue2-toastr";
    import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";
    Vue.use(CxltToastr);

    import Conf from "../../services/conf";
    const resource = "/api/certificados/";
    const server = Conf.server;

    export default {
        props: ["id"],
        data() {
            return {
                roles: [],
                fields: [{
                        key: 'certificado',
                        label: 'Certificados disponibles',
                        tdClass: 'text-center'
                    },

                    {
                        key: 'acciones',
                        label: 'Acciones',
                        tdClass: 'text-center'
                    },
                ],
                certificados: [
                    {
                        id:1,
                        certificado: 'Certificado laboral', 
                    },
                    // {
                    //     id:2,
                    //     certificado: 'Contrato de trabajo'
                    // }
                ]
            }
        },

        created() {

        },
        mounted() {
            //this.getRegisterFromRoles();
        },
        methods: {
            confirmDescarga(id, idDocumento) {
                this.$swal({
                    title: "¿Estás seguro que deseas descargar el presente certificado?",
                    text: "Por favor revisa que tus datos sean correctos, caso contrario contáctate con Talento Humano!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Descargar",
                    cancelButtonText: "Cancelar",
                    cancelButtonColor: "#C82333",
                    confirmButtonColor: "#218838",
                    reverseButtons: true,
                    focusConfirm: false,
                    focusCancel: true,
                }).then(result => {
                    if (result.isConfirmed) {
                        
                        //this.downloadCertificadoLaboral(id);
                        this.switchDocumento(id, idDocumento)
                    } else if (
                        result.dismiss === this.$swal.DismissReason.cancel
                    ) {}
                });
            },
            switchDocumento(id, idDocumento){
                console.log("id: " + idDocumento);
                    switch (idDocumento) {
                    case 1:
                        this.downloadCertificadoLaboral(id);
                        break;
                    case 2:
                        this.downloadContratoTrabajo(id);
                        break;
                    default:
                        console.log('No existen documentos disponibles');
                    }
            },
            downloadCertificadoLaboral(id) {
                let routeData =
                    server +
                    resource +
                    `downloadCertificado/` +
                    this.id;

                window.open(routeData);
            },
            downloadContratoTrabajo(id) {
                let routeData =
                    server +
                    resource +
                    `downloadContratoTrabajo/` +
                    this.id;
                window.open(routeData);
            },            
            getNombreMes(mes) {
                var response = "";
                switch (mes) {
                    case 1:
                        response = "Enero"
                        break;
                    case 2:
                        response = "Febrero"
                        break;
                    case 3:
                        response = "Marzo"
                        break;
                    case 4:
                        response = "Abril"
                        break;
                    case 5:
                        response = "Mayo"
                        break;
                    case 6:
                        response = "Junio"
                        break;
                    case 7:
                        response = "Julio"
                        break;
                    case 8:
                        response = "Agosto"
                        break;
                    case 9:
                        response = "Septiembre"
                        break;
                    case 10:
                        response = "Octubre"
                        break;
                    case 11:
                        response = "Noviembre"
                        break;
                    case 12:
                        response = "Diciembre"
                        break;
                    default:
                        response = "No hay mes";
                }
                return response;
            }

        }
    }

</script>

<style scoped>
    .my-table {
        max-height: 550px;
        overflow-y: auto;
    }

</style>
