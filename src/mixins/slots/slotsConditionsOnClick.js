

export default {
    data() {
        return {
            messageNA:""
        };
    },
    mounted() {

    },
    created() {},
    computed: {},
    methods: {
        // -----------------------------------------------------------------------------------------------------------------------
        // --------------------------------------CONDICIONES AL MOMENTO DE HACER CLICK EN SLOTS DISTRIBUTION---------------------------------------------
        // -----------------------------------------------------------------------------------------------------------------------
        _simpleCabinConditions(row, depId, numberOfSlotsInTheSameCabin, numberOfSlotsBlockedInTheSameCabin) {
            var layMaxBooking = row.layMaxBooking;
            var layPax = row.layPax;
            var bedsNumber = row.bedsNumber;
            var cabId = row.cabId;
            var avsId = row.avsId;

            if (layMaxBooking == 1 && bedsNumber == 1) {
                console.log("(*)CASO 1a:  layMaxBooking = 1 && bedsNumber == 1 && layPax == 1");
                this._setSingleConditionAndDisableShare(cabId, avsId);
            } else if (layMaxBooking == 1 && bedsNumber == 2) {
                console.log("(*)CASO 1b:  layMaxBooking = 1 && bedsNumber == 2 && layPax == 1");
                this._setSingleConditionAndDisableShare(cabId, avsId);
            } else {
                console.log("(*)CASO 1x:  Resto de condiciones => Mal configurada la cabina");
                console.log("Casos: 211/ 221/ 321 / 331 / 231");
                this.$store.commit("onlyEmptyConditions", { avsId });
            }
        },
        _doubleCabinConditions(row, depId, numberOfSlotsInTheSameCabin, numberOfSlotsBlockedInTheSameCabin, numberOfSlotsNAInTheSameCabin) {
            var layMaxBooking = row.layMaxBooking;
            var layPax = row.layPax;
            var bedsNumber = row.bedsNumber;
            var cabId = row.cabId;
            var avsId = row.avsId;
            var avsOrder = row.avsOrder;

            if (layMaxBooking == 1 && bedsNumber == 1) {    //OK
                console.log("(*)CASO 2a:  layMaxBooking = 1 && bedsNumber == 1 && layPax == 2 (Solo SS)");
                // if (numberOfSlotsInTheSameCabin == 0) {
                //     this._setSingleConditionAndDisableShare(cabId, avsId); 
                // } else if (numberOfSlotsInTheSameCabin >= 1) {
                //     console.log("Mayor a 2 slots");
                //     let codigoShow = 0;
                //     this._disableRestOfCabin(row, codigoShow);
                // }

                if (numberOfSlotsBlockedInTheSameCabin == 1) {                   
                    // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                    // En caso de que exista EDICION DE BLOQUEOS
                    if (numberOfSlotsInTheSameCabin == 0) {
                        console.log("Caso 1. 2a")
                        this._setSingleConditionAndDisableShare(cabId, avsId); 
                    } else {
                        console.log("Caso 2. 2a")
                        let codigoShow = 0;
                        this._disableRestOfCabin(row, codigoShow);
                    }
                } 
                else {
                    // En caso de que existan NUEVOS BLOQUEOS
                    if (numberOfSlotsInTheSameCabin == 0) {
                        console.log("Caso 3. 2a")
                        this._setSingleConditionAndDisableShare(cabId, avsId);
                    } else {
                        console.log("Caso 4. 2a")
                        let codigoShow = 0;
                        this._disableRestOfCabin(row, codigoShow);
                    }
                }
            } else if (layMaxBooking == 1 && bedsNumber == 2) {    //OK
                console.log("(*)CASO 2b:  layMaxBooking = 1 && bedsNumber == 2 && layPax == 2");
                // if (numberOfSlotsInTheSameCabin == 0) {
                //     this._setSingleConditionAndDisableShare(cabId, avsId);
                // } else if (numberOfSlotsInTheSameCabin >= 1) {
                //     let codigoShow = 0;
                //     this._disableRestOfCabin(row, codigoShow);
                // }

                if (numberOfSlotsBlockedInTheSameCabin == 1) {                   
                    // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                    // En caso de que exista EDICION DE BLOQUEOS
                    if (numberOfSlotsInTheSameCabin == 0) {
                        console.log("Caso 1. 2b")
                        this._setSingleConditionAndDisableShare(cabId, avsId);
                    } else {
                        console.log("Caso 2. 2b")
                        let codigoShow = 0;
                        this._disableRestOfCabin(row, codigoShow);
                    }
                } 
                else {
                    // En caso de que existan NUEVOS BLOQUEOS
                    if (numberOfSlotsInTheSameCabin == 0) {
                        // 1 slots seleccionados
                        console.log("Caso 3. 2b")
                        this._setSingleConditionAndDisableShare(cabId, avsId);
                    } else {
                        // 2 slots seleccionados
                        console.log("Caso 4. 2b")
                        let codigoShow = 0;
                        this._disableRestOfCabin(row, codigoShow);
                    }
                }
            } else if (layMaxBooking == 1 && bedsNumber == 3) {    //OK
                console.log("(*)CASO 2c:  layMaxBooking = 1 && bedsNumber == 3 && layPax == 2");
                // if (numberOfSlotsInTheSameCabin == 0) {
                //     this._setSingleConditionAndDisableShare(cabId, avsId);
                // } else if (numberOfSlotsInTheSameCabin >= 1) {
                //     let codigoShow = 0;
                //     this._disableRestOfCabin(row, codigoShow);
                // }
                if (numberOfSlotsBlockedInTheSameCabin == 1) {                   
                    // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                    // En caso de que exista EDICION DE BLOQUEOS
                    if (numberOfSlotsInTheSameCabin == 0) {
                        console.log("Caso 1. 2c")
                        this._setSingleConditionAndDisableShare(cabId, avsId);
                    } else {
                        console.log("Caso 2. 2c")
                        let codigoShow = 0;
                        this._disableRestOfCabin(row, codigoShow);
                    }
                } 
                else {
                    // En caso de que existan NUEVOS BLOQUEOS
                    if (numberOfSlotsInTheSameCabin == 0) {
                        // 1 slots seleccionados
                        console.log("Caso 3. 2c")
                        this._setSingleConditionAndDisableShare(cabId, avsId);
                    } else {
                        // 2 slots seleccionados
                        console.log("Caso 4. 2c")
                        let codigoShow = 0;
                        this._disableRestOfCabin(row, codigoShow);
                    }
                }

            } else if (layMaxBooking == 2 && bedsNumber == 2) {    //OK
                console.log("(*)CASO 2d:  layMaxBooking = 2 && bedsNumber == 2 && layPax == 2");

                // Valido primero que existan cabinas N/A y que exista 1
                if(numberOfSlotsNAInTheSameCabin >= 1){                  
                    this._setConditionInNA(row, cabId)
                }else{
                    // En caso de que no exista N/A. Bloqueo nuevo
                        if (numberOfSlotsBlockedInTheSameCabin == 1) {

                            // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                            // En caso de que exista EDICION DE BLOQUEOS
                            if (numberOfSlotsInTheSameCabin == 0) {
                                console.log("Caso 1. 2d")
                                this._conditionPreviousBlockedElement(row);
                            } else {
                                console.log("Caso 2. 2d")
                                let codigoShow = 0;
                                this.disableOrEnableAllSlotsInTheSameCabinWhenShare(row, codigoShow);
                            }
                        } 
                        else {
                            // En caso de que existan NUEVOS BLOQUEOS
                            if (numberOfSlotsInTheSameCabin == 0) {
                                console.log("Caso 3. 2d")
                                this._setSingleConditionAndEnableShare(cabId);
                            } else {
                                console.log("Caso 4. 2d")
                                let codigoShow = 0;
                                this.disableOrEnableAllSlotsInTheSameCabinWhenShare(row, codigoShow);
                            }
                        }
                }

            } else if (layMaxBooking == 2 && bedsNumber == 3) {    //OK
                console.log("(*)CASO 2e:  layMaxBooking = 2 && bedsNumber == 3 && layPax == 2");
                // if (numberOfSlotsBlockedInTheSameCabin == 1) {
                //     // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                //     this._conditionPreviousBlockedElement(row);
                // } else {
                //     if (numberOfSlotsInTheSameCabin == 0) {
                //         this._setSingleConditionAndEnableShare(cabId);
                //     } else {
                //         let codigoShow = 0;
                //         this.disableOrEnableAllSlotsInTheSameCabinWhenShare(row, codigoShow);
                //     }
                // }

                // Valido primero que existan cabinas N/A y que exista 1
                if(numberOfSlotsNAInTheSameCabin >= 1){                  
                    this._setConditionInNA(row, cabId)
                }else{
                        if (numberOfSlotsBlockedInTheSameCabin == 1) {
                            // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                            // En caso de que exista EDICION DE BLOQUEOS
                            if (numberOfSlotsInTheSameCabin == 0) {
                                console.log("Caso 1. 2e")
                                this._conditionPreviousBlockedElement(row);
                            } else {
                                console.log("Caso 2. 2e")
                                let codigoShow = 0;
                                this.disableOrEnableAllSlotsInTheSameCabinWhenShare(row, codigoShow);
                            }
                        } 
                        else {
                            // En caso de que existan NUEVOS BLOQUEOS
                            if (numberOfSlotsInTheSameCabin == 0) {
                                console.log("Caso 3. 2e")
                                this._setSingleConditionAndEnableShare(cabId);
                            } else {
                                console.log("Caso 4. 2e")
                                let codigoShow = 0;
                                this.disableOrEnableAllSlotsInTheSameCabinWhenShare(row, codigoShow);
                            }
                        }
                }

            } else {     //OK
                console.log("(*)CASO 2x: No entra en ninguna configuracion para DOBLE (Opciones: 212 / 332 / 312 /322 ) ==> impedir accion");
                this._setEmptyConditions(avsId);
            }
        },
        _tripleCabinConditions(row, depId, numberOfSlotsInTheSameCabin, numberOfSlotsBlockedInTheSameCabin, numberOfSlotsNAInTheSameCabin) {
            var layMaxBooking = row.layMaxBooking;
            var layPax = row.layPax;
            var bedsNumber = row.bedsNumber;
            var cabId = row.cabId;
            var avsId = row.avsId;
            var avsOrder = row.avsOrder;

            if (layMaxBooking == 1 && bedsNumber == 1) {
                console.log("(*)CASO 3a: max boking 1 & # camas 1 & layPax 3 ");
                
                if (numberOfSlotsInTheSameCabin == 0) {
                    console.log("Caso 1. 3a")
                    this._setSingleConditionAndDisableShare(cabId, avsId);
                } else if (numberOfSlotsInTheSameCabin > 0) {
                    console.log("Caso 2. 3a")
                    let codigoShow = 0;
                    this._disableRestOfCabin(row, codigoShow);
                }

            } else if (layMaxBooking == 1 && bedsNumber == 2) {
                console.log("(*)CASO 3b: max boking 1 & # camas 2 & layPax 3 ");
                if (numberOfSlotsInTheSameCabin == 0) {
                    console.log("Caso 1. 3b")
                    this._setSingleConditionAndDisableShare(cabId, avsId);
                } else if (numberOfSlotsInTheSameCabin > 0) {
                    console.log("Caso 2. 3b")
                    let codigoShow = 0;
                    this._disableRestOfCabin(row, codigoShow);
                }
            } else if (layMaxBooking == 1 && bedsNumber == 3) {
                console.log("(*)CASO 3c: max boking 1 & # camas 3 & layPax 3 ");
                if (numberOfSlotsInTheSameCabin == 0) {
                    console.log("Caso 1. 3c")
                    this._setSingleConditionAndDisableShare(cabId, avsId);
                } else if (numberOfSlotsInTheSameCabin > 0) {
                    console.log("Caso 2. 3c")
                    let codigoShow = 0;
                    this._disableRestOfCabin(row, codigoShow);
                }
            } else if (layMaxBooking == 2 && bedsNumber == 1) {
                console.log("(*)CASO 3d: max boking 2 & # camas 1 & layPax 3 ");      
                
                // Valido primero que existan cabinas N/A y que exista 2
                if(numberOfSlotsNAInTheSameCabin >= 2){                   
                    this._setConditionInNA(row, cabId)
                }else{
                        if (numberOfSlotsBlockedInTheSameCabin == 0) {
                            console.log("Caso 1.");
                            if (numberOfSlotsInTheSameCabin == 0) {
                                this.$store.commit("setSingleInCondition", { cabId });
                            } else if (numberOfSlotsInTheSameCabin > 0) {
                                // Deshabilito tercera cabina
                                let codigoShow = 0;
                                this._disableRestOfCabin(row, codigoShow);
                            }
                        } else if (numberOfSlotsBlockedInTheSameCabin >= 1) {
                            console.log("Caso 2.");
                            console.log("Existe un elemento bloqueado");
                            // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                            // Si es F o M, el slot restante obtendrá la condición
                            this._conditionPreviousBlockedElement(row);
                            // let codigoShow = 0;
                            // this._disableRestOfCabin(row, codigoShow);
                        }
                        else{
                            console.log("Caso 3. - No existe este caso");
                        }
                }
            } else if (layMaxBooking == 2 && bedsNumber == 2) {
                console.log("(*)CASO 3e: max boking 2 & # camas 2 & layPax 3 ");
                
                // Valido primero que existan cabinas N/A y que exista 2
                if(numberOfSlotsNAInTheSameCabin >= 2){                   
                    this._setConditionInNA(row, cabId)
                }else{
                        if (numberOfSlotsBlockedInTheSameCabin == 0) {
                            if (numberOfSlotsInTheSameCabin == 0) {
                                console.log("Caso 1. 3e")
                                this.$store.commit("setSingleInCondition", { cabId });
                            } else if (numberOfSlotsInTheSameCabin > 0) {
                                console.log("Caso 2. 3e")
                                // Deshabilito tercera cabina
                                let codigoShow = 0;
                                this._disableRestOfCabin(row, codigoShow);
                            }
                        } 
                        // else if (numberOfSlotsBlockedInTheSameCabin == 1) {
                        //     console.log("condicion 3.")
                        //     console.log("Existe un elemento bloqueado");
                        //     // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                        //     // En el método, añade el valor de bosStatus seleccionado al array
                        //     this._conditionPreviousBlockedElement(row);
                        // }

                        // Condiciones para edit en caso de tener 1 o más slots bloqueados
                        else if (numberOfSlotsBlockedInTheSameCabin >= 1) {
                            console.log("Caso 3. 3e");
                            // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                            // En el método, añade el valor de bosStatus seleccionado al array
                            //console.log("Row: " + JSON.stringify(row))
                            this._conditionPreviousBlockedElement(row);
                            // let codigoShow = 0;
                            // this._disableRestOfCabin(row, codigoShow);
                        }
                }
                                              
            } else if (layMaxBooking == 2 && bedsNumber == 3) {
                console.log("(*)CASO 3f: max boking 2 & # camas 3 & layPax 3 ");

                // Valido primero que existan cabinas N/A y que exista 2
                if(numberOfSlotsNAInTheSameCabin >= 2){                   
                    this._setConditionInNA(row, cabId)
                }else{
                        if (numberOfSlotsBlockedInTheSameCabin == 0) {
                            if (numberOfSlotsInTheSameCabin == 0) {
                                console.log("Caso 1. 3f")
                                this.$store.commit("setSingleInCondition", { cabId });
                            } else if (numberOfSlotsInTheSameCabin > 0) {
                                console.log("Caso 2. 3f")
                                // Deshabilito tercera cabina
                                let codigoShow = 0;
                                this._disableRestOfCabin(row, codigoShow);
                            }
                        } 
                        // else if (numberOfSlotsBlockedInTheSameCabin == 1) {
                        //     console.log("Existe un elemento bloqueado");
                        //     // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                        //     // En el método, añade el valor de bosStatus seleccionado al array
                        //     this._conditionPreviousBlockedElement(row);
                        // }
                        // Condiciones para edit en caso de tener 1 o más slots bloqueados
                        else if (numberOfSlotsBlockedInTheSameCabin >= 1) {
                            console.log("Caso 3. 3e");
                            // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                            // En el método, añade el valor de bosStatus seleccionado al array
                            this._conditionPreviousBlockedElement(row);
                            // let codigoShow = 0;
                            // this._disableRestOfCabin(row, codigoShow);
                        }    
                }            
            } else {
                console.log("No entra en ninguna configuracion para TRIPLE ==> impedir accion");
                console.log("Opciones: 313 / 323 /333 ");
                this.$store.commit("onlyEmptyConditions", { avsId });
            }
        },
        _cuadrupleCabinConditions(row, depId, numberOfSlotsInTheSameCabin, numberOfSlotsBlockedInTheSameCabin, numberOfSlotsNAInTheSameCabin, numberOfBlockedSlotsInMasterSuite) {
            var layMaxBooking = row.layMaxBooking;
            var layPax = row.layPax;
            var bedsNumber = row.bedsNumber;
            var cabId = row.cabId;
            var avsId = row.avsId;
            var avsOrder = row.avsOrder;

            if (layMaxBooking == 1 && bedsNumber == 1) {
                console.log("(*)CASO 4a: max boking 1 & # camas 1 & layPax 4 ");
                if (numberOfSlotsInTheSameCabin == 0) {
                    console.log("Caso 1. 4a");
                    this._setSingleConditionAndDisableShare(cabId, avsId);
                } else if (numberOfSlotsInTheSameCabin > 0) {
                    console.log("Caso 2. 4a");
                    // let codigoShow = 0;
                    // this._disableRestOfCabin(row, codigoShow);
                    // -------------- MASTER SUITE -------------- 
                    if(numberOfBlockedSlotsInMasterSuite === 2) this._setSingleConditionMasterSuite(cabId, 2)
                    if(numberOfBlockedSlotsInMasterSuite === 3) this._setSingleConditionMasterSuite(cabId, 3)
                    if(numberOfBlockedSlotsInMasterSuite === 4) this._setSingleConditionMasterSuite(cabId, 4)
                    this._setConditionsInMasterSuite(row);    
              
                    // -------------- FIN MASTER SUITE --------------                     
                }
            } else if (layMaxBooking == 1 && bedsNumber == 2) {
                console.log("(*)CASO 4b: max boking 1 & # camas 2 & layPax 4 ");
                if (numberOfSlotsInTheSameCabin == 0) {
                    console.log("Caso 1. 4b");
                    this._setSingleConditionAndDisableShare(cabId, avsId);
                } else if (numberOfSlotsInTheSameCabin > 0) {
                    console.log(" EJEMPLO: ==========> Caso 2. 4b");
                    //let codigoShow = 0;
                    //this._disableRestOfCabin(row, codigoShow);
                    console.log("numberOfBlockedSlotsInMasterSuite: " + numberOfBlockedSlotsInMasterSuite); 

                    // -------------- MASTER SUITE -------------- 
                    if(numberOfBlockedSlotsInMasterSuite === 2) this._setSingleConditionMasterSuite(cabId, 2)
                    if(numberOfBlockedSlotsInMasterSuite === 3) this._setSingleConditionMasterSuite(cabId, 3)
                    if(numberOfBlockedSlotsInMasterSuite === 4) this._setSingleConditionMasterSuite(cabId, 4)   
                    this._setConditionsInMasterSuite(row);                                     
                    // -------------- FIN MASTER SUITE --------------                     
                }
                // ===> ORIGINAL
                // else if (numberOfSlotsInTheSameCabin > 0) {
                //     console.log("Caso 2. 4b");
                //     let codigoShow = 0;
                //     this._disableRestOfCabin(row, codigoShow);  
                // }
            } else if (layMaxBooking == 1 && bedsNumber == 3) {
                console.log("(*)CASO 4c: max boking 1 & # camas 3 & layPax 4 ");
                if (numberOfSlotsInTheSameCabin == 0) {
                    console.log("Caso 1. 4c");
                    this._setSingleConditionAndDisableShare(cabId, avsId);
                } else if (numberOfSlotsInTheSameCabin > 0) {
                    console.log("Caso 2. 4c");
                    // let codigoShow = 0;
                    // this._disableRestOfCabin(row, codigoShow);

                    // -------------- MASTER SUITE -------------- 
                    if(numberOfBlockedSlotsInMasterSuite === 2) this._setSingleConditionMasterSuite(cabId, 2)
                    if(numberOfBlockedSlotsInMasterSuite === 3) this._setSingleConditionMasterSuite(cabId, 3)
                    if(numberOfBlockedSlotsInMasterSuite === 4) this._setSingleConditionMasterSuite(cabId, 4)
                    this._setConditionsInMasterSuite(row); 
                    // -------------- FIN MASTER SUITE --------------                     
                }
            } else if (layMaxBooking == 1 && bedsNumber == 4) {
                console.log("(*)CASO 4d: max boking 1 & # camas 4 & layPax 4 ");
                if (numberOfSlotsInTheSameCabin == 0) {
                    console.log("Caso 1. 4d");
                    this._setSingleConditionAndDisableShare(cabId, avsId);
                } else if (numberOfSlotsInTheSameCabin > 0) {
                    console.log(" Caso 2. 4d");
                    // let codigoShow = 0;
                    // this._disableRestOfCabin(row, codigoShow);

                    // -------------- MASTER SUITE -------------- 
                    if(numberOfBlockedSlotsInMasterSuite === 2) this._setSingleConditionMasterSuite(cabId, 2)
                    if(numberOfBlockedSlotsInMasterSuite === 3) this._setSingleConditionMasterSuite(cabId, 3)
                    if(numberOfBlockedSlotsInMasterSuite === 4) this._setSingleConditionMasterSuite(cabId, 4)
                    this._setConditionsInMasterSuite(row); 
                    // -------------- FIN MASTER SUITE --------------                     
                }
            } else if (layMaxBooking == 2 && bedsNumber == 1) {
                console.log("(*)CASO 4e: max boking 2 & # camas 1 & layPax 4 ");


                // Valido primero que existan cabinas N/A y que exista 3
                if(numberOfSlotsNAInTheSameCabin >= 3){                   
                    this._setConditionInNA(row, cabId)
                }else{
                        if (numberOfSlotsBlockedInTheSameCabin == 0) {
                            if (numberOfSlotsInTheSameCabin == 0) {
                                this.$store.commit("setSingleInCondition", { cabId });
                            } else if (numberOfSlotsInTheSameCabin > 0) {
                                // Deshabilito tercera cabina
                                // let codigoShow = 0;
                                // this._disableRestOfCabin(row, codigoShow);

                                // -------------- MASTER SUITE -------------- 
                                if(numberOfBlockedSlotsInMasterSuite === 2) this._setSingleConditionMasterSuite(cabId, 2)
                                if(numberOfBlockedSlotsInMasterSuite === 3) this._setSingleConditionMasterSuite(cabId, 3)
                                if(numberOfBlockedSlotsInMasterSuite === 4) this._setSingleConditionMasterSuite(cabId, 4)
                                this._setConditionsInMasterSuite(row); 
                                // -------------- FIN MASTER SUITE --------------                                 
                            }
                        } else if (numberOfSlotsBlockedInTheSameCabin == 1) {
                            // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                            // En el método, añade el valor de bosStatus seleccionado al array
                            this._conditionPreviousBlockedElement(row);
                        }
                }
            } else if (layMaxBooking == 2 && bedsNumber == 2) {
                console.log("(*)CASO 4f: max boking 2 & # camas 2 & layPax 4 ");

                // Valido primero que existan cabinas N/A y que exista 3
                if(numberOfSlotsNAInTheSameCabin >= 3){                   
                    this._setConditionInNA(row, cabId)
                }else{

                        if (numberOfSlotsBlockedInTheSameCabin == 0) {
                            if (numberOfSlotsInTheSameCabin == 0) {
                                this.$store.commit("setSingleInCondition", { cabId });
                            } else if (numberOfSlotsInTheSameCabin > 0) {
                                // Deshabilito tercera cabina
                                // let codigoShow = 0;
                                // this._disableRestOfCabin(row, codigoShow);

                                // -------------- MASTER SUITE -------------- 
                                if(numberOfBlockedSlotsInMasterSuite === 2) this._setSingleConditionMasterSuite(cabId, 2)
                                if(numberOfBlockedSlotsInMasterSuite === 3) this._setSingleConditionMasterSuite(cabId, 3)
                                if(numberOfBlockedSlotsInMasterSuite === 4) this._setSingleConditionMasterSuite(cabId, 4)
                                this._setConditionsInMasterSuite(row); 
                                // -------------- FIN MASTER SUITE --------------                                 
                            }
                        } else if (numberOfSlotsBlockedInTheSameCabin == 1) {
                            console.log("Existe un elemento bloqueado");
                            // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                            // En el método, añade el valor de bosStatus seleccionado al array
                            this._conditionPreviousBlockedElement(row);
                        }
                }
            } else if (layMaxBooking == 2 && bedsNumber == 3) {
                console.log("(*)CASO 4g: max boking 2 & # camas 3 & layPax 4 ");

                // Valido primero que existan cabinas N/A y que exista 3
                if(numberOfSlotsNAInTheSameCabin >= 3){                   
                    this._setConditionInNA(row, cabId)
                }else{
                        if (numberOfSlotsBlockedInTheSameCabin == 0) {
                            if (numberOfSlotsInTheSameCabin == 0) {
                                this.$store.commit("setSingleInCondition", { cabId });
                            } else if (numberOfSlotsInTheSameCabin > 0) {
                                // Deshabilito tercera cabina
                                // let codigoShow = 0;
                                // this._disableRestOfCabin(row, codigoShow);

                                // -------------- MASTER SUITE -------------- 
                                if(numberOfBlockedSlotsInMasterSuite === 2) this._setSingleConditionMasterSuite(cabId, 2)
                                if(numberOfBlockedSlotsInMasterSuite === 3) this._setSingleConditionMasterSuite(cabId, 3)
                                if(numberOfBlockedSlotsInMasterSuite === 4) this._setSingleConditionMasterSuite(cabId, 4)
                                this._setConditionsInMasterSuite(row); 
                                // -------------- FIN MASTER SUITE --------------                                 
                            }
                        } else if (numberOfSlotsBlockedInTheSameCabin == 1) {
                            console.log("Existe un elemento bloqueado");
                            // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                            // En el método, añade el valor de bosStatus seleccionado al array
                            this._conditionPreviousBlockedElement(row);
                        }
                }
            } else if (layMaxBooking == 2 && bedsNumber == 4) {
                console.log("(*)CASO 4h: max boking 2 & # camas 4 & layPax 4 ");

                // Valido primero que existan cabinas N/A y que exista 3
                if(numberOfSlotsNAInTheSameCabin >= 3){                   
                    this._setConditionInNA(row, cabId)
                }else{                
                        if (numberOfSlotsBlockedInTheSameCabin == 0) {
                            if (numberOfSlotsInTheSameCabin == 0) {
                                this.$store.commit("setSingleInCondition", { cabId });
                            } else if (numberOfSlotsInTheSameCabin > 0) {
                                // Deshabilito tercera cabina
                                // let codigoShow = 0;
                                // this._disableRestOfCabin(row, codigoShow);

                                // -------------- MASTER SUITE -------------- 
                                if(numberOfBlockedSlotsInMasterSuite === 2) this._setSingleConditionMasterSuite(cabId, 2)
                                if(numberOfBlockedSlotsInMasterSuite === 3) this._setSingleConditionMasterSuite(cabId, 3)
                                if(numberOfBlockedSlotsInMasterSuite === 4) this._setSingleConditionMasterSuite(cabId, 4)
                                this._setConditionsInMasterSuite(row); 
                                // -------------- FIN MASTER SUITE --------------                                 
                            }
                        } else if (numberOfSlotsBlockedInTheSameCabin == 1) {
                            console.log("Existe un elemento bloqueado");
                            // VALIDACION EN CASO DE EXISTIR ELEMENTO BLOQUEADO PREVIAMENTE
                            // En el método, añade el valor de bosStatus seleccionado al array
                            this._conditionPreviousBlockedElement(row);
                        }
                }
            } else {
                console.log("No entra en ninguna configuracion para TRIPLE ==> impedir accion");
                console.log("Opciones: 314 / 324 /334 /414 /424/434/444 ");
                this.$store.commit("onlyEmptyConditions", { avsId });
            }
        },

        _setSingleConditionAndDisableShare(cabId, avsId) {
            this.$store.commit("setSingleInCondition", { cabId });
            this.$store.commit("onlySingleConditionInDouble", { avsId });
        },
        // --------------- ----------------------------------------MÉTODOS PARA MASTER SUITE  -------------------------------------
        // ----------------------------------------------------------------------------------------------------------------------
        _setSingleConditionMasterSuite(cabId, conAdult) {
            this.$store.commit("setSingleInConditionMasterSuite", { cabId, conAdult });
        },   
        _setConditionsInMasterSuite(row) {
            let cabId = row.cabId
            this.$store.commit("setConditionsInMasterSuite", { cabId});           
        },             
        // ----------------------------------------------------------------------------------------------------------------------
        // --------------- ---------------------------------------- FIN MÉTODOS PARA MASTER SUITE  -------------------------------------
        
        _setSingleConditionAndEnableShare(cabId) {
            this.$store.commit("setSingleInCondition", { cabId });
        },
        _disableRestOfCabin(row, codigoShow) {
            this.disableOrEnableAllSlotsInTheSameCabinWhenShare(row, codigoShow);
        },
        

        _setEmptyConditions(avsId) {
            this.$store.commit("onlyEmptyConditions", { avsId });
        },
        _setConditionInNA(row, cabId) { // ======================= > REVISADO < ====================
            console.log("Existen elementos con N/A (1 para dobles, 2 para triples y 3 para cuadruples)")
            // SOLO OCURRIRA EN CABINAS TRIPLES DONDE SE SELECCIONES F o M.
            // PARA SLOTS CON SS, NO APLICA DEBIDO A QUE TODA LA CABINA SE BLOQUEA

            // a). Extraigo los elementos de la misma cabina
            var slotsInSameCabId = this.rowData.filter((item) => item.avsCabinId === cabId)

            // b). Busco en la misma cabina, los slots que tengan booking 
            var slotsWithBooking = slotsInSameCabId.filter((item) => item.booking != null)

            // c). Del array anterior, selecciono bosConditionLinked 2 o 3
            if(slotsWithBooking.length > 0){
                var linkedStatusArray = slotsWithBooking.map(a => a.booking).filter(function(item) {
                    return (item.bosConditionLinked == 2 || item.bosConditionLinked == 3)
                }).map(a => a.bosConditionLinked);

                const linkedStatus = parseInt([... new Set(linkedStatusArray)]);               
                //console.log("linkedStatus: " + linkedStatus);
                if(Boolean(linkedStatus)){
                    // En caso de existir bosConditionLinked, setear directamente la condición en el slot
                    this._conditionPreviousNAWithStatus(row, linkedStatus);
                    this.messageNA="";
                }else{
                    // En caso de no existir valor de bosConditionLinked, traer solo condiciones Share
                    let codigo = 1;   
                    let avsId = row.avsId;                 
                    let cabId = row.cabId;    
                    this.$store.commit("onlyBothShareInTriple", { avsId });
                    this.$store.commit("setShareCondition", { cabId, codigo });

                    this.messageNA="Make sure to select the correct condition according to the original slot"
                }

            }
        },

    }
};
