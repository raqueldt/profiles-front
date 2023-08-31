<template>
  <b-card :title="$t('gps.includes')" class="shadow">
    <b-form @submit.stop.prevent @keyup.enter.shift.exact="updateIncludes()">
      <b-row class="write_message">
        <b-colxx xxs="6" class="pl-0">
          <!-- {{infoCotizacion}} -->
          <!-- BOTON SNIPPETS -->
          <div class="text-right">
            <modal-snippets
              v-model="infoCotizacion.cotIncluye"
              @insertText="(value) => (infoCotizacion.cotIncluye = value)"
            >
            </modal-snippets>
          </div>
          <!-- FIN BOTON SNIPPETS -->

          <label class="form-group has-float-label">
            <!-- <textarea v-model="ctIncluye" v-html="ctIncluye" class="form-control w-100" rows="8"/>    -->
            <quill-editor
              v-model="infoCotizacion.cotIncluye"
              :options="editorOption"
              ref="editor"
            >
            </quill-editor>
            <span>{{
              $t("gps.confirmationslabels.confirmation-include")
            }}</span>
          </label>
        </b-colxx>

        <b-colxx xxs="6" class="pl-0 pr-0">
          <!-- BOTON SNIPPETS -->
          <div class="text-right">
            <modal-snippets
              v-model="infoCotizacion.cotNoincluye"
              @insertText="(value) => (infoCotizacion.cotNoincluye = value)"
            >
            </modal-snippets>
          </div>
          <!-- FIN BOTON SNIPPETS -->

          <label class="form-group has-float-label">
            <!-- <textarea v-model="ctNoIncluye" class="form-control w-100"  rows="8"/>       -->
            <quill-editor
              ref="myTextEditor"
              v-model="infoCotizacion.cotNoincluye"
              :options="editorOption"
            >
            </quill-editor>
            <span>{{
              $t("gps.confirmationslabels.confirmation-no-include")
            }}</span>
          </label>
        </b-colxx>

        <b-colxx xxs="6" class="pl-0">
          <!-- BOTON SNIPPETS -->
          <div class="text-right">
            <modal-snippets
              v-model="infoCotizacion.cotPoliticas"
              @insertText="(value) => (infoCotizacion.cotPoliticas = value)"
            >
            </modal-snippets>
          </div>
          <!-- FIN BOTON SNIPPETS -->

          <label class="form-group has-float-label">
            <!-- <textarea v-model="ctPoliticas" class="form-control w-100"  rows="8"/>  -->
            <quill-editor
              ref="myTextEditor"
              v-model="infoCotizacion.cotPoliticas"
              :options="editorOption"
            >
            </quill-editor>
            <span>{{ $t("gps.cancelation-policies-quote") }}</span>
          </label>
        </b-colxx>

        <b-colxx xxs="6" class="pl-0">
          <!-- BOTON SNIPPETS -->
          <div class="text-right">
            <modal-snippets
              v-model="infoCotizacion.cotPoliticasPago"
              @insertText="(value) => (infoCotizacion.cotPoliticasPago = value)"
            >
            </modal-snippets>
          </div>
          <!-- FIN BOTON SNIPPETS -->

          <label class="form-group has-float-label">
            <!-- <textarea v-model="ctPoliticas" class="form-control w-100"  rows="8"/>  -->
            <quill-editor
              ref="myTextEditor"
              v-model="infoCotizacion.cotPoliticasPago"
              :options="editorOption"
            >
            </quill-editor>
            <span>{{ $t("gps.payment-policies-quote") }}</span>
          </label>
        </b-colxx>

        <b-colxx xss="12" class="text-center">
      <!--     <b-button
            block
            data-toggle="tooltip"
            data-placement="top"
            :title="$t('gps.tooltips.click-to-save')"
            type="submit"
            variant="success default"
            class="mt-3 mb-2"
            @click="updateIncludes()"
          >
            <i class="glyph-icon simple-icon-check"></i>
            {{ $t("gps.pax.save-button") }}
          </b-button> -->

    <b-button   variant="primary" @click="updateIncludes"  >{{ $t('gps.pax.save-button') }}</b-button>
    


        </b-colxx>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "ModalSettingsIncludes",
  props: ["cotId"],
  components: {
    "quill-editor": quillEditor,
  },
  data() {
    return {
      infoCotizacion: [],
      ctIncluye: "",
      ctNoIncluye: "",
      ctPoliticas: "",
      ctPoliticasPago: "",
      isLoadingRow: false,
      editorOption: {
        placeholder: "",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [
              {
                list: "ordered",
              },
              {
                list: "bullet",
              },
              {
                indent: "-1",
              },
              {
                indent: "+1",
              },
            ],
          ],
        },
      },
    };
  },
  mounted() {
    this.getInfoCotizacion();
  },
  methods: {
    updateIncludes() {
      let data = {
        cotId: this.cotId,
        cotIncluye: this.infoCotizacion.cotIncluye,
        cotNoIncluye: this.infoCotizacion.cotNoincluye,
        cotPoliticas: this.infoCotizacion.cotPoliticas,
        cotPoliticasPago: this.infoCotizacion.cotPoliticasPago,
      };
      CotizacionesServices.updateCotizacionInclude(data)
        .then(() => {
          this.showMessage();
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.$emit("updateIncludes");
        });
    },
    getInfoCotizacion() {
      CotizacionesServices.getInfoCotizacion(this.cotId)
        .then((response) => {
          this.infoCotizacion = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showMessage() {
      var type = "success filled";
      var title = "Success";
      var mensaje = this.$t("gps.confirmationslabels.note-added-successfully");
      this.$notify(type, title, mensaje, {
        duration: 2500,
        permanent: false,
      });
    },
  },
};
</script>

<style scoped>
* >>> .ql-editor {
  height: 150px !important;
}
</style>
