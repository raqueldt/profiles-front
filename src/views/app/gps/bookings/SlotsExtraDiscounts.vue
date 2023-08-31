<template>
  <!-- <b-container fluid style="width:185px"> -->
  <b-container fluid style="width:155px">

    <div class="input-group justify-content-center" >
      <div class="input-group-prepend ">
        <span class="input-group-text custom-height p-1"               
              :class="amount ? 'bg-success text-white' : 'bg-ligth'"
              data-toggle="tooltip" data-placement="top" title="Extra discount by amount"
              id="basic-addon1">$</span>
      </div>
      <!-- :class="amount ? 'bg-warning text-white' : 'bg-ligth'"  -->
      <input  type="text" 
              :id="avsId"
              data-toggle="tooltip" data-placement="top" title="Type amount (eg. 250)"
              maxlength="5" 
              min="1"
              :max="netRate"
              v-model="amount" 
              @keypress="onlyNumber" 
              @keyup="cleanPercent()"              
              class="form-control custom-height" 
              aria-label="Username" 
              aria-describedby="basic-addon1">
              <!-- A: {{amount}} -->
              <!-- @change="validateNetRate()" -->
              <!-- @keyup="cleanPercent(), validateNetRate()" -->

      <input  type="text" 
              data-toggle="tooltip" data-placement="top" title="Type percent (eg. 25)"
              maxlength="2" 
              v-model="percent" 
              @keypress="onlyNumber" 
              @keyup="cleanAmount()"
              class="form-control custom-height" 
              aria-label="Username" 
              aria-describedby="basic-addon1">
      <div class="input-group-prepend ">
        <span class="input-group-text custom-height  p-1"              
              :class="percent ? 'bg-success text-white' : 'bg-ligth'"
              data-toggle="tooltip" data-placement="top" title="Extra discount by percent"
              id="basic-addon1">%</span>
      </div>
       <!-- D: {{percent}} -->
      <!-- :class="percent ? 'bg-warning text-white' : 'bg-ligth'"  -->
    </div>

    <div class="input-group justify-content-center" v-if="amount || percent">
      <div class="input-group-prepend ">
        <span class="input-group-text custom-height p-1" 
              :class="description ? 'bg-success text-white' : 'bg-danger text-white'" 
              data-toggle="tooltip" data-placement="top" title="Extra discount description"
              id="basic-addon1">
              <i class="glyph-icon simple-icon-note" style="font-size:9px"></i>
              </span>
      </div>
      <input  type="text" 
              data-toggle="tooltip" data-placement="top" title="Add description"
              maxlength="50" 
              @keyup="addDescriptionBeforeEmit()"
              v-model="description" 
              placeholder="Add description"
              class="form-control custom-height" 
              aria-label="Username" 
              aria-describedby="basic-addon1">
    </div>

  </b-container>
</template>

<script>
  export default {
    props: ["avsId", "amountValue", "percentValue", "descriptionValue","netRate"],
    data() {
      return {
        amount: "",
        percent: "",
        description: "",
      };
    },
    watch: {
     'amountValue': function (newVal, oldVal){
         if(!Boolean(newVal)) this.amount = ""
      },
      'percentValue': function (newVal, oldVal){
          if(!Boolean(newVal)) this.percent = ""
      },
      'descriptionValue': function (newVal, oldVal){
          if(!Boolean(newVal)) this.description = ""
      },          
    },
    computed: {

    },
    methods: {   
      formfocus() {
        document.getElementById(this.avsId).focus();
      },      
      onlyNumber($event) {                
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
          $event.preventDefault();
        }
      },
      // TO DO: Afinar métod para validar que valor ingresado no sea mayor a OffNetRate
      validateNetRate(){
        if(parseInt(this.amount) >= parseInt(this.netRate)){
          this.amount = "";
        }        
      },
      cleanAmount() {        
        this.configDescription();
        this.amount = "";
        var data = this.buildData('percent', this.percent);
        this.$emit('addExtraDiscount', data)
      },
      cleanPercent() {
        this.validateNetRate();
        this.configDescription();
        this.percent = "";
        var data = this.buildData('amount', this.amount);
        this.$emit('addExtraDiscount', data)
      },
      addDescriptionBeforeEmit(){
        if(Boolean(this.amount)){
          var data = this.buildData('amount', this.amount);
        }
        else if(Boolean(this.percent)){
          var data = this.buildData('percent', this.percent);
        }        
        this.$emit('addExtraDiscount', data)
      },
      configDescription() {
        if( !this.amount && !this.percent){
          this.description = "";
        }        
      },
      buildData(flag, value) {
        let data = {
          flag: flag,
          value: value,
          description: this.description,
          avsId: this.avsId
        };
        return data;
      },
      checkInitialValues(){
          var checkAmount = Boolean(this.amountValue);
          var checkPercent = Boolean(this.percentValue);
          var checkDescription = Boolean(this.descriptionValue);
          if(checkAmount && this.amountValue != 0){
            this.amount = this.amountValue;
            this.cleanPercent();
          }
          if(checkPercent  && this.percentValue != 0){
            this.percent = this.percentValue;
            this.cleanAmount();
          }  
          if(checkDescription){
            this.description = this.descriptionValue;
          }                      
      },
    },
    async mounted() {
        await this.formfocus();
          setTimeout(() => {
                  this.checkInitialValues()
          }, 1000);
    },
    created() {

    },
  };

</script>

<style scoped>
.custom-height{
  height:25px !important;
}
</style>