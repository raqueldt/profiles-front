export default {
    data() {
        return {};
    },
    created() {
        //console.log("RowData: " + this.departure.cabins.map(a => a.slots).flat().length)



    },
    methods: {
        calculateTotalByDeparture(item) {
            let total =
                parseInt(this.calculateCruPaxLimit(item)) -
                parseInt(this.calculateBlocked(item)) -
                parseInt(this.calculateConfirmed(item)) -
                parseInt(this.calculateAllotment(item)) -
                parseInt(this.calculateDisabled(item)) -
                parseInt(this.calculateCancelledAndFree(item)) -
                parseInt(this.calculateCancelledButNotFree(item)) -
                parseInt(this.calculateNotAvailable(item));
            return total < 0 ? 0 : total;
        },
        calculateCruPaxLimit(item) {
            return parseInt(item.cruPaxLimit);
        },
        calculateDisabled(item) {
            var tag = 0;
            return parseInt(this.calculate(item, tag));
        },
        calculateBlocked(item) {
            var tag = 1;
            return parseInt(this.calculate(item, tag));
        },
        calculateConfirmed(item) {
            var tag = 2;
            return parseInt(this.calculate(item, tag));
        },
        calculateCancelledAndFree(item) {
            var tag = 3;
            return parseInt(this.calculate(item, tag));
        },
        calculateCancelledButNotFree(item) {
            var tag = 4;
            return parseInt(this.calculate(item, tag));
        },
        calculateAllotment(item) {
            var tag = 5;
            return parseInt(this.calculate(item, tag));
        },
        calculateNotAvailable(item) {
            var tag = 6;
            return parseInt(this.calculate(item, tag));
        },
        // calculateNotAvailable(item) {
        //     var tag = 6;
        //     var slotsWithBooking = 0;
        //     item.cabins.map(function(cabin) {
        //         cabin.slots.map(function(slot) {
        //             if (Boolean(slot.booking)) {
        //                 if (slot.booking.bosStatus == tag && slot.booking.bosCondition == 0)
        //                     slotsWithBooking += 1;
        //             }
        //         });
        //     });
        //     return parseInt(slotsWithBooking);
        // },

        calculate(departure, tag) {
            var slotsWithBooking = 0;
            departure.cabins.map(function(cabin) {
                cabin.slots.map(function(slot) {
                    if (Boolean(slot.booking)) {
                        if (slot.booking.bosStatus == tag.toString()) slotsWithBooking += 1;
                    }
                });
            });
            return parseInt(slotsWithBooking);
        }
    },
    computed: {
        // TOTAL DE ESPACIOS

        cruPaxLimit() {
            return this.departure.cruPaxLimit ? this.departure.cruPaxLimit : 16;
        },

        // ---------------------------- METODO PARA MOSTRAR DISPONIBILIDAD REAL EN DISPONIBILIDAD  ----------------------------
        // Usado en DeparturesSlots / DeparturesPrices / DeparturesInfo

        realFreeSlots() {
            //1. Primero cuento si existen 16 espacios o mas con N/A
            const totalNA = this.sumTotalNA;

            if  (totalNA  >= 16)
                return 0


            //2. Caso contrario, continuo el conteo normal
            const rowDataLength = this.departure.cabins.map(a => a.slots).flat().length;
            const cruPaxLimit = this.departure.cruPaxLimit;

            if ( rowDataLength === 16 ) // Caso 1. Solo Archipel
               return this.slotsFree;

            // Caso 2. Aqua / Treasure / Solaris
            const maxPax = cruPaxLimit - this.slotsAvailableOnlyColoredSlots;
            const maxSlots = rowDataLength - this.slotsAvailableMoreSpaces;

            // TODO: evitar if else

            if( maxPax > maxSlots) {
                if ( maxSlots <= 0 )
                   return 0
                else
                   return maxSlots
            } else if ( maxSlots > maxPax) {
                if( maxPax <= 0 )
                   return 0
                else
                   return maxPax
            } else if ( maxSlots === maxPax) {

              if ( maxSlots <= 0 )
                 return 0
              else
                 return maxSlots
            }


        },
        // ---------------------------- FIN METODO PARA MOSTRAR DISPONIBILIDAD REAL EN DISPONIBILIDAD  ----------------------------

        slotsAvailable(){
            let total = this.cruPaxLimit - this.totalWorkingSlots;
            return total >= 0 ? total : 0;
        },
        totalWorkingSlots(){
            let total =
            this.slotsBlocked
            + this.slotsConfirmed
            + this.slotsAllotments
            + this.sumDisableBlocked
            + this.sumDisableConfirmed
            + this.sumDisableAllotments
            //+ this.sumGray
            //+ this.sumDisableGray

            + this.sumBlockedNA
            + this.sumConfirmedNA
            + this.sumAllotmentsNA;
            return total >= 0 ? total : 0;
        },

        //Atributos usados para cálculos en barcos Aqua, Treasure, Solaris:
        slotsAvailableOnlyColoredSlots(){
            let total = this.totalWorkingSlots;
            return total >= 0 ? total : 0;
        },
        slotsAvailableMoreSpaces(){
            let total =  this.totalWorkingSlotsMoreSpaces;
            return total >= 0 ? total : 0;
        },
        totalWorkingSlotsMoreSpaces(){
            let total =
            this.slotsBlocked
            + this.slotsConfirmed
            + this.slotsAllotments

            + this.sumDisableBlocked        // Slots con amarillo inhabilitado para bloqueos
            + this.sumDisableConfirmed      // Slots con amarillo inhabilitado para confirmados
            + this.sumDisableAllotments     // Slots con amarillo inhabilitado para allotments
            + this.sumGray                  // Slots con amarillo inhabilitado para bloqueos
            + this.sumNAGray
            + this.sumDisableGray
            + this.sumDisabledGrayNA
            + this.sumBlockedNA
            + this.sumConfirmedNA
            + this.sumAllotmentsNA;
            return total >= 0 ? total : 0;
        },

        // contar el número de slots bloqueados
        slotsBlocked() {
            var slotsWithBooking = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if ((slot.booking.bosStatus == 1)) slotsWithBooking += 1;
                            // if ((slot.booking.bosStatus == 0) && (slot.booking.bosCondition == 1)) slotsWithBooking += 1;
                        }
                    });
                });
                return slotsWithBooking;
            }
        },

        slotsAllotments() {
            var slotsWithBooking = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 5) slotsWithBooking += 1;
                        }
                    });
                });
                return slotsWithBooking;
            }
        },

        slotsDisabled() {
            var slotsWithBooking = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 0 && slot.booking.bosCondition == 0)
                                slotsWithBooking += 1;
                        }
                    });
                });
                return slotsWithBooking;
            }
        },
        slotsConfirmed() {
            var slotsWithBooking = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 2) slotsWithBooking += 1;
                        }
                    });
                });
                return slotsWithBooking;
            }
        },
        slotsCanceledAndFree() {
            var slotsWithBooking = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 3) slotsWithBooking += 1;
                        }
                    });
                });
                return slotsWithBooking;
            }
        },
        slotsCanceledAndNotFree() {
            var slotsWithBooking = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 4) slotsWithBooking += 1;
                        }
                    });
                });
                return slotsWithBooking;
            }
        },

        slotsNA() {
            var slotsWithBooking = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 6 && slot.booking.bosStatusLinked != 0 ) slotsWithBooking += 1;
                        }
                    });
                });
                return slotsWithBooking;
            }
        },
        slotsNAEnGris() {
            var slotsWithBooking = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 6 && slot.booking.bosStatusLinked == 0 ) slotsWithBooking += 1;
                        }
                    });
                });
                return slotsWithBooking;
            }
        },
        slotsFree() {
            var slotsWithBooking = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (!Boolean(slot.booking)) {
                            slotsWithBooking += 1;
                        }
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 3) slotsWithBooking += 1;
                        }
                    });
                });
                return slotsWithBooking;
            }
        },

        // ----------------------------------------------------------------------------------------------------------
        sumDisableBlocked(){
            var result = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {

                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus === 6
                                && slot.booking.bosCondition === 0
                                && slot.booking.bosStatusLinked === 1
                                && slot.booking.bosConditionLinked != 0) result += 1;
                        }
                    });
                });
                return result;
            }
        },
        sumDisableConfirmed(){
            var result = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {

                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 6
                                && slot.booking.bosCondition == 0
                                && slot.booking.bosStatusLinked == 2
                                && slot.booking.bosConditionLinked != 0) result += 1;
                        }
                    });
                });
                return result;
            }
        },
        sumDisableAllotments(){
            var result = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {

                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 6
                                && slot.booking.bosCondition == 0
                                && slot.booking.bosStatusLinked == 5
                                && slot.booking.bosConditionLinked != 0) result += 1;
                        }
                    });
                });
                return result;
            }
        },
        sumGray(){
            // Pueden ser S , F o M pero en color gris después de bloquear un single o en una triple
            var result = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 0  && slot.booking.bosCondition != 0
                                ) result += 1;
                        }
                    });
                });
                return result;
            }
        },
        sumNAGray(){
            // Pueden ser S , F o M pero en color gris después de bloquear un single o en una triple
            var result = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 0
                                && slot.booking.bosCondition == 0
                                ) result += 1;
                        }
                    });
                });
                return result;
            }
        },
        sumDisableGray(){
            var result = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 6
                                && slot.booking.bosCondition == 0
                                && slot.booking.bosStatusLinked == 0
                                && slot.booking.bosConditionLinked != 0
                                ) result += 1;
                        }
                    });
                });
                return result;
            }
        },
        sumTotalNA(){
           
            let total =
            this.sumBlockedNA
            + this.sumConfirmedNA
            + this.sumAllotmentsNA
            + this.sumGrayNA
            + this.sumDisabledGrayNA;

            console.log("-------------------------------------------------");
            if(this.departure.depId === 1754){
                    console.log("DEPID: " + JSON.stringify(this.departure.depId));
                    console.log("depStartDate: " + JSON.stringify(this.departure.depStartDate));
                    console.log("depEndDate: " + JSON.stringify(this.departure.depEndDate));
                    console.log("this.sumBlockedNA: " + this.sumBlockedNA);
                    console.log("this.sumConfirmedNA: " + this.sumConfirmedNA);
                    console.log("this.sumAllotmentsNA: " + this.sumAllotmentsNA);
                    console.log("this.sumGrayNA: " + this.sumGrayNA);
                    console.log("this.sumDisabledGrayNA: " + this.sumDisabledGrayNA);
                    console.log("==> total: " + total);
            }


            return total >= 0 ? total : 0;
        },
        sumBlockedNA(){
            var result = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 6
                                && slot.booking.bosCondition == 0
                                && slot.booking.bosStatusLinked == 1
                                && slot.booking.bosConditionLinked == 0) result += 1;
                        }
                    });
                });
                return result;
            }
        },
        sumConfirmedNA(){
            var result = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 6
                                && slot.booking.bosCondition == 0
                                && slot.booking.bosStatusLinked == 2
                                && slot.booking.bosConditionLinked == 0) result += 1;
                        }
                    });
                });
                return result;
            }
        },
        sumAllotmentsNA(){
            var result = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 6
                                && slot.booking.bosCondition == 0
                                && slot.booking.bosStatusLinked == 5
                                && slot.booking.bosConditionLinked == 0) result += 1;
                        }
                    });
                });
                return result;
            }
        },
        sumGrayNA(){
            var result = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 0
                                && slot.booking.bosCondition == 0) result += 1;
                        }
                    });
                });
                return result;
            }
        },
        sumDisabledGrayNA(){
            var result = 0;
            if (Boolean(this.departure.cabins)) {
                this.departure.cabins.map(function(cabin) {
                    cabin.slots.map(function(slot) {
                        if (Boolean(slot.booking)) {
                            if (slot.booking.bosStatus == 6
                                && slot.booking.bosCondition == 0
                                && slot.booking.bosStatusLinked == 0
                                && slot.booking.bosConditionLinked == 0) result += 1;
                        }
                    });
                });
                return result;
            }
        },


    }
};
