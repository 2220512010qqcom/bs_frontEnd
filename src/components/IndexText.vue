<template>
<div class="index-container">
    <ion-label class="most-low-level-alert" v-if="userStore.userAnalyse.riskLevel === '极低风险'">风险指数: {{ userStore.userAnalyse.riskIndex }}    {{ userStore.userAnalyse.riskLevel }}</ion-label>
    <ion-label class="low-level-alert" v-if="userStore.userAnalyse.riskLevel === '低风险'">风险指数: {{ userStore.userAnalyse.riskIndex }}    {{ userStore.userAnalyse.riskLevel }}</ion-label>
    <ion-label class="mid-level-alert" v-if="userStore.userAnalyse.riskLevel === '中风险'">风险指数: {{ userStore.userAnalyse.riskIndex }}    {{ userStore.userAnalyse.riskLevel }}</ion-label>
    <ion-label class="high-level-alert" v-if="userStore.userAnalyse.riskLevel === '高风险'">风险指数: {{ userStore.userAnalyse.riskIndex }}    {{ userStore.userAnalyse.riskLevel }}</ion-label>
    <ion-label class="most-high-level-alert" v-if="userStore.userAnalyse.riskLevel === '极高风险'">风险指数: {{ userStore.userAnalyse.riskIndex }}    {{ userStore.userAnalyse.riskLevel }}</ion-label>
</div>
</template>
<script lang="ts" setup>    
import { useUserStore } from '../stores/userInfo';
import { IonLabel } from '@ionic/vue';
const userStore = useUserStore();


</script>
<style scoped>
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
.index-container{
    background: linear-gradient(90deg, #e0f7fa 0%, #fffde4 100%);
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 12px;
}
</style>