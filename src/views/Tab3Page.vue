<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="page-toolbar">
        <ion-title class="page-title">个人中心</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item-group class="info-item">
          <ion-item>
            <!-- <ion-label position="stacked" >
              头像
            </ion-label> -->
            <ion-avatar>
              <ion-img :src="userAvatarURL" @click="navigateTo('setAvator')"></ion-img>
            </ion-avatar>
          </ion-item>
          <p>{{ userStore.userBasicAttributes.user_name }}</p>
        </ion-item-group>
        
        <ion-item-group>
          
          <ion-item lines="full" >
            <ion-label>
              <ion-text color="primary">
                <h2>常规</h2>
              </ion-text>
            </ion-label>
          </ion-item>
          <ion-item @click="navigateTo('upload')">
            <ion-label>
              上传数据
            </ion-label>
          </ion-item>
          <ion-item @click="navigateTo('history')">
            <ion-label>
              历史数据
            </ion-label>
          </ion-item>
        </ion-item-group>

        <ion-item-group>
          <ion-item lines="full">
            <ion-label>
              <ion-text color="primary">
                <h2>个人信息</h2>
              </ion-text>
            </ion-label>
          </ion-item>
          <ion-item @click="navigateTo('profile')">
            <ion-label>
              管理您的个人信息
            </ion-label>
          </ion-item>
        </ion-item-group>

        <!-- <ion-item-group>
          <ion-item lines="full">
            <ion-label>
              <ion-text color="primary">
                <h2>社区</h2>
              </ion-text>
            </ion-label>
          </ion-item>
          <ion-item @click="navigateTo('forum')">
            <ion-label>
              参与社区讨论
            </ion-label>
          </ion-item>
        </ion-item-group> -->

        <ion-item-group>
          <ion-item lines="full">
            <ion-label>
              <ion-text color="primary">
                <h2>反馈意见</h2>
              </ion-text>
            </ion-label>
          </ion-item>
          <ion-item @click="navigateTo('feedback')">
            <ion-label>
              提交您的反馈意见
            </ion-label>
          </ion-item>
          <ion-item @click="navigateTo('getFeedback')">
            <ion-label>
              查看所有反馈意见
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
        <!-- <ion-item-group>
          <ion-item lines="full">
            <ion-label>
              <ion-text color="primary">
                <h2>社交</h2>
              </ion-text>
            </ion-label>
          </ion-item> -->
          <!-- <ion-item @click="navigateTo('tweets')">
            <ion-label>
              查看最新推文
            </ion-label>
          </ion-item> -->
          <!-- <ion-item @click="navigateTo('friends')">
            <ion-label>
              查看您的好友列表
            </ion-label>
          </ion-item> -->
        <!-- </ion-item-group> -->
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonContent, IonTitle,IonToolbar, IonList, IonItemGroup, IonItem, IonLabel, IonText, IonAvatar , IonImg, onIonViewWillEnter } from '@ionic/vue';
import axios from 'axios';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userInfo';
import { checkLogin } from '@/utils/DataApi';

const router = useRouter();
const userStore = useUserStore();
const navigateTo = (page: string) => {
  router.push(`/${page}`);
}

// 获取用户头像URL
const getUserAvatarURL = async (user_id:string) => {
    try {
        const response = await axios.get(`https://aiql.cloud/getAvatar/${user_id}`);
        if (response.status === 200) {
            console.log(response);
            console.log(response.data[0].avatar_url);
            userAvatarURL.value = response.data[0].avatar_url;
            return response.data[0].avatar_url;
        } else {
            throw new Error('Failed to get user avatar URL');
        }
    } catch (error) {
        console.error("出现的问题：", error);
        return null;
    }
}

const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://aiql.cloud/getUserInfo/${userStore.userLogin.user_id}`); // 修改服务器地址
      userStore.userBasicAttributes = response.data.basicAttributes;
      console.log("response.data.basicAtr is ",response.data.basicAttributes);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

var userAvatarURL = ref(userStore.userAvatar.avatar_url);
watch(() => userStore.userAvatar.avatar_url, (newValue, oldValue) => {
  userAvatarURL.value = newValue;
  console.log("userAvatarURL的值发生了变化，新值为：" + newValue);
});
console.log("程序执行结束")

onIonViewWillEnter(() => {
  if(userStore.userAvatar.avatar_url) {
    console.log("程序执行中,avatar_url不为空")
    // userAvatarURL = userStore.userAvatar.avatar_url;
  }
  else if (userStore.userLogin.user_id) {
    console.log("程序执行中,avatar_url为空")
    const user_id = userStore.userLogin.user_id;
    getUserAvatarURL(user_id);
  }else{
    console.log("onmounted running")
  }
  
});
onMounted(()=>{
  if(!userStore.userLogin.user_id) {
    alert("请先登录，点击确认前往登录界面");
    router.push('/login');
    return;
  }
    checkLogin()
    fetchUserData();
})
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



