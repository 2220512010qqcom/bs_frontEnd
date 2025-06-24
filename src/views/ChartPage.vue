<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
            
            <ion-title style="text-align: center;">图像界面</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="isAll = !isAll">切换</ion-button>
            </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <div v-if="chartData.length > 0" class="chart-container">
            <all-line-chart :data="chartData" :name="name" v-if="isAll"></all-line-chart>
            <line-chart :data="chartData" v-else></line-chart>
            <ion-label class="most-low-level-alert" v-if="userStore.userAnalyse.riskLevel === '极低风险'">风险指数: {{ userStore.userAnalyse.riskIndex }}    {{ userStore.userAnalyse.riskLevel }}</ion-label><br>
            <ion-label class="low-level-alert" v-if="userStore.userAnalyse.riskLevel === '低风险'">风险指数: {{ userStore.userAnalyse.riskIndex }}    {{ userStore.userAnalyse.riskLevel }}</ion-label><br>
            <ion-label class="mid-level-alert" v-if="userStore.userAnalyse.riskLevel === '中风险'">风险指数: {{ userStore.userAnalyse.riskIndex }}    {{ userStore.userAnalyse.riskLevel }}</ion-label><br>
            <ion-label class="high-level-alert" v-if="userStore.userAnalyse.riskLevel === '高风险'">风险指数: {{ userStore.userAnalyse.riskIndex }}    {{ userStore.userAnalyse.riskLevel }}</ion-label><br>
            <ion-label class="most-high-level-alert" v-if="userStore.userAnalyse.riskLevel === '极高风险'">风险指数: {{ userStore.userAnalyse.riskIndex }}    {{ userStore.userAnalyse.riskLevel }}</ion-label><br>
            <!-- <ion-label >风险等级: {{ userStore.userAnalyse.riskLevel }}</ion-label><br> -->
            
        </div>
        <div v-else>
            <ion-label>没有数据,暂无视图</ion-label>
        </div>
        
        <br>
        <!-- <ion-label >风险指数: {{ userStore.userAnalyse.riskIndex }}</ion-label><br>
        <ion-label >风险等级: {{ userStore.userAnalyse.riskLevel }}</ion-label><br> -->
        <!-- <ion-button @click="isAll = !isAll">切换</ion-button> -->
        <!-- <ion-button @click="refreshPage">刷新页面</ion-button> -->

        <!-- <p>{{ chartData }}</p> -->
        <!-- <ion-button @click = "name+='~'">改变名字</ion-button> -->
      </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, onUpdated } from 'vue';
import AllLineChart from '../components/AllLineChart.vue';
import LineChart from '../components/LineChart.vue';
import { IonPage, IonHeader, IonLabel, IonBackButton, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, onIonViewDidEnter, onIonViewDidLeave, onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userInfo';
import axios from 'axios';

var name = ref('综合视图');

const userStore = useUserStore();
const router = useRouter();
const isAll = ref(true);

interface UserUploads {
    upload_id: string;
    user_id: string;
    heart_rate: number;
    blood_pressure: string;
    oxygen_saturation: number;
    upload_time: Date;
}
const chartData = ref<UserUploads[]>(userStore.userUploads);

const fetchHistoryData = async () => {
    console.log("fetchHistoryData方法被调用了");
    console.log("user_id is ", userStore.userLogin.user_id);
    try {
        if (userStore.userLogin.user_id === "" || userStore.userLogin.user_id === undefined) {
            console.log("user_id is empty, redirecting to index page");
        }
        // const response = await axios.get(`http://123.57.78.6/getRecord/${userStore.userLogin.user_id}`, {
        const response = await axios.get(`https://aiql.cloud/getRecord/${userStore.userLogin.user_id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        userStore.setUserUploads(response.data);

        chartData.value = response.data;
        console.log("chartData is ", chartData.value);

    } catch (error) {
        console.error('Error fetching history data:', error);
    }
};

const fetchAnalyze = async () => {
    try {
        // const response = await axios.get(`http://123.57.78.6/analyze/${userStore.userLogin.user_id}`, {
        const response = await axios.get(`https://aiql.cloud/analyze/${userStore.userLogin.user_id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        userStore.userAnalyse.riskIndex = response.data.riskIndex;
        userStore.userAnalyse.riskLevel = response.data.riskLevel;
    } catch (error) {
        console.error('Error fetching history data:', error);
    }
};

// 刷新页面方法
const refreshPage = async () => {
    console.log("刷新页面方法被调用了");
    // window.location.reload();
    // 重新获取数据
    await fetchHistoryData();
    await fetchAnalyze();
};

onMounted(async () => {
    if (userStore.userLogin.user_id === undefined || userStore.userLogin.user_id === "") {
        alert("请先登录，点击确认前往登录界面");
        router.push('/login');
        return
    }
    if (userStore.userUploads.length === 0) {
        await fetchHistoryData();
    }
    if (Object.keys(userStore.userAnalyse).length === 0) {
        await fetchAnalyze();
    }
});

onUnmounted(() => {
    console.log("chart page unmounted");
});

onUpdated(() => {
    console.log("页面改变发生了");
});


onIonViewDidEnter(() => {
    console.log('Home page did enter');
});

onIonViewDidLeave(() => {
    console.log('Home page did leave');
});

onIonViewWillEnter(() => {
    console.log('Home page will enter');
    //页面进入以前重新加载数据
    refreshPage();
});

onIonViewWillLeave(() => {
    console.log('Home page will leave');
});


</script>
<style scoped>  
.chart-container {
    width: 100vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.most-low-level-alert {
    color: green;
    font-size: 20px;
}
.low-level-alert {
    color: blue;
    font-size: 20px;
}
.mid-level-alert {
    color: orange;
    font-size: 20px;
}
.high-level-alert {
    color: red;
    font-size: 20px;
}
.most-high-level-alert {
    color: darkred;
    font-size: 20px;
}
</style>
