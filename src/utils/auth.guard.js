import { isAuthGuardActive } from '../constants/config'
import { setCurrentUser, getCurrentUser } from '.'
export default (to, from, next) => {
    // if (to.matched.some(record => record.meta.loginRequired)) {
    //     if (isAuthGuardActive) {
    //         const user = getCurrentUser();
    //         if (user) {
    //             const roleArrayHierarchic = to.matched.filter(x => x.meta.roles).map(x => x.meta.roles);
    //             if (roleArrayHierarchic.every(x => x.includes(user.role))) {
    //                 next();
    //             } else {
    //                 next('/unauthorized')
    //             }
    //         } else {
    //             setCurrentUser(null);
    //             next('/user/login')
    //         }
    //     } else {
    //         next();
    //     }
    // } else {
    //     next()
    // }


    // VERSION 1. - ESTABLE:
    // if (to.matched.some((record) => record.meta.requiresAuth)) {
    //     if (!isAuthenticated()) {
    //         next('/user/login')
    //     }
    // } else {
    //     next()
    // }

    // VERSION 2:
    // const currentUser = getCurrentUser(); 
    // if (to.matched.some((record) => record.meta.requiresAuth)) {
        
    //     // if (!isAuthenticated()) {
    //     //     next('/user/login')
    //     // }
    //     if(!currentUser && to.path !== '/user/login'){
    //         next('/user/login');
    //     } else if (to.path == '/user/login' && currentUser){
    //         next('/app/dashboard');
    //     }        
    // } else {
    //     next()
    // }


    // VERSION 3

        const currentUser = getCurrentUser();    
        // when route requires auth and there's no current user, reidrect to '/login'
        if(!currentUser && to.path !== '/user/login'){
            next('/user/login');
        // when we go to login route and are already logged in, we can skip this page so we redirect to the homepage
        } else if (to.path == '/user/login' && currentUser){
            next('/app/dashboard');
        // if none of the above matches, we have a normal navigation that should just go through so we call `next()`
        } else {
            next(); // you called `next('/')` which redirected to the homepage over and over again.
        }


    

        // const currentUser = getCurrentUser();    
        // // when route requires auth and there's no current user, reidrect to '/login'
        // if(!currentUser && to.path !== '/user/login'){
        //     next('/user/login');
        // // when we go to login route and are already logged in, we can skip this page
        // // so we redirect to the homepage
        // } else if (to.path == '/user/login' && currentUser){
        //     next('/app/dashboard');
        // // if none of the above matches, we have a normal navigation that should just go through
        // // so we call `next()`
        // } else {
        //     next(); // you called `next('/')` which redirected to the homepage over and over again.
        // }



}