<template>

      <ion-card class="upload-page">
        <ion-card-header>
          <ion-card-title>健康数据上传</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <form @submit.prevent="submitData">
            <ion-item>
              <ion-label position="stacked">用户ID</ion-label>
              <ion-text>{{ userStore.userLogin.user_id }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">心率</ion-label>
              <ion-input type="number" v-model="userUploads.heart_rate" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">血压</ion-label>
              <ion-input type="text" v-model="userUploads.blood_pressure" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">血氧饱和度</ion-label>
              <ion-input type="number" v-model="userUploads.oxygen_saturation" required></ion-input>
            </ion-item>
            <ion-button type="submit" expand="block">上传</ion-button>
          </form>
        </ion-card-content>
      </ion-card>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useUserStore } from '@/stores/userInfo';
import { 
   IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
  IonItem, IonLabel, IonInput, IonButton, IonText 
} from '@ionic/vue';
import router from '@/router';
import { UserUploads } from '../api/types/upload'
import { upload } from '../api/upload/upload'
const userStore = useUserStore();


const userUploads = reactive<UserUploads>({
  user_id: '1',
  heart_rate: null,
  blood_pressure: '',
  oxygen_saturation: null,
});

const submitData = () => {
  if(!userStore.userLogin || !userStore.userLogin.user_id) {
    alert('请先登录');
    router.push('/login');
    return;
  }
  if(!userUploads.heart_rate || !userUploads.blood_pressure || !userUploads.oxygen_saturation) {
    alert('请填写所有必填字段');
    return;
  }
  userUploads.user_id = userStore.userLogin.user_id; 
console.log('准备上传的数据:', userUploads);
  upload(userUploads)
    .then(response => {
      const data = response.data;
      if (data.message === 'Upload recorded successfully') {
        alert('数据上传成功');
        userUploads.heart_rate = null;
        userUploads.blood_pressure = '';
        userUploads.oxygen_saturation = null;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('数据上传失败');
    });
};

onMounted(() => {
  if(userStore.userLogin.user_id === undefined || userStore.userLogin.user_id === "") {
    alert("请先登录，点击确认前往登录界面");
    router.push('/login');
    return;
  }
});
</script>

<style scoped>
.upload-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.upload-page h1 {
  text-align: center;
}
.upload-page form div {
  margin-bottom: 15px;
}
.upload-page form label {
  display: block;
  margin-bottom: 5px;
}
.upload-page form input,
.upload-page form select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.upload-page form button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.upload-page form button:hover {
  background-color: #0056b3;
}
</style>

