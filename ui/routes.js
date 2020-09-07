const routes = [
    {
        name: 'CardReader',
        path: '/car-reader',
        component: () => import('./pages/CardReader/card-reader.js'), //cardReaderComponent,
        meta: {
            allowAnonymous: true
        }
    }
];

export const router = new VueRouter({
    routes:routes // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
    if (to.fullPath === '/') {
        next()
    } else {
        if (!to.meta.allowAnonymous) {//&& !isLoggedIn()
            next({
                path: '/',
                query: { redirect: to.fullPath }
            })
        }
        else {
            next()
        }
    }
})
