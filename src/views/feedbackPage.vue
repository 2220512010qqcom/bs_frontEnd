<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
            <!-- <ion-buttons slot="start">
                <ion-back-button text="返回" @click="router.push('/getFeedback');">返回！！！！</ion-back-button>
            </ion-buttons> -->
            <ion-title style="text-align: center;">反馈页面</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
            <ion-card-header>
                <ion-card-title>反馈表单</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <form @submit.prevent="submitFeedback">
                <ion-item>
                    <ion-label position="stacked">用户ID</ion-label>
                    <ion-input v-model="userStore.userLogin.user_id" readonly></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">反馈内容</ion-label>
                    <ion-textarea v-model="feedback.content" required></ion-textarea>
                </ion-item>
                <ion-button expand="full" type="submit">提交反馈</ion-button>
                </form>
            </ion-card-content>
            </ion-card>
            <ion-card v-if="adminReply">
            <ion-card-header>
                <ion-card-title>管理员回复</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <p>{{ adminReply.content }}</p>
                <p>回复时间: {{ adminReply.replyTime }}</p>
                <p>状态: {{ adminReply.status }}</p>
            </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader,IonBackButton , IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonCheckbox, IonButton,IonButtons} from '@ionic/vue';
import { useUserStore } from '@/stores/userInfo';

const userStore = useUserStore();
const router = useRouter();

interface UserFeedback {
    feedback_id: string;
    user_id: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
    admin_reply: string;
    admin_reply_at: Date;
    status: string;
}
interface AdminReply {
    content: string;
    replyTime: string;
    status: string;
}

const feedback = ref<UserFeedback>({
    feedback_id: '',
    user_id: '',
    content: '',
    created_at: new Date(),
    updated_at: new Date(),
    is_active: false,
    admin_reply: '',
    admin_reply_at: new Date(),
    status: ''
});

const adminReply = ref<AdminReply | null>(null);

const submitFeedback = async () => {
    feedback.value.updated_at = new Date();
    const response = await fetch('https://aiql.cloud/submitFeedback', { // 修改后的URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userStore.userLogin.user_id,
            content: feedback.value.content
        })
    });
    const result = await response.json();
    if (result.message === 'Feedback submitted successfully') {
        alert('反馈提交成功');
        feedback.value.content = '';//清空表单
        // getAdminReply(result.feedbackId);
        router.push('/tabs/tab3'); // 跳转到首页
    } else {
        alert('反馈提交失败');
    }
};
function getAdminReply(){

}


</script>

<style scoped>
ion-card {
    margin: 20px;
}
ion-button {
    margin-top: 20px;
}
</style>

