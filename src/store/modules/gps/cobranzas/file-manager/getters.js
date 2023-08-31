// leer el state

export const getFileSummary = ( state ) => {

	return state.fileSummary

}


export const getFileManager = ( state )  => {

	return state.files		

}


export const getFileManagerFilter = ( state ) => ( stringSearch = '' ) => {

	if ( stringSearch.length === 0 ) return state.files
	
	return state.files.filter( file => file.cofCodigo.toLowerCase().includes( stringSearch.toLocaleLowerCase() ) )	

}

export const getClientes = ( state ) => {

	return state.clientes

}

export const getSelectedFile = ( state ) => {

	return state.selectedFile

}