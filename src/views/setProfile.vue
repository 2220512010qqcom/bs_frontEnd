<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>用户信息</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list >
          <ion-item>
            <ion-label position="stacked">性别</ion-label>
            <ion-input v-model="editData.gender"></ion-input>
          </ion-item>
          <!-- <ion-item> -->
            <!-- <ion-label position="stacked">Birth Date</ion-label>
            <ion-input v-model="editData.birth_date"></ion-input> -->
          <!-- </ion-item> -->
          <ion-item>
            <ion-label position="stacked">出生日期</ion-label>
              <ion-datetime v-model="editData.birth_date" display-format="YYYY-MM-DD" placeholder="Select Date"></ion-datetime>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">身高</ion-label>
            <ion-input v-model="editData.height" type="number"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">体重</ion-label>
            <ion-input v-model="editData.weight" type="number"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">用户名</ion-label>
            <ion-input v-model="editData.user_name"></ion-input>
          </ion-item>
          <ion-button @click="updateUserData">保存</ion-button>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
  import axios from 'axios';
  import { onMounted } from 'vue';
  import { useUserStore } from '@/stores/userInfo';
  import { useRouter } from 'vue-router';
  import moment from 'moment';
  
  const router = useRouter();
  const userStore = useUserStore();
  const isEditMode = ref(false);
  const editData = ref({ ...userStore.userBasicAttributes });
  
  const fetchUserData = async () => {
    try {
      // const response = await axios.get(`http://123.57.78.6:3000/getUserInfo/${userStore.userLogin.user_id}`);
      const response = await axios.get(`https://www.aiql.cloud/login/getUserInfo/${userStore.userLogin.user_id}`);
      userStore.userBasicAttributes = response.data.basicAttributes;
  
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };
  
  onMounted(() => {
    if (!userStore.userBasicAttributes.user_id) {
      fetchUserData();
    }
  });
  
  // const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value;
    if (isEditMode.value) {
      editData.value = { ...userStore.userBasicAttributes };
    }
  
  
  const updateUserData = async () => {
    try {
      // const response = await axios.put('http://123.57.78.6:3000/updateAccount', {
      const response = await axios.put('https://aiql.cloud/updateAccount', {

        ...editData.value,
        birth_date: moment(editData.value.birth_date).format('YYYY-MM-DD'),
        user_id: userStore.userLogin.user_id
      });
      userStore.userBasicAttributes = { ...editData.value };
      console.log('User data updated successfully:', response.data);
      alert("保存成功");
      router.push('/tabs/tab3');
    } catch (error) {
      alert("保存失败");
      console.error('Failed to update user data:', error);
    }
  };
  </script>
  
  <style scoped>
  ion-note {
    margin-left: auto;
  }
  </style>
  
