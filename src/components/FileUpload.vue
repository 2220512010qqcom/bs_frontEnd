<template>
        <ion-card class="upload-page">
            <ion-card-header>
                <ion-card-title>上传Excel文件</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <input
                    type="file"
                    accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                    @change="onFileChange"
                />
                <div v-if="errorMsg" style="color: red; margin-top: 8px;">{{ errorMsg }}</div>
            </ion-card-content>
        </ion-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
const errorMsg = ref('');

const onFileChange = (event: Event) => {
    errorMsg.value = '';
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const isExcel =
            file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.type === 'application/vnd.ms-excel';
        if (!isExcel) {
            errorMsg.value = '上传文件只能是 Excel 格式!';
            input.value = '';
        } else {
            // 这里可以处理文件上传逻辑
            // 例如：emit('file-selected', file)
            // 由于字段类型和上传逻辑未提供，暂时不处理
        }
    }
};
</script>
<style scoped>
.upload-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}


</style>


