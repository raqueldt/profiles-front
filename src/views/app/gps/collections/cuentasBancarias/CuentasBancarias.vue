<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
               <AddCuentaBancaria @refresh="reload"></AddCuentaBancaria>
            </div>
            <div class="col-md-12 mt-4">
                <ListCuentasBancarias ref="listaCuentaBancaria" @refresh="reload"></ListCuentasBancarias>
            </div>
        </div>
    </div>
</template>

<script>
    import AddCuentaBancaria from '@/views/app/gps/collections/cuentasBancarias/AddCuentaBancaria.vue'
    import ListCuentasBancarias from '@/views/app/gps/collections/cuentasBancarias/ListCuentasBancarias.vue'
   export default {
    name: 'CuentasBancarias',    
    // props: ["slots"],    
    components: {
        AddCuentaBancaria,
        ListCuentasBancarias
    },    
    data () {
        return {
            refresh: false,
        }
    },

    methods:{
        reload() {
            this.$refs.listaCuentaBancaria.getAllCuentasBancarias()
            this.$emit('reload', true);
        },
    },
    mounted () {

    }
}
</script>

<style lang="scss" scoped></style>