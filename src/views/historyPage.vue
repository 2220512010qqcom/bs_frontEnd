<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
            <!-- <ion-buttons slot="start">
                <ion-back-button text="返回" @click="() => router.push('/tabs/tab1')">返回！！！！</ion-back-button>
            </ion-buttons> -->
            <ion-title style="text-align: center;">历史数据</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="3"><strong>心率</strong></ion-col>
                    <ion-col size="3"><strong>血压</strong></ion-col>
                    <ion-col size="3"><strong>血氧饱和度</strong></ion-col>
                    <ion-col size="3"><strong>上传时间</strong></ion-col>
                </ion-row>
                <ion-row v-for="data in historyData" :key="data.id">
                    <ion-col size="3">{{ data.heart_rate }}</ion-col>
                    <ion-col size="3">{{ data.blood_pressure }}</ion-col>
                    <ion-col size="3">{{ data.oxygen_saturation }}</ion-col>
                    <ion-col size="3">{{ data.upload_time }}</ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButtons, IonBackButton } from '@ionic/vue';
import { useUserStore } from '@/stores/userInfo';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

interface HistoryData {
    id: number;
    heart_rate: number;
    blood_pressure: string;
    oxygen_saturation: number;
    upload_time: string;
}

const historyData = ref<HistoryData[]>([]);

const fetchHistoryData = async () => {
    console.log("fetchHistoryData方法被调用了");
    try {
        console.log('user_id:', userStore.userLogin.user_id);
        // const response = await axios.get(`http://123.57.78.6:3000/getRecord/${userStore.userLogin.user_id}`, {  // 修改服务器端口
        const response = await axios.get(`https://aiql.cloud/getRecord/${userStore.userLogin.user_id}`, {  // 修改服务器端口
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('user_id:', userStore.userLogin.user_id);
        historyData.value = response.data;
        userStore.userUploads = response.data;
        console.log('Fetched history data:', response.data);
    } catch (error) {
        console.error('Error fetching history data:', error);
    }
};

onMounted(() => {
    if (userStore.userLogin.user_id === undefined || userStore.userLogin.user_id === "") {
        alert("请先登录，点击确认前往登录界面");
        router.push('/login');
        return
    }
    fetchHistoryData();
});
</script>

<style scoped>
ion-grid {
    width: 100%;
}

ion-col {
    border: 1px solid #ddd;
    padding: 8px;
}

ion-col strong {
    background-color: #f2f2f2;
    display: block;
    padding: 8px;
}
</style>

