

// funcion para agrupar data de pasajeros

export const groupBy = (objectArray, property, field, reference) => {

    return objectArray.reduce(function (total, objectItem) {
       
        let fullkey = null

        let key = objectItem[property];

        if ( reference )  fullkey = key +'|'+ objectItem[reference]
        else fullkey = key
       
        if (!total[fullkey]) {
            total[fullkey] = [];
        }
       
        total[fullkey].push( objectItem[field] );

        return total;

    }, {});

}