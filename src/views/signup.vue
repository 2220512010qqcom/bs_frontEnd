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
            <ion-label position="stacked">用户名</ion-label>
            <ion-input v-model="username" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">密码</ion-label>
            <ion-input v-model="password" type="password"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">确认密码</ion-label>
            <ion-input v-model="confirmPassword" type="password"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">姓名</ion-label>
            <ion-input v-model="name" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">性别</ion-label>
            <ion-select v-model="gender" placeholder="选择性别">
              <ion-select-option value="male">男</ion-select-option>
              <ion-select-option value="female">女</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">手机号码</ion-label>
            <ion-input v-model="phoneNumber" type="tel"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">邮箱</ion-label>
            <ion-input v-model="email" type="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">身高</ion-label>
            <ion-input v-model="height" type="number"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">体重</ion-label>
            <ion-input v-model="weight" type="number"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">地区</ion-label>
            <ion-input v-model="region" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">出生日期</ion-label>
            <ion-datetime v-model="birthDate" display-format="YYYY-MM-DD" placeholder="选择日期"></ion-datetime>
          </ion-item>
          
          <ion-button expand="block" type="submit">注册</ion-button>
        </form>
      </ion-content>
    </ion-page>
  </template>
  <script setup lang="ts">
  import { IonAvatar,IonPage, IonSelect, IonSelectOption, IonDatetime, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import moment from 'moment';

  const router = useRouter();

  const username = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const name = ref('');
  const gender = ref('');
  // const birthDate = ref<Date>(); 
  const birthDate = ref(''); 
  const phoneNumber = ref('');
  const email = ref('');
  const team = ref('');
  const height = ref('');
  const weight = ref('');
  const avatarUrl = ref(''); // 头像URL
  const region = ref(''); // 地区

  const submitForm = async () => {
    // 检查密码和确认密码是否一致
    if (password.value !== confirmPassword.value) {
      alert('密码和确认密码不一致');
      return;
    }

    try {
      // const response = await axios.post('http://123.57.78.6:3000/signup', {
      const response = await axios.post('https://aiql.cloud/signup', {
        user_name: username.value,
        user_password: password.value,
        user_phone: phoneNumber.value,
        user_email: email.value,
        gender: gender.value,
        birth_date: moment(birthDate.value).format('YYYY-MM-DD'),
        height: height.value, 
        weight: weight.value, 
        avatar_url: '', 
        region: region.value
      });


      console.log('注册成功:', response.data);
      // 注册成功，重定向到登录页面
      router.push('/login');
    } catch (error) {
      console.error('注册失败:', error);
      alert('注册失败');
    }
  };
  </script>
