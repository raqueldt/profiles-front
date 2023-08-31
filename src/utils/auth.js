import authServices from '@/services/auth/authServices'
import store from '@/store'


const localToken = localStorage.getItem("access_token")
const localUser = localStorage.getItem("user")

// verificar si es un usuario logeado
export const isAuthenticatedUser = async () => {

  if ( localUser && localToken  ){


    // verificar validez token
    try {
      //consultar usuario authenticado con el token
      const response = await authServices.authenticatedUser()
    } catch( error ) {
      if ( error.response && error.response.status === 401 ) {
        console.log("catch authenticated user");

        localStorage.setItem('access_token', null)

        await authServices.logout()
        return false
      }
    }

    return true
  }

  return false

}

// verificar si es un usuario con rol/permisos para acceder a reportes
export const canAccessReports = async () => {

  let authorizedRolesUser = []

  //info user autenticado en state
  const authenticatedUserState = store.getters['auth-module/fetchAuthenticatedUser']

  //verificar state user info
  if ( authenticatedUserState == null ){


    try {
        //consultar usuario authenticado con el token
        const response = await authServices.authenticatedUser()


        authorizedRolesUser = response.data.roles


    } catch (error) {

      if ( error.response && error.response.status === 401 ) {
        return false
      }

    }


  }

  if ( authenticatedUserState )
     authorizedRolesUser = authenticatedUserState.roles


  // definir los roles autorizados para el reporte
  const authorizedRoles = ( role ) => role.title === 'Supervisor Ventas' || role.title === 'Supervisor Marketing' || role.title === 'Supervisor Operaciones'


  // verificar roles autorizados

  const hasAuthorizedRole = authorizedRolesUser.some( authorizedRoles )


  return hasAuthorizedRole

}
