import AvailabilitySlotsServices from "../../../../services/gps/availabilityslots/availabilityslotsServices.js";
import BookingServices from "../../../../services/gps/booking/BookingServices.js";
import BookingSlotsServices from "../../../../services/gps/bookingslots/BookingSlotsServices.js";

const state = {
    rowData: [],
    rowDataAuxiliar: [],
    rowDataDecks: [],
    rowDataCabins: [],
    rowDataChoosen: [],
    rowDataChoosenOriginal: [],
    rowDataHeaderAndSummarySlots: [],
    isSaveHold: false,
    arrayUpdate: [],
    proccessingCharter: false,
};

const getters = {
    getArrayUpdate: state => state.arrayUpdate,
    getRowData: state => state.rowData,
    getRowDataAuxiliar: state => state.rowDataAuxiliar,
    getRowDataByDepId: state => depId => {
        return state.rowData.filter(item => item.depId == depId);
    },
    getRowDataDecks: state => depId => {
        return state.rowDataDecks.filter(item => item.depId == depId);
    },
    //    getRowDataCabins: state => state.rowDataCabins,
    getRowDataCabins: state => depId => {
        return state.rowDataCabins.filter(item => item.depId == depId);
    },
    getRowDataChoosen: state => depId => {
        return state.rowDataChoosen.filter(item => item.depId == depId);
    },

    getRowDataChoosenOriginal: state => state.rowDataChoosenOriginal, 
    getRowDataChoosenBossStatusNotNull: state => depId => {
        return state.rowDataChoosen.filter(
            item =>
            item.depId == depId && (item.bosStatus == null || item.bosStatus === 3) // en SUMMARY, traigo slots LIBERADOS
        );
    },
    getAllRowDataChoosen: state => state.rowDataChoosen,

    getRowDataHeaderAndSummarySlots: state => state.rowDataHeaderAndSummarySlots,
    getRowDataHeaderAndSummarySlotsByDepId: state => depId => {
        return state.rowDataHeaderAndSummarySlots.filter(
            item => item.depId === depId
        );
    },
    getSaveState: state => state.isSaveHold,
    getProccessingCharter: state => state.proccessingCharter
};

const mutations = {
    setArrayUpdate(state, arrayUpdate) {
        state.arrayUpdate = arrayUpdate;
    },
    showSaveHold(state, isSaveHold) {
        state.isSaveHold = true;
    },
    hideSaveHold(state, isSaveHold) {
        state.isSaveHold = false;
    },
    setRowData(state, rowData) {
        state.rowData = rowData;
    },
    setRowDataAuxiliar(state, rowDataAuxiliar) {
        state.rowDataAuxiliar = rowDataAuxiliar;
    },
    setRowDataDecks(state, rowDataDecks) {
        state.rowDataDecks = rowDataDecks;
    },
    setRowDataCabins(state, rowDataCabins) {
        state.rowDataCabins = rowDataCabins;
    },
    setRowDataChoosen(state, rowDataChoosen) {
        // Busco en el array Padre si existe el elemento con avsId
        const filter = state.rowDataChoosen.filter(
            block => block.avsId === rowDataChoosen.avsId
        );
        if (filter.length == 0) {
            // Si no existe, añado el objeto
            state.rowDataChoosen.push(rowDataChoosen);

        } else {
            // Si existe, aplico splice para eliminar el objeto
            const index = state.rowDataChoosen.findIndex(
                block => block.avsId === rowDataChoosen.avsId
            );
            state.rowDataChoosen.splice(index, 1);
        }
    },
    setRowDataChoosenInOriginalArray(state, rowDataChoosenOriginal) {

        // Busco en el array Padre si existe el elemento con avsId
        const filter = state.rowDataChoosenOriginal.filter(
            block => block.avsId === rowDataChoosenOriginal.avsId
        );
        if (filter.length == 0) {
            // Si no existe, añado el objeto
            state.rowDataChoosenOriginal.push(rowDataChoosenOriginal);

        } else {

            //--------------------------------------- rowDataChoosenOriginal -----------------------------
            const indexOriginal = state.rowDataChoosenOriginal.findIndex(
                block => block.avsId === rowDataChoosenOriginal.avsId
            );
            state.rowDataChoosenOriginal.splice(indexOriginal, 1);
        }
    },    
    setOriginalConditionsToRowDataChoosenByAvsId(state, {avsId, originalConditions}) {
        // Método que recibe avsId y condiciones originales de array madre para reemplazar en choosenSlot
        let filterConditionsSlot = state.rowDataChoosen
            .filter(block => block.avsId === avsId);
        if (filterConditionsSlot.length > 0) {  
            console.log("(*) Si existe")
            filterConditionsSlot.forEach(function(elemento, indice, array) {     
                elemento.conditions = originalConditions;
            });
        }else{
            console.log("(*) No existe")
        }
    
    },    

    setRowDataHeaderAndSummarySlots(state, rowDataHeaderAndSummarySlots) {
        state.rowDataHeaderAndSummarySlots = rowDataHeaderAndSummarySlots;
    },

    // Mutación que sirve para colocar valor select = 1 a la condicion seleccionada. El resto se colocará con 0
    setSelectedValueInCondition(state, { avsId, codigo }) {
        let filterConditionsSlot = state.rowDataChoosen
            .filter(block => block.avsId === avsId)
            .map(a => a.conditions);
        if (filterConditionsSlot.length > 0) {
            filterConditionsSlot[0].forEach(function(elemento, indice, array) {
                if (parseInt(elemento.metCodigo) == codigo) {
                    elemento.selected = 1;
                } else {
                    elemento.selected = 0;
                }
            });
        }
    },
    setSelectedValueInConditionForOriginalArray(state, { avsId, codigo }) {
        let filterConditionsSlot = state.rowDataChoosenOriginal
            .filter(block => block.avsId === avsId)
            .map(a => a.conditions).flat();
            
        let checkSelectedInConditions =  filterConditionsSlot.some( item =>item.selected != 0);

        if(!checkSelectedInConditions){
                if (filterConditionsSlot.length > 0) {
                    filterConditionsSlot.forEach(function(elemento, indice, array) {
                        if (parseInt(elemento.metCodigo) == codigo) {
                            elemento.selected = 1;
                        } else {
                            elemento.selected = 0;
                        }
                    });
                }
        }
    },    
    //Limpiar descuentos cuando se cambia de condición en Summary:
    clearDiscountsWhenChangeCondition(state, { avsId, codigo }) {
        let filterConditionsSlot = state.rowDataChoosen
            .filter(block => block.avsId === avsId);
        if (filterConditionsSlot.length > 0) {           
            filterConditionsSlot.forEach(function(elemento, indice, array) {     
                    elemento.extraDiscountAmount = "";
                    elemento.extraDiscountPercent = "";
                    elemento.extraDiscountDescription = "";                
            });
        }
    },    
    clearDiscountsWhenChangeConditionInUpdate(state, { avsId, codigo }) {
        let filterConditionsSlot = state.rowDataChoosen
            .filter(block => block.avsId === avsId);
        if (filterConditionsSlot.length > 0) {           
            filterConditionsSlot.forEach(function(elemento, indice, array) {     
                if(elemento.booking && elemento.avsId == avsId){
                    elemento.booking.extraDiscountAmount = "";
                    elemento.booking.extraDiscountPercent = "";
                    elemento.booking.extraDiscountDescription = "";                
                }
            });
        }
    },    
    onlySingleConditionInDouble(state, { avsId }) {// ======================= > REVISADO < ====================
        let filterConditionsSlot = state.rowDataChoosen
            .filter(block => block.avsId === avsId)
            .map(a => a.conditions);
        filterConditionsSlot.forEach(function(elemento, indice, array) {
            elemento.splice(2, 1);
            elemento.splice(1, 1);
        });
    },
    onlyShareConditionInTriple(state, { avsId, codigo }) {
        let filterConditionsSlot = state.rowDataChoosen
            .filter(block => block.avsId === avsId)
            .map(a => a.conditions);
        filterConditionsSlot.forEach(function(elemento, indice, array) {
            if (codigo == 2) {
                elemento.splice(2, 1);
                elemento.splice(0, 1);
            } else if (codigo == 3) {
                elemento.splice(1, 1);
                elemento.splice(0, 1);
            }
        });
    },
    onlyEmptyConditions(state, { avsId }) {// ======================= > REVISADO < ====================
        let filterConditionsSlot = state.rowDataChoosen.filter(
            block => block.avsId === avsId
        );
        filterConditionsSlot.forEach(function(elemento, indice, array) {
            elemento.conditions = [];
        });
    },
    onlyBothShareInTriple(state, { avsId }) {
        let filterConditionsSlot = state.rowDataChoosen
            .filter(block => block.avsId === avsId)
            .map(a => a.conditions);
        filterConditionsSlot.forEach(function(elemento, indice, array) {
            elemento.splice(0, 1);
        });
    },
    setSelectedValueInConditionInUpdate(state, { avsId, codigo }) {
        let filterConditionsSlot = state.rowDataChoosen
            .filter(block => block.avsId == avsId)
            .map(a => a.conditions);
        if (filterConditionsSlot.length > 0) {
            filterConditionsSlot[0].forEach(function(elemento, indice, array) {
                if (parseInt(elemento.metCodigo) == codigo) {
                    elemento.selected == 1;
                    elemento.selected = 1;
                }
            });
        }
    },

    // ********************************** METODOS PARA MODIFICAR VALOR DE OFFNETRATE o TOTAL PARA CALCULOS ***************************************
    setSingleInCondition(state, { cabId }) {// ======================= > REVISADO < ====================
        /*
            Con este metodo, recorro el array de slots seleccionados y al tener un slot ya agregado, independiente del
            valor seleccionado, recalcula con SINGLE y setea SINGLE como condicion predeterminada
        */
        let filterSlotByCabId = state.rowDataChoosen.filter(
            block => block.cabId === cabId
        );
        filterSlotByCabId.forEach(function(elemento, indice, array) {
            var conditions = elemento.conditions;
            var offGross = elemento.offGrossRate;
            var discountAdultSingle = conditions
                .filter(p => p.metCodigo == 1)
                .map(a => a.conAdult1);
            var newGross = (
                parseFloat(offGross * (discountAdultSingle / 100)) +
                parseFloat(offGross)
            ).toFixed(2);
            var newNet = newGross;
            elemento.total = newGross;
            elemento.newOffGrossRate = newGross;
            elemento.newOffNetRate = newNet;
            conditions.forEach(function(elemento, indice, array) {
                if (parseInt(elemento.metCodigo) == 1) {
                    elemento.selected = 1;
                } else {
                    elemento.selected = 0;
                }
            });
        });
    },
    // ======================= > MASTER SUITE < ====================
    
    setSingleInConditionMasterSuite(state, { cabId, conAdult}) {
        /*
            Con este metodo, recorro el array de slots seleccionados y al tener un slot ya agregado, independiente del
            valor seleccionado, recalcula con SINGLE y setea SINGLE como condicion predeterminada
        */
        let filterSlotByCabId = state.rowDataChoosen.filter(
            block => block.cabId === cabId
        );
        filterSlotByCabId.forEach(function(elemento, indice, array) {
            var conditions = elemento.conditions;
            var offGross = elemento.offGrossRate;

            // var discountAdultSingle = conditions
            //     .filter(p => p.metCodigo == 1)
            //     .map(a => a.conAdult1);

            var discountAdultSingle = "";
            if(conAdult === 2) {
                discountAdultSingle = conditions
                .filter(p => p.metCodigo == 1)
                .map(a => a.conAdult2);
            }else if(conAdult === 3) {
                discountAdultSingle = conditions
                .filter(p => p.metCodigo == 1)
                .map(a => a.conAdult3);
            }else if(conAdult === 3) {
                discountAdultSingle = conditions
                .filter(p => p.metCodigo == 1)
                .map(a => a.conAdult4);
            }else if(conAdult === 4) {
                discountAdultSingle = conditions
                .filter(p => p.metCodigo == 1)
                .map(a => a.conAdult4);
            }
            var newGross = (parseFloat(offGross * (discountAdultSingle / 100)) + parseFloat(offGross)).toFixed(2);

            var newNet = newGross;
            elemento.total = newGross;
            elemento.newOffGrossRate = newGross;
            elemento.newOffNetRate = newNet;
            conditions.forEach(function(elemento, indice, array) {
                if (parseInt(elemento.metCodigo) == 1) {
                    elemento.selected = 1;
                } else {
                    elemento.selected = 0;
                }
            });
        });
    },    
    setConditionsInMasterSuite(state, { cabId }) {
        /*  Coloco con valor 0 a las condiciones de los slots seleccionados (2, 3, 4)    */
        let filterSlotByCabId = state.rowDataChoosen.filter(
            block => block.cabId === cabId
        );
        filterSlotByCabId.forEach(function(elemento, indice, array) {
            var conditions = elemento.conditions;
            if(conditions.length > 0){
                conditions.forEach(function(el, indice, array) {                    
                    elemento.bosCondition = 0;
                    //elemento.bosCondition = el.metCodigo;
                });
            }
        });
    },    
    // ======================= > FIN MASTER SUITE < ====================
    setShareCondition(state, { cabId, codigo }) {
        let filterSlotByCabId = state.rowDataChoosen.filter(
            block => block.cabId === cabId
        );
        filterSlotByCabId.forEach(function(elemento, indice, array) {
            var newGross = elemento.offGrossRate;
            var newNet = newGross;
            elemento.total = newGross;
            elemento.newOffGrossRate = newGross;
            elemento.newOffNetRate = newNet;
            elemento.bosCondition = parseInt(codigo);
            elemento.conditions.forEach(function(elemento, indice, array) {
                if (elemento.metCodigo == codigo) {
                    elemento.selected = 1;
                } else {
                    elemento.selected = 0;
                }
            });

        });
    },

    resetCabinExceptAvsIdChoosen(state, { cabId, avsId }) {
        state.rowData
            .filter(item => item.cabId == cabId && item.avsId !== avsId)
            .forEach(function(elemento, indice, array) {
                elemento.enableOnShare = 1;
                elemento.style = 1;
            });
        const filteredByCabId = state.rowDataChoosen.filter(
            item => item.avsCabinId !== cabId || item.avsId == avsId
        );
        state.rowDataChoosen = filteredByCabId;
    },
    setGrossValueAndNoSelectedInCondition(state, { cabId }) {
        /*
                  Con este metodo, recorro el array de slots seleccionados y al tener un slot ya agregado, independiente del
                  valor selecciionado, coloco el resto con valor de offNetRate
                */
        let filterSlotByCabId = state.rowDataChoosen.filter(
            block => block.cabId === cabId
        );
        filterSlotByCabId.forEach(function(elemento, indice, array) {
            var newGross = elemento.offGrossRate;
            var newNet = newGross;
            elemento.total = newGross;
            elemento.newOffGrossRate = newGross;
            elemento.newOffNetRate = newNet;
            elemento.bosCondition = 0;
            var conditions = elemento.conditions;
            conditions.forEach(function(elemento, indice, array) {
                elemento.selected = 0;
            });
        });
    },
    

    unselectedConditions(state, { cabId }) {
        let filterSlotByCabId = state.rowDataChoosen.filter(
            block => block.cabId === cabId
        );
        filterSlotByCabId.forEach(function(elemento, indice, array) {
            conditions.forEach(function(elemento, indice, array) {
                elemento.selected = 0;
            });
        });
    },

    refreshNetRateInSlot(state, { avsId, newNetRate }) {
        let filteredSlot = state.rowDataChoosen.filter(
            block => block.avsId === avsId
        );
        if (filteredSlot.length > 0) {
            filteredSlot[0].offNetRate = newNetRate;
        }
    },
    refreshRateInSlot(state, { avsId, newNetRate }) {
        let filteredSlot = state.rowDataChoosen.filter(
            block => block.avsId === avsId
        );
        if (filteredSlot.length > 0) {
            filteredSlot[0].rate = newNetRate;
            filteredSlot[0].newOffNetRate = newNetRate;
        }
    },
    refreshGrossInSlot(state, { avsId, newGrossRate }) {
        let filteredSlot = state.rowDataChoosen.filter(
            block => block.avsId === avsId
        );
        if (filteredSlot.length > 0) {
            filteredSlot[0].newOffGrossRate = newGrossRate;
        }
    },
    refreshNetInSlot(state, { avsId, newNetRate }) {
        let filteredSlot = state.rowDataChoosen.filter(
            block => block.avsId === avsId
        );
        if (filteredSlot.length > 0) {
            filteredSlot[0].newOffNetRate = newNetRate;
            //filteredSlot[0].newOffNetRate = 2000;
        }
        console.log("filteredSlot (2)....: " + JSON.stringify(filteredSlot));
    },    

    setRates(state, { avsId,  offNetRate, priId, offId }) {
        // console.log("=> (avsId): " + avsId);
         console.log("=> (offNetRate): " + offNetRate);
        // console.log("=> (priId): " + priId);
        let filteredSlot = state.rowData.filter(
            block => block.avsId === avsId
        );
        // console.log("=> (filteredSlot.length): " + filteredSlot.length);
        if (filteredSlot.length > 0) {
            filteredSlot[0].offGrossRate    = offNetRate;
            filteredSlot[0].offNetRate      = offNetRate;
            filteredSlot[0].rate            = offNetRate;
            filteredSlot[0].priId           = priId;
            filteredSlot[0].offId           = offId;
        }
    },
    setRatesBook(state, { avsId,  offNetRate, priId, offId }) {
        // console.log("=> (avsId): " + avsId);
        //  console.log("=> (offNetRate): " + offNetRate);
        // console.log("=> (priId): " + priId);
        let filteredSlot = state.rowData.filter(
            block => block.avsId === avsId
        );
        // console.log("=> (filteredSlot.length): " + filteredSlot.length);
        if (filteredSlot.length > 0) {
            filteredSlot[0].offGrossRate    = offNetRate;
            filteredSlot[0].offNetRate      = offNetRate;
            filteredSlot[0].rate            = offNetRate;
            filteredSlot[0].priId           = priId;
            filteredSlot[0].offId           = offId;
        }
    }, 
    setRatesEdit(state, { avsId, offGrossRate, offNetRate, priId, offId, from, netFromBase, grossFromBase,  originalGrossRate, savedDprId }) {
        // console.log("=> (avsId): " + avsId);
        //  console.log("=> (offGrossRate): " + offGrossRate);
        //  console.log("=> (offNetRate): " + offNetRate);
        //  console.log("=> (from): " + from);
        // console.log("=> (priId): " + priId);
        let filteredSlot = state.rowData.filter(
            block => block.avsId === avsId
        );
        // console.log("=> (filteredSlot.length): " + filteredSlot.length);
        if (filteredSlot.length > 0) {
            filteredSlot[0].offGrossRate        = offGrossRate;
            filteredSlot[0].offNetRate          = offNetRate;
            filteredSlot[0].rate                = offNetRate;
            filteredSlot[0].priId               = priId;
            filteredSlot[0].offId               = offId;
            filteredSlot[0].from                = from;
            filteredSlot[0].netFromBase         = netFromBase;
            filteredSlot[0].grossFromBase       = grossFromBase;
            filteredSlot[0].originalGrossRate   = originalGrossRate;
            filteredSlot[0].savedDprId          = savedDprId;
        }
    }, 
    // setNullFrom(state, { avsId }) {
    //     state.rowDataChoosen.forEach(item=>{
    //         if(item.avsId === avsId) item.from = "";
    //     })  
    //     let filteredSlotChoosen = state.rowDataChoosen.filter(
    //             block => block.avsId === avsId
    //     );      

    //     console.log("=> (rowData): " + JSON.stringify(filteredSlot.map(x => x.from)));
    //     console.log("=> (rowDataChoosen): " + JSON.stringify(filteredSlotChoosen.map(x => x.from)));
    // }, 
    // setNetFromDataBase(state) {
    //     state.rowDataChoosen.forEach(item=>{               
    //         item.newOffNetRate === 2000;
    //         console.log(JSON.stringify(item.newOffNetRate));
    //     }) 
    // },
    setNetFromDataBase(state, {avsId}) {
        let filterSlot = state.rowDataChoosen.filter(
            block => block.avsId == avsId
        );
        if (filterSlot.length > 0) {
            filterSlot.forEach(function(elemento, indice, array) {
                // console.log("Elemento (1)....: " + JSON.stringify(elemento.newOffNetRate));
                // console.log("from (2)....: " + JSON.stringify(elemento.from));
                // console.log("offNetRate (2)....: " + JSON.stringify(elemento.offNetRate));
                // console.log("offGrossRate (2)....: " + JSON.stringify(elemento.offGrossRate));
                // console.log("netFromBase (2)....: " + JSON.stringify(elemento.netFromBase));
                if(elemento.from === 'carga-inicial'){
                    elemento.newOffNetRate = elemento.netFromBase;
                    elemento.newOffNetRate === elemento.netFromBase;
                    //elemento.newOffGrossRate = elemento.offGrossRate;
                    //console.log("Elemento (2)....: " + JSON.stringify(elemento.newOffNetRate));
                }
            });
        }
        //console.log("=> (rowDataChoosen): " + JSON.stringify(state.rowDataChoosen));
    },

    setNetFromDataBaseAllChoosenSlots(state) {

          state.rowDataChoosen.forEach(function(elemento, indice, array) {
            //console.log("elemento: " + JSON.stringify(elemento));
                // console.log("Elemento (1)....: " + JSON.stringify(elemento.newOffNetRate));
                // console.log("from (2)....: " + JSON.stringify(elemento.from));
                // console.log("offNetRate (2)....: " + JSON.stringify(elemento.offNetRate));
                // console.log("offGrossRate (2)....: " + JSON.stringify(elemento.offGrossRate));
                // console.log("netFromBase (2)....: " + JSON.stringify(elemento.netFromBase));
                if(elemento.from === "carga-inicial"){
                    //elemento.newOffNetRate === '2000';
                    elemento.newOffNetRate = 2000;
                    //elemento.newOffNetRate === elemento.netFromBase;
                    //elemento.newOffGrossRate = elemento.offGrossRate;
                    
                }
                //console.log("Elemento (2) All....: " + elemento.newOffNetRate);
            });
            // state.rowData.forEach(function(elemento, indice, array) {
            //     console.log("Elemento (1)....: " + JSON.stringify(elemento.newOffNetRate));
            //     console.log("from (2)....: " + JSON.stringify(elemento.from));
            //     console.log("offNetRate (2)....: " + JSON.stringify(elemento.offNetRate));
            //     console.log("offGrossRate (2)....: " + JSON.stringify(elemento.offGrossRate));
            //     console.log("netFromBase (2)....: " + JSON.stringify(elemento.netFromBase));
            //     if(elemento.from === 'carga-inicial'){
            //         elemento.newOffNetRate = elemento.netFromBase;
            //         elemento.newOffNetRate === elemento.netFromBase;
            //         //elemento.newOffGrossRate = elemento.offGrossRate;
            //         console.log("Elemento (2)....: " + JSON.stringify(elemento.newOffNetRate));
            //     }
            // });
       
        //console.log("=> (rowDataChoosen): " + JSON.stringify(state.rowDataChoosen));
    },
    // ********************************** FIN METODOS PARA MODIFICAR VALOR DE OFFNETRATE o TOTAL PARA CALCULOS ***************************************
    disableAllSlotsInTheSameCabin(state, { cabId, codigoShow }) {
        var self = this;
        let filterSlot = state.rowDataChoosen.filter(
            block => block.cabId === cabId
        );
        if (filterSlot.length > 0) {
            filterSlot.forEach(function(elemento, indice, array) {
                elemento.style = codigoShow;
            });
        }
    },
    disableLastClickedInCuadruple(state, { cabId, avsId, codigoShow }) {
        let filterSlot = state.rowDataChoosen.filter(
            block => block.cabId === cabId && block.avsId == avsId
        );
        if (filterSlot.length > 0) {
            filterSlot.forEach(function(elemento, indice, array) {
                elemento.style = codigoShow;
                elemento.bosCondition = 0;
            });
        }
    },
    disableAllSlotsInCharter(state, { codigoShow }) {
        var self = this;
        let filterSlot = state.rowData;
        if (filterSlot.length > 0) {
            filterSlot.forEach(function(elemento, indice, array) {
                elemento.style = codigoShow;
            });
        }
    },

    disableRemainingSlotInCabId(state, { cabId, codigoShow }) {
        //1. Reviso los avsId seleccionado en rowDataChoosen y saco avsId
        let filterSlot = state.rowDataChoosen
            .filter(block => block.cabId === cabId)
            .map(a => a.avsId);

        //3. Comparo con avsId en rowData y saco el restante
        var avsIdRestante = state.rowData
            .filter(block => block.cabId === cabId)
            .filter(item => !filterSlot.includes(item.avsId))
            .map(a => a.avsId);

        //4. Inhabilito el slot restante en rowData
        let filterSlotInRowData = state.rowData.filter(item =>
            avsIdRestante.includes(item.avsId)
        );
        if (filterSlotInRowData.length > 0) {
            filterSlotInRowData.forEach(function(elemento, indice, array) {
                elemento.enableOnShare = codigoShow;
            });
        }
    },

    disableRemainingSlotInCabIdByAvsOrder(state, { cabId, avsId, codigoShow }) {
        //1. Extraigo avsOrder del elemento seleccionado
        let filterAvsOrder = state.rowDataChoosen
            .filter(block => block.cabId === cabId && block.avsId === avsId)
            .map(a => a.avsOrder);

        //2. Filtro rowData por cabina pero no tomando en cuenta el avsId
        let filterSlotInRowData = state.rowData.filter(
            block => block.cabId === cabId && block.avsId != avsId
        );
        if (filterSlotInRowData.length > 0) {
            filterSlotInRowData.forEach(function(elemento, indice, array) {
                //3. De acuerdo al primer avsOrder, voy bloqueando
                if (filterAvsOrder == 1) {
                    if (elemento.avsOrder == 3) elemento.enableOnShare = codigoShow;
                } else if (filterAvsOrder == 2) {
                    if (elemento.avsOrder == 1) elemento.enableOnShare = codigoShow;
                } else if (filterAvsOrder == 3) {
                    if (elemento.avsOrder == 1) elemento.enableOnShare = codigoShow;
                }
            });
        }
    },
    disableSlotsinCuadrupleCabin(state, { cabId, avsId, codigoShow }) {
        //1. Extraigo avsOrder del elemento seleccionado
        let filterSlot = state.rowData.filter(
            block => block.cabId === cabId && block.avsId != avsId
        );
        if (filterSlot.length > 0) {
            filterSlot.forEach(function(elemento, indice, array) {
                elemento.style = codigoShow;
            });
        }
    },
    disableSlotsinCuadrupleCabinByAvsOrder(state, { cabId, avsId, codigoShow }) {
        //1. Extraigo avsOrder del elemento seleccionado
        let filterAvsOrder = state.rowDataChoosen
            .filter(block => block.cabId === cabId && block.avsId === avsId)
            .map(a => a.avsOrder);

        //2. Filtro rowData por cabina pero no tomando en cuenta el avsId
        let filterSlotInRowData = state.rowData.filter(
            block => block.cabId === cabId && block.avsId != avsId
        );
        if (filterSlotInRowData.length > 0) {
            filterSlotInRowData.forEach(function(elemento, indice, array) {
                //3. De acuerdo al primer avsOrder, voy bloqueando
                if (filterAvsOrder == 1) {
                    if (elemento.avsOrder == 3) elemento.enableOnShare = codigoShow;
                    if (elemento.avsOrder == 4) elemento.enableOnShare = codigoShow;
                } else if (filterAvsOrder == 2) {
                    if (elemento.avsOrder == 3) elemento.enableOnShare = codigoShow;
                    if (elemento.avsOrder == 4) elemento.enableOnShare = codigoShow;
                } else if (filterAvsOrder == 3) {
                    if (elemento.avsOrder == 1) elemento.enableOnShare = codigoShow;
                    if (elemento.avsOrder == 2) elemento.enableOnShare = codigoShow;
                } else if (filterAvsOrder == 4) {
                    if (elemento.avsOrder == 1) elemento.enableOnShare = codigoShow;
                    if (elemento.avsOrder == 2) elemento.enableOnShare = codigoShow;
                }
            });
        }
    },
    disableSlotInTheSameCabinByAvsOrderOnShare(
        state, { cabId, codigoShow, newAvsOrder }
    ) {
        var self = this;
        let filterSlot = state.rowData.filter(
            block => block.cabId === cabId && block.avsOrder === newAvsOrder
        );
        if (filterSlot.length > 0) {
            filterSlot.forEach(function(elemento, indice, array) {
                elemento.enableOnShare = codigoShow;
            });
        }
    },
    enableAllSlotsInTheSameCabinOnShare(state, { cabId, codigoShow }) {
        var self = this;
        let filterSlot = state.rowData.filter(block => block.cabId === cabId);
        if (filterSlot.length > 0) {
            filterSlot.forEach(function(elemento, indice, array) {
                elemento.enableOnShare = codigoShow;
            });
        }
    },
    clearRowDataChoosen(state, { depId }) {
        state.rowData.forEach(function(elemento, indice, array) {
            elemento.enableOnShare = 1;
            elemento.style = 1;
        });
        const filteredByDepId = state.rowDataChoosen.filter(
            item => item.depId !== depId
        );
        state.rowDataChoosen = filteredByDepId;
    },
    clearRowDataChoosenInEdit(state, { depId }) {
        // state.rowData.forEach(function(elemento, indice, array) {
        //     elemento.enableOnShare = 1;
        //     elemento.style = 1;
        // })
        const filteredByDepId = state.rowDataChoosen.filter(
            item => item.depId !== depId
        );
        state.rowDataChoosen = filteredByDepId;
    },

    // ======================================================= METODOS PARA ELIMINAR ESTADOS EN CABINA Y CLEAR ALL ====================================
    clearAllStatusInRowDataInEdit(state, { depId }) {
        // ---------------------- Método para habilitar los slots en gris al momento de hacer click en "Clear All"  ---------------------- 

        state.rowData.forEach(function(elemento, indice, array) {
            elemento.enableOnShare = 1;
            elemento.style = 1;

            elemento.booking = null;
            delete elemento.offId;
            delete elemento.from;
        });
        const filteredByDepId = state.rowDataChoosen.filter(
            item => item.depId !== depId
        );
        state.rowDataChoosen = filteredByDepId;
    },    
    enableSlotsNAInCabId(state, { cabId }) {
        // ---------------------- Método para habilitar los slots en gris al momento de hacer click en "Reset" (Cada cabina) ---------------------- 
        state.rowData
        .filter(item => item.cabId == cabId)
        .forEach(function(el, ind, arr) {
            //el.booking = null;
            el.style = null;

            delete el.offId;
            //delete el.from;
            if(el.booking){
                el.booking.bosStatus = null;
                el.booking.bosCondition = null;
            }

            // delete el.netFromBase;
            // delete el.grossFromBase;
            // delete el.originalGrossRate;
            // delete el.savedDprId;
        })
    },
    // ======================================================= FIN METODOS PARA ELIMINAR ESTADOS EN CABINA Y CLEAR ALL ====================================
    clearRowDataChoosenByCabId(state, { cabId }) {
        state.rowData
            .filter(item => item.cabId == cabId)
            .forEach(function(elemento, indice, array) {
                elemento.enableOnShare = 1;
                elemento.style = 1;
            });
        const filteredByCabId = state.rowDataChoosen.filter(
            item => item.cabId !== cabId
        );
        state.rowDataChoosen = filteredByCabId;
    },
    
    deleteLastItemInRowDataChoosenByAvsId(state, { avsId }) {
        const filteredByCabId = state.rowDataChoosen.filter(
            item => item.avsId !== avsId
        );
        state.rowDataChoosen = filteredByCabId;
    },
    clearRowDataHeaderAndSummaryByDepId(state, { depId }) {
        state.rowDataHeaderAndSummarySlots = "";
    },

    clearRowData(state, rowData) {
        //No utilizado
        state.rowData = [];
    },
    selectAllRowDataChoosenByDepId(state, { depId }) {
        const filteredByDepId = state.rowData.filter(item => item.depId === depId);
        this.setRowDataChoosen(state, filteredByDepId);
    },
    setProccessingCharter(state, status) {
        //No utilizado
        state.rowData = [];
    },
    //   setProccessingCharter(state, status) {
    //     state.proccessingCharter = status;------------------------------------------------------------------
    //   },
    startProccessingCharter(state) {
        state.proccessingCharter = true;
    },
    stopProccessingCharter(state) {
        state.proccessingCharter = false;
    }
};

const actions = {
    getAuxiliaryRowData({ commit }, { depId, cliId }) {
        // a) Consulto API para traer posibles datos de bosStatus

        if (depId && cliId) {
            return new Promise((resolve, reject) => {
                AvailabilitySlotsServices.getAll(depId, cliId).then(response => {
                    if (response.data.data.length > 0) {                        
                        commit("setRowDataAuxiliar", response.data.data);
                        resolve();
                    }
                });
            });
        } else {
            console.log("depId: " + depId);
            console.log("cliId: " + cliId);
            console.log("No hay getAuxiliaryRowData: ");
        }
    },

    updateExtraDiscounts({ commit }, data) {
        let flag = data.flag;
        let value = data.value;
        let avsId = data.avsId;
        let description = data.description;
        state.rowDataChoosen.forEach(function(elem, indice, array) {
            if (elem.avsId === avsId) {
                if (flag == "amount") {
                    // console.log("1. Es por Amount");
                    elem.extraDiscountAmount = value;
                    elem.extraDiscountPercent = "";

                    // Recalculo newOffGrossRate
                    elem.newOffGrossRate = elem.total - elem.extraDiscountAmount;
                }
                if (flag == "percent") {
                    // console.log("2. Es por Porcentaje");
                    elem.extraDiscountAmount = "";
                    elem.extraDiscountPercent = value;

                    // Recalculo newOffGrossRate
                    elem.newOffGrossRate = (elem.total - (parseFloat((elem.total * (elem.extraDiscountPercent / 100)))));
                }
                elem.extraDiscountDescription = description;
            }
        });
    },
    updateRowDataChoosenFromRowData({ commit }, { elemento }) {
        // b) Actualizo rowData y rowDataChoosen con valores de bosStatus
        const index = state.rowDataAuxiliar.findIndex(
            item => item.avsId === elemento.avsId
        );
        // if (index !== -1) {
        if (index >= 0) {
            // 1. Actualizo bossStatus en RowDataChoosen
            state.rowDataChoosen.forEach(function(elem, indice, array) {
                if (elem.avsId === elemento.avsId) {
                    elem.bosStatus = elemento.bosStatus;
                }
            });

            // 2. Elimino de rowDataChossen los avsId que tiene bosStatus <> a 1
            state.rowDataChoosen.forEach(function(elem, indice, array) {
                // const indexChoosen = state.rowDataChoosen.findIndex(
                //     item => item.bosStatus !== null
                // );

                // Adecuación para tomar en cuenta los slots LIBERADOS (bosStatus 3)
                const indexChoosen = state.rowDataChoosen.findIndex(
                    item => item.bosStatus !== 3 && item.bosStatus !== null
                );
                if (indexChoosen >= 0) {
                    state.rowDataChoosen.splice(indexChoosen, 1);
                }
            });
        }
    },
    updateRowDataChoosenToUpdate({ commit }, { elemento, isModeAdd }) {
        // b) Actualizo rowData y rowDataChoosen con valores de bosStatus
        const index = state.rowDataAuxiliar.findIndex(
            item => item.avsId === elemento.avsId
        );
        if (index >= 0) {
            state.rowData.forEach(function(elem, indice, array) {
                if(elem.booking){
                        if (
                            elem.avsId === elemento.avsId &&
                            elem.booking.bosStatus !== 0 &&
                            elem.booking.bosStatus !== 3 // Condición para slots LIBERADOS
                        ) {
                            // elem.bosStatus = isModeAdd ? elem.bosStatus : null;
                            elem.booking.bosStatus = isModeAdd ? elem.bosStatus : null;                            
                            elem.bosStatus = isModeAdd ? elem.bosStatus : null;                            
                            
                            //elem.bosCondition = elemento.bosCondition;
                            elem.booking.bosCondition = elemento.bosCondition;
                            elem.bosCondition = elemento.bosCondition;
                        }

                }
            });
        }
    },

    // updateRowDataChoosenToUpdate({ commit }, { elemento, isModeAdd }) {
    //     // b) Actualizo rowData y rowDataChoosen con valores de bosStatus
    //     const index = state.rowDataAuxiliar.findIndex(
    //         item => item.avsId === elemento.avsId
    //     );
    //     if (index >= 0) {
    //         state.rowData.forEach(function(elem, indice, array) {
    //             if (
    //                 elem.avsId === elemento.avsId &&
    //                 elem.bosStatus !== null &&
    //                 elem.bosStatus !== 0 &&
    //                 elem.bosStatus !== 3 // Condición para slots LIBERADOS
    //             ) {
    //                 elem.bosStatus = isModeAdd ? elem.bosStatus : null;
    //                 //elem.bosCondition = null;
    //                 elem.bosCondition = elemento.bosCondition;
    //             }

    //         });
    //     }
    // },

    /* *************************************************** API PARA PINTAR SLOTS  *************************************************** */
    getRowData({ commit }, { depId, cliId }) {       
        if (depId && cliId) {
            return new Promise((resolve, reject) => {
                AvailabilitySlotsServices.getAll(depId, cliId).then(response => {
                    if (response.data.data.length > 0) {
                        //Ajuste de promotionalRate
                        response.data.data.forEach(function(elementoProm, indice, array) {
                            //elementoProm.promotionalRate = 2417.50
                            // Busco en el array padre por avsId
                            if (Boolean(elementoProm.promotionalRate)) {
                                var promotionalRate = parseFloat(
                                    elementoProm.promotionalRate.replace(/,/g, "")
                                );
                                elementoProm.offGrossRate = promotionalRate;
                            }
                        });
                        let rowdata = response.data.data;
                        commit("setRowData", rowdata);
                        resolve(rowdata);
                    }
                });
            });
        } else {
            console.log("No hay ni cli ni dep");
        }
    },    
    getRowDataByDepId({ commit }, { depId, cliId }) {
        if (depId && cliId) {
            return new Promise((resolve, reject) => {
                AvailabilitySlotsServices.getAll(depId, cliId).then(response => {
                    if (response.data.data.length > 0) {
                        //Ajuste de promotionalRate
                        response.data.data.forEach(function(elementoProm, indice, array) {
                            //elementoProm.promotionalRate = 2417.50
                            // Busco en el array padre por avsId
                            if (Boolean(elementoProm.promotionalRate)) {
                                var promotionalRate = parseFloat(
                                    elementoProm.promotionalRate.replace(/,/g, "")
                                );
                                elementoProm.offGrossRate = promotionalRate;                                
                            }
                        });
                        let rowdata = response.data.data.filter(
                            item => item.depId == depId
                        );
                        commit("setRowData", rowdata);
                        resolve({ data: rowdata });
                    }
                });
            });
        } else {
            console.log("No hay ni cli ni dep");
        }
    },

    getRowDataCharter({ commit }, { depId, cliId }) {
        if (depId && cliId) {
            var self = this;
            return new Promise((resolve, reject) => {
                AvailabilitySlotsServices.getAllCharter(depId, cliId).then(response => {
                    if (response.data.data.length > 0) {
                        //Ajuste de promotionalRate
                        response.data.data.forEach(function(elementoProm, indice, array) {
                            // Busco en el array padre por avsId

                            if (Boolean(elementoProm.promotionalRate)) {
                                var promotionalRate = parseFloat(
                                    elementoProm.promotionalRate.replace(/,/g, "")
                                );
                                elementoProm.offGrossRate = promotionalRate;
                            }
                        });
                        let rowdata = response.data.data;
                        commit("setRowData", rowdata);
                        resolve(rowdata);
                    } else {
                        let rowdata = [];
                        commit("setRowData", rowdata);
                        resolve(rowdata);
                    }
                });
            });
        } else {
            console.log("No hay ni cli ni dep");
        }
    },

    getRowDataDecks({ commit }, dep_id) {
        if (dep_id) {
            return new Promise((resolve, reject) => {
                AvailabilitySlotsServices.getAllDecks(dep_id)
                    .then(response => {
                        commit("setRowDataDecks", response.data.data);
                        resolve();
                    })
                    .catch(error => {
                        console.log("Error: " + error);
                    });
            });
        }
    },

    getRowDataCabins({ commit }, dep_id) {
        if (dep_id) {
            return new Promise((resolve, reject) => {
                AvailabilitySlotsServices.getAllCabins(dep_id)
                    .then(response => {
                        commit("setRowDataCabins", response.data.data);
                        resolve();
                    })
                    .catch(error => {
                        console.log("Error: " + error);
                    });
            });
        }
    },

    /* *************************************************** FIN API PARA PINTAR SLOTS  *************************************************** */

    /* *************************************************** API PARA TRAER CONDICIONES  *************************************************** */
    checkPromotionsByDepId({ commit }, { depId, cabId }) {
        return new Promise((resolve, reject) => {
            // 1.1 Consulto la promocion en base a DepId
            AvailabilitySlotsServices.checkPromotionsByDepId(depId, cabId)
                .then(response => {
                    resolve({ data: response.data.data });
                    // 2.2 Una vez que ejecuto la consulta, almaceno los datos en la variable "dataCheckPromotion" y llamo al metodo "algoritmo"
                    //this.algoritmo(avsId, cabId, dataCheckPromotion);
                })
                .catch(error => {
                    console.log("Error: " + JSON.stringify(error.response));
                });
        });
    },

    checkAccessPromotionByRseId({ commit }, rseId) {
        return new Promise((resolve, reject) => {
            AvailabilitySlotsServices.checkAccessPromotionByRseId(rseId)
                .then(response => {
                    resolve({ data: response.data.data });
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        });
    },

    getAnySeason({ commit }, avsId) {
        return new Promise((resolve, reject) => {
            AvailabilitySlotsServices.getAnySeason(avsId)
                .then(response => {
                    resolve({ data: response.data.data });
                })
                .catch(error => {
                    if (error.response.status === 500) {
                        this.getAnySeason({ commit }, { avsId });
                    }
                });
        });
    },

    getStandarSeason({ commit }, avsId) {
        return new Promise((resolve, reject) => {
            AvailabilitySlotsServices.getStandarSeason(avsId)
                .then(response => {
                    // var respuesta = [{data:response.data.data}, {conditions:response.data.data}]
                    // resolve({ respuesta: respuesta });                   
                    resolve({ data: response.data.data });
                })
                .catch(error => {
                    if (error.response.status === 500) {
                        this.getStandarSeason({ commit }, { avsId });
                    }
                });
        });
    },

    getCharterSeason({ commit }, avsId) {
        return new Promise((resolve, reject) => {
            AvailabilitySlotsServices.getCharterSeason(avsId)
                .then(response => {
                    resolve({ data: response.data.data });
                })
                .catch(error => {
                    console.log("Error: " + error);
                    if (error.response.status === 500) {
                        this.getCharterSeason({ commit }, { avsId });
                    }
                });
        });
    },
    /* *************************************************** FIN API PARA TRAER CONDICIONES  *************************************************** */

    addBookingPreHold({ commit }, data) {
        return new Promise((resolve, reject) => {
            BookingServices.addBookingPreHold(data)
                .then(response => {
                    resolve({ data: response.data.data });
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        });
    },

    getSharesOnBookingSlots({ commit }, { cabId, depId }) {
        if (cabId) {
            return new Promise((resolve, reject) => {
                BookingSlotsServices.getSharesOnBookingSlots(cabId, depId)
                    .then(response => {
                        resolve({ data: response.data.data });
                        //return response.data.data;
                    })
                    .catch(error => {
                        console.log("Error: " + error);
                    });
            });
        }
    },

    getSlotsByDepId({ commit }, depId) {
        if (depId) {
            return new Promise((resolve, reject) => {
                BookingSlotsServices.getSlotsByDepId(depId)
                    .then(response => {
                        resolve({ data: response.data.data });
                    })
                    .catch(error => {
                        console.log("Error: " + error);
                    });
            });
        }
    },

    getAllDataBoking({ commit }, bokId) {
        if (bokId) {
            return new Promise((resolve, reject) => {
                BookingServices.getAllDataBoking(bokId)
                    .then(response => {
                        resolve({ data: response.data.data });
                    })
                    .catch(error => {
                        console.log("Error: " + error);
                    });
            });
        }
    },

    updateSlotsFromBooking({ commit }, data) {
        return new Promise((resolve, reject) => {
            BookingServices.updateSlotsFromBooking(data)
                .then(response => {
                    resolve({ data: response.data.data });
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        });
    },

    changeProccessingCharterStatus({ commit }, status) {
        if (status) {
            console.log("Status en Store: " + JSON.stringify(status));
            commit("setProccessingCharter", status);
        }
    }
};

export default {

    state,
    getters,
    mutations,
    actions
}