<template>
  <ion-page>
      <ion-header>
          <ion-toolbar>
              <ion-title>创建帖子</ion-title>
          </ion-toolbar>
      </ion-header>
      <ion-content>
          <ion-item>
              <ion-label position="stacked">帖子内容</ion-label>
              <ion-textarea v-model="postContent" placeholder="请输入帖子内容"></ion-textarea>
          </ion-item>
          <ion-item>
          
              <ion-input type="file" placeholder="请输入图片URL" v-model="fileHolder" @change="handleFileChange"></ion-input>

              <ion-card>
                  <ion-card-header>
                      <ion-card-title>图片预览</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                      <img :src="imageUrl" alt="图片预览" v-if="imageUrl" />
                  </ion-card-content>
              </ion-card>
          </ion-item>
          <ion-item>
              <ion-button expand="block" @click="addImage">添加图片</ion-button>
              <ion-button expand="block" @click="triggerFileInput">上传图片</ion-button>
              <input type="file" ref="fileInput" @change="uploadImage" style="display: none;" />
          </ion-item>
          <ion-list>
              <ion-item v-for="(image, index) in images" :key="index">
                  <ion-label>{{ image }}</ion-label>
                  <ion-button color="danger" @click="removeImage(index)">删除</ion-button>
              </ion-item>
          </ion-list>
          <ion-button expand="block" @click="createPost">提交帖子</ion-button>
      </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonTextarea, IonInput, IonButton, IonList } from '@ionic/vue';
import { useUserStore } from '@/stores/userInfo';

const router = useRouter();
const userStore = useUserStore();

const postContent = ref('');
const imageUrl = ref('');
const images = ref([]);
const userId = ref(userStore.userLogin.user_id);
const postId = ref(''); // 假设帖子ID在创建帖子后生成
const fileInput = ref(null);
const fileHolder = ref(null);


console.log("fileHolder is ",fileHolder.value)

const handleFileChange = (event) => {
    console.log("fileHolder is ",fileHolder.value)
    const file = event.target.files[0];
    console.log("file is ",file)
    if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                    imageUrl.value = e.target.result;
            };
            reader.readAsDataURL(file);
    }
};



const addImage = () => {
    if (imageUrl.value.trim()) {
            images.value.push(imageUrl.value.trim());
            imageUrl.value = '';
    }
};

const removeImage = (index) => {
    images.value.splice(index, 1);
};

const triggerFileInput = () => {
    fileInput.value.click();
};

const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('user_id', userId.value);
    formData.append('post_id', postId.value || 'temp'); // 使用临时值，实际应用中应替换为真实帖子ID
    formData.append('picture', file);
    formData.append('order', images.value.length.toString());

    try {
            const response = await axios.post('https://aiql.cloud/uploadPostPicture', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.data.status === 'success') {
                    images.value.push(response.data.data.picture_url);
                    alert('图片上传成功');
            } else {
                    alert(response.data.message || '图片上传失败');
            }
    } catch (error) {
            alert(error.response?.data?.message || '服务器错误');
    }
};

const createPost = async () => {
    if (!userId.value) {
            alert('请先登录');
            return;
    }
    if (!postContent.value.trim()) {
            alert('帖子内容不能为空');
            return;
    }
    if (images.value.length > 9) {
            alert('最多只能添加9张图片');
            return;
    }

    const postData = {
            user_id: userId.value,
            content: postContent.value,
            images: images.value,
    };

    try {
            const response = await axios.post('https://aiql.cloud/createPost', postData);
            if (response.data.post_id) {
                    alert(`帖子创建成功，帖子ID: ${response.data.post_id}`);
                    postId.value = response.data.post_id; // 保存帖子ID
                    postContent.value = '';
                    images.value = [];
            }
    } catch (error) {
            alert(error.response?.data?.error || '服务器错误');
    }
};

onMounted(()=>{
        checkLogin()
})


</script>


<style scoped>
ion-content {
  padding: 16px;
}
</style>
