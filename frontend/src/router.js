import {createWebHistory, createRouter} from "vue-router";
// import {RouteRecordRaw} from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("./pages/Home.vue"),
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
      component:  () => import("./pages/Project.vue"),
      props: true, // Enable route params as props
    },
    {
      path: '/sprints/:sprintId',
      name: 'sprint',
      component:  () => import("./components/Sprint.vue"),
      props: true, // Enable route params as props
    },
    {
      path: '/sprints/project/:projectId',
      name: 'sprints',
      component:  () => import("./pages/Sprints.vue"),
      props: true,
    }
    
  ];
  
  const router = createRouter({
    history : createWebHistory(),
    // linkActiveClass: "active",
    linkExactActiveClass: "active",
    routes,
});

export default router;
