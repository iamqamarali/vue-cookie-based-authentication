import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import useAuth from './composables/useAuth'

const app = createApp(App)

app.use(router)

app.mount('#app')


router.beforeEach(async (to, from, next) => {
    const { checkAuth } = useAuth()
    if(to.meta.requiresAuth){
        if(!(await checkAuth())){
            return next({name: 'login'})
        }
    }
    else if(to.meta.guest){
        if(await checkAuth()){
            return next({name: 'dashboard'})
        }
    }
    next()
})