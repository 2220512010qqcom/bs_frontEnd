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
          <ion-label position="stacked">手机号码</ion-label>
          <ion-input v-model="phone" type="tel"></ion-input>
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
import { register } from '../api/databaseAPI/API';

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
  const result = await register(phone.value, password.value);
  if(result != null) {
    alert('注册成功');
    router.push('/login');
  } else {
    alert('注册失败，请稍后再试');
  }
};
</script>
