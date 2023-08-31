import { isDemo } from '../constants/config'
import {
    mapGetters,
    mapActions
} from "vuex";
export default (to, from, next) => {
    const token = localStorage.getItem("access_token");
    const loggedIn = localStorage.getItem("user");

    // Redirect to the login page if the user is not logged in
    // and the route meta record is requires auth
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn && !token) {
        next('/login')
    }

    // Redirect to the homepage page if the user is logged in and the route meta record is requires guest
    if (to.matched.some(record => record.meta.requiresAuth) && loggedIn && token) {
        next('/')
    }

    // Pass any access if not matches any of conditions above
    next()




    //next();
    // if (localStorage.getItem('access_token') !== null && localStorage.getItem('user') != null && localStorage.getItem('user').length > 0) {
    //     next()
    // } else {
    //     localStorage.removeItem('destroyToken')
    //     next('/user/login')
    // }
}