import FeriadosServices from "../../js/services/feriados/FeriadosServices";

export default {
    data() {
        return {
            _feriados: [],
        };
    },
    created() {
        this._getAllFeriados();
    },
    methods: {

        /* ************ FUNCION PARA VERIFICAR QUE FECHA SEÑALADA ES O NO FERIADO *********** */
        _getYatchs() {
            CruiseServices.getCruises()
                .then(response => {
                    commit('setInitialYatchsList', response.data.data);
                    resolve();
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        },
        async _getAllFeriados() {
            await FeriadosServices.getAllFeriados()
                .then(response => {
                    var year = moment().year();
                    var response = response.data.data;
                    var arrayDates = [];
                    for (let i = 0; i < response.length; i++) {
                        if (moment(response[i].fecha).year() == year) {
                            arrayDates.push(response[i]);
                        }
                    }
                    this._feriados = arrayDates;
                })
                .catch(error => {
                    console.log(error);
                });
        },

    }
}