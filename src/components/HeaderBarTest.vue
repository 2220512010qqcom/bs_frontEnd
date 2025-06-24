<template>
  <!-- <ion-img src="../../assets/profile2.png" ></ion-img> -->
  <div>
    <p>可以正常访问</p>
  </div>
  
  <ion-header>
    <ion-toolbar>
      <ion-buttons>
        <ion-button @click="getAvatar">点我获取头像</ion-button>
      </ion-buttons>
      <ion-title>
        <img src='../assets/profile.png' class="user-avatar">
        <ion-img :src="userAvatar2" class="user-avatar"></ion-img>
        <!-- </ion-img> -->
        <ion-img src="https://ljx-avator-bucket.oss-cn-beijing.aliyuncs.com/avatars/1_1743338768004.png" class="user-avatar"></ion-img>
        <IonImg src="../assets/profile.png" class="user-avatar"></IonImg>
        <ion-img :src="userAvatar" class="user-avatar"></ion-img>
      <p>this is a title</p>
      </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IonImg, IonHeader, IonButton, IonToolbar, IonTitle, IonButtons } from '@ionic/vue';
import { defineComponent } from 'vue';

// const userAvatar = ref<string>('../assets/profile.png'); // 替换为你的头像URL
import userAvatar from '../assets/profile.png'; // 替换为你的头像URL

const userAvatar2 = ref<string>('https://ljx-avator-bucket.oss-cn-beijing.aliyuncs.com/avatars/1_1743338768004.png'); // 替换为你的头像URL

const getAvatar = (): void => {
  // 在这里编写获取头像的逻辑
  console.log('获取头像');
}
 defineComponent({
    components: { IonImg },
 })
</script>

<style scoped>
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>



