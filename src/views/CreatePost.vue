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
            <ion-list>
                <ion-item v-for="(image, index) in images" :key="index">
                    <img :src="image" alt="Uploaded Image" style="width: 100px; height: 100px; object-fit: cover; margin-right: 10px;" />
                    <ion-button color="danger" @click="removeImage(index)">删除</ion-button>
                </ion-item>
            </ion-list>
            <ion-button expand="block" @click="triggerFileInput">添加图片</ion-button>
            <input type="file" ref="fileInput" multiple style="display: block;" @change="uploadImage" />
            <!-- <input type="file" ref="fileInput" style="display: block;" /> -->
            <ion-button expand="block" @click="createPost">提交帖子</ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonTextarea, IonButton, IonList } from '@ionic/vue';
import { useUserStore } from '@/stores/userInfo';

const router = useRouter();
const userStore = useUserStore();

const postContent = ref<string>('');
const images = ref<string[]>([]);
const userId = ref<string>(userStore.userLogin.user_id);
const postId = ref<string>(''); // 假设帖子ID在创建帖子后生成
const fileInput = ref<HTMLInputElement | null>(null);
const fileList = ref<File[]>([]);

const removeImage = (index: number) => {
    images.value.splice(index, 1);
};

const triggerFileInput = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
};

const uploadImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;

    const file = target.files[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === 'string') {
            images.value.push(e.target.result); // 设置图片预览
        }
    };
    reader.readAsDataURL(file);

    fileList.value.push(file);

    // 下面为上传图片到服务器的代码，已注释
    // const formData = new FormData();
    // formData.append('user_id', userId.value);
    // formData.append('post_id', postId.value || 'temp');
    // formData.append('picture', file);
    // formData.append('order', images.value.length.toString());
    // try {
    //     const response = await axios.post('https://aiql.cloud:3000/uploadPostPicture', formData, {
    //         headers: { 'Content-Type': 'multipart/form-data' },
    //     });
    //     if (response.data.status === 'success') {
    //         images.value.push(response.data.data.picture_url);
    //         alert('图片上传成功');
    //     } else {
    //         alert(response.data.message || '图片上传失败');
    //     }
    // } catch (error: any) {
    //     alert(error.response?.data?.message || '服务器错误');
    // }
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
    };

    try {
        const response = await axios.post('https://aiql.cloud/createPost', postData);
        if (response.data.post_id) {
            alert(`帖子创建成功，帖子ID: ${response.data.post_id}`);

            postId.value = response.data.post_id; // 保存帖子ID
            postContent.value = '';

            try {
                let order = 1;
                for (const file of fileList.value) {
                    const formData = new FormData();
                    formData.append('user_id', userId.value);
                    formData.append('post_id', postId.value || 'temp');
                    formData.append('picture', file);
                    formData.append('order', order.toString());
                    order++;

                    const res = await axios.post('https://aiql.cloud/uploadPostPicture', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                    if (res.data.status === 'success') {
                        images.value.push(res.data.data.picture_url);
                        alert('图片上传成功');
                    } else {
                        alert(res.data.message || '图片上传失败');
                    }
                }
            } catch (error: any) {
                console.error("出现的问题：", error);
            }
            // router.push('/forumCard_first'); // 跳转到帖子列表页面
        } else {
            alert('创建帖子失败，请稍后再试');
        }
    } catch (error: any) {
        alert(error.response?.data?.error || '服务器错误');
    }
};
</script>

<style scoped>
ion-content {
    padding: 16px;
}
</style>
