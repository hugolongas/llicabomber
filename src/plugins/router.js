import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/main'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/views/CounterView.vue')
  },
  {
    path:'/accedir',
    name:'login',
    component: () => import('@/components/views/LoginView.vue')
  },
  {
    path:'/validar-codis',
    name:'CodeValidator',
    component: () => import('@/components/views/CodeValidatorView.vue'),
    meta:{
      authorize:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes:routes
})


router.beforeResolve((to,from,next)=>{
    if(to.matched.some(record => record.meta.authorize)){
      var user = store.getters.getUser
      window.console.log(user)
      if(user.length<=0) {
        window.console.log("redirect - login")
        router.push({name:"login"});
      }
      else if(user!=null) {
        window.console.log("next")
        next()
      }
      else{
        window.console.log("redirect - login")
        router.push({name:"login"});
      }
    }
    else{
      next()
    }
})

export default router