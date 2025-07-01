import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import LoginPage from '../views/LoginPage.vue'
import historyPage from '../views/historyPage.vue';
import signup from '../views/signup.vue'; 
import uploadPage from '../views/uploadPage.vue';
// import { shouldFetchUserStoreAnalyzeIndex, shouldFetchUserStoreRecords, getUserStoreAnalyzeIndex,getUserStoreRecords  } from '../api/analyze/analyze'
import { alreadyLogin } from '../api/databaseAPI/API';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/upload',
    component: uploadPage,
  },
  {
    path: '/signup',
    component: signup
  },
  {
    path: '/history',
    component: historyPage
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        // component: () => import('@/views/Tab2Page.vue'),
        component: () => import('@/views/Tab2Page.vue'),
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // 检查是否需要登录
  if (to.path !== '/login' && to.path !== '/signup' && !alreadyLogin()) {
    next('/login');
    return;
  }
  next();
});


export default router
