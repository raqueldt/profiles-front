<template>
  <div>
  <!--   {{infocoti}} -->
    <b-form-group label="Please select a code">
      <b-form-radio
        v-for="(item, index) in codigoscliente"
        :key="index"
        @change="captureitem(item.id)"
        name="some-radios"
      >
        {{ item.codigo }}
      </b-form-radio>
    </b-form-group>
    <h2>Code {{ codigo }}</h2>
  </div>
</template>

<script>
import ConfirmacionesServices from "../../../../../services/gps/confirmacion/ConfirmacionServices";

export default {
  name: "",
  props: ["infocoti"],
  data() {
    return {
      codigoscliente: [],
      cliId: this.infocoti.clienteId,

      codigo: "",
    };
  },
  mounted() {
    this.codigosCliente();
  },
  methods: {
    captureitem(id) {
      /*  console.log('s'+id); */
      this.codigo = id;
    },
    codigosCliente() {
      ConfirmacionesServices.codigosCliente(this.cliId)
        .then((response) => {
          // console.log("==> " + JSON.stringify(response.data));
          this.codigoscliente = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>