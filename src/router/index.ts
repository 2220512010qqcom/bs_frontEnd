import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import LoginPage from '../views/LoginPage.vue'
import feedbackPage from '../views/feedbackPage.vue';
import getFeedbackPage from '../views/getFeedbackPage.vue';
import historyPage from '../views/historyPage.vue';
import ChartPage from '../views/ChartPage.vue' ;
import signup from '../views/signup.vue'; 
import uploadPage from '../views/uploadPage.vue';
import setPage from '@/views/setPage.vue';
import setAvator from '@/views/setAvator.vue';
import testAvatar from '../components/HeaderBarTest.vue'
import profile from '../views/profile.vue';
import setProfile from '../views/setProfile.vue';
import PostPage from '../views/PostPage.vue';
import createPost from '../views/CreatePost.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/test',
    component:testAvatar,
  },
  {
    path: '/setProfile',
    component:setProfile,
  },
  {
    path: '/post/:id',
    name: 'PostPage',
    component: PostPage,
    // props: true,
  },
  {
    path: '/createPost',
    name: 'createPost',
    component: createPost,
  },
  {
    path: '/profile',
    component: profile,
  },
  {
    path: '/setting',
    component:setPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/setAvator',
    component: setAvator,
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
    path: '/chart',
    component: ChartPage
  },
  {
    path: '/history',
    component: historyPage
  },
  {
    path: '/feedback',
    component: feedbackPage,
  },
  {
    path: '/getFeedback',
    component: getFeedbackPage,
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
        component: () => import('@/views/ForumPage.vue'),
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

export default router
