<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>登录界面</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="custom-content">
      <div class="centered-content">
        <ion-card style="width: 100vw; max-width: 100vw; box-shadow: none;">
          <ion-card-content class="centered-content" style="box-shadow: none;">
            <ion-item class="custom-input-item" style="margin-bottom: 20px; box-shadow: none;">
                <ion-label position="stacked">手机号码</ion-label>
                <ion-input v-model="phone" type="tel" inputmode="tel" placeholder="请输入手机号码"></ion-input>
              <ion-label position="stacked">密码</ion-label>
              <ion-input v-model="password" type="password"></ion-input>
            </ion-item>
            <ion-button expand="full" class="custom-login-button" @click="handleLogin">登录</ion-button>
            <router-link to="/signup">没有账号？点击注册</router-link>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  IonCard , IonCardContent,
  IonPage, IonHeader, IonToolbar, IonTitle, 
  IonContent, IonItem, IonLabel, IonInput, IonButton 
} from '@ionic/vue';
import { useUserStore  } from '@/stores/userInfo';
import { useRouter } from 'vue-router';
import { login , getUserUploads, reloadUserUploadToUserstore, reloadRiskIndexToUserstore } from '../api/databaseAPI/API';

const router = useRouter();
const phone = ref('');
const password = ref('');
const userStore = useUserStore();

const handleLogin = async () => {
  const result = await login(phone.value, password.value);
  if (!result || !result.user_id) {
    alert('登录失败，请检查手机号码和密码是否正确');
    return;
  }
  // 登录成功，设置用户信息
  userStore.setUserLogin({
    user_id: result.user_id
  })
  // 获取用户上传数据
  await reloadUserUploadToUserstore()
  await reloadRiskIndexToUserstore()
  // const uploads = await getUserUploads(result.user_id);
  // alert(JSON.stringify(uploads))
  // userStore.setUserUploads(uploads);
  // console.log("result is ",result);
  router.push('/tabs/tab1');
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




