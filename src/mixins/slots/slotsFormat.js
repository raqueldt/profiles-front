export default {
    data() {
        return {};
    },
    mounted() {},
    created() {},
    computed: {},
    methods: {
        // -----------------------------------------------------------------------------------------------------------------------
        // --------------------------------------METODOS PARA COLOR DE SLOTS EN BLOQUEOS Y RELOCATION-----------------------
        // -----------------------------------------------------------------------------------------------------------------------

        _getNumberSlot(avsTag){
            // if (avsTag.length == 2) return avsTag.slice(1, 2);
            // else if (avsTag.length == 3) return avsTag.slice(2, 3);
            return avsTag.slice(0, -1)
        },
        _formatDay(avsTag, avsOrder, bosStatus, bosCondition, bosIdLinked, bosConditionLinked) {
            if (!Boolean(bosIdLinked) && !Boolean(bosConditionLinked)  && !Boolean(bosConditionLinked)) {    // En caso de que existan slots bloqueados o confirmados

                        if (bosStatus == null && bosCondition == null) {
                            if (Boolean(avsTag)) return this._getNumberSlot(avsTag);
                            else return "-";
                        }
                        else if (bosStatus == 3) {
                            //Slots cancelado desde lista de pasajeros
                            if (Boolean(avsTag)) return this._getNumberSlot(avsTag);
                            else return "-";
                        } else if (bosStatus == 0 && bosCondition == 0) {
                            //Inhabilitado
                            return "N/A";
                        } else if (bosStatus == 6 && bosCondition == 0) {
                            //Itineario combinado
                            return "N/A";
                        }
                        else {

                            // Para slots bloqueados o confirmados, se debe mantener el número y letra

                            switch (bosCondition) {
                                case 0:
                                    return this._getNumberSlot(avsTag);
                                case 1:
                                    return "S";
                                case 2:
                                    return "M";
                                case 3:
                                    return "F";
                                default:
                                    return "-";
                            }
                        }
            }else{      // Para el caso de los slots combinados (debe mantener el tag del slot original)
                switch (bosConditionLinked) {
                    case 0:
                        return "N/A";
                    case 1:
                        return "S";
                    case 2:
                        return "M";
                    case 3:
                        return "F";
                    default:
                        return "-";
                }
            }

        },

        _formatSlots( status ) {
            //Revisar colores en _voyager.scss 1374
            switch (status) {
                case 0:
                    return "in"; //0. inhabilitado
                case 1:
                    return "bl"; // 1. Bloqueado
                case 2:
                    return "pb"; // 2. Confirmado
                case 3:
                    return "av"; // 3. Cancelado (se libera el slot) mismo color de confirmacion
                case 5:
                    return "al"; // 5. Allotments
                case 6:
                    return "in"; // 6. TODO. Definir color para N/A Itinearios combinados
                default:
                    return "av";
            }
        },
        _formatEditSlots(status) {
            //Revisar colores en _voyager.scss 1374
            switch (status) {
                case 0:
                    return "in"; //0. inhabilitado
                case 1:
                    return "bl"; // 1. Bloqueado
                case 2:
                    return "pb"; // 2. Confirmado
                case 3:
                    return "av"; // 3. Cancelado (se libera el slot) mismo color de confirmacion
                case 5:
                    return "al"; // 5. Allotments
                case 6:
                    return "in"; // 6. TODO. Definir color para N/A Itinearios combinados
                default:
                    return "av";
            }
        },
        _formatCombinedSlots(status) {
            //Revisar colores en _voyager.scss 1374
            switch (status) {
                case 0:
                    //return "bl-combined"; //0. inhabilitado
                    return "in"; //0. inhabilitado
                case 1:
                    return "bl-combined"; // 1. Bloqueado
                case 2:
                    return "pb-combined"; // 2. Confirmado
                case 3:
                    return "av"; // 3. Cancelado (se libera el slot) mismo color de confirmacion
                case 5:
                    return "al-combined"; // 5. Allotments
                case 6:
                    return "in-combined"; // 6. TODO. Definir color para N/A Itinearios combinados
                default:
                    return "av";
            }
        },

        _formatStatus(status) {
            switch (status) {
                case 0:
                    return "Disabled";
                case 1:
                    return "Single Supplement";
                case 2:
                    return "Share M";
                case 3:
                    return "Share F";
                default:
                    return "Blocked";
            }
        },
        _disableButton( slot ) {
            if (Boolean(slot.booking) ) {
                if( (slot.booking.bosStatus === 0)){
                return true;
                }else{
                return false;
                }
           }
         },
         _disableButtonInBlocking  ( slot ) {
            if (Boolean(slot.booking) ) {
                if((slot.booking.bosStatus === 0)
                    // || (slot.booking.bosStatus === 1)
                    // || (slot.booking.bosStatus === 2)
                    || (slot.booking.bosStatus === 5)
                    || (slot.booking.bosStatus === 6)){
                return true;
                }
           }else if (!Boolean(slot.booking) ) {
                return false
           }
         },
        //  _disableButtonInEditBooking  ( slot ) {
        //     if (Boolean(slot.booking) ) {
        //         if((slot.booking.bosStatus === 0)
        //             // || (slot.booking.bosStatus === 1)
        //             // || (slot.booking.bosStatus === 2)
        //             //|| (slot.booking.bosStatus === 5)
        //             || (slot.booking.bosStatus === 6)){
        //         return true;
        //         }
        //    }else if (!Boolean(slot.booking) ) {
        //         return false
        //    }
        //  },

        // 2 PARAMETROS
        _disableButtonInEditBooking  ( slot, selectedSlots ) {
            var avsIdSelected = slot.avsId;
            var checkAvsId = selectedSlots.includes(avsIdSelected)
            if(!checkAvsId){
                        if (Boolean(slot.booking) ) {
                                if(
                                    (slot.booking.bosStatus == 0)
                                    || (slot.booking.bosStatus === 1)
                                    || (slot.booking.bosStatus === 2)
                                    || (slot.booking.bosStatus === 5)
                                    || (slot.booking.bosStatus === 6)
                                ) {
                                // || (slot.booking.bosStatus === 1)
                                // || (slot.booking.bosStatus === 2)
                                //|| (slot.booking.bosStatus === 5)
                                //|| (slot.booking.bosStatus === 6)
                                return true;
                            }
                    }else if (!Boolean(slot.booking) ) {
                            return false
                    }
            }
         },
        //  _disableButtonInEditBooking  ( slot ) {
        //                 if (Boolean(slot.booking) ) {
        //                         if(
        //                             (slot.booking.bosStatus == 0)
        //                             || (slot.booking.bosStatus === 1)
        //                             || (slot.booking.bosStatus === 2)
        //                             || (slot.booking.bosStatus === 5)
        //                             || (slot.booking.bosStatus === 6)
        //                         ) {
        //                         // || (slot.booking.bosStatus === 1)
        //                         // || (slot.booking.bosStatus === 2)
        //                         //|| (slot.booking.bosStatus === 5)
        //                         //|| (slot.booking.bosStatus === 6)
        //                         return true;
        //                     }
        //             }else if (!Boolean(slot.booking) ) {
        //                     return false
        //             }
        //  },
        //  _formatSlotsEditBooking(slot) {

        //     if ( slot.booking ) {
        //         var status = slot.booking.bosStatus;
        //         var bosConditionLinked = slot.booking.bosConditionLinked;
        //         var bosIdLinked = slot.booking.bosIdLinked;
        //            if (!Boolean(bosIdLinked) && !Boolean(bosConditionLinked)) {    // En caso de que existan slots bloqueados o confirmados
        //                 if ( status ==0) return 'in'
        //                 else return this._formatEditSlots(status)

        //            }else{
        //                return this._formatCombinedSlots(bosConditionLinked)
        //            }
        //       }
        //       return "av"

        //     // ORIGINAL
        //     // if ( slot.booking ) {
        //     //     var status = slot.booking.bosStatus;
        //     //     if ( status ==0) return 'in'
        //     //   }
        //     //   return "av"

        //   },
          _formatSlotsEditBooking(slot, selectedSlots) {
            var avsIdSelected = slot.avsId;
            var checkAvsId = selectedSlots.includes(avsIdSelected)
            if(!checkAvsId){
            if ( slot.booking ) {
                var status = slot.booking.bosStatus;
                var bosConditionLinked = slot.booking.bosConditionLinked;
                var bosIdLinked = slot.booking.bosIdLinked;
                   if (!Boolean(bosIdLinked) && !Boolean(bosConditionLinked)) {    // En caso de que existan slots bloqueados o confirmados
                        if ( status ==0) return 'in'
                        else return this._formatEditSlots(status)

                   }else{
                       return this._formatCombinedSlots(bosConditionLinked)
                   }
              }
              return "av"

            // ORIGINAL
            // if ( slot.booking ) {
            //     var status = slot.booking.bosStatus;
            //     if ( status ==0) return 'in'
            //   }
            //   return "av"
            }
          },

         _formatSlotsAvailability(slot, realFreeSlots = 0 ) {

          if ( realFreeSlots == 0 && !Boolean( slot.booking) )
            return 'disabled'

          if ( slot.booking ) {


            const status = slot.booking.bosStatus;
            const bosConditionLinked = slot.booking.bosConditionLinked;
            const bosIdLinked = slot.booking.bosIdLinked;
            const bosStatusLinked = slot.booking.bosStatusLinked;

            if ( !Boolean(bosIdLinked) && !Boolean(bosConditionLinked) )     // En caso de que existan slots bloqueados o confirmados
              return this._formatSlots(status)
            else
              return this._formatCombinedSlots(bosStatusLinked)

           }

           return "av"


         },

          _formatSlotsRelocated(slot, avsId) {
            var status = slot.bosStatus;
            if (avsId === this.avsId) return "primary";
            else {

                if ( slot.booking ) {
                    var status = slot.booking.bosStatus;
                    var bosConditionLinked = slot.booking.bosConditionLinked;
                    var bosIdLinked = slot.booking.bosIdLinked;
                    var bosStatusLinked = slot.booking.bosStatusLinked;
                       if (!Boolean(bosIdLinked) && !Boolean(bosConditionLinked)) {    // En caso de que existan slots bloqueados o confirmados
                           return this._formatSlots(status)
                       }else{
                           return this._formatCombinedSlots(bosStatusLinked)
                       }
                  }

            }

            // ORIGINAL
            // if (avsId === this.avsId) return "primary";
            // else
            // return this._formatSlots(status);
        },

        // _getBosConditionLinked(){
        //     console.log("Llamando a condition linked")
        //     if(Boolean(this.space)) console.log("Llamando: " + JSON.stringify(this.space.slots))
        //     // this.$store.commit('setSelectedValueInCondition', {
        //     //     avsId,
        //     //     codigo
        //     //   });
        // }

        // -----------------------------------------------------------------------------------------------------------------------
        // --------------------------------------FIN METODOS PARA COLOR DE SLOTS EN BLOQUEOS Y RELOCATION-------------------
        // -----------------------------------------------------------------------------------------------------------------------
    }
};
