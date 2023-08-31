<template>
    <div>
        <b-row>
            <b-colxx>
                <b-row>
                    <b-colxx class="info-client">
                        <div>
                           <strong>File code: </strong> <span>GPT-21-06</span>
                        </div>
                        <div>
                            <strong>Start date:</strong> Mon, 20-03-2021
                        </div>
                    </b-colxx>
                    <b-colxx class="text-right">
                        <small >85/100</small> 
                        <b-progress :value="85" variant="pb" :animated="animate" class="mt-1"></b-progress>
                    </b-colxx>
                </b-row>
            </b-colxx>
        </b-row>
    </div>
</template>

<script>
   export default {
    name: 'DeparturesSlots',    

    data () {
        return {
            animate: true,
            max: 100
        }
    },

    methods:{
     
    },
    mounted () {

    }
}
</script>

<style lang="scss" scoped></style>
