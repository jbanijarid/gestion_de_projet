import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {
      path : "/",
      name : "home",
      component : () => import("./components/Home.vue"),
      props : true
    },
    {
      path : "/user",   
      name : "user",
      component : () => import("./components/User.vue"),
      props : true
    },
    {
      path : "/docs",   
      name : "docs",
      component : () => import("./components/Docs.vue"),
      props : true
    },
    {
      path : "/signin",
      name : "signin",
      component : () => import("./components/SignIn.vue"),
      props : true
    },
    {
      path : "/signup",
      name : "signup",
      component : () => import("./components/SignUp.vue"),
      props : true
    }
  
  ];
  
  const router = createRouter({
    history : createWebHistory(),
    routes,
  });
  
  export default router;
  