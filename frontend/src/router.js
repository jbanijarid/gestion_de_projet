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
        component: () => import("./pages/Kanban.vue"),
        props: true
    }
    ,
    {
      path : "/projects",   
      name : "projects",
      component : () => import("./pages/Projects.vue"),
      props : true
    },
    {
      path: '/project/:projectId',
      name: 'project',
      component:  () => import("./components/Project.vue"),
      props: true, // Enable route params as props
    },
  ];
  
  const router = createRouter({
    history : createWebHistory(),
    // linkActiveClass: "active",
    linkExactActiveClass: "active",
    routes,
});

export default router;
