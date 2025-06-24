<template>
    <ion-page>
      <ion-content>
        <ion-card class="upload-page">
          <ion-card-header>
            <ion-card-title>用户头像设置</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-avatar>
              <img id="avatar" :src="avatarUrl" alt="用户头像" class="avatar"/>  
            </ion-avatar>
            <input type="file" id="fileInput" @change="handleFileChange" style="display:none"/>
            <ion-button @click="uploadAvatar">上传</ion-button>
            <canvas id="canvas"></canvas>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>

<script setup lang="ts">
  import { reactive, onMounted } from 'vue';
  import { useUserStore } from '@/stores/userInfo';
  import { IonAvatar,IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/vue';
  const userStore = useUserStore();
  var avatarUrl = userStore.userAvatar.avatar_url;//设置头像地址初始值


  
const handleFileChange = (event: Event) => {

  console.log("file changed")


  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  if(file?.name.split('.').pop()?.toLowerCase() !== 'jpg' && file?.name.split('.').pop()?.toLowerCase() !== 'jpeg' && file?.name.split('.').pop()?.toLowerCase() !== 'png') {
    alert("请上传jpg、jpeg或png格式的图片");
    return;
  }
  if (file) {
    const reader = new FileReader();

    console.log("file is ",file)
    
    
    reader.onload = (e: ProgressEvent<FileReader>) => {

      console.log("e.target?.result is ",e.target?.result)

      avatarUrl = e.target?.result as string;
      console.log("######avatarUrl is ",avatarUrl)
      document.getElementById('avatar')?.setAttribute('src', avatarUrl);
    };

    reader.readAsDataURL(file);
  }
};

// 假设你有一个文件输入元素
// const fileInput = document.querySelector('input[type="file"]');
// if (fileInput) {
//   fileInput.addEventListener('change', handleFileChange);
// }











  //原来的函数
  // const handleFileChange = (event: Event) => {
  //   const target = event.target as HTMLInputElement;
  //   const file = target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       // userStore.avatar = e.target?.result as string;
  //       console.log(e.target?.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  
  const uploadAvatar = async () => {
    const userId = userStore.userLogin.user_id; // 假设用户ID存储在userStore中
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    
    if (!file) {
      alert('请选择一个文件上传');
      return;
    }
    if(file?.name.split('.').pop()?.toLowerCase() !== 'jpg' && file?.name.split('.').pop()?.toLowerCase() !== 'jpeg' && file?.name.split('.').pop()?.toLowerCase() !== 'png') {
      alert("请上传jpg、jpeg或png格式的图片");
      return;
    }

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('avatar', file);
    
    try {
      // const response = await axios.post('http://123.57.78.6:3000/setAvatar', formData);
      const response = await axios.post('https://aiql.cloud/setAvatar', formData);
      if (response.status === 200) {
        alert('用户头像更新成功');
        console.log(response.data);
        userStore.userAvatar.avatar_url = response.data.avatar_url;
        router.push('/tabs/tab3'); // 跳转到个人中心页面
      } else {
        alert('服务器错误');
      }
    } catch (error) {
      alert('上传失败，请稍后再试');
    }
  };
  

  console.log("setAvatar执行结束")
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
  


