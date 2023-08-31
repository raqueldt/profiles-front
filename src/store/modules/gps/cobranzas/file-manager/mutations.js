// impactar el state

export const setFileSummary = ( state, data ) => {
   
    
    state.fileSummary = {...data}
    state.isLoading = false
 
}

export const setFileManager = ( state, data ) => {
   
    
    state.files = [...data]
    state.isLoading = false
 
}

export const setClientes = ( state, data ) => {
   
    
    state.clientes = [...data]
    state.isLoading = false
 
}


export const setSelectedFile = ( state, id ) => {
   
    state.selectedFile = id
 
}



