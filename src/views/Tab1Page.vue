<template>
  <ion-page aria-hidden="false" >
    <ion-header>
      <ion-toolbar v-if="userStore.userLogin.user_id">
        <!-- <ion-avatar>
          <ion-img :src="userAvatarURL"></ion-img>
        </ion-avatar> -->
        <ion-title></ion-title>
        <ion-title class="login_title">智护健康</ion-title>
          <!-- <ion-buttons slot="end" >
            <ion-button @click="navigateTo('/login')">登录</ion-button>
        </ion-buttons> -->
      </ion-toolbar>
      <ion-toolbar v-else>
        <ion-title>游客模式</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="navigateTo('/login')">登录</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content">
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6" size-lg="4">
            <ion-card class="custom-card" @click="navigateTo(sections[0].route)">
              <img src='../assets/uploadPage.png' alt="Section Image" style="width: 1000px; height: 300px;">
              <ion-card-header>
                <ion-card-title>{{ sections[0].title }}</ion-card-title>
                <!-- <ion-card-subtitle>{{ sections[0].image }}</ion-card-subtitle> -->
              </ion-card-header>
              <!-- <ion-card-content>
                <ion-button expand="full" @click="navigateTo(sections[0].route)">
                  {{ sections[0].description }}
                </ion-button>
              </ion-card-content> -->
            </ion-card>
          </ion-col>
          <ion-col size="12" size-md="6" size-lg="4">
            <ion-card class="custom-card" @click="navigateTo(sections[1].route)">
              <img src='../assets/historyUpload.png' alt="Section Image" style="width: 1000px; height: 300px;">
              <ion-card-header>
                <ion-card-title>{{ sections[1].title }}</ion-card-title>
                <!-- <ion-card-subtitle>{{ sections[1].image }}</ion-card-subtitle> -->
              </ion-card-header>
              <!-- <ion-card-content>
                <ion-button expand="full" @click="navigateTo(sections[1].route)">
                  {{ sections[1].description }}
                </ion-button>
              </ion-card-content> -->
            </ion-card>
          </ion-col>
          <!-- Add more ion-col elements for each section here -->
          <!-- <ion-col size="12" size-md="6" size-lg="4">
            <ion-card class="custom-card">
              <img src='../assets/profile.png' alt="Section Image" style="width: 100%; height: auto;">
              <ion-card-header>
                <ion-card-title>{{ sections[2].title }}</ion-card-title>
                <ion-card-subtitle>{{ sections[2].image }}</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <ion-button expand="full" @click="navigateTo(sections[2].route)">
                  {{ sections[2].description }}
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col> -->
          <ion-col size="12" size-md="6" size-lg="4">
            <ion-card class="custom-card" @click="navigateTo(sections[3].route)">
              <img src='../assets/dataChart.png' alt="Section Image" style="width: 1000px; height: 300px;">
              <ion-card-header>
                <ion-card-title>{{ sections[3].title }}</ion-card-title>
                <!-- <ion-card-subtitle>{{ sections[3].image }}</ion-card-subtitle> -->
              </ion-card-header>
              <!-- <ion-card-content>
                <ion-button expand="full" @click="navigateTo(sections[3].route)">
                  {{ sections[3].description }}
                </ion-button>
              </ion-card-content> -->
            </ion-card>
          </ion-col>
          <!-- <ion-col size="12" size-md="6" size-lg="4">
            <ion-card class="custom-card">
              <img src='../assets/feedback.png' alt="Section Image" style="width: 100%; height: auto;">
              <ion-card-header>
                <ion-card-title>{{ sections[4].title }}</ion-card-title>
                <ion-card-subtitle>{{ sections[4].image }}</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <ion-button expand="full" @click="navigateTo(sections[4].route)">
                  {{ sections[4].description }}
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col> -->
          <!-- <ion-col size="12" size-md="6" size-lg="4">
            <ion-card class="custom-card" @click="navigateTo(sections[5].route)">
              <img src='../assets/feedback.png' alt="Section Image" style="width: 100%; height: auto;">
              <ion-card-header>
                <ion-card-title>{{ sections[5].title }}</ion-card-title> -->
                <!-- <ion-card-subtitle>{{ sections[5].image }}</ion-card-subtitle> -->
              <!-- </ion-card-header> -->
              <!-- <ion-card-content>
                <ion-button expand="full" @click="navigateTo(sections[5].route)">
                  {{ sections[5].description }}
                </ion-button>
              </ion-card-content> -->
            <!-- </ion-card>
          </ion-col> -->
          <!-- <ion-col size="12" size-md="6" size-lg="4">
            <ion-card class="custom-card" @click="navigateTo(sections[6].route)">
              <img src='../assets/tweets.png' alt="Section Image" style="width: 100%; height: auto;">
              <ion-card-header>
                <ion-card-title>{{ sections[6].title }}</ion-card-title> -->
                <!-- <ion-card-subtitle>{{ sections[6].image }}</ion-card-subtitle> -->
              <!-- </ion-card-header> -->
              <!-- <ion-card-content>
                <ion-button expand="full" @click="navigateTo(sections[6].route)">
                  {{ sections[6].description }}
                </ion-button>
              </ion-card-content> -->
            <!-- </ion-card>
          </ion-col> -->
          <!-- <ion-col size="12" size-md="6" size-lg="4">
            <ion-card class="custom-card"  @click="navigateTo(sections[7].route)">
              <img src='../assets/upload.png' alt="Section Image" style="width: 100%; height: auto;">
              <ion-card-header>
                <ion-card-title>{{ sections[7].title }}</ion-card-title> -->
                <!-- <ion-card-subtitle>{{ sections[7].image }}</ion-card-subtitle> -->
              <!-- </ion-card-header> -->
              <!-- <ion-card-content> -->
                <!-- <ion-button expand="full" @click="navigateTo(sections[7].route)"> -->
                  <!-- {{ sections[7].description }} -->
                <!-- </ion-button> -->
              <!-- </ion-card-content> -->
            <!-- </ion-card>
          </ion-col> -->
        </ion-row>
      </ion-grid>
    </ion-content>


    <ion-button @click ='login2'></ion-button>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonCardSubtitle, IonImg,IonPage, IonHeader, IonToolbar,IonButton ,IonButtons, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import { checkLogin } from '../utils/DataApi.js'
import { useUserStore } from '@/stores/userInfo';
import { login2 } from '../api/login/login.js';
const userStore = useUserStore();
const router = useRouter();



interface Section {
  title: string;
  description: string;
  route: string;
  image: string;
}

var sectio = ref<Section[]>([]);
const sections = ref<Section[]>([
  { title: '上传数据', description: '上传您的数据文件', route: '/upload', image: '../assets/uploadPage.png'},
  { title: '历史数据', description: '查看历史数据记录', route: '/history', image: '../assets/history.png' },
  { title: '个人信息', description: '管理您的个人信息', route: '/tabs/showAttributes', image: '../assets/profile.png' },
  { title: '数据视图', description: '历史数据直观展示', route: '/chart', image: '../assets/forum.png' },
  { title: '反馈', description: '提交您的反馈意见', route: '/feedback', image: '../assets/feedback.png' },
  { title: '查看反馈', description: '查看所有反馈意见', route: '/getFeedback', image: '../assets/viewFeedback.png' },
  { title: '推文', description: '查看最新推文', route: '/chart', image: '../assets/tweets.png' },
  { title: '登录', description: '登录实现更多功能', route: '/login', image: '../assets/friends.png' },
]);


const navigateTo = (route: string) => {
  router.push(route);
};
onMounted(() => {
  checkLogin()
})
</script>

<style scoped>
ion-header, ion-toolbar, ion-title {
  text-align: center;
}

.custom-card {
  margin: 15px;
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
  overflow: hidden;
}

.custom-card:hover {
  transform: translateY(-5px);
}

ion-card-title {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

ion-card-content p {
  color: #666;
  font-size: 16px;
}

ion-page {
  background-color: #87CEEB;
}

.content{
  background-color: #87CEEB;
}
.login_title {
  

}
</style>

