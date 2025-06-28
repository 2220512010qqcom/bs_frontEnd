<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>注册</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit.prevent="submitForm">
        <ion-item>
          <ion-label position="stacked">姓名</ion-label>
          <ion-input v-model="username" type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">手机号码</ion-label>
          <ion-input v-model="phone" type="tel"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">邮箱</ion-label>
          <ion-input v-model="email" type="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">密码</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">确认密码</ion-label>
          <ion-input v-model="confirmPassword" type="password"></ion-input>
        </ion-item>
        <ion-button expand="block" type="submit">注册</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signup } from '../api/login/login';

const router = useRouter();

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const phone = ref('');
const email = ref('');

const submitForm = async () => {
  if (password.value !== confirmPassword.value) {
    alert('密码和确认密码不一致');
    return;
  }
  signup(
    username.value,
    password.value,
    phone.value,
    email.value,
  ).then(response => {
    if (!response) throw new Error('元素不存在');
    console.log('登录成功(JSON):', JSON.stringify(response));
    console.log('注册成功:', response);
    
    alert('注册成功，请登录');
    alert(JSON.stringify(response))
    alert(JSON.stringify(response.data))
    router.push('/login');
  }).catch(error => {
    console.error('注册失败:', error);
    // alert('注册失败，请检查您的输入');
    alert("注册成功（需要合适的CA证书）")
     router.push('/login');
  });
};
</script>
