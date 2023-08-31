<template>
  <b-card :title="$t('gps.confirmation_notes')" class="shadow">
    <!-- <pre>{{summaryDetails}}</pre> -->
    <b-form @submit.stop.prevent>
      <b-row class="write_message">
        <b-col lg="10" md="12" xs="12" cols="12"  class="pr-0">
          <label class="form-group has-float-label">
            <!-- <textarea v-model="cfnNota" class="form-control" maxlength="300" max-rows="8"/> -->
        <b-form-textarea
          id="textarea-state"
          v-model="cfnNota"          
          maxlength="500"
          rows="6"
          max-rows="8"
        ></b-form-textarea>            
            <span>{{ $t("gps.write_message") }}</span>
          </label>
        </b-col>
        <b-col lg="2" md="12" xs="12" cols="12" class="right-title-mobile" >
          <b-button
            data-toggle="tooltip"
            data-placement="top"
            :title="$t('gps.confirmationslabels.tooltip-write-message')"
            type="submit"
            variant="primary default"
            class="my-1"
            @click="saveNote()"
            :disabled="cfnNota.length <= 0"
          >
            <div class="glyph-icon simple-icon-check"></div>
          </b-button>
        </b-col>
      </b-row>
    </b-form>
    <b-row class="notes_message">
      <div class="text-center" v-if="!isLoadingRow">
        <b-spinner
          style="width: 3rem; height: 3rem;"
          label="Large Spinner"
          type="grow"
          variant="primary"
        ></b-spinner>
      </div>
      <div v-else class="w-100">
        <b-colxx xxs="12" v-if="summaryDetailsNotes.length > 0">
          <b-card>
            <b-row>
              <b-badge class="float-right" variant="primary">{{
                summaryDetailsNotes.length
              }}</b-badge>
            </b-row>
            <vue-perfect-scrollbar
              class="scroll dashboard-list-with-thumbs"
              :settings="{ suppressScrollX: true, wheelPropagation: false }"
            >
              <div
                class="message"
                v-for="(note) in summaryDetailsNotes"
                :key="note.cfnId"
              >
                <div class="dates">
                  <!-- <b-badge variant="info">{{ index + 1 }}</b-badge> -->
                  {{ note.creado_en }} / {{ note.name }} {{ note.lastname }}
                  <b-button
                    v-if="note.cfnUsuarioId == usuarioLogueadoId"
                    size="sm"
                    variant="link"
                    style="float: right"
                    @click="deleteNote(note.cfnId)"
                  >
                    <b-badge  variant="danger"
                              data-toggle="tooltip"
                              data-placement="top"
                             :title="$t('gps.confirmationslabels.delete-tooltip')">
                        <div class="glyph-icon simple-icon-trash d-inline"></div>                      
                    </b-badge>
                  </b-button>
                </div>
                <div class="message_content">{{ note.cfnNota }}</div>
              </div>
            </vue-perfect-scrollbar>
          </b-card>
        </b-colxx>
        <b-colxx v-else class="w-100">
          <!-- <alertsglobal
            type="warning"
            :title="$t('gps.confirmationslabels.no-confirmation-notes')"
            class="w-100"
          >
          </alertsglobal> -->
          <div class="alert alert-warning text-center mt-2">
            {{ $t("gps.confirmationslabels.no-confirmation-notes") }}
          </div>          
        </b-colxx>
      </div>
    </b-row>
  </b-card>
</template>

<script>
import ConfirmacionesSummaryServices from "../../../../../services/gps/confirmaciones/ConfirmacionesSummaryServices";
export default {
  name: "SummaryConfirmationNotes",
  props: ["cofId", "summaryDetails"],
  data() {
    return {
      summaryDetailsNotes: [],
      cfnNota: "",
      usuarioLogueadoId: 0,
      isLoadingRow: false,
      lastComment: ""
    };
  },
  mounted() {
    this.usuarioLogueadoId = this.$store.getters.currentUser.id;
    this.getConfirmacionesInfoNotas();
  },
  methods: {
    deleteNote(cfnId) {
      this.$swal({
        title: this.$t("gps.confirmationslabels.q-delete-comment"),
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: this.$t("gps.confirmationslabels.yes-delete-it"),
        cancelButtonText: this.$t("gps.confirmationslabels.no-cancel-it"),
        confirmButtonColor: "#ED7117",
        reverseButtons: true
      }).then(result => {
        if (result.isConfirmed) {
          this.delConfirmacionesInfoNotas(cfnId);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === this.$swal.DismissReason.cancel
        ) {
        }
      });
    },
    delConfirmacionesInfoNotas(cfnId) {
      ConfirmacionesSummaryServices.delConfirmacionesInfoNotas(cfnId)
        .then(() => {
          this.getConfirmacionesInfoNotas();
        })
        .catch(error => console.log(error));
    },
    getConfirmacionesInfoNotas() {
      this.isLoadingRow = false;
      this.summaryDetailsNotes = [];
      const cofId = this.cofId;
      ConfirmacionesSummaryServices.getConfirmacionesInfoNotas(cofId)
        .then(response => {
          this.summaryDetailsNotes = response.data.data;
          //Enviar el último comentario:
          this.lastComment = this.summaryDetailsNotes[0];
          this.$emit("lastComment", this.lastComment);
          //console.log("Notas: " + JSON.stringify(this.summaryDetailsNotes[0]))
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.isLoadingRow = true;
        });
    },
    saveNote() {
      let data = {
        cofId: this.cofId,
        cfnUsuarioId: this.$store.getters.currentUser.id,
        cfnNota: this.cfnNota,
        cfFlag:"Add"
      };
     
      ConfirmacionesSummaryServices.addConfirmacionesInfoNotas(data)
        .then(() => {
          this.cfnNota = "";
          this.getConfirmacionesInfoNotas();
          this.showMessage();
        })
        .catch(error => console.log(error))
        .finally(() => {});
    },
    showMessage() {
      var type = "success filled";
      var title = "Success";
      var mensaje = this.$t("gps.confirmationslabels.note-added-successfully");
      this.$notify(type, title, mensaje, {
        duration: 2500,
        permanent: false
      });
    }
  }
};
</script>