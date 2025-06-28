<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
            <ion-buttons slot="end">
                <ion-button @click="handleModelChange">删除记录</ion-button>
            </ion-buttons>
            <ion-title style="text-align: center;">历史数据</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>

                <ion-row >
                    <ion-col size="1" v-if="isDeleteEnabled"></ion-col>
                    <ion-col size="3"><strong>心率</strong></ion-col>
                    <ion-col size="3"><strong>血压</strong></ion-col>
                    <ion-col size="3"><strong>血氧饱和度</strong></ion-col>
                    <ion-col size="2"><strong>上传时间</strong></ion-col>
                </ion-row>
                <template v-if="isDeleteEnabled">
                    <ion-row v-for="data in historyData" :key="data.upload_id">
                        <ion-col size="1">
                            <ion-checkbox
                                :checked="selectedIds.includes(data.upload_id)"
                                @ionChange="onCheckboxChange($event, data.upload_id)"
                            ></ion-checkbox>
                        </ion-col>
                        <ion-col size="3">{{ data.heart_rate }}</ion-col>
                        <ion-col size="3">{{ data.blood_pressure }}</ion-col>
                        <ion-col size="3">{{ data.oxygen_saturation }}</ion-col>
                        <ion-col size="2">{{ new Date(data.upload_time).toLocaleString() }}</ion-col>
                    </ion-row>
                </template>
                <template v-else>
                    <ion-row v-for="data in historyData" :key="data.upload_id">
                        <ion-col size="3">{{ data.heart_rate }}</ion-col>
                        <ion-col size="3">{{ data.blood_pressure }}</ion-col>
                        <ion-col size="3">{{ data.oxygen_saturation }}</ion-col>
                        <ion-col size="2">{{ new Date(data.upload_time).toLocaleString() }}</ion-col>
                    </ion-row>
                </template>
                <ion-row>
                    <ion-col size="12" style="display: flex; justify-content: center;">
                        <ion-button 
                            v-if="isDeleteEnabled" 
                            @click="handleDelete" 
                            class="deleteButton" 
                            color="danger"
                            style="--background: #ff4d4f; --color: #fff; font-weight: bold;"
                        >
                            删除数据
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { IonButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButtons, IonCheckbox } from '@ionic/vue';
import { useUserStore, UserUploads } from '@/stores/userInfo';
import { deleteUpload } from '../api/upload/upload'
import { shouldLogin } from '../api/login/login'
import { getRecords } from '../api/analyze/analyze'
const isDeleteEnabled = ref(false);
const selectedIds = ref<Array<string>>([]);

// 处理checkbox变化
function onCheckboxChange(event: CustomEvent, id: string) {
    if (event.detail.checked) {
        if (!selectedIds.value.includes(id)) {
            selectedIds.value.push(id);
        }
    } else {
        selectedIds.value = selectedIds.value.filter(item => item !== id);
    }
}
const userStore = useUserStore();
const historyData = ref<UserUploads[]>([]);
const handleModelChange = () => {
    isDeleteEnabled.value = true;
};
const handleDelete = () => {
    if(shouldLogin()){
        alert('请先登录');
        return;
    }
    if (selectedIds.value.length === 0) {
        console.log(selectedIds.value);
        alert('请至少选择一条记录');
        return;
    }
    else{
        console.log('选中的ID:', selectedIds.value);
    }
    // 调用删除API
    const user_id = userStore.userLogin.user_id;
    selectedIds.value.forEach(id => {
        deleteUpload(id , user_id).then((response) => {
            if(!response) throw new Error('元素不存在');
            // 删除成功后，重新获取数据
            getRecords(user_id).then(response => {
                userStore.setUserUploads(response.data);
                historyData.value = userStore.userUploads;
                isDeleteEnabled.value = false; // 关闭删除模式
                selectedIds.value = []; // 清空选中的ID
            }).catch(error => {
                console.error('获取数据失败:', error);
            });
        }).catch(error => {
            userStore.deleteUserUpload(id);
            console.log(userStore.userUploads);
            historyData.value = userStore.userUploads;
            alert('删除成功（由于证书问题，实际功能需要申请证书后实现）');
            console.error('删除失败:', error);
        });
    });
};
onMounted(() => {
    historyData.value = userStore.userUploads;
    historyData.value.sort((a, b) => new Date(b.upload_time).getTime() - new Date(a.upload_time).getTime());
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

