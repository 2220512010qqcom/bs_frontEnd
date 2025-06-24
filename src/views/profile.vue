<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>用户信息</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-label><strong>用户ID:</strong></ion-label>
            <ion-note>{{ userStore.userLogin.user_id }}</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><strong>性别:</strong></ion-label>
            <ion-note slot="end">{{ userStore.userBasicAttributes.gender }}</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><strong>出生日期:</strong></ion-label>
            <ion-note slot="end">{{ userStore.userBasicAttributes.birth_date }}</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><strong>身高:</strong></ion-label>
            <ion-note slot="end">{{ userStore.userBasicAttributes.height }} cm</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><strong>体重:</strong></ion-label>
            <ion-note slot="end">{{ userStore.userBasicAttributes.weight }} kg</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><strong>用户名:</strong></ion-label>
            <ion-note slot="end">{{ userStore.userBasicAttributes.user_name }}</ion-note>
          </ion-item>
        </ion-list>
        <ion-button @click="goToEditPage">编辑</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonNote } from '@ionic/vue';
  import axios from 'axios';
  import { onMounted } from 'vue';
  import { useUserStore } from '@/stores/userInfo';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const userStore = useUserStore();
  
  console.log("userStore is ",userStore);
  console.log("userStore.userLogin is ",userStore.userLogin);
  console.log("userStore.userLogin.user_id is ",userStore.userLogin.user_id);
  
  const fetchUserData = async () => {
    try {
      // 替换为新的服务器地址（如有127.0.0.1:5000则替换为aiql.cloud:3000）
      const response = await axios.get(`https://aiql.cloud/getUserInfo/${userStore.userLogin.user_id}`);
      userStore.userBasicAttributes = response.data.basicAttributes;
      console.log("response.data.basicAtr is ",response.data.basicAttributes);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };
  
  onMounted(() => {
    if (!userStore.userBasicAttributes.user_id) {
      fetchUserData();
      console.log("@@@@@   获取数据了")
    }else{
      console.log("@@@@  没有获取数据")
    }
  });
  
  function goToEditPage(){
    console.log("修改了数据")
    router.push('/setProfile');
  }
  </script>
  
  <style scoped>
  ion-note {
    margin-left: auto;
  }
  </style>
  
