<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>登录界面</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="custom-content">
      <!-- <div class="centered-content">

        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Login</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-item class="custom-input-item" style="margin-bottom: 20px;">
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email" type="email"></ion-input>

          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>

        <ion-button expand="full" class="custom-login-button" @click="login">Login</ion-button>
      </div> -->
      <ion-card>
        <!-- <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" /> -->
        <ion-card-header>
          <ion-card-title>你好，运动员！</ion-card-title>
          <ion-card-subtitle>智护健康</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <ion-item class="custom-input-item" style="margin-bottom: 20px;">
            <ion-label position="stacked">邮箱</ion-label>
            <ion-input v-model="email" type="email"></ion-input>
            <ion-label position="stacked">密码</ion-label>
            <!-- <ion-label> </ion-label> -->
            <ion-input v-model="password" type="password"></ion-input>
          </ion-item>
          <!-- <a href="https://www.aiql.cloud">点我进行跳转</a> -->
          <!-- <a href="https://www.aiql.cloud">点我进行跳转</a> -->
          <ion-button expand="full" class="custom-login-button" @click="handleLogin">登录</ion-button>
          <router-link to="/signup">没有账号？点击注册</router-link>
          <!-- <a href="https://www.aiql.cloud">点我进行跳转</a> -->
        </ion-card-content>
      </ion-card>
    </ion-content>
    <ion-button @click ='handleLogin(email,password)'></ion-button>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonCard , IonCardContent,IonCardTitle,IonCardSubtitle, IonCardHeader,IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userInfo';
import { useRouter } from 'vue-router';
import { login2 } from '../api/login/login.js';

const router = useRouter();
const email = ref('');
const password = ref('');
const userStore = useUserStore();

const handleLogin = () => {
  console.log('Email:', email.value);
  console.log('Password:', password.value);
try{
  login2(email.value, password.value)
  .then(response => {
    console.log("response is ",response.data);
  
    userStore.setUserLogin({
      user_id: response.data.user.user_id,
      user_name: response.data.user.user_name,
      user_password: password.value,
      user_registration_date: new Date(response.data.user_registration_date),
      user_phone: response.data.user.user_phone,
      user_email: email.value
    });

    router.push('/tabs/tab1');
  })
  // .catch(error => {
    // console.error('Login failed:', error);
    // if(error.message == "Network Error"){
    //   alert("网络错误，请检查网络连接");
    // }
    // else if(error.response.status == 401){
    //   alert("用户名或密码错误");
    // }
    // else if(error.response.status == 500){
    //   alert("服务器错误，请稍后再试");
    // }
    // else{
    //   alert("未知错误，请稍后再试");
    // }
    // Handle login failure, e.g., show error message
  // });
}catch(error){
  console.log(error);
  console.log("我是证人2，我证也明登陆失败了");
}
  
};

</script>


<style scoped>


.custom-content {
  --ion-background-color: #eaf4fc;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transition: background-color 0.3s ease;
}

.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.custom-input-item {
  --ion-item-background: #ffffff;
  --ion-item-border-color: #cccccc;
  --ion-item-border-radius: 10px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
  transition: box-shadow 0.3s ease;
}

.custom-input-item:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.custom-login-button {
  --ion-color-primary: #3880ff;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-shade: #3171e0;
  --ion-color-primary-tint: #4c8dff;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
  transition: box-shadow 0.3s ease;
}

.custom-login-button:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>




