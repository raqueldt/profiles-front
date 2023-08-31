
export default {
    data() {
        return { };
    },
    created() { },
    methods: {

        /* ************ FUNCION PARA RECORRER REFS *********** */

        _getRef(indexClicked, indiceARecorrer){     
              var result = this._getSelectableTable(this.indiceFechaInicio);
              result.selectRow(indiceARecorrer);
              this.indexClicked = indiceARecorrer;
          },
          _clearRef(indexFechaInicio){          
            // Limpia (o hace clearSelected del resto de las demás tablas distintas a la seleccionada por indexFechaInico
            for(var [key, value] in Object.entries(this.groupedByFechaInicio)){
              if(key != indexFechaInicio){
                  var result = this._getSelectableTable(key);
                  result.clearSelected();
              }
            }
          },          
          _getSelectableTable(indiceFechaInicio){
            var resultado = "";
            for(var a in this.$refs){
              for(var i in a){              
                if(a.includes("selectableTable")){
                  switch (parseInt(indiceFechaInicio)) {
                      case 0:
                          resultado = this.$refs.selectableTable0[0];
                        break;
                      case 1:
                        resultado = this.$refs.selectableTable1[0];
                        break;
                      case 2:
                        resultado = this.$refs.selectableTable2[0]
                        break;
                      case 3:
                        resultado = this.$refs.selectableTable3[0]
                        break;                        
                      case 4:
                        resultado = this.$refs.selectableTable4[0]
                        break;
                        case 5:
                          resultado = this.$refs.selectableTable5[0]
                        break;
                        case 6:
                          resultado = this.$refs.selectableTable6[0]
                        break;
                        case 7:
                          resultado = this.$refs.selectableTable7[0]
                        break;
                        case 8:
                          resultado = this.$refs.selectableTable8[0]
                        break;
                        case 9:
                          resultado = this.$refs.selectableTable9[0]
                        break;
                        case 10:
                          resultado = this.$refs.selectableTable10[0]
                        break;
                        case 11:
                          resultado = this.$refs.selectableTable11[0]
                        break;
                        case 12:
                          resultado = this.$refs.selectableTable12[0]
                        break;
                        case 13:
                          resultado = this.$refs.selectableTable13[0]
                        break;
                        case 14:
                          resultado = this.$refs.selectableTable14[0]
                        break;                                                                                                                                                                                                                                                                    
                        case 15:
                          resultado = this.$refs.selectableTable15[0]
                        break;
                        case 16:
                          resultado = this.$refs.selectableTable16[0]
                        break;
                        case 17:
                          resultado = this.$refs.selectableTable17[0]
                        break;
                        case 18:
                          resultado = this.$refs.selectableTable18[0]
                        break;
                        case 19:
                          resultado = this.$refs.selectableTable19[0]
                        break;
                        case 20:
                          resultado = this.$refs.selectableTable20[0]
                        break;
                        case 21:
                          resultado = this.$refs.selectableTable21[0]
                        break;
                        case 22:
                          resultado = this.$refs.selectableTable22[0]
                        break;
                        case 23:
                          resultado = this.$refs.selectableTable23[0]
                        break;
                        case 24:
                          resultado = this.$refs.selectableTable24[0]
                        break;
                        case 25:
                          resultado = this.$refs.selectableTable25[0]
                        break;                                                                                                                                                                                                                                                                    
                        case 26:
                          resultado = this.$refs.selectableTable26[0]
                        break;
                        case 27:
                          resultado = this.$refs.selectableTable27[0]
                        break;
                        case 28:
                          resultado = this.$refs.selectableTable28[0]
                        break;
                        case 29:
                          resultado = this.$refs.selectableTable29[0]
                        break;
                        case 30:
                          resultado = this.$refs.selectableTable30[0]
                        break;
                      default:
                        console.log('No se puede ordenar');
                  }                
                }
              }
            }     
            return resultado;     
          },    
          _clearAllSelectableTable(){
            for(var [key, value] in Object.entries(this.groupedByFechaInicio)){
                  var result = this._getSelectableTable(key);
                  result.clearSelected();
            }   
          }, 
          
    }
}