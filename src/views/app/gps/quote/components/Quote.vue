/* Componente Padre Grupo de cotizacion:
 */
<template>
  <div>
    <!-- <h1>selectedGroup: {{selectedGroup}}</h1> -->
    <quote-header :gctId="selectedGroup"  @refreshQuote="refreshQuote"/>
    <quote-tabs :gctId="selectedGroup" :refresh="refreshData" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedGroup: "",
      refreshData: ""
    };
  },
  methods: {
    refreshQuote(params){
      console.log("params: " + params)
      this.refreshData = params;
      console.log("RefreshData: " + this.refreshData)
    }
  },
  created() {
    this.selectedGroup = this.$route.params.gctId;
  },
};
</script>
