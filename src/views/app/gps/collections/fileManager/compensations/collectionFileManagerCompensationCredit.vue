<template>
    <div class="container-fluid">

        <div class="row">
          <div class="col-lg-6">

            <form class="px-2">
              <span>Apply to:</span>
              <div class="row">
                <div class="col-lg-6">
                  <b-input-group>
                    <div class="form-group has-float-label custom-selects my-2">
                      <b-form-input
                        id="cfdCantidad"
                        type="text"
                        class="text-class-form"
                      ></b-form-input>
                      <span>Code </span>
                    </div>
                  </b-input-group>
                </div>
                <div class="col-lg-6">
                  <b-input-group>
                    <div class="form-group has-float-label custom-selects my-2">
                      <b-form-input
                        id="cfdCantidad"
                        type="text"
                        class="text-class-form"
                      ></b-form-input>
                      <span>Amount </span>
                    </div>
                  </b-input-group>
                </div>
                <div class="col-lg-12">
                  <b-input-group>
                    <div class="form-group has-float-label custom-selects my-2">
                      <b-form-input
                        id="cfdCantidad"
                        type="text"
                        class="text-class-form"
                      ></b-form-input>
                      <span>Note </span>
                    </div>
                  </b-input-group>
                </div>
                <div class="col-lg-12">
                    <b-button                    
                      block
                      size="sm"
                      variant="success no-round"                    
                      >OK
                    </b-button>
                </div>                
              </div>
            </form>

          </div>
          <div class="col-lg-6">
               
            <b-row  class="w-100">
              
              <b-colxx xxs="12">
                <span>Send to:</span>
              </b-colxx>

              <b-colxx xxs="12" class="small">
                  <b-row>
                      <b-colxx xxs="2">
                        <span>1</span>
                      </b-colxx>
                    <b-colxx xxs="5">
                        <span>GPT-21-01</span>
                      </b-colxx>
                      <b-colxx xxs="5">
                        <span>300</span>
                      </b-colxx>
                  </b-row>
              </b-colxx>

            </b-row>


          </div>          
        </div>          
                
    </div>
</template>

<script>
   export default {
    name: 'collectionFileManagerCompensationCredit',    
    data () {
        return {
            items: [
        {
          date: "2021-03-01",
          user: "Lisa",
          approved: "Bryan",
        },
        {
          date: "2021-03-01",
          user: "Lisa",
          approved: "Bryan",
        },
        {
          date: "2021-03-01",
          user: "Lisa",
          approved: "Bryan",
        },                
               
      ]
        }
    },

    methods:{
     
    },
    mounted () {

    }
}
</script>

<style lang="scss" scoped></style>
