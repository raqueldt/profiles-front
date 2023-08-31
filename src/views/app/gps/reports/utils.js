

// funcion para obtener la suma

export const getSum = (total, valor) => { return total + valor }


// funcion para copiar
export const copyToClipBoard = (elemento) => {
    // elegir elemento a copiar
    const elementoCopiar = document.getElementById(elemento)    
    // create a Range object
    const range = document.createRange()  
    // set the Node to select the "range"
    range.selectNodeContents(elementoCopiar)
    //remove previous ranges
    window.getSelection().removeAllRanges()
    // add the Range to the set of window selections
    window.getSelection().addRange(range)    
    // execute 'copy', can't 'cut' in this case
    document.execCommand('copy');        
    // remove seleccion
    window.getSelection().removeRange(range)
    

}

