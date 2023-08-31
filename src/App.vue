<template>
  <div class="h-100">
    <router-view/>
    <!--router-view :key="$route.fullPath"/-->
    <!--color-switcher /-->
  </div>
</template>

<script>
  import ColorSwitcher from "./components/Common/ColorSwitcher";
  import axios from 'axios';
  import {
    mapGetters,
    mapActions
  } from "vuex";

  import {
    getDirection
  } from "./utils";
  import {
    store
  } from '../src/store/index';

  export default {
    components: {
      "color-switcher": ColorSwitcher
    },
    beforeMount() {
      const direction = getDirection();
      if (direction.isRtl) {
        document.body.classList.add("rtl");
        document.dir = "rtl";
        document.body.classList.remove("ltr");
      } else {
        document.body.classList.add("ltr");
        document.dir = "ltr";
        document.body.classList.remove("rtl");
      }
    },
    methods: {
      ...mapActions(["signOut", "destroyToken"]),
    },
    created: function () {

      // Interceptor para determinar si una petición no es autorizada me devuelve a login
      // let self = this
      // axios.interceptors.response.use(function (response) {
      //   return response
      // }, function (error) {
      //   if (error.response.status === 401) {
      //     console.log("Aqui...");
      //     self.signOut().then(() => {
      //       self.$router.push("/user/login");
      //     });
      //   }
      //   return Promise.reject(error)
      // })
    }
  };

</script>
