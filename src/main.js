// import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue' 
import MainPage from '@/components/MainPage.vue'
import RecommendPage from '@/components/RecommendPage.vue'
import RecommendDetailPage from '@/components/RecommendDetailPage.vue'
import TripsPage from '@/components/TripsPage.vue'
import TripsDetailPage from '@/components/TripsDetailPage.vue'
import VideoPage from '@/components/VideoPage.vue'

const routes = [
    {
        path:'/',
        redirect:"/main/home"
    },
    {
      path: '/main',
      component: MainPage,
      children: [
        {
          path: 'home',
          component: HomePage,
        }, 
        
        {
            path: 'recommend',
            component: RecommendPage,
            // children:[
            //   {
            //     path: ':id',
            //     component:RecommendDetailPage,
            //   }
            // ]
          },
          {
            path: 'recommend/:id',
            component:RecommendDetailPage,
          },
          
          {
            path: 'trips',
            component: TripsPage,
          },
          {
            path: 'trips/:id',
            component:TripsDetailPage,
          },
          {
            path: 'video',
            component: VideoPage,
          }
       
    
      ],
    },
  ]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

createApp(App)
.use(router)

.mount('#app')

