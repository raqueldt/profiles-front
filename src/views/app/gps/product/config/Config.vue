<template>

  <b-container fluid>

    <!-- BREADCRUM -->

    <b-row>
      <b-colxx xxs="12">
        <span>
          <h1>{{ $t("product.product") }}</h1>
          <ul class="
              nav
              pt-0
              breadcrumb-container
              d-none d-sm-block d-lg-inline-block
            ">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/app" class="active" target="_self">{{
                  $t("menu.home")
                }}</a>
              </li>
              <li class="breadcrumb-item active">
                <span aria-current="location">{{ $t("product.config") }}</span>
              </li>
            </ol>
          </ul>
        </span>
        <div class="separator mb-3"></div>
      </b-colxx>
    </b-row>

    <!-- FIN BREADCRUM -->

    <b-card-group class="">
      <b-card no-body class="mb-2 px-3 py-1">

        <b-row>

          <!-- <b-col lg="2" cols="12" style="border:solid 1px red">
            <b-nav vertical class="w-100">
              <b-nav-item active>Prestaciones</b-nav-item>
              <b-nav-item>Complementos</b-nav-item>
            </b-nav>
          </b-col> -->

          <b-col lg="2" cols="12" class="p-2 shadow">
            <b-nav vertical class="w-100">
              <template v-for="(opt, index) in options">
                <b-nav-item v-if="opt" :key="index" :active="opt.active" @click="setIndex(opt.id)">
                  {{opt.value}}</b-nav-item>
              </template>
            </b-nav>
          </b-col>

          <b-col lg="10" cols="12"  class="my-2">
            <prestaciones-parent id="1" v-show="currentId === 1"></prestaciones-parent>
            <complementos-parent id="2" v-show="currentId === 2"></complementos-parent>
          </b-col>

        </b-row>

      </b-card>
    </b-card-group>

    <!-- modal informaciòn deck -->

  </b-container>

</template>

<script>
  import moment from "moment";
  //import AvailabilityServices from "@/services/gps/availability/availabilityServices.js"

  import PrestacionesParent from "../../../gps/product/config/prestaciones/PrestacionesParent";
  import ComplementosParent from "../../../gps/product/config/complementos/ComplementosParent";

  export default {

    name: 'Config',
    components: {
      "prestaciones-parent": PrestacionesParent,
      "complementos-parent": ComplementosParent,
    },

    data() {
      return {
        currentId: 1,
        options: [{
            id: 1,
            value: 'Prestaciones',
            active: true
          },
          {
            id: 2,
            value: 'Complementos',
            active: false
          }
        ]
      }
    },

    computed: {


    },

    created() {

    },

    mounted() {


    },

    methods: {
      setIndex(id) {
        this.currentId = id;

          this.options.forEach((elemento, index) => {
			if(elemento.id === id) elemento.active = true
            else elemento.active = false
    	  });
      }

    }
  };

</script>


<style scoped lang="scss">
  @media (max-width: 768px) {
    .title-deck-plans {
      text-align: center !important;
    }
  }

</style>
