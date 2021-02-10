import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:"/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () =>  import("../views/Home/index.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>  import("../views/Login/index.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//路由守卫  //登录了才能跳转
router.beforeEach((to,form,next)=>{
  const isLogin=localStorage.getItem("ele_login") ? true :false
  if(to.path==="/login"){
    next()
  }else{
    isLogin ? next() : next('/login')
  }
  
})




export default router;
