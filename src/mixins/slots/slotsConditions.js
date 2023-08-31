import BookingServices from "../../services/gps/booking/BookingServices";

export default {
    data() {
        return {};
    },
    mounted() {},
    created() {},
    computed: {
        rowDataByDepId: {
            get() {
                return this.$store.getters.getRowDataByDepId(this.depId);
            }
        }
    },
    methods: {
        // -----------------------------------------------------------------------------------------------------------------------
        // --------------------------------------CONDICIONES AL MOMENTO DE HACER CLICK EN SLOTS DISTRIBUTION---------------------------------------------
        // -----------------------------------------------------------------------------------------------------------------------
        _configConditions(row, depId, cliId) {
            var layMaxBooking = row.layMaxBooking;
            var layPax = row.layPax;
            var bedsNumber = row.bedsNumber;
            var cabId = row.cabId;
            var avsId = row.avsId;
            var avsOrder = row.avsOrder;
            let numberOfSlotsInTheSameCabin = this.getNumberOfSlotsInTheSameCabin(depId, avsId, cabId);            
            let numberOfSlotsBlockedInTheSameCabin = this.getNumberOfBlockedSlotsInTheSameCabin(row);
            let numberOfSlotsNAInTheSameCabin = this.getNumberOfSlotsNAInTheSameCabin(row);
            let numberOfBlockedSlotsInMasterSuite = this.getNumberOfBlockedSlotsMasterSuite(depId, avsId, cabId);

            console.log("===> numberOfSlotsInTheSameCabin : " + numberOfSlotsInTheSameCabin);
            console.log("===> numberOfSlotsBlockedInTheSameCabin : " + numberOfSlotsBlockedInTheSameCabin);
            console.log("===> numberOfSlotsNAInTheSameCabin : " + numberOfSlotsNAInTheSameCabin);
            //console.log("===> numberOfBlockedSlotsInMasterSuite : " + numberOfBlockedSlotsInMasterSuite);
            console.log("===> avsId : " + avsId);

            if (layPax == 1) {  // ======================= > REVISADO < ====================
                console.log(" ==================> CABINA SIMPLE  <===================== ");
                this._simpleCabinConditions(row, depId, numberOfSlotsInTheSameCabin, numberOfSlotsBlockedInTheSameCabin);
            } else if (layPax == 2) {
                console.log(" ==================> CABINA DOBLE <===================== ");
                this._doubleCabinConditions(row, depId, numberOfSlotsInTheSameCabin, numberOfSlotsBlockedInTheSameCabin, numberOfSlotsNAInTheSameCabin)
            } else if (layPax == 3) {
                console.log(" ==================> CABINA TRIPLE <===================== ");
                this._tripleCabinConditions(row, depId, numberOfSlotsInTheSameCabin, numberOfSlotsBlockedInTheSameCabin, numberOfSlotsNAInTheSameCabin);
            } else if (layPax == 4) {
                console.log(" ==================> CABINA CUADRUPLE <===================== ");
                this._cuadrupleCabinConditions(row, depId, numberOfSlotsInTheSameCabin, numberOfSlotsBlockedInTheSameCabin, numberOfSlotsNAInTheSameCabin, numberOfBlockedSlotsInMasterSuite);
            }
        },
        _conditionPreviousBlockedElement(row) {// ======================= > REVISADO < ====================
            var cabId = row.cabId;
            var avsId = row.avsId;
            let arrayInStore = this.$store.getters.getRowData;
            // let arraydNoBlocked = arrayInStore.filter(
            //     block =>
            //     block.cabId === cabId &&
            //     block.avsId != avsId &&
            //     block.bosStatus != null &&
            //     block.bosStatus != 0
            // );          

            // ADECUACION BOOKING.BOSSTATUS Y BOSCONDITION 
            let arraydNoBlocked = arrayInStore.filter(function(block) {
                if( Boolean(block.booking)){
                    return  block.cabId === cabId && block.avsId != avsId 
                            &&  block.booking.bosStatus != null 
                            &&  block.booking.bosStatus != 0
                }
            });    
            //let bosConditionBlocked = arraydNoBlocked.map(a => a.bosCondition);
            let bosConditionBlocked = arraydNoBlocked.map(a => a.booking).map(a => a.bosCondition);
            const codigo = bosConditionBlocked;
            this.$store.commit("onlyShareConditionInTriple", { avsId, codigo });
            this.$store.commit("setShareCondition", { cabId, codigo });
        },

        _conditionPreviousNAWithStatus(row, status) {// ======================= > REVISADO < ====================
            // Método para traer la condición de un slot aislado dentro de 2 N/A.

            var cabId = row.cabId;
            var avsId = row.avsId;

            const codigo = status;
            this.$store.commit("onlyShareConditionInTriple", { avsId, codigo });
            this.$store.commit("setShareCondition", { cabId, codigo });
        },        
        getNumberOfBlockedSlotsInTheSameCabin(row) {// ======================= > REVISADO < ========================             
            // Determino el número de slots de la misma cabina en el array de slots escogidos
            let cabId = row.cabId;
            let avsId = row.avsId;
            let arrayInStore = this.$store.getters.getRowData;
            // return arrayInStore.filter(
            //     p => p.cabId == cabId && p.avsId != avsId && (p.bosStatus == 1 || p.bosStatus == 2)
            // ).length;

            // ADECUACION BOOKING.BOSSTATUS Y BOSCONDITION
            return arrayInStore.filter(function(p) {
                if( Boolean(p.booking)){
                    return   p.cabId == cabId && p.avsId != avsId && (p.booking.bosStatus == 1 || p.booking.bosStatus == 2)
                }
            }).length;
        },
        getNumberOfSlotsNAInTheSameCabin(row) {// ======================= > REVISADO < ========================             
            // Determino el número de slots de la misma cabina en el array de slots escogidos
            let cabId = row.cabId;
            let avsId = row.avsId;
            let arrayInStore = this.$store.getters.getRowData;
            // return arrayInStore.filter(
            //     p => p.cabId == cabId && p.avsId != avsId && (p.bosStatus == 1 || p.bosStatus == 2)
            // ).length;

            // ADECUACION BOOKING.BOSSTATUS Y BOSCONDITION
            return arrayInStore.filter(function(p) {
                if( Boolean(p.booking)){
                    return   p.cabId == cabId && p.avsId != avsId && (p.booking.bosStatus == 6)
                }
            }).length;
        },        
        disableOrEnableAllSlotsInTheSameCabinWhenShare(row, codigoShow) {
            let cabId = row.cabId;
            this.$store.commit("disableAllSlotsInTheSameCabin", {
                cabId,
                codigoShow
            });
            this.$store.commit("setGrossValueAndNoSelectedInCondition", { cabId });
        },
        disableOrEnableAllSlotsInTheSameCabin(row, codigoShow) {
            let cabId = row.cabId;
            this.$store.commit("disableAllSlotsInTheSameCabin", { cabId, codigoShow });
            this.$store.commit("setSingleInCondition", { cabId });
        },
        _conditionMasterSuite(row, conAdult) {
            let cabId = row.cabId;            
            this.$store.commit("setSingleInConditionMasterSuite", { cabId, conAdult });            
        },        
        _getPreviousConditionInSelectedSlot(cabId, avsId) {
            //1. En arrayChoosen, filtro por cabId y diferente de avsId. Debe arrojarnos un elemento:
            let filterSlot = this.rowDataChoosen.filter(block => block.cabId === cabId && block.avsId != avsId)
                .map(a => a.conditions);

            //2. Escogo el que tiene la propiedad "selected: 1"
            if (Boolean(filterSlot[0])) {
                var selectedCondition = filterSlot[0].filter(block => block.selected == 1).map(a => a.metCodigo);
                if (selectedCondition == "") {
                    // ==> Si no existe condicion, entro a buscar en la misma cabina,
                    // aquella que tenga solo 1 CONDICION y extraigo el metCodigo
                    let filterSlotCabId = this.rowDataChoosen.filter(block => block.cabId === cabId && block.avsId != avsId);
                    var avsIdOnlyOneCondition = "";
                    filterSlotCabId.forEach(function(elemento, indice, array) {
                        if (elemento.conditions.length == 1) {
                            avsIdOnlyOneCondition = elemento.avsId;
                        }
                    });
                    let filterSlotMetCodigo = this.rowDataChoosen
                        .filter(block => block.cabId === cabId && block.avsId === avsIdOnlyOneCondition)
                        .map(a => a.conditions);
                    if (Boolean(filterSlotMetCodigo[0])) {
                        let newMetCodigo = filterSlotMetCodigo[0].map(a => a.metCodigo);
                        return newMetCodigo;
                    } else {
                        return "";
                    }
                }
                return selectedCondition;
            }
        },
        _getPreviousClickedAvsIdInSelectedSlot(cabId, avsId) {
            //1. En arrayChoosen, filtro por cabId y diferente de avsId. Debe arrojarnos un elemento:
            return this.rowDataChoosen.filter(block => block.cabId === cabId && block.avsId != avsId).map(a => a.avsId);
            //return filterSlot;
        },

        // -------------------------------------------------------------------------------------------------------------------------------
        // --------------------------------------FIN CONDICIONES AL MOMENTO DE HACER CLICK EN SLOTS DISTRIBUTION------------------
        // -----------------------------------------------------------------------------------------------------------------------

        // -----------------------------------------------------------------------------------------------------------------------
        // --------------------------------------CONDICIONES DESDE SUMMARY--------------------------------------------------------
        // -----------------------------------------------------------------------------------------------------------------------

        _reconfigShareConditionsFromSummary(avsId, cabId) {
            this.$store.commit("resetCabinExceptAvsIdChoosen", { cabId, avsId });
        },

        // -----------------------------------------------------------------------------------------------------------------------
        // --------------------------------------FIN CONDICIONES DESDE SUMMARY--------------------------------------------------------
        // -----------------------------------------------------------------------------------------------------------------------

        // -----------------------------------------------------------------------------------------------------------------------
        // --------------------------------------CONSTRUCCION DE ARRAY PREVIO ALMACENAMIENTO EN BDD (DESDE FORM)-------------------
        // -----------------------------------------------------------------------------------------------------------------------
        _calculateTotalDiscountsEdit(sendChoosenSlot) {
            const precioTotal = sendChoosenSlot.reduce((total, item) => {
                var sumaDiscounts = 0;
                if (item.extraDiscountPercent != "" || item.extraDiscountPercent != 0) {
                    sumaDiscounts +=
                        item.newOffNetRate * (item.extraDiscountPercent / 100);
                }
                var sumaMounts = 0;
                if (item.extraDiscountAmount != "" || item.extraDiscountAmount != 0) {
                    sumaMounts += item.extraDiscountAmount;
                }
                return total + parseFloat(sumaDiscounts) + parseFloat(sumaMounts);
            }, 0);
            return precioTotal;
        },
        _calculateTotalUnitPrice(sendChoosenSlot) {
            const precioTotal = sendChoosenSlot.reduce((total, item) => {
                //return total + parseFloat(item.rate); // Cálculo sobre el valor de neta sin ser afectada por descuentos
                return total + parseFloat(item.newOffNetRate); // Cálculo sobre el valor de neta sin ser afectada por descuentos
            }, 0);
            return precioTotal;
        },
        _buildHeaderAndSummaryArray(flag) {
            var self = this;
            var dataCabinSummary = "";
            var dataCabecera = "";

            if (flag == "edit") {
                console.log(
                    "************************** EDITANDO BLOQUEO ******************************"
                );
                // Fusiono array de header y cabinBooking
                let usersId = this.$store.getters.currentUser.id;
                let companyId = this.clientId;
                dataCabecera = {
                    depId: this.depId,
                    bokClientId: companyId,
                    users_id: usersId,
                    bokId: this.bokId,
                    allowAllotments: this.sendAllotment,
                    allowConfirmations: this.sendConfirmation,

                    //Nuevos campos:
                    bokType: 0,
                    bokChildrenPax: this.summary.summarySelectedChildren ?
                        this.summary.summarySelectedChildren : 0,
                    bokChildrenPercent: this.summary.summarySelectedChildren > 0 ? 20 : 0,
                    bokChildrenDiscount: this.summary.summaryDiscountChildrenNet > 0 ?
                        this.summary.summaryDiscountChildrenNet : 0,
                    bokChildrenActive: this.summary.summarySelectedChildren > 0 ? 1 : 0,
                    subTotal: this.summary.summarySubtotalNetRate ?
                        this.summary.summarySubtotalNetRate : 0,
                    discountsTotal: this._calculateTotalDiscountsEdit(
                        this.sendChoosenSlot
                    ),
                    totalUnitPrice: this._calculateTotalUnitPrice(this.sendChoosenSlot)
                };
                dataCabinSummary = this.sendChoosenSlot;
            } else if (flag == "new") {
                console.log("************************** NUEVO BLOQUEO ******************************");
                // Fusiono array de header y cabinBooking
                let usersId = this.$store.getters.currentUser.id;
                let companyId = this.header.headerCompany.id;
                dataCabecera = {
                    depId: this.depId,
                    cruName: this.itemDeparture.cruName,
                    bokReference: this.header.headerReference,
                    bokTimeLimit: this.bookingDateTimeLimit,
                    bokClientId: companyId,
                    bokClientDiscount: this.header.headerPercent,
                    users_id: usersId,
                    bokClientEmail: this.header.headerCompany.email ?
                        this.header.headerCompany.email : "no-mail@mail.com",
                    allowAllotments: this.sendAllotment,

                    //Nuevos campos:
                    bokType: 0,
                    // bokChildrenPax: this.sendSummary.summarySelectedChildren ?
                    //     this.sendSummary.summarySelectedChildren : 0,
                    bokChildrenPax: this.sendSummary.summarySelectedChildren > 0?
                        this.sendSummary.summarySelectedChildren : 0,
                    bokChildrenPercent: this.sendSummary.summarySelectedChildren ? 20 : 0,
                    bokChildrenDiscount: this.sendSummary.summaryDiscountChildrenNet > 0 ? this.sendSummary.summaryDiscountChildrenNet : 0,
                    bokChildrenActive: this.sendSummary.summarySelectedChildren > 0 ? 1 : 0,
                    bokClientDiscount: this.header.headerPercent ?
                        this.header.headerPercent : 0,
                    bokVentaLocal: this.header.headerIva ? 1 : 0,
                    subTotal: this.sendSummary.summarySubtotalNetRate ?
                        this.sendSummary.summarySubtotalNetRate : 0,
                    discountsTotal: this.calculateTotalDiscounts(this.sendChoosenSlot),
                    itiName: this.itemDeparture.itiName ?
                        this.itemDeparture.itiName : "No itiName available",
                    totalUnitPrice: this.calculateTotalUnitPrice(this.sendChoosenSlot)
                };
                //console.log("===>>totalUnitPrice: " + JSON.stringify(this.itemDeparture.itiName));
                // console.log("===>>this.sendSummary.summarySubtotalNetRate : " + JSON.stringify(this.sendSummary.summarySubtotalNetRate));
                //console.log("===>>sendSummary: " + JSON.stringify(this.sendSummary));
                dataCabinSummary = this.sendChoosenSlot;
                // console.log("===>>dataCabinSummary: " + JSON.stringify(dataCabinSummary));
                // console.log("===>>this.sendChoosenSlot en CREACION: " + JSON.stringify(this.sendChoosenSlot));
            }
                        
            //----------------------------------------------------------------------------
            //-------------- Chequeo si array enviado es CHARTER -------------------------
            //----------------------------------------------------------------------------

            //var checkCharter = this.sendChoosenSlot.some(e => e.priName === "CHARTER");
            var checkCharter = this.sendChoosenSlot.some(function (item) {
                if(item.priName === "Charter" || item.priName === "CHARTER" || item.priName === "charter")
                return true;
            });

            //console.log("CHARTER: ======>" + checkCharter);

                if(checkCharter){
                    console.log("---------------------- Guardo con formato Charter --------------------");
                    // SI ES CHARTER - LOS SLOS SELECCIONADOS VAN CON CONDICIONES:
                    // BOSSTATUS 1 / BOSCONDITION 0
                    // MISMOS PRECIOS DE LAS TARIFAS
                    // Los slots restantes (no seleccionados) van con condiciones:
                    // bosSatus 0 / bosCondition 0 / gross y neta null

                    let clickedSlots = dataCabinSummary.map(a => a.avsId);
                    var slotsNotCharter = this.rowDataByDepId.filter(item => !clickedSlots.includes(item.avsId))
                    // console.log("=> Todos los slots: " + this.rowDataByDepId.length);
                    // console.log("=> Slots clickeados: " + dataCabinSummary.length);
                    // console.log("=> Slots clickeados: " + JSON.stringify(dataCabinSummary));
                    // console.log("=> Slots faltantes no clickeados: " + slotsNotCharter.length);
                    if(slotsNotCharter.length >= 0){

                        //1. Seteo condiciones para slots seleccionados en Charter
                        dataCabinSummary.forEach(function(elemento, indice, array) {

                            // if (self.sendAllotment) {
                            //     elemento.bosStatus = 5;
                            // }else if (self.sendConfirmation) {
                            //     elemento.bosStatus = 2;
                            // }else {
                            //     elemento.bosStatus = 1;
                            // }

                            if(self.sendConfirmation){
                                elemento.bosStatus = 2;
                            }else{
                                if (self.sendAllotment) {
                                    elemento.bosStatus = 5;
                                }else {
                                    elemento.bosStatus = 1;
                                }
                            }                            

                            // elemento.bosStatus = 1,
                            elemento.bosCondition = 0

                        }); 
                        //2. Seteo condiciones para slots restantes en Charter
                        slotsNotCharter.forEach((elemento) => {                   
                          elemento.offGrossRate = 0;
                          elemento.offNetRate = 0;
                          elemento.rate = 0;
                          elemento.bosCondition = 0;
                          elemento.bosStatus = 0;
                        })
                                 
                        slotsNotCharter.forEach(function(elem, indice, array) {
                            dataCabinSummary.push(elem)    
                        });
                        console.log("---------------------- Fin Guardo con formato Charter --------------------");
                    }                     
                    
                }else{
                    // NO ES CHARTER - PROCESO NORMAL

                    // -----------------------------------------------------------------------------------------------------
                    // ------------------------------ Configuración bosStatus y bosCondition -------------------------------
                    // Proceso para que, una vez seleccionada una condicion, se guardan el resto de slots, con bosStatus 0 para mostrar deshabilitado
                    // -----------------------------------------------------------------------------------------------------                    

                    // Array con elementos SINGLE seleccionados
                    console.log("========== 1. METODO PARA GUARDAR DATOS AL MOMENTO DE HACER CLICK EN NEXT========");

                    var selectedArraySingleConditions = dataCabinSummary
                        .filter(p => p.conditions[0].metCodigo == 1 && p.conditions[0].selected == 1).map(a => a.avsId);
                    var selectedArrayShareMConditions = dataCabinSummary
                        .filter(p => p.conditions[0].metCodigo == 2 && p.conditions[0].selected == 1).map(a => a.avsId);
                    var selectedArrayShareFConditions = dataCabinSummary
                        .filter(p => p.conditions[0].metCodigo == 3 && p.conditions[0].selected == 1).map(a => a.avsId);
                        
                    dataCabinSummary.forEach(function(elemento, indice, array) {
                        // if (self.sendAllotment) {
                        //     elemento.bosStatus = 5;
                        // } else if (self.sendConfirmation) {
                        //     elemento.bosStatus = 2;
                        // }else {
                        //     elemento.bosStatus = 1;
                        // }

                        if(self.sendConfirmation){
                            elemento.bosStatus = 2;
                        }else{
                            if (self.sendAllotment) {
                                elemento.bosStatus = 5;
                            }else {
                                elemento.bosStatus = 1;
                            }
                        }

                        elemento.conditions.forEach(function(elem, index, thisValue) {
                            var selft = self;
                            var depId = elemento.depId;
                            var avsId = elemento.avsId;
                            var cabId = elemento.avsCabinId;
                            var bosCondition = elemento.bosCondition;
                            var layPax = elemento.layPax;

                            let rowSend = { cabId: cabId, depId: depId }
                            let numberOfSlotsBlockedInTheSameCabin = selft.getNumberOfBlockedSlotsInTheSameCabin(rowSend);
                            let numberOfSlotsInTheSameCabin = selft.getNumberOfSlotsInTheSameCabin(depId, avsId, cabId);

                            //console.log("numberOfSlotsBlockedInTheSameCabin " + numberOfSlotsBlockedInTheSameCabin);
                            console.log("====Guardando numberOfSlotsInTheSameCabin " + numberOfSlotsInTheSameCabin);
                            console.log("====Guardando numberOfSlotsBlockedInTheSameCabin ==> " + numberOfSlotsBlockedInTheSameCabin);
                            console.log("====AvsId:  " + avsId);

                            // *********************************************************** CABINAS SIMPLES *********************************************************** 
                            if (layPax == 1) {
                                elemento.bosCondition = 1;
                            }
                            // *********************************************************** CABINAS DOBLES *********************************************************** 
                            else if (layPax == 2) {
                                if (elemento.layMaxBooking == 1 && elemento.bedsNumber == 1) {
                                    console.log("(*)GUARDANDO 2a: max boking 1 & # camas 1 & layPax 2 ");
                                    
                                    // En caso de seleccionar los 2 slots, vendrán con bosStatus 1 y bosCondition 0. No tiene condición aquí
                                    if (numberOfSlotsInTheSameCabin == 0) { // Solo seleccione un slot y con condición SS
                                        elemento.bosCondition = 1;
                                        selft._saveSingleInDoulbeCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                    }
                                    // En caso de seleccionar los 2 slots, vendrán con bosStatus 1 y bosCondition 0. No tiene condición aquí
                                } else if (elemento.layMaxBooking == 1 && elemento.bedsNumber == 2) {
                                    console.log("(*)GUARDANDO 2b: max boking 1 & # camas 2 & layPax 2 ");
                                    // En caso de seleccionar los 2 slots, vendrán con bosStatus 1 y bosCondition 0. No tiene condición aquí
                                    if (numberOfSlotsInTheSameCabin == 0) { // Solo seleccione un slot y con condición SS
                                        elemento.bosCondition = 1;
                                        selft._saveSingleInDoulbeCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                    }
                                } else if (elemento.layMaxBooking == 1 && elemento.bedsNumber == 3) {
                                    console.log("(*)GUARDANDO 2c: max boking 1 & # camas 3 & layPax 2 ");
                                    // En caso de seleccionar los 2 slots, vendrán con bosStatus 1 y bosCondition 0. No tiene condición aquí
                                    if (numberOfSlotsInTheSameCabin == 0) { // Solo seleccione un slot y con condición SS
                                        elemento.bosCondition = 1;
                                        selft._saveSingleInDoulbeCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                    }
                                } else if (elemento.layMaxBooking == 2 && elemento.bedsNumber == 2) {
                                    console.log("(*)GUARDANDO 2d: max boking 2 & # camas 2 & layPax 2 ");
                                    // En caso de seleccionar los 2 slots, vendrán con bosStatus 1 y bosCondition 0. No tiene condición aquí
                                    // if (numberOfSlotsBlockedInTheSameCabin == 0) {
                                    if (numberOfSlotsBlockedInTheSameCabin >= 0) {
                                        console.log("Caso 1. 2d")
                                        if (elem.metCodigo == 1 && elem.selected == 1) { //Si es SS
                                            console.log("** SS ** ");
                                            elemento.bosCondition = 1;
                                            selft._saveSingleInDoulbeCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                        } else
                                        if (elem.metCodigo == 2 && elem.selected == 1) { //Si es SHARE M
                                            console.log("** SHARE M ** ");
                                            elemento.bosCondition = 2;
                                            selft._saveShareInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareMConditions);
                                        } else if (elem.metCodigo == 3 && elem.selected == 1) { //Si es SHARE F
                                            console.log("** SHARE F ** ");
                                            elemento.bosCondition = 3;
                                            selft._saveShareInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareFConditions);
                                        }
                                    }
                                   
                                } else if (elemento.layMaxBooking == 2 && elemento.bedsNumber == 3) {
                                    console.log("(*)GUARDANDO 2e: max boking 2 & # camas 3 & layPax 2 ");
                                    // En caso de seleccionar los 2 slots, vendrán con bosStatus 1 y bosCondition 0. No tiene condición aquí
                                    // if (numberOfSlotsBlockedInTheSameCabin == 0) {
                                    if (numberOfSlotsBlockedInTheSameCabin >= 0) {
                                        if (elem.metCodigo == 1 && elem.selected == 1) { //Si es SS
                                            console.log("** SS ** ");
                                            elemento.bosCondition = 1;
                                            selft._saveSingleInDoulbeCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                        } else
                                        if (elem.metCodigo == 2 && elem.selected == 1) { //Si es SHARE M
                                            console.log("** SHARE M ** ");
                                            elemento.bosCondition = 2;
                                            selft._saveShareInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareMConditions);
                                        } else if (elem.metCodigo == 3 && elem.selected == 1) { //Si es SHARE F
                                            console.log("** SHARE F ** ");
                                            elemento.bosCondition = 3;
                                            selft._saveShareInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareFConditions);
                                        }
                                    }
                                }
                            }
                            // *********************************************************** CABINAS TRIPLES *********************************************************** 
                            else if (layPax == 3) {
                                if (elemento.layMaxBooking == 1 && elemento.bedsNumber == 1) {
                                    console.log("(*)GUARDANDO 3a: max boking 1 & # camas 1 & layPax 3 ");
                                    if (numberOfSlotsInTheSameCabin == 0) { // Cuando solo se selecciona solo 1 slot
                                        console.log("Caso 1. 3a")
                                        elemento.bosCondition = 1;
                                        selft._saveSingleInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                    } else {
                                        console.log("Caso 2. 3a")
                                        // En caso de seleccionar 2 slots, bloqueo el últimmo slot. En caso de seleccionar los 3 slots, no pasa nada (todos con bosCondition 0)
                                        selft.addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary);
                                    }
                                } else if (elemento.layMaxBooking == 1 && elemento.bedsNumber == 2) {
                                    console.log("(*)GUARDANDO 3b: max boking 1 & # camas 2 & layPax 3 ");
                                    if (numberOfSlotsInTheSameCabin == 0) { // Cuando solo se selecciona solo 1 slot
                                        console.log("Caso 1. 3b")
                                        elemento.bosCondition = 1;
                                        selft._saveSingleInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                    } else {
                                        console.log("Caso 2. 3b")
                                        // En caso de seleccionar 2 slots, bloqueo el últimmo slot. En caso de seleccionar los 3 slots, no pasa nada (todos con bosCondition 0)
                                        selft.addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary);
                                    }
                                } else if (elemento.layMaxBooking == 1 && elemento.bedsNumber == 3) {
                                    console.log("(*)GUARDANDO 3c: max boking 1 & # camas 3 & layPax 3 ");
                                    if (numberOfSlotsInTheSameCabin == 0) { // Cuando solo se selecciona solo 1 slot
                                        console.log("Caso 1. 3c")
                                        elemento.bosCondition = 1;
                                        selft._saveSingleInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                    } else {
                                        console.log("Caso 2. 3c")
                                        // En caso de seleccionar 2 slots, bloqueo el últimmo slot. En caso de seleccionar los 3 slots, no pasa nada (todos con bosCondition 0)
                                        selft.addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary);
                                    }
                                } else if (elemento.layMaxBooking == 2 && elemento.bedsNumber == 1) {
                                    console.log("(*)GUARDANDO 3d: max boking 2 & # camas 1 & layPax 3 ");
                                    if (numberOfSlotsInTheSameCabin == 0) { // Cuando solo se selecciona solo 1 slot
                                        console.log("Caso 1. 3d")
                                        // if (numberOfSlotsBlockedInTheSameCabin == 0) {
                                        if (numberOfSlotsBlockedInTheSameCabin >= 0) {
                                            if (elem.metCodigo == 1 && elem.selected == 1) { //Si es SS
                                                console.log("** SS ** ");
                                                elemento.bosCondition = 1;
                                                selft._saveSingleInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                            } else
                                            if (elem.metCodigo == 2 && elem.selected == 1) { //Si es SHARE M
                                                console.log("** SHARE M ** ");
                                                elemento.bosCondition = 2;
                                                selft._saveShareInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareMConditions);
                                            } else if (elem.metCodigo == 3 && elem.selected == 1) { //Si es SHARE F
                                                console.log("** SHARE F ** ");
                                                elemento.bosCondition = 3;
                                                selft._saveShareInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareFConditions);
                                            }
                                        }
                                    } else {
                                        console.log("Caso 2. 3d")
                                        // En caso de seleccionar 2 slots, bloqueo el últimmo slot. En caso de seleccionar los 3 slots, no pasa nada (todos con bosCondition 0)
                                        selft.addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary);
                                    }
                                } else if (elemento.layMaxBooking == 2 && elemento.bedsNumber == 2) {
                                    console.log("(*)GUARDANDO 3e: max boking 2 & # camas 2 & layPax 3 ");
                                    if (numberOfSlotsInTheSameCabin == 0) { // Cuando solo se selecciona solo 1 slot
                                        console.log("Caso 1. 3e")
                                        //if (numberOfSlotsBlockedInTheSameCabin == 0) {
                                        if (numberOfSlotsBlockedInTheSameCabin >= 0) {
                                            if (elem.metCodigo == 1 && elem.selected == 1) { //Si es SS
                                                console.log("** SS ** ");
                                                elemento.bosCondition = 1;
                                                selft._saveSingleInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                            } else
                                            if (elem.metCodigo == 2 && elem.selected == 1) { //Si es SHARE M
                                                console.log("** SHARE M ** ");
                                                elemento.bosCondition = 2;
                                                selft._saveShareInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareMConditions);
                                            } else if (elem.metCodigo == 3 && elem.selected == 1) { //Si es SHARE F
                                                console.log("** SHARE F ** ");
                                                elemento.bosCondition = 3;
                                                selft._saveShareInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareFConditions);
                                            }
                                        }
                                    } else {
                                        console.log("Caso 2. 3e")
                                        // En caso de seleccionar 2 slots, bloqueo el últimmo slot. En caso de seleccionar los 3 slots, no pasa nada (todos con bosCondition 0)
                                        selft.addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary);
                                    }
                                } else if (elemento.layMaxBooking == 2 && elemento.bedsNumber == 3) {
                                    console.log("(*)GUARDANDO 3f: max boking 2 & # camas 3 & layPax 3 ");
                                    if (numberOfSlotsInTheSameCabin == 0) { // Cuando solo se selecciona solo 1 slot
                                        // if (numberOfSlotsBlockedInTheSameCabin == 0) {
                                        if (numberOfSlotsBlockedInTheSameCabin >= 0) {                                            
                                            if (elem.metCodigo == 1 && elem.selected == 1) { //Si es SS
                                                console.log("** SS ** ");
                                                elemento.bosCondition = 1;
                                                selft._saveSingleInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                            } else
                                            if (elem.metCodigo == 2 && elem.selected == 1) { //Si es SHARE M
                                                console.log("** SHARE M ** ");
                                                elemento.bosCondition = 2;
                                                selft._saveShareInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareMConditions);
                                            } else if (elem.metCodigo == 3 && elem.selected == 1) { //Si es SHARE F
                                                console.log("** SHARE F ** ");
                                                elemento.bosCondition = 3;
                                                selft._saveShareInTripleCabinAndDisableLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareFConditions);
                                            }
                                        }
                                    } else {
                                        // En caso de seleccionar 2 slots, bloqueo el últimmo slot. En caso de seleccionar los 3 slots, no pasa nada (todos con bosCondition 0)
                                        selft.addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary);
                                    }
                                }
                            }
                            // *********************************************************** CABINAS CUADRUPLES *********************************************************** 
                            else if (layPax == 4) {
                                if (elemento.layMaxBooking == 1 && elemento.bedsNumber == 1) {
                                    console.log("(*)GUARDANDO 4a: max boking 1 & # camas 1 & layPax 4 ");
                                    if (numberOfSlotsInTheSameCabin == 0) { // Cuando solo se selecciona solo 1 slot
                                        elemento.bosCondition = 1;
                                        selft._saveSingleInCuadrupleCabinAndDisableTwoLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                    } else {
                                        // En caso de seleccionar 2 slots, bloqueo el últimmo slot. En caso de seleccionar los 3 slots, no pasa nada (todos con bosCondition 0)
                                        selft.addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary);
                                    }
                                } else if (elemento.layMaxBooking == 1 && elemento.bedsNumber == 2) {
                                    console.log("(*)GUARDANDO 4b: max boking 1 & # camas 2 & layPax 4 ");
                                    if (numberOfSlotsInTheSameCabin == 0) { // Cuando solo se selecciona solo 1 slot
                                        elemento.bosCondition = 1;
                                        selft._saveSingleInCuadrupleCabinAndDisableTwoLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                    } else {
                                        // En caso de seleccionar 2 slots, bloqueo el últimmo slot. En caso de seleccionar los 3 slots, no pasa nada (todos con bosCondition 0)
                                        selft.addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary);
                                    }
                                } else if (elemento.layMaxBooking == 1 && elemento.bedsNumber == 3) {
                                    console.log("(*)GUARDANDO 4c: max boking 1 & # camas 3 & layPax 4 ");
                                    if (numberOfSlotsInTheSameCabin == 0) { // Cuando solo se selecciona solo 1 slot
                                        elemento.bosCondition = 1;
                                        selft._saveSingleInCuadrupleCabinAndDisableTwoLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                    } else {
                                        // En caso de seleccionar 2 slots, bloqueo el últimmo slot. En caso de seleccionar los 3 slots, no pasa nada (todos con bosCondition 0)
                                        selft.addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary);
                                    }
                                } else if (elemento.layMaxBooking == 1 && elemento.bedsNumber == 4) {
                                    console.log("(*)GUARDANDO 4d: max boking 1 & # camas 3 & layPax 4 ");
                                    if (numberOfSlotsInTheSameCabin == 0) { // Cuando solo se selecciona solo 1 slot
                                        elemento.bosCondition = 1;
                                        selft._saveSingleInCuadrupleCabinAndDisableTwoLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                    } else {
                                        // En caso de seleccionar 2 slots, bloqueo el últimmo slot. En caso de seleccionar los 3 slots, no pasa nada (todos con bosCondition 0)
                                        selft.addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary);
                                    }
                                } else if (elemento.layMaxBooking == 2 && elemento.bedsNumber == 1) {
                                    // -----------------------------------------------------------------------------------------
                                    console.log("(*)GUARDANDO 4e: max boking 2 & # camas 1 & layPax 4 ");
                                    if (numberOfSlotsInTheSameCabin == 0) { // Cuando solo se selecciona solo 1 slot
                                        if (numberOfSlotsBlockedInTheSameCabin == 0) {
                                            if (elem.metCodigo == 1 && elem.selected >= 1) { //Si es SS
                                                console.log("** SS ** ");
                                                elemento.bosCondition = 1;
                                                selft._saveSingleInCuadrupleCabinAndDisableTwoLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                            } else if (elem.metCodigo == 2 && elem.selected == 1) { //Si es SHARE M
                                                console.log("** SHARE M ** ");
                                                elemento.bosCondition = 2;
                                                selft._saveShareInCuadrupleCabinAndDisableRestOfSlots(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareMConditions);
                                            } else if (elem.metCodigo == 3 && elem.selected == 1) { //Si es SHARE F
                                                console.log("** SHARE F ** ");
                                                elemento.bosCondition = 3;
                                                selft._saveShareInCuadrupleCabinAndDisableRestOfSlots(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareFConditions);
                                            }
                                        }
                                    } else {
                                        // En caso de seleccionar 2 slots, bloqueo el últimmo slot. En caso de seleccionar los 3 slots, no pasa nada (todos con bosCondition 0)
                                        selft.addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary);
                                    }
                                } else if (elemento.layMaxBooking == 2 && elemento.bedsNumber == 2) {

                                    console.log("(*)GUARDANDO 4f: max boking 2 & # camas 2 & layPax 4 ");
                                    if (numberOfSlotsInTheSameCabin == 0) { // Cuando solo se selecciona solo 1 slot
                                        if (numberOfSlotsBlockedInTheSameCabin >= 0) {
                                            console.log("Caso 1. 4f");
                                            if (elem.metCodigo == 1 && elem.selected == 1) { //Si es SS
                                                console.log("** SS ** ");
                                                elemento.bosCondition = 1;
                                                selft._saveSingleInCuadrupleCabinAndDisableTwoLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                            } else if (elem.metCodigo == 2 && elem.selected == 1) { //Si es SHARE M
                                                console.log("** SHARE M ** ");
                                                elemento.bosCondition = 2;
                                                selft._saveShareInCuadrupleCabinAndDisableRestOfSlots(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareMConditions);
                                            } else if (elem.metCodigo == 3 && elem.selected == 1) { //Si es SHARE F
                                                console.log("** SHARE F ** ");
                                                elemento.bosCondition = 3;
                                                selft._saveShareInCuadrupleCabinAndDisableRestOfSlots(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareFConditions);
                                            }
                                        }
                                    } else {
                                        console.log("Caso 2. 4f");
                                        // En caso de seleccionar 2 slots, bloqueo el últimmo slot. En caso de seleccionar los 3 slots, no pasa nada (todos con bosCondition 0)
                                        selft.addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary);
                                    }
                                    
                                } else if (elemento.layMaxBooking == 2 && elemento.bedsNumber == 3) {
                                    console.log("(*)GUARDANDO 4g: max boking 2 & # camas 3 & layPax 4 ");
                                    if (numberOfSlotsInTheSameCabin == 0) { // Cuando solo se selecciona solo 1 slot
                                        if (numberOfSlotsBlockedInTheSameCabin >= 0) {
                                            if (elem.metCodigo == 1 && elem.selected == 1) { //Si es SS
                                                console.log("** SS ** ");
                                                elemento.bosCondition = 1;
                                                selft._saveSingleInCuadrupleCabinAndDisableTwoLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                            } else if (elem.metCodigo == 2 && elem.selected == 1) { //Si es SHARE M
                                                console.log("** SHARE M ** ");
                                                elemento.bosCondition = 2;
                                                selft._saveShareInCuadrupleCabinAndDisableRestOfSlots(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareMConditions);
                                            } else if (elem.metCodigo == 3 && elem.selected == 1) { //Si es SHARE F
                                                console.log("** SHARE F ** ");
                                                elemento.bosCondition = 3;
                                                selft._saveShareInCuadrupleCabinAndDisableRestOfSlots(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareFConditions);
                                            }
                                        }
                                    } else {
                                        // En caso de seleccionar 2 slots, bloqueo el últimmo slot. En caso de seleccionar los 3 slots, no pasa nada (todos con bosCondition 0)
                                        selft.addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary);
                                    }
                                } else if (elemento.layMaxBooking == 2 && elemento.bedsNumber == 4) {
                                    console.log("(*)GUARDANDO 4h: max boking 2 & # camas 4 & layPax 4 ");
                                    if (numberOfSlotsInTheSameCabin == 0) { // Cuando solo se selecciona solo 1 slot
                                        if (numberOfSlotsBlockedInTheSameCabin >= 0) {
                                            if (elem.metCodigo == 1 && elem.selected == 1) { //Si es SS
                                                console.log("** SS ** ");
                                                elemento.bosCondition = 1;
                                                selft._saveSingleInCuadrupleCabinAndDisableTwoLastSlot(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions);
                                            } else if (elem.metCodigo == 2 && elem.selected == 1) { //Si es SHARE M
                                                console.log("** SHARE M ** ");
                                                elemento.bosCondition = 2;
                                                selft._saveShareInCuadrupleCabinAndDisableRestOfSlots(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareMConditions);
                                            } else if (elem.metCodigo == 3 && elem.selected == 1) { //Si es SHARE F
                                                console.log("** SHARE F ** ");
                                                elemento.bosCondition = 3;
                                                selft._saveShareInCuadrupleCabinAndDisableRestOfSlots(selft.rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareFConditions);
                                            }
                                        }
                                    } else {
                                        // En caso de seleccionar 2 slots, bloqueo el últimmo slot. En caso de seleccionar los 3 slots, no pasa nada (todos con bosCondition 0)
                                        selft.addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary);
                                    }
                                }
                            }
                        });
                    });
                }

            // -----------------------------------------------------------------------------------------------------
            // ------------------------------ Fin Configuración bosStatus y bosCondition -------------------------------
            // -----------------------------------------------------------------------------------------------------

            let data = [];
            data.push(dataCabecera, dataCabinSummary);
            return data;
        },
        _saveSingleInDoulbeCabinAndDisableLastSlot(rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions) {
            let avsOrder = elemento.avsOrder;
            var resultByCabId = rowDataByDepId.filter(p => p.cabId === elemento.cabId &&
                !selectedArraySingleConditions.includes(p.avsId));
            resultByCabId.forEach(function(elementoByCabId, indice, array) {
                // Valido que el elemento a hacer push no exista en el array original, caso contrario no lo ingreso
                var checkAvsId = dataCabinSummary.filter(
                    p => p.avsId == elementoByCabId.avsId
                ).length;
                if (checkAvsId < 1) {

                    if (indice == 0) {
                        elementoByCabId.bosCondition = 1;
                    }
                    if (indice == 1) {
                        elementoByCabId.bosCondition = 0;
                    }
                    elementoByCabId.bosStatus = 0;
                    dataCabinSummary.push(elementoByCabId);
                }
            });
        },
        _saveSingleInTripleCabinAndDisableLastSlot(rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions) {
            let avsOrder = elemento.avsOrder;
            var resultByCabId = rowDataByDepId.filter(p => p.cabId === elemento.cabId &&
                !selectedArraySingleConditions.includes(p.avsId));
            resultByCabId.forEach(function(elementoByCabId, indice, array) {
                // Valido que el elemento a hacer push no exista en el array original, caso contrario no lo ingreso
                var checkAvsId = dataCabinSummary.filter(
                    p => p.avsId == elementoByCabId.avsId
                ).length;
                if (checkAvsId < 1) {
                    if (avsOrder == 1) {
                        if (indice == 0) elementoByCabId.bosCondition = 1;
                        if (indice == 1) elementoByCabId.bosCondition = 0;
                    } else if (avsOrder == 2 || avsOrder == 3) {
                        if (indice == 0) elementoByCabId.bosCondition = 0;
                        if (indice == 1) elementoByCabId.bosCondition = 1;
                    }
                    elementoByCabId.bosStatus = 0; // Si se coloca afuera, se forza a que se haga un tercer registro
                    dataCabinSummary.push(elementoByCabId);
                }
            });
        },
        _saveSingleInCuadrupleCabinAndDisableTwoLastSlot(rowDataByDepId, dataCabinSummary, elemento, selectedArraySingleConditions) {

            let avsOrder = elemento.avsOrder;
            var resultByCabId = rowDataByDepId.filter(p => p.cabId === elemento.cabId &&
                !selectedArraySingleConditions.includes(p.avsId));
            resultByCabId.forEach(function(elementoByCabId, indice, array) {
                // Valido que el elemento a hacer push no exista en el array original, caso contrario no lo ingreso
                var checkAvsId = dataCabinSummary.filter(p => p.avsId == elementoByCabId.avsId).length;
                if (checkAvsId < 1) {

                    if (avsOrder == 1 || avsOrder == 2) {
                        if (indice == 0) elementoByCabId.bosCondition = 1;
                        if (indice == 1 || indice == 2) elementoByCabId.bosCondition = 0;
                    } else if (avsOrder == 3 || avsOrder == 4) {
                        if (indice == 2) elementoByCabId.bosCondition = 1;
                        if (indice == 0 || indice == 1) elementoByCabId.bosCondition = 0;
                    }

                    elementoByCabId.bosStatus = 0; // Si se coloca afuera, se forza a que se haga un tercer registro
                    dataCabinSummary.push(elementoByCabId);
                }
            });

        },
        _saveShareInTripleCabinAndDisableLastSlot(rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareMConditions) {
            let avsOrder = elemento.avsOrder;
            //let condicion = elemento.bosCondition;
            var resultByCabId = rowDataByDepId.filter(p => p.cabId === elemento.cabId &&
                !selectedArrayShareMConditions.includes(p.avsId));
            resultByCabId.forEach(function(elementoByCabId, indice, array) {
                // Valido que el elemento a hacer push no exista en el array original, caso contrario no lo ingreso
                var checkAvsId = dataCabinSummary.filter(
                    p => p.avsId == elementoByCabId.avsId
                ).length;
                if (checkAvsId < 1) {
                    if (avsOrder == 1) {
                        if (indice == 2) {
                            elementoByCabId.bosCondition = 0;
                            elementoByCabId.bosStatus = 0; // Si se coloca dentro de if, solo almacenará 2 registros
                        }
                    } else if (avsOrder == 2) {
                        if (indice == 2) {
                            elementoByCabId.bosStatus = 0;
                            elementoByCabId.bosCondition = 0;
                        }
                    } else if (avsOrder == 3) {
                        if (indice == 0) {
                            elementoByCabId.bosCondition = 0;
                            elementoByCabId.bosStatus = 0;
                        }
                    }
                    if ((elementoByCabId.bosStatus != null) && (elementoByCabId.bosCondition != null)) // Elimino registros con valores null
                        dataCabinSummary.push(elementoByCabId);
                }
            });
        },
        _saveShareInCuadrupleCabinAndDisableRestOfSlots(rowDataByDepId, dataCabinSummary, elemento, selectedArrayShareMConditions) {

            let avsOrder = elemento.avsOrder;
            console.log("(*)avs>Order: " + avsOrder);
            var resultByCabId = rowDataByDepId.filter(p => p.cabId === elemento.cabId &&
                !selectedArrayShareMConditions.includes(p.avsId));
            resultByCabId.forEach(function(elementoByCabId, indice, array) {
                // Valido que el elemento a hacer push no exista en el array original, caso contrario no lo ingreso
                var checkAvsId = dataCabinSummary.filter(
                    p => p.avsId == elementoByCabId.avsId
                ).length;
                if (checkAvsId < 1) {
                    if (avsOrder == 1) {
                        console.log("Indice 1: " + indice);
                        console.log("avsId 1: " + elementoByCabId.avsId);
                        if (indice == 2 || indice == 3) {
                            elementoByCabId.bosCondition = 0;
                            elementoByCabId.bosStatus = 0; // Si se coloca dentro de if, solo almacenará 2 registros
                        }
                    } else if (avsOrder == 2) {
                        console.log("Indice 2: " + indice);
                        console.log("avsId 2: " + elementoByCabId.avsId);
                        if (indice == 2 || indice == 3) {
                            elementoByCabId.bosStatus = 0;
                            elementoByCabId.bosCondition = 0;
                        }
                    } else if (avsOrder == 3) {
                        console.log("Indice 3: " + indice);
                        console.log("avsId 3: " + elementoByCabId.avsId);
                        if (indice == 0 || indice == 1) {
                            elementoByCabId.bosCondition = 0;
                            elementoByCabId.bosStatus = 0;
                        }
                    } else if (avsOrder == 4) {
                        console.log("Indice 4: " + indice);
                        console.log("avsId 4: " + elementoByCabId.avsId);
                        if (indice == 0 || indice == 1) {
                            elementoByCabId.bosCondition = 0;
                            elementoByCabId.bosStatus = 0;
                        }
                    }
                    if ((elementoByCabId.bosStatus != null) && (elementoByCabId.bosCondition != null)) // Elimino registros con valores null
                        dataCabinSummary.push(elementoByCabId);
                }
            });
        },
        _setShareConditionOnNextButton(elemento, bosCondition, depId, dataCabinSummary) {
            var selft = this;
            // ==========> Añado array(s) adicional para SHARE M  <==============
            console.log("condicion Share M/F seteo 1 en bosCondition. No aplica para cabinas DOBLES");
            //elemento.bosCondition = 2;
            console.log("BosCondition: " + bosCondition);
            elemento.bosCondition = bosCondition;

            //Borrar linea:
            //-------------------
            var tag = "";
            if (bosCondition = 2) tag = "M";
            else if (bosCondition = 3) tag = "F";
            //-------------------

            // if(bosCondition = 2 ) {                
            //     elemento.bosCondition = 2;
            // }
            // else if(bosCondition = 3 ){
            //     elemento.bosCondition = 3;
            // }

            var avsId = elemento.avsId;
            var cabId = elemento.avsCabinId;
            var avsOrder = elemento.avsOrder;
            var numberOfSlotsInCabin = selft.rowDataByDepId.filter(
                p => p.avsCabinId === cabId
            ).length;

            //var depId = self.depId;
            var layPax = elemento.layPax;
            var layMaxBooking = elemento.layMaxBooking;
            var bedsNumber = elemento.bedsNumber;

            switch (numberOfSlotsInCabin) {
                case 3:
                    console.log(" <------------> Hay 3 slots (En SlotsForms) Share   <------------> " + tag);

                    // En caso de LAYMAXBOOKING = 2, y seleccionado 1 solo espacio:
                    // todos los espacios son guardados con la misma condicion
                    console.log("LayMaxBooking en Share M: " + layMaxBooking);

                    if (layMaxBooking == 2) {
                        console.log("layMaxBoogin 2 en Share" + tag);

                        selft.addRemainingNoSelectedSlot(cabId, avsId, layMaxBooking, dataCabinSummary);
                    } else if (layMaxBooking == 3) {
                        console.log("En 3");
                        //selft.checkThirdSlotWithLayMaxBooking(cabId, avsId, bosCondition, layMaxBooking, dataCabinSummary)
                    } else {
                        console.log(" no es layMaxbooking 2 y laymaxbooking 3");
                        if (avsOrder == 1) {
                            var newAvsOrder = 3;
                            let elemento = selft.setBosAndStatusCondition(cabId, newAvsOrder, bosCondition, layMaxBooking);
                            dataCabinSummary.push(elemento);
                        } else if (avsOrder == 2) {
                            var newAvsOrder = 3;
                            let elemento = selft.setBosAndStatusCondition(cabId, newAvsOrder, bosCondition);
                            dataCabinSummary.push(elemento);
                        } else if (avsOrder == 3) {
                            var newAvsOrder = 1;
                            let elemento = selft.setBosAndStatusCondition(cabId, newAvsOrder, bosCondition);
                            dataCabinSummary.push(elemento);
                        }
                    }
                    break;
                case 4:
                    console.log(" <------------> Hay 4 slots  <------------> ");

                    if (layMaxBooking == 2) {
                        console.log("* layMaxBooking 2");

                        //Condición especial para deshabilitar primer slot seleccionado
                        
                        var numberOfChoosenSlots = dataCabinSummary.length;
                        // var numberOfBlockedSlots = selft.rowDataByDepId.filter(
                        //     p =>
                        //     (p.avsCabinId === cabId && p.bosStatus == 0) ||
                        //     p.bosStatus == 1
                        // ).length;
                        
                        // ADECUACION BOOKING.BOSSTATUS Y BOSCONDITION
                        let numberOfBlockedSlots = selft.rowDataByDepId.filter(function(block) {
                            if( Boolean(block.booking)){
                                return  block.avsCabinId === cabId &&  
                                        block.booking.bosStatus == 0  &&  
                                        block.booking.bosStatus == 1
                            }
                        }); 

                        console.log("======> numberOfBlockedSlots: " + JSON.stringify(numberOfBlockedSlots));
                        console.log("======> numberOfChoosenSlots: " + JSON.stringify(numberOfChoosenSlots));

                        if (numberOfBlockedSlots == 0 && numberOfChoosenSlots == 2) {
                            console.log("---- Caso 01");
                        } else if (
                            numberOfBlockedSlots == 0 &&
                            numberOfChoosenSlots == 2
                        ) {
                            console.log("---- Caso 02");
                            selft.disabledFirstClickSlotInCuadruple(cabId, avsId, dataCabinSummary);
                        } else if (
                            numberOfBlockedSlots == 2 &&
                            numberOfChoosenSlots == 1
                        ) {
                            console.log("---- Caso 03");
                            selft.disabledFirstClickSlotInCuadruple(cabId, avsId, dataCabinSummary);
                        } else if (
                            numberOfChoosenSlots == 2 &&
                            numberOfChoosenSlots == 2
                        ) {
                            console.log("Hay que plantear ver que se hace");
                        }
                    } else if (layMaxBooking == 3) {
                        console.log("* layMaxBooking 3");
                        //selft.checkThirdSlotWithLayMaxBooking(cabId, avsId, bosCondition, layMaxBooking, dataCabinSummary)
                    } else {
                        console.log("Otro caso");
                        if (avsOrder == 1) {
                            var newAvsOrder = 3;
                            let elementoF = selft.setBosAndStatusCondition(cabId, newAvsOrder, bosCondition);
                            dataCabinSummary.push(elementoF);

                            var newAvsOrder = 4;
                            let elementoS = selft.setBosAndStatusCondition(cabId, newAvsOrder, bosCondition);
                            dataCabinSummary.push(elementoS);
                        } else if (avsOrder == 2) {
                            var newAvsOrder = 3;
                            let elementoF = selft.setBosAndStatusCondition(cabId, newAvsOrder, bosCondition);
                            dataCabinSummary.push(elementoF);

                            var newAvsOrder = 4;
                            let elementoS = selft.setBosAndStatusCondition(cabId, newAvsOrder, bosCondition);
                            dataCabinSummary.push(elementoS);
                        } else if (avsOrder == 3) {
                            var newAvsOrder = 1;
                            let elementoF = selft.setBosAndStatusCondition(cabId, newAvsOrder, bosCondition);
                            dataCabinSummary.push(elementoF);
                            var newAvsOrder = 2;
                            let elementoS = selft.setBosAndStatusCondition(cabId, newAvsOrder, bosCondition);
                            dataCabinSummary.push(elementoS);
                        } else if (avsOrder == 4) {
                            var newAvsOrder = 1;
                            let elementoF = selft.setBosAndStatusCondition(cabId, newAvsOrder, bosCondition);
                            dataCabinSummary.push(elementoF);
                            var newAvsOrder = 2;
                            let elementoS = selft.setBosAndStatusCondition(cabId, newAvsOrder, bosCondition);
                            dataCabinSummary.push(elementoS);
                        }
                        break;
                        return "No defined";
                    }
            }
        },

        // ------------------ Validación de slot extra en cabina triple LAYMAXBOOKING = 1 -----------------------------
        getNumberOfSlotsInTheSameCabin(depId, avsId, cabId) {
            // Determino el número de slots de la misma cabina en el array de slots escogidos
            let arrayInStore = this.$store.getters.getRowDataChoosen(depId);
            //return arrayInStore.filter(p => p.cabId == cabId).length;
            return arrayInStore.filter(p => p.cabId == cabId && p.avsId != avsId).length;
        },
        getNumberOfBlockedSlotsMasterSuite(depId, avsId, cabId) {
            // Determino el número de slots de la misma cabina en el array de slots escogidos para MASTER SUITE
            let arrayInStore = this.$store.getters.getRowDataChoosen(depId);
            return arrayInStore.filter(p => p.cabId == cabId).length;
        },        
        addThirdSlotWithNoStatus(depId, cabId, dataCabinSummary) {
            var self = this;
            let rowDataChoosen = this.$store.getters.getRowDataChoosen(depId);
            let rowData = this.$store.getters.getRowData;

            //1. Reviso los avsId seleccionado en rowDataChoosen y saco avsId
            let filterSlot = rowDataChoosen
                .filter(block => block.cabId === cabId)
                .map(a => a.avsId);

            // //3. Comparo con avsId en rowData y saco el restante
            var avsIdRestante = rowData
                .filter(block => block.cabId === cabId)
                .filter(item => !filterSlot.includes(item.avsId))
                .map(a => a.avsId);

            let filterSlotInRowData = rowData.filter(item =>
                avsIdRestante.includes(item.avsId)
            );
            if (filterSlotInRowData.length > 0) {
                filterSlotInRowData.forEach(function(elemento, indice, array) {
                    elemento.bosStatus = 0;
                    elemento.bosCondition = 0;
                    let checkIfExists = self.checkIfExistInChoosenRowData(elemento.avsId, dataCabinSummary);
                    if (checkIfExists == 0) dataCabinSummary.push(elemento);
                });
            }
        },

        checkIfExistInChoosenRowData(avsId, dataCabinSummary) {
            let arrayInStore = dataCabinSummary;
            return arrayInStore.filter(p => p.avsId == avsId).length;
        },
        // ------------------ Fin Validación de slot extra en cabina triple LAYMAXBOOKING = 1 -----------------------------
        setBosAndStatusCondition(cabId, newAvsOrder, bosCondition) {
            let filterSlot = this.rowDataByDepId.filter(
                block => block.cabId === cabId && block.avsOrder === newAvsOrder
            );
            if (filterSlot.length > 0) {
                let returnedElement;
                filterSlot.forEach(elemento => {
                    elemento.bosCondition = bosCondition;
                    elemento.bosStatus = 0;
                    returnedElement = elemento;
                });
                return returnedElement;
            }
        },
        checkThirdSlotWithLayMaxBooking(cabId, avsId, bosCondition, layMaxBooking, dataCabinSummary) {
            if (layMaxBooking == 2) {
                let filterSlot = this.rowDataByDepId.filter(
                    block => block.cabId === cabId && block.avsId != avsId
                );
                if (filterSlot.length > 0) {
                    let returnedElement;
                    filterSlot.forEach(elemento => {
                        elemento.bosCondition = bosCondition;
                        elemento.bosStatus = 0;
                        returnedElement = elemento;
                        dataCabinSummary.push(returnedElement);
                    });
                }
            }
        },
        addRemainingNoSelectedSlot(cabId, avsId, layMaxBooking, dataCabinSummary) {
            if (layMaxBooking == 2) {
                let filterSlot = this.rowDataByDepId.filter(
                    block =>
                    block.cabId === cabId && block.avsId != avsId && block.bokId == null
                );
                if (filterSlot.length > 0) {
                    let returnedElement;
                    filterSlot.forEach(elemento => {
                        elemento.bosCondition = 0;
                        elemento.bosStatus = 0;
                        returnedElement = elemento;
                        dataCabinSummary.push(returnedElement);
                    });
                }
            }
        },
        disabledFirstClickSlotInCuadruple(cabId, avsId, dataCabinSummary) {
            let filterSlot = dataCabinSummary.filter(
                block => block.cabId === cabId && block.avsId != avsId
            );
            if (filterSlot.length > 0) {
                filterSlot.forEach(elemento => {
                    elemento.bosCondition = 0;
                    elemento.bosStatus = 0;
                });
            }
        },
        _setLastShareConditonInCuadruple(cabId, avsId) {
            let arrayInStore = this.$store.getters.getRowData;
            // let lastShareCondition = arrayInStore
            //     .filter(
            //         block =>
            //         block.cabId === cabId &&
            //         block.avsId != avsId &&
            //         block.bosStatus != null &&
            //         block.bosCondition != 0
            //     )
            //     .map(a => a.bosCondition);

            // ADECUACION BOOKING.BOSSTATUS Y BOSCONDITION
            let lastShareCondition = arrayInStore.filter(function(block) {
                if(Boolean(block.booking)){
                    return  block.cabId === cabId &&  
                            block.avsId != avsId &&
                            block.booking.bosStatus != null  &&  
                            block.booking.bosStatus != 0
                }
            }).map(a => a.bosCondition);

            console.log("LastCondition: " + JSON.stringify(lastShareCondition));

            // let bosConditionBlocked = lastArrayShared.map(a => a.bosCondition);
            const codigo = lastShareCondition;
            this.$store.commit("onlyShareConditionInTriple", { avsId, codigo });
            this.$store.commit("setShareCondition", { cabId, codigo });
        }

        // -----------------------------------------------------------------------------------------------------------------------
        // --------------------------------------FIN CONSTRUCCION DE ARRAY PREVIO ALMACENAMIENTO EN BDD (DESDE FORM)-------------------
        // -----------------------------------------------------------------------------------------------------------------------
    }
};