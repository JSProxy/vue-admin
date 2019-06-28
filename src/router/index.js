import Vue from "vue";
import Router from "vue-router";
import baseRouter from'./baseRouter';
Vue.use(Router);

const router = new Router({
    base: process.env.BASE_URL,
    routes: 
    [...baseRouter],
    scrollBehavior(to, from, savedPosition) 
    {
        if (savedPosition) 
        {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0
            };
        }
    },
});
router.beforeEach((to, from, next) => {
    document.title = to.name;
    next()
});
router.afterEach((to, from) => {
});
export default router;