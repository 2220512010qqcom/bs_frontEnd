<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
            <!-- <ion-buttons slot="start"> -->
                <!-- <ion-back-button text="返回" @click="() => router.push('/tabs/tab1')">返回！！！！</ion-back-button> -->
                <!-- <ion-buttons text="写反馈" @click="() => router.push('/feedback')">！</ion-buttons> -->
            <!-- </ion-buttons> -->
            <ion-title>反馈页面</ion-title>
            <ion-buttons text="写反馈" @click="() => router.push('/feedback')" slot="end">写反馈</ion-buttons>
            </ion-toolbar>
            
        </ion-header>
        <ion-content>
            <ion-list v-if="feedbackList.length">
                <ion-item v-for="feedback in feedbackList" :key="feedback.id">
                    <ion-label>
                        <h2>用户名: {{ feedback.user_name }}</h2>
                        <!-- <h2>用户名： {{ feedback }}</h2> -->
                        <p>{{ feedback.content }}</p>
                        <p>发布时间: {{ new Date(feedback.created_at).toLocaleDateString() }}</p>
                        <p v-if="feedback.admin_reply">回复: {{ feedback.admin_reply }}</p>
                        <p v-if="feedback.admin_reply && feedback.admin_reply_at">回复时间: {{ new Date(feedback.admin_reply_at).toLocaleDateString() }}</p>
                    </ion-label>
                </ion-item>
            </ion-list>
            <div v-else>
                <ion-text color="medium">
                    <p>暂无反馈</p>
                </ion-text>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader,IonButton, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonText, IonButtons, IonBackButton } from '@ionic/vue';
import axios from 'axios';

interface Feedback {
    id: number;
    user_id: number;
    user_name:string;
    content: string;
    created_at: string;
    admin_reply?: string;
    admin_reply_at?: string;
}
const router = useRouter();
const feedbackList = ref<Feedback[]>([]);

const fetchFeedback = async (): Promise<void> => {
    try {
        const response = await axios.get('https://aiql.cloud/viewFeedback'); // 修改服务器端口地址
        feedbackList.value = response.data;
        console.log('获取反馈成功:', response.data);
    } catch (error) {
        console.error('获取反馈失败:', error);
    }
};

onMounted(() => {
    console.log("getFeedbackPage mounted");
    fetchFeedback();
});

</script>

<style scoped>
ion-title {
    text-align: center;
}
ion-item {
    --background: #f9f9f9;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
}
</style>

