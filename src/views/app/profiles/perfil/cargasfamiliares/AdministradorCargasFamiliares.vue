<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <b-row>
                            <b-col>
                                <h5>Cargas Familiares</h5>
                            </b-col>
                            <b-col class="text-right" v-if="rol=='user'">
                                <add-carga-familiar :users_id="users_id" @closeModal="closeModal"></add-carga-familiar>
                            </b-col>
                        </b-row>

                    </div>

                    <div class="card-body">
                        <center>
                        <div class="row justify-content-center align-items-center form-group w-100 text-center">
                            <div class="col-lg-3">
                                <label for="titulo" class="d-inline-block control-label">Seleccione un colaborador:
                                </label>
                            </div>
                            <div class="col-lg-3">
                                <select class="custom-select  d-inline-block" v-model="selectColaborador"
                                    @change="searchByColaborador(selectColaborador.id)">
                                    <option value=""> - Todos - </option>
                                    <option v-for="(colaborador, index) in colaboradores" :key="index" :value="colaborador">
                                        {{ colaborador.nombre_colaborador }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        </center>

                        <b-table :items="cargasFamiliares" :fields="fields" show-empty striped responsive="sm"
                            class="my-table" :tbody-tr-class="rowClass">

                            <template v-slot:head(fecha_nacimiento)="data">
                                <div class="text-center">{{ data.label }}</div>
                            </template>


                            <template #cell(colaborador)="row">
                                {{ row.item.colaborador }}
                            </template>

                            <template #cell(nombre)="row">
                                {{ row.item.nombre }}<br>
                                <b>({{ row.item.parentezco }})</b>
                            </template>

                            <template #cell(edad)="row">
                                {{diferenciaFechas(row.item.fecha_nacimiento)}}
                            </template>

                            <template #cell(documento_path)="row">
                                <div v-if="Boolean(row.item.documento_path)">
                                    <b-button variant="outline-danger" class="border-0 d-inline" size="sm"
                                        @click="downloadFile(row.item.documento_path)">
                                        <i class="fa fa-file-pdf"></i>
                                    </b-button>
                                </div>
                                <div v-else class="text-success"> Documento no adjuntado
                                </div>

                            </template>

                            <template #cell(actions)="row">
                                <center>
                                    <b-button variant="danger" size="xs" data-toggle="tooltip" data-placement="top"
                                        title="Haga click aquí para descargar el certificado"
                                        @click="deleteConfirm(row.item.id)">
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </b-button>
                                    <b-button variant="success" size="xs" data-toggle="tooltip" data-placement="top"
                                        title="Haga click aquí para aprobar carga familiar" @click="update(row.item.id)"
                                        v-if="row.item.estado_id === 1">
                                        <i class="fa fa-check" aria-hidden="true"></i>
                                    </b-button>
                                </center>
                            </template>

                        </b-table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CargasFamiliaresServices from "../../services/cargasfamiliares/CargasFamiliaresServices.js";
    import DepartamentoServices from "../../services/departamento/DepartamentoServices.js";
    import CxltToastr from "cxlt-vue2-toastr";
    import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";
    Vue.use(CxltToastr);
    import moment from 'moment'

    export default {
        name: 'CargasLaborales',

        components: {
            // CargasLaborales: () => import('./CargasLaborales.vue')
        },
        props: ["users_id", "rol"],
        data() {
            return {
                selectColaborador: "",
                colaboradores: [],
                now: moment().format("YYYY-MM-DD"),
                cargas: [],
                cargasFamiliares: [],
                originalCargasFamiliares: [],
                fields: [{
                        key: 'colaborador',
                        label: 'Colaborador',
                        tdClass: 'text-left'
                    },
                    {
                        key: 'nombre',
                        label: 'Nombre',
                        tdClass: 'text-left'
                    },
                    {
                        key: 'fecha_nacimiento',
                        label: 'Fecha nacimiento',
                        tdClass: 'text-center'
                    },
                    {
                        key: 'edad',
                        label: 'Edad',
                        tdClass: 'align-middle text-center'
                    },
                    // {
                    //     key: 'parentezco',
                    //     label: 'Parentesco',
                    //     tdClass: 'align-middle text-center'
                    // },
                    {
                        key: 'cedula',
                        label: 'Cédula',
                        tdClass: 'align-middle text-center'
                    },
                    {
                        key: 'discapacidad',
                        label: 'Discapacidad',
                        tdClass: 'align-middle text-center'
                    },
                    {
                        key: 'documento_path',
                        label: 'Documento',
                        tdClass: 'align-middle text-center'
                    },
                    {
                        key: 'estado',
                        label: 'Estado',
                        tdClass: 'align-middle text-center'
                    },
                    {
                        key: 'actions',
                        label: 'Acciones',
                        tdClass: 'align-middle text-center'
                    },

                ]
            }
        },

        methods: {
            rowClass(item, type) {
                if (Boolean(item) && item.estado === 2) return 'table-success'
            },
            getCargasByUsersId() {
                CargasFamiliaresServices.getCargasByUsersId(this.users_id)
                    .then(response => {
                        this.cargas = response.data.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getAllCargasFamiliares() {
                CargasFamiliaresServices.getAllCargasFamiliares()
                    .then(response => {
                        this.cargasFamiliares = response.data.data;
                        this.originalCargasFamiliares = response.data.data;
                    })
                    .catch(error => {
                        console.log("errores" + error);
                    }).finally(() => {

                    });
            },

            closeModal() {
                console.log("Ejecuntando método");
                this.getAllCargasFamiliares();
            },
            deleteConfirm(id) {
                this.$swal({
                    title: "¿Estás seguro que deseas eliminar esta carga familiar?",
                    text: "Por favor revisa que tus datos sean correctos",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Eliminar",
                    cancelButtonText: "Cancelar",
                    cancelButtonColor: "#C82333",
                    confirmButtonColor: "#218838",
                    reverseButtons: true,
                    focusConfirm: false,
                    focusCancel: true,
                }).then(result => {
                    if (result.isConfirmed) {

                        //this.downloadCertificadoLaboral(id);
                        this.deleteCargaFamiliar(id)
                    } else if (
                        result.dismiss === this.$swal.DismissReason.cancel
                    ) {}
                });
            },
            update(id) {
                this.$swal({
                    title: "¿Estás seguro que deseas aprobar  esta carga familiar?",
                    text: "Por favor revisa que tus datos sean correctos",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Actualizar",
                    cancelButtonText: "Cancelar",
                    cancelButtonColor: "#C82333",
                    confirmButtonColor: "#218838",
                    reverseButtons: true,
                    focusConfirm: false,
                    focusCancel: true,
                }).then(result => {
                    if (result.isConfirmed) {

                        //this.downloadCertificadoLaboral(id);
                        this.updateCargaFamiliar(id)
                    } else if (
                        result.dismiss === this.$swal.DismissReason.cancel
                    ) {}
                });
            },
            deleteCargaFamiliar(id) {
                CargasFamiliaresServices.deleteCargaFamiliar(id)
                    .then(() => {
                        this.getAllCargasFamiliares()
                    })
                    .catch(error => console.log(error))
            },
            updateCargaFamiliar(id) {
                let data = {
                    estado: 2,
                };
                CargasFamiliaresServices.updateEstadoCargaFamiliar(id, data)
                    .then(() => {
                        this.getAllCargasFamiliares()
                    })
                    .catch(error => console.log(error))
            },
            diferenciaFechas(fecha_nacimiento) {
                return Math.abs(moment(fecha_nacimiento).diff(moment(this.now), 'years'));
            },
            getDocumentsUrl(path) {
                // let url = "";
                // if (this.rol == 'admin') {
                //     url = '../../../img/talento_humano/cargas_familiares/' + path;
                // } else if (this.rol == 'user') {
                //     url = '../img/talento_humano/cargas_familiares/' + path;
                // }

                let url = '../img/talento_humano/cargas_familiares/' + path;
                return url;
            },
            downloadFile(path) {
                var url = this.getDocumentsUrl(path);
                window.open(url, '_blank');
            },
            getColaboradores() {
                DepartamentoServices.getColaboradores()
                    .then(response => {
                        this.colaboradores = response.data.data;
                    })
                    .catch(error => {
                        console.log("No event was updated: " + error);
                        this.errorFromApi = error;
                    });
            },
            searchByColaborador(id) {
                var cargasFamiliaresFromOriginal =  this.originalCargasFamiliares;
                if (Boolean(id)) this.cargasFamiliares = cargasFamiliaresFromOriginal.filter(item => item.users_id === id);
                else this.cargasFamiliares = this.originalCargasFamiliares;
            }
        },
        async created() {

            await this.getAllCargasFamiliares()
            await this.getColaboradores()
        }
    }

</script>

<style lang="scss" scoped></style>
