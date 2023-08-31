<template>
  <b-row class="pt-4 pb-4">
    <b-colxx xs="6">
      <label class="form-group has-float-label">
   <!--      <input v-model="nota" type="text" class="form-control" /> -->
        <textarea placeholder="Service Note" v-model="nota"  rows="3" cols="50"></textarea>

        <span
          >Notes
          <!-- {{this.codId}} --></span
        >
      </label>
    </b-colxx>
    <b-colxx xs="5">
      <label class="form-group has-float-label">
        <input type="text" class="form-control" v-model="concepto" />
        <span>Item Detail</span>
      </label>

      
    </b-colxx>
      <b-colxx xs="2">
      <label class="form-group has-float-label">
        <input type="text" class="form-control" v-model="precio_unitario" />
        <span>PP Net</span>
      </label>
    </b-colxx>
      <b-colxx xs="2">
      <label class="form-group has-float-label">
        <input type="text" class="form-control" v-model="costo_unitario_total" />
        <span>PP</span>
      </label>
    </b-colxx>
     <b-colxx xs="4">
   <b-button variant="primary no-round" @click="SaveCategory()"
        >Save</b-button
      >
      <b-button variant="info no-round" @click="deleteservice()"
        >Delete Service</b-button
      >   </b-colxx>
      
    

  </b-row>
</template>
<script>
/* *** SERVICES *** */
import CotizacionDetalleServices from "../../../../services/gps/cotizaciondetalle/CotizacionDetalleServices.js";
import IconCard from "../../../../components/Cards/IconCard";

export default {
  name: "modalnotequote",
  props: ["codId"],
  components: {
    "icon-card": IconCard,
  },
  data() {
    return {
    /*   nota: "", */
/*       concepto: "", */
      detallecotizacion: "",
  /*     precio_unitario:"", */
    };
  },
  filters: {},
  computed: {},
  methods: {
    SaveCategory() {
      let data = {
        valor: this.nota,
        codId: this.codId,
        concepto: this.concepto,
        preciouni:this.precio_unitario,
        costounitariototal:this.costo_unitario_total,
      };
      let self = this;
      CotizacionDetalleServices.addnotedetailquote(data)
        .then((response) => {
          let mensaje = response.data.data;
          if (mensaje == "OK") {
            var type = "success filled";
            var title = "Category";
            var message = "Add";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
             this.$emit('updateQuoteAdmin', 1);
          } else {
            var title = "Category";
            var message = "NO add";
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

    deleteservice() {
      if (confirm("Do you really want to delete?")) {
        CotizacionDetalleServices.deleteservice(this.codId)
          .then((response) => {
            let mensaje = response.data.data;
            // console.log(response.data.data);

            if (mensaje == "OK") {
              var type = "success filled";
              var title = "Deleted";
              var message = "Service deleted";
              {
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
              } 
               this.$emit('updateQuoteAdmin', 1);
              // console.log("porcentaje lleno");
            }
            if (mensaje == "Error") {
              var type = "warning";
              var title = "Error";
              var message = "Is not a service";
              {
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    getDetailCotizacionDetalle() {
      CotizacionDetalleServices.getDetailCotizacionDetalle(this.codId)
        .then((response) => {
          this.detallecotizacion = response.data.data;

          this.nota = this.detallecotizacion.codNota;
          //console.log(this.detallecotizacion);
          //   console.log(this.inforselectrates);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
  },

  mounted() {},
};
</script>


