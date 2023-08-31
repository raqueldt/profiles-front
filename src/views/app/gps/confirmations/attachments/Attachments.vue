<template>
  <div class="container-fluid mt-2">


    <!-- HELP MODAL -->
    <b-row fluid> 
          <b-colxx xxs="12">
            <b-button
              v-b-modal.modalright
              variant="outline-primary"
              class="float-right border-0 z-index-3"
              style="z-index: 9998 !important;"
            >
              <div class="glyph-icon simple-icon-info"></div>
            </b-button>
            <b-modal
              id="modalright"
              ref="modalright"
              :title="$t('gps.confirmationslabels.instructions-help-attachments')"
              modal-class="modal-right h-50"
            >
              <b-list-group>
                <b-list-group-item
                  ><small>{{
                    this.$t("gps.confirmationslabels.instructions-help-attachments1")
                  }}</small>
                </b-list-group-item>
                <b-list-group-item
                  ><small>{{
                    this.$t("gps.confirmationslabels.instructions-help-attachments2")
                  }}</small>
                </b-list-group-item>
                <b-list-group-item
                  ><small>{{
                    this.$t("gps.confirmationslabels.instructions-help-attachments3")
                  }}</small>
                </b-list-group-item>
              </b-list-group>

              <template slot="modal-footer">
                <b-button variant="secondary" @click="hideModal('modalright')"
                  >Cancel</b-button
                >
              </template>
            </b-modal>
          </b-colxx>
    </b-row>
    <!-- HELP MODAL -->

    <vue-dropzone
      ref="dropzone"
      id="dropzone"
      type="file"
      name="file"
      class="vue-dropzone"
      v-if="dropzoneOptions"
      :options="dropzoneOptions"
      @vdropzone-success="inSuccess"
      @vdropzone-sending="fileAdded"
      :include-styling="true"
      @vdropzone-file-added="fileAddedTypes"
    >
    </vue-dropzone>

    <!-- <button class="btn btn-xs btn-info float-right" @click="removeAllFiles">Clear Files</button> -->

    <div class="text-center mt-2" v-if="!isLoadingRow">
      <b-spinner
        style="width: 3rem; height: 3rem;"
        label="Large Spinner"
        type="grow"
        variant="primary"
      ></b-spinner>
    </div>
    <div v-else>
      <!-- TABLA DE REGISTROS -->
      <div
        class="w-100 row justify-content-center mt-3"
        v-if="documents.length > 0"
      >
        <div class="col-md-8">
          <vue-perfect-scrollbar
            class="scroll dashboard-list-with-thumbs avai"
            :settings="{ suppressScrollX: true, wheelPropagation: false }"
          >
            <table class="table table-striped table-bordered table-sm">
              <thead class="text-center">
                <th>#</th>
                <th>Name</th>
                <th>Date uploaded</th>
                <th>Size</th>
                <th>Type</th>
                <th>Actions</th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in documents" :key="index">
                  <td class="text-center text-muted">
                    <!-- <small>{{index + 1}} - {{ item.boxId }}</small> -->
                    <small>{{ index + 1 }}</small>
                  </td>
                  <td class="text-center text-muted">
                    <!-- <small>{{ formatBoxName(item.arcTitle )  }}</small> -->
                    <small>{{ item.arcTitle }}</small>
                  </td>
                  <td class="text-center text-muted">
                    <small>{{ item.created_at }}</small>
                  </td>
                  <td class="text-center text-muted">
                    <small>{{ bytesToSize(item.arcSize) }}</small>
                  </td>
                  <td class="text-center text-muted h5">
                    <i :class="documentFormat(item.arcName)"
                     v-tooltip="{content: documentFormatLabel(item.arcName)  }"></i><br />
                  </td>
                  <td class="text-center">
                    <b-button
                      class="mb-1"
                      variant="danger"
                      size="sm"
                      v-tooltip="{content: `Delete file`  }"
                      @click="deleteFile(item.boxId)"
                    >
                      <div class="glyph-icon simple-icon-trash d-inline"></div>
                    </b-button>
                    <b-button
                      class="mb-1"
                      variant="primary"
                      size="sm"
                      v-tooltip="{content: `Zoom in new tab`  }"
                      @click.stop.prevent="openWindow(item.arcPath)"
                    >
                      <div
                        class="glyph-icon simple-icon-size-fullscreen d-inline"
                      ></div>
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </vue-perfect-scrollbar>
        </div>
      </div>
      <div v-else>
        <center>
          <b-alert show variant="warning">{{
            $t("gps.confirmationslabels.no-documents-in-confirmations")
          }}</b-alert>
        </center>
      </div>
      <!-- FIN TABLA DE REGISTROS -->
    </div>
    <!-- @vdropzone-complete="afterComplete" -->
    <!-- <button @click="removeAllFiles">Remove All Files</button> -->
    <!-- @vdropzone-success="inSuccess" -->
    <!-- @vdropzone-complete="afterComplete" -->
  </div>
</template>

<script>
import FileboxServices from "../../../../../services/gps/filebox/FileboxServices";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  name: "attachments",
  props: ["cofId"],
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: FileboxServices.urlAddImage,
        // Necesario para que la api de tipo POST pueda leer contenido de imagenes:
        headers: {
          "Cache-Control": "",
        },
        maxFilesize: 5,
        chunking: true,
        acceptedFileTypes: "image/*, application/pdf, .docx, xlsx",
        addRemoveLinks: true,
        autoDiscover: true,
        clickable: true,
        thumbnailWidth: 150, // px
        thumbnailHeight: 150,
        maxFiles: 10,
        disablePreviews: false,
        duplicateCheck: true,
        params: {
          cofId: this.cofId
        },
        //dictDefaultMessage:""
        dictDefaultMessage:
          "<h2><i class='fas fa-cloud-upload-alt'></i><br/><br/>Drop your files</h2>"
      },
      documents: "",
      isLoadingRow: false,
      maxSizeUpload: 3000000
    };
  },
  methods: {
    fileAddedTypes(file, response) {
      if (
        (file.type === "application/pdf" ||
          file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") &&
        file.size <= this.maxSizeUpload
      ) {
        return true;
      } else {
        this.removeAllFiles();
        this.showTypesNotAllowed();
      }
    },
    showTypesNotAllowed() {
      var type = "error filled";
      var title = "Error";
      var mensaje =
        "The following formats are allowed: <strong>JPG, PNG, PDF, DOCX, XLSX</strong>" +
        "<br/><br/>Maximum size allowed is " +
        "<strong>" +
        this.bytesToSize(this.maxSizeUpload) +
        " </strong>";
      this.$notify(type, title, mensaje, {
        duration: 4500,
        permanent: false
      });
    },
    onThumbClick(index) {
      this.photoIndex = index;
      this.isOpen = true;
    },
    handleHide() {
      this.photoIndex = null;
      this.isOpen = false;
    },
    inSuccess(file, response) {
      this.showConfirmationUpload();
      this.getImagesFromCofId();
      setTimeout(() => this.removeAllFiles(), 1350);
    },
    removeAllFiles() {
      this.$refs.dropzone.removeAllFiles();
    },
    fileAdded: function(file, xhr, formData) {
      formData.append("cofId", this.cofId);
      
      let cofUsuarioId =  this.$store.getters.currentUser.id;
      formData.append("cofUsuarioId", cofUsuarioId);

      // var xhr = new XMLHttpRequest();
      // xhr.open('POST', FileboxServices.urlAddImage, true);
      // xhr.setRequestHeader('*', 'no-cache');
      // //xhr.send(data);
      
    },
    showConfirmationUpload() {
      var type = "success filled";
      var title = "Success";
      var mensaje = this.$t(
        "gps.confirmationslabels.upload-document-successfully"
      );
      this.$notify(type, title, mensaje, {
        duration: 3500,
        permanent: false
      });
    },
    getImagesFromCofId() {
      //this.isLoadingRow = false;
      const cofId = this.cofId;
      FileboxServices.getImagesFromCofId(cofId)
        .then(response => {
          this.documents = response.data.data;
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.isLoadingRow = true;
        });
    },
    deleteFile(boxId) {
      this.$swal({
        title: this.$t("gps.confirmationslabels.q-delete-document"),
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: this.$t("gps.confirmationslabels.yes-delete-it"),
        cancelButtonText: this.$t("gps.confirmationslabels.no-cancel-it"),
        confirmButtonColor: "#ED7117",
        reverseButtons: true
      }).then(result => {
        if (result.isConfirmed) {
          this.deleteImageFromCofId(boxId);
        } else if (result.dismiss === this.$swal.DismissReason.cancel) {
        }
      });
    },

    deleteImageFromCofId(id) {
      
      let cofUsuarioId= this.$store.getters.currentUser.id;
      FileboxServices.deleteImageFromCofId(id, cofUsuarioId)
      //FileboxServices.deleteImageFromCofId(data)
        .then(response => {
          var type = "success filled";
          var title = "Success";
          var mensaje = "File deleted successfully";
          this.$notify(type, title, mensaje, {
            duration: 3500,
            permanent: false
          });
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.getImagesFromCofId();
        });
    },
    documentFormat(fileName) {
      var extension = fileName.split(".").pop();
      // return extension;
      var response = "";
      switch (extension) {
        case "jpg":
          response = "fas fa-file-image text-warning";
          break;
        case "png":
          response = "fas fa-file-image text-warning";
          break;
        case "pdf":
          response = "fas fa-file-pdf text-danger";
          break;
        case "docx":
          response = "fas fa-file-word text-info";
          break;
        case "xlsx":
          response = "fas fa-file-excel text-success";
          break;
        default:
          response = "fas fa-file-alt";
      }
      return response;
    },
    documentFormatLabel(fileName) {
      var extension = fileName.split(".").pop();
      // return extension;
      var response = "";
      switch (extension) {
        case "jpg":
          response = "Image";
          break;
        case "png":
          response = "Image";
          break;
        case "pdf":
          response = "PDF Document";
          break;
        case "docx":
          response = "Word Document";
          break;
        case "xlsx":
          response = "Excel document";
          break;
        default:
          response = "Unspecified document";
      }
      return response;
    },    
    formatBoxName(fileName) {
      return fileName.slice(10);
    },
    bytesToSize(bytes) {
      var sizes = ["Bytes", "KB", "MB", "GB", "TB"];

      if (bytes == 0 || bytes == "" || bytes == null) return "0 Bytes";
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    },
    openWindow(path) {
      window.open(path);
    },
    // openWindow(name) {
    //   let url = this.getUrl(name);
    //   window.open(url);
    // },
    // getUrl(name) {
    //   let url = FileboxServices.urlPreviewImage + name;
    //   return url;
    // },
    hideModal(refname) {
      this.$refs[refname].hide();
      if (refname === "modalnestedinline") {
        this.$refs["modalnested"].show();
      }
    }
  },
  mounted() {
    this.getImagesFromCofId();
  }
};
</script>

<style>
div.modal-dialog.modal-md {
  /* //height: 360px !important; */
}
</style>

<style>
.dropzone .dz-preview.dz-image-preview,
.dropzone .dz-preview.dz-file-preview {
  height: auto !important;
}

.vue-dropzone > .dz-preview .dz-image img:not([src]) {
  width: auto !important;
}

#dropzone {
  letter-spacing: 0.2px;
  transition: background-color 0.2s linear;
}

#dropzone .dz-preview {
  width: 160px;
  display: inline-block;
}

#dropzone .dz-preview .dz-image {
  width: 80px;
  height: 80px;
  margin-left: 40px;
  margin-bottom: 10px;
}

#dropzone .dz-preview .dz-image > div {
  width: inherit;
  height: inherit;
  border-radius: 50%;
  background-size: contain;
}

#dropzone .dz-preview .dz-image > img {
  width: 100%;
}

#dropzone .dz-preview .dz-details {
  color: white;
  transition: opacity 0.2s linear;
  text-align: center;
  font-size: 10px !important;
}

#dropzone .dz-success-mark,
.dz-error-mark,
.dz-remove {
  display: none;
}
</style>
