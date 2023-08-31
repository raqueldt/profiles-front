import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'


const creditNotesModule = {



	namespaced: true,

/*	
	state: () => ({

		isLoading: true,
		passengers: []		
	}),

*/  
	state,
	actions,
	getters,
	mutations,
	

}


export default creditNotesModule