<template>
  <ion-page aria-hidden="false" >
    <ion-header>
      <ion-toolbar>
        <ion-title class="login_title">数据中心</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="refresh">刷新界面</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="content">
      <ion-grid>
        <ion-row justify-content-center>
          <ion-col size="12">
            <index-component></index-component>
          </ion-col>
            <ion-col size="12">
            <line-chart :data="chartData" style="height: 500px;"></line-chart>
            </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, 
  IonButtons, IonButton,
  IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
import LineChart from '../components/LineChart.vue';
import IndexComponent from '../components/IndexText.vue'
import { useUserStore ,  UserUploads } from '@/stores/userInfo';
import { reloadUserUploadToUserstore, reloadRiskIndexToUserstore } from '@/api/databaseAPI/API';
const userStore = useUserStore();
const chartData = ref<UserUploads[]>(userStore.userUploads);
const refresh = () => {
  reloadRiskIndexToUserstore();
  reloadUserUploadToUserstore();
  chartData.value = userStore.userUploads;
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

