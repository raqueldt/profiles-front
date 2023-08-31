<template>
<b-row class="pt-4 pb-4">
    <b-colxx xs="6">
      
      <label class="form-group has-float-label">
   <!--      <input v-model="nota" type="text" class="form-control" /> -->
<!--         <textarea placeholder="Service Note" v-model="nota"  rows="3" cols="50"></textarea> -->
        <b-form-textarea  rows="2" max-rows="6" v-model="detailconf.codNota" no-resize></b-form-textarea>
     
        <span
          >Notes
          <!-- {{this.codId}} --></span
        >
      </label>
      
    <form class="form-inline">
   <div class="form-group ">
       <label class="form-group has-float-label" >
        <input type="text" class="form-control" @keypress="onlyNumber" v-model="detailconf.codPrecioUnitarioTotal" />
        <span>PP Net</span>
      </label>
   </div>
   <div class="form-group mx-sm-3">
      <label class="form-group has-float-label" >
         <input type="text" class="form-control" @keypress="onlyNumber" v-model="detailconf.codCostoUnitarioTotal" />
        <span>PP</span>
  
      </label>
   </div>
  
</form>
     
    <!--    <label class="form-group has-float-label ">
         <input type="text" class="form-control" @keypress="onlyNumber" v-model="detailconf.codCostoUnitarioTotal" />
        <span>PP</span>
      </label> -->
    </b-colxx>
    <b-colxx xs="5">
      <label class="form-group has-float-label">
         <b-form-textarea  rows="2" max-rows="6" v-model="detailconf.codConcepto" no-resize></b-form-textarea>
     
        <span>Item Detail</span>
      </label>
    
   <b-button variant="primary no-round" @click="SaveCategory(detailconf)"
        >Save</b-button
      >
      <b-button variant="primary no-round" @click="deleteservice(detailconf.codId)"
        >Delete Service</b-button
      > 
      
    </b-colxx>
     
   
     <b-colxx xs="4">
  </b-colxx>
      
    <!--    {{detailconf}} -->

  </b-row>
</template>
<script>
/* *** SERVICES *** */
import CotizacionDetalleServices from "../../../../services/gps/cotizaciondetalle/CotizacionDetalleServices.js";
import IconCard from "../../../../components/Cards/IconCard";

export default {
  name: "modalnotequote",
  props: ["detailconf"],
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
    SaveCategory(detailconf) {
      let data = {
        valor: this.nota,
        codId: this.codId,
        concepto: this.concepto,
        preciouni:this.precio_unitario,
        costounitariototal:this.costo_unitario_total,
      };
      let self = this;
      CotizacionDetalleServices.addnotedetailquote(detailconf)
        .then((response) => {
          let mensaje = response.data.data;
          if (mensaje == "OK") {
            var type = "success filled";
            var title = "Service";
            var message = "Updated";
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
       onlyNumber ($event) {
          //console.log($event.keyCode); //keyCodes value
          let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
          if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
              $event.preventDefault();
          }
        },
    deleteservice(id) {
      if (confirm("Do you really want to delete?")) {
        CotizacionDetalleServices.deleteservice(id)
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


