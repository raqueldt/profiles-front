<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Administrador del Muro</div>

                    <div class="card-body">
                        <div class="row">
                            <form method="post" enctype="multipart/form-data" @submit.prevent="saveMuro">
                        
                            <div class="col-lg-12 form-group">
                                <label for="titulo" class="control-label"
                                    >Título:
                                </label>
                                <span class="badge badge-info">*</span>

                                <input
                                    placeholder="Ingresa un título"
                                    v-model="form.titulo"
                                    value="titulo"
                                    name="titulo"
                                    type="text"
                                    id="titulo"
                                    class="form-control"
                                />
                            </div>                        

                            <div class="col-lg-12 form-group">
                                <label for="descripcion" class="control-label"
                                    >Descripción:
                                </label>
                                <span class="badge badge-info">*</span>

                                 <input
                                    placeholder="Ingresa un título"
                                    v-model="form.descripcion"
                                    value="descripciong"
                                    name="descripciong"
                                    type="text"
                                    id="descripciong"
                                    class="form-control"
                                />
                            </div> 

                            <div class="col-lg-12 form-group">
                                <label for="descripcion" class="control-label"
                                    >Adjunto:
                                </label>
                                <span class="badge badge-info">*</span>
                                <!-- <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input"> -->

                                <!-- <input type="file" accept="image/*" id="file" ref="file" 
                                v-on:change="onChangeFileUpload($event.target.name, $event.target.files)"/> -->

                                <input 
                                    type="file" 
                                    name="adjunto" 
                                    id="adjunto"
                                    ref="file" 
                                    accept="image/*" class="form-control-file"
                                    @change="onChangeFileUpload($event.target.name, $event.target.files)"
>
                                 <!-- <input
                                    placeholder="Ingresa un título"
                                    v-model="form.adjunto"
                                    value="descripciong"
                                    name="descripciong"
                                    type="file"
                                    id="descripciong"
                                    class="form-control"
                                /> -->

                                
                            </div>                                                        
                            
                            <div class="col-md-12 form-group">
                                <label for="users_id" class="control-label"
                                    >Categoria:
                                </label>
                                <span class="badge badge-info">*</span>

                                <select
                                    name="categoriaId"
                                    id="categoriaId"
                                    required="required"
                                    v-model="form.categoriaId"
                                    class="form-control mb-3"
                                    placeholder="Category"
                                >
                                    <option value=""
                                        >-- Seleccione Categoria --</option
                                    >
                                    <option
                                        v-for="(option, index) in categorias"
                                        :key="index"
                                        v-bind:value="option.catalogo_id"
                                    >
                                        {{ option.catalogo }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-md-12">
                                <button
                                    class="
                                        btn btn-success
                                        text_white
                                        btn-block btn-md btn-responsive
                                        "
                                    :disabled="
                                        !this.enableSendButton() 
                                    "                                         
                                    
                                   
                                >
                                <!-- @click="saveMuro()" -->
                                 <!-- :disabled="
                                        !this.enableSendButton() 
                                    " -->
                                    <i class="fas fa-save"></i> Guardar
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* *** SERVICES *** */
import MuroServices from "../../services/muro/MuroServices.js";
/* *** SERVICES *** */

export default {
    name: "DeparturesSlots",
    props: ["users_id"],
    data() {
        return {
            isLoaded: false,
            categorias: [],
            form: {
                titulo: "",
                descripcion: "",
                adjunto: "",
                categoriaId: ""
            },
            file:""
        };
    },

    methods: {
        getCategoriasMuro() {
            MuroServices.getCategorias()
                .then(response => {
                    this.categorias = response.data.data;
                })
                .catch(error => {
                    console.log("errores: " + error);
                })
                .finally(() => (this.isLoaded = true));
        },
        enableSendButton() {
            if (this.validateForm()) {
                return true;
            } else {
                return false;
            }
        },
        validateForm() {
            if (
                this.form.titulo != "" &&
                this.form.descripcion != "" &&
                this.form.categoriaId != ""
            ) {
                return true;
            } else {
                return false;
            }
        },

        saveMuro() {
            let formData = new FormData();
            formData.append('file', this.file);
            let data = {
                titulo: this.form.titulo,
                descripcion: this.form.descripcion,
                categoriaId: this.form.categoriaId,
                razonPermiso: this.form.razonPermiso,
                adjunto: formData,
                autor: this.users_id
            };
            console.log("data: " + JSON.stringify(data));

            MuroServices.createMuro(data)
                .then(response => {                        
                    this.displayMessage();
                    //this.$parent.closeModalAfterSendPermission();
                })
                .catch(error => {
                    console.log(error);
                });

        },  
        onChangeFileUpload(files){
             console.log("Files: " + this.$refs.file.files[0].name);
            //  if (!files.length) return;

            // // Store the file data
            // this.file = {
            //     name: files[0].name,
            //     data: files[0]
            // };
            // console.log("Dato imagen: " + this.file);
            this.file = this.$refs.file.files[0];
        },            
    displayMessage() {
      this.$toast.success({
        title: "Success",
        message: "Información de muro almacenada correctamente",
        progressBar: true,
        position: "top right",
        showDuration: 3000,
        timeOut: 4500,
      });
    },        
    },
    mounted() {},
    created() {
        this.getCategoriasMuro();
    }
};
</script>

<style lang="scss" scoped></style>
