import { isLogin } from './helpers/ahtuHelper.js';

// import {isLogin} from './helpers/ahtuHelper';  
const routes = [
    {
        name: 'CardReader',
        path: '/car-reader',
        component: () => import('./pages/CardReader/card-reader.js'), //cardReaderComponent,
        meta: {
            allowAnonymous: false
        }
    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('./pages/account/login.js'), //cardReaderComponent,
        meta: {
            allowAnonymous: true
        }
    }
];

export const router = new VueRouter({
    routes: routes // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
    if (to.fullPath === '/') {
        if (!isLogin()) {
            console.log('dddd')
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()

        }
    } else {
        if (!to.meta.allowAnonymous && !isLogin()) {//&& !isLogin()
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
        else {
            next()
        }
    }
})
