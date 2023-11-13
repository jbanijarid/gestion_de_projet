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
      path : "/projects",   
      name : "projects",
      component : () => import("./components/Projects.vue"),
      props : true
    }
    // {
    //   path : "/signin",
    //   name : "signin",
    //   component : () => import("./components/SignIn.vue"),
    //   props : true
    // },
    // {
    //   path : "/signup",
    //   name : "signup",
    //   component : () => import("./components/SignUp.vue"),
    //   props : true
    // }
  
  ];
  
  const router = createRouter({
    history : createWebHistory(),
    // linkActiveClass: "active",
    linkExactActiveClass: "active",
    routes,
});

export default router;
