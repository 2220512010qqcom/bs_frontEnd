<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="page-toolbar">
        <ion-title class="page-title">个人中心</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item-group>
          <ion-item lines="full">
            <ion-label>
              <ion-text color="primary">
                <h2>上传记录</h2>
              </ion-text>
            </ion-label>
          </ion-item>
          <ion-item @click="navigateTo('history')">
            <ion-label>
              管理您的上传记录
            </ion-label>
          </ion-item>
        </ion-item-group>

        <ion-item-group>
          <ion-item lines="full">
            <ion-label>
              <ion-text color="primary">
                <h2>账户管理</h2>
              </ion-text>
            </ion-label>
          </ion-item>
          <ion-item @click="navigateTo('login')">
            <ion-label>
              退出登录
            </ion-label>
          </ion-item>
        </ion-item-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { 
  IonPage, IonHeader, IonContent, IonTitle,
  IonToolbar, IonList, IonItemGroup, IonItem, IonLabel, IonText
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userInfo';


const router = useRouter();
const userStore = useUserStore();
const navigateTo = (page: string) => {
  router.push(`/${page}`);
}

</script>

<style scoped>
ion-item-group h2 {
  margin: 0;
  padding: 10px;
  background-color: #f0f0f0;
}

ion-item {
  --background: #ffffff;
  --background-activated: #e0e0e0;
}
.info-item {
  display: flex;
  align-items: center;
  padding: 10px;
}
.page-toolbar{
  display: flex;
  justify-content: center;
}
.page-title {
  text-align: center;
}
</style>



