<template>
  <ion-page aria-hidden="false" >
    <ion-header>
      <ion-toolbar v-if="userStore.userLogin.user_id">
        <ion-title></ion-title>
        <ion-title class="login_title">智护健康</ion-title>
      </ion-toolbar>
      <ion-toolbar v-else>
        <ion-title>游客模式</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="navigateTo('/login')">登录</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content">
      <div>
        <upload-component></upload-component>
      </div>
      <div>
        <file-upload></file-upload>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonPage, IonHeader, IonToolbar,
  IonButton ,IonButtons, IonTitle, IonContent
} from '@ionic/vue';
import { useUserStore } from '@/stores/userInfo';
import uploadComponent from './uploadPage.vue'
import FileUpload from '@/components/FileUpload.vue';
const userStore = useUserStore();
const router = useRouter();

const navigateTo = (route: string) => {
  router.push(route);
};

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

</style>

