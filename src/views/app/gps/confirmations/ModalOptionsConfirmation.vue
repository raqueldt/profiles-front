<template>
  <div>

    <b-row>
      <b-col>

          <p>
            If you're sure you want to cancel the file <strong>{{ infoconfi.cofCodigo  }}</strong>,
            please note that <strong>this action cannot be undone</strong> and the <strong>confirmed spaces will be released</strong>.
          </p>

          <p class="text-left">
            Before canceling this file, you have the option to reset the sales values to zero or leave them as they are.
          </p>

          <div class="text-center">
            <b-form-radio-group
              v-model="resetValuesOption"
              :options="options"
              name="radio-options"
            />
          </div>

          <b-form-textarea
            v-model="cfnNota"
            maxlength="500"
            rows="3"
            class="my-1"
            placeholder="Why are cancelling?"
          />

          <p class="mt-4 text-center">
            Are you sure you want to proceed with the cancellation?
          </p>


          <b-button
            block
            @click="cancelar(infoconfi.cofId, resetValuesOption)"
            variant="primary"
            :disabled="!hasCancelOptions || isBusy"
          >
            <b-spinner small v-if="isBusy"/>
            Yes, cancel file
          </b-button>


      </b-col>
    </b-row>

</div>
</template>
<script>

import ConfirmacionServices from "../../../../services/gps/confirmacion/ConfirmacionServices.js";

import ConfirmacionesSummaryServices from "../../../../services/gps/confirmaciones/ConfirmacionesSummaryServices.js";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  props: ["infoconfi"],

  components: {
    "v-select": vSelect,
  },

  /* props: ["cofId"], */

  name: "confirmations",
  data() {
    return {

      //2023-02-17 | fg | busy control
      isBusy: false,

      // 2023-02-16 | fg | encerar debe ser tipo boolean
      options: [
        { text: 'Reset sales values to zero', value: '1' },
        { text: 'Keep sales values', value: '0' },
      ],


      resetValuesOption: null,
      gastosPreliminar: false,
      dataConfirmation: "",

      clienteName: "",
      cofCodigo: "",
      cofClienteId: "",
      cofReferencia: "",
      cotCodigo: "",
      cofId: parseInt(this.$route.params.cofId),

      cfnNota: "",

    };
  },
  computed: {

    //2023-02-17 | fg |
    hasCancelOptions(){

      if ( this.resetValuesOption  && this.cfnNota.length > 3)  return true

      return false

    },


    userId() {
      return this.$root.$loggedUserId;
    },
  },

  methods: {

    async cancelar(cofId, encerar) {

      this.isBusy = true

      const params = {
        id: cofId,
        encerar,
        user: this.userId
      }

      const { data } = await ConfirmacionServices.cancelar(params)

      await this.saveNote()

      if (data)
        location.reload()

      this.isBusy = false

    },

    //AM: Valido que el parametro de ruta sea entero, caso contrario lanza pantalla 404
    checkNumericParameter() {
      if (!parseInt(this.$route.params.cofId)) {
        this.$router.push({ name: "error" });
      }
    },

    getConfirmationHeader() {
      ConfirmacionServices.getConfirmationHeader(this.cofId)
        .then((response) => {
          this.dataConfirmation = response.data;
          this.dataConfirmation = this.dataConfirmation.shift();
          //console.log("cabecera: " + JSON.stringify(response));
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Guarda las notas (confirmacion_notas) justificando por qué cancela el file
    // FS 10/02/23

    async saveNote() {


      const optionCancelText = this.resetValuesOption == 1 ? '[Reset] ' : '[Keep] '

      const data = {
        cofId: this.cofId,
        cfnUsuarioId: this.$store.getters.currentUser.id,
        cfnNota: optionCancelText + this.cfnNota,
        cfFlag: "Add"
      };

      await ConfirmacionesSummaryServices.addConfirmacionesInfoNotas(data)

    },


    setCancelMode(mode) {
      this.gastosPreliminar = true;
    },


    updateConfirmacionCabecera(codigo) {
      let data = {
        cofId: this.cofId,
        cofCodigo: codigo
      };
      ConfirmacionServices.updateConfirmacionCabecera(data)
        .then((response) => {
          let mensaje = response.data;
          if (mensaje.data == 200) {
            var type = "success filled";
            var title = "Group title";
            var message = "Update";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
          } else {
            var type = "error filled";
            var title = "Titulo";
            var message = "No update";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },


  mounted() {
    this.checkNumericParameter();
    this.getConfirmationHeader();
  },
};
</script>

<style>
li.rightside {
  float: right;
  line-height: 34px;
}
</style>
