import {createWebHistory, createRouter} from "vue-router";
// import {RouteRecordRaw} from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("./pages/Home.vue"),
        props: true
    },
    {
        path: "/test",
        name: "test",
        component: () => import("./pages/Test.vue"),
        props: true
    }
    ,
    {
        path: "/sprints",
        name: "sprints",
        component: () => import("./pages/Sprints.vue"),
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: "active",
    linkExactActiveClass: "active",
    routes,
});

export default router;
