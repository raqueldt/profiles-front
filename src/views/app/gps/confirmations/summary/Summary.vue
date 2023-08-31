<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12">                

                <div class="row">
                    <div class="col-lg-6">
                        <summary-confirmation-details   v-if="cofId" 
                                                        :cofId="cofId" 
                                                        :lastComment="lastComment"
                                                        @cotId="getCotIdMethod"
                                                        @summaryDetails="getSummaryDetails">
                        </summary-confirmation-details> 
                    </div>
                    <div class="col-lg-6">
                        <summary-confirmation-notes v-if="cofId"  
                                                    :cofId="cofId" 
                                                    :summaryDetails="summaryDetails"
                                                    @lastComment="lastCommentMethod">
                        </summary-confirmation-notes> 
                    </div>
                    <div class="col-lg-12 mt-2">
                        <summary-confirmation-includes  v-if="cofId"  
                                                        :summaryDetails="summaryDetails"
                                                        :cofId="cofId">
                        </summary-confirmation-includes> 
                    </div>                    
                    <div class="col-lg-12 mt-3">
                        <summary-confirmation-policies  v-if="cofId && cotId" 
                                                        :cofId="cofId" 
                                                        :cotId="cotId"
                                                        :summaryDetails="summaryDetails" >
                        </summary-confirmation-policies> 
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
   export default {
    name: 'Summary',    
    props: ["cofId"],    
    data () {
        return {
            lastComment:"",
            cotId:"",
            cofIncluye:"",
            cofNoIncluye:"",
            summaryDetails:[],
        }
    },
    methods:{
     lastCommentMethod(comment){
        this.lastComment = comment;
     },
     getCotIdMethod(cotId){
        this.cotId = cotId;
     }, 
     getSummaryDetails(summaryDetails){
        this.summaryDetails = summaryDetails;
     },         
    },
    mounted () {
    }
}
</script>

<style lang="scss" scoped></style>