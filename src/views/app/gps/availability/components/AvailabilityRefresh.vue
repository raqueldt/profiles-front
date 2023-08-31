<template>
    <div class="container">
        <div class="sticky-container">
            <ul class="sticky">
                <li>
                    <b-button                         
                        @click="refresh()"
                        v-tooltip="{content: 'Refresh', placement: 'top', classes: ['itineraries'],}"
                        variant="primary" 
                        size="sm"
                        >
                        <i class="glyph-icon simple-icon-refresh"></i>
                    </b-button>                    
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    export default {
        name: "DeparturesSlots",

        data() {
            return {
                //hover:false,
            };
        },
        methods: {
            refresh(){
                this.$emit('reload');
            },          
 
        },
        computed: {

        },
        mounted() {}
    };

</script>

<style lang="scss" scoped>
    .sticky-container {
        padding: 0px;
        margin: 0px;
        position: fixed;
        right: -130px;
        top: 230px;
        width: 210px;
        z-index: 1100;         
    }

    .sticky li {
        list-style-type: none;
        background-color: transparent;
        color: #efefef;
        height: 43px;
        padding: 0px;
        margin: 0px 0px 1px 0px;
        -webkit-transition: all 0.25s ease-in-out;
        -moz-transition: all 0.25s ease-in-out;
        -o-transition: all 0.25s ease-in-out;
        transition: all 0.25s ease-in-out;
        cursor: pointer;
        // border:solid 1px #ffce46;
    }

    .sticky li:hover {
        // margin-left: -115px;
        //margin-left: -10px;

        -webkit-transform:scale(1.15);
        -moz-transform:scale(1.15);
        -ms-transform:scale(1.15);
        -o-transform:scale(1.15);
        transform:scale(1.15);  
    }

    .sticky li button {
        float: left;
        margin: 5px 4px;
        margin-right: 5px;

        opacity: 0.5;
        
        // position: fixed;
        // bottom: 20px;
        // right: 20px;        
    }

    .sticky li button {
        padding-top: 5px;
        margin: 0px;
        line-height: 16px;
        font-size: 11px;
    }

    .sticky li p a {
        text-decoration: none;
        color: #2c3539;
    }

    .sticky li p a:hover {
        text-decoration: underline;
    }

</style>
