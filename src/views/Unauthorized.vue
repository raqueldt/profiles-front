<template>

  <div class="d-flex align-items-center justify-content-center" style="height: 100vh;">
    <b-card
    title="You're not permitted to see this"
    style="max-width: 20rem;"
    class="mb-2 text-center"
  >
    <b-card-text>
      The page you're trying to access has restricted access.
      If you feel this is a mistake, contact your admin.
    </b-card-text>

    <b-button variant="primary" @click="goBack">Return home</b-button>
  </b-card>
  </div>


</template>
<script>
import { adminRoot } from '../constants/config';
export default {
  methods: {
    goBack() {
      this.$router.push(adminRoot);
    },
  },

};
</script>
