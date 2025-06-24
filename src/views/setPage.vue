/**************************** CodeGeeX Inline Diff ****************************/
<template>
    <ion-page>
      <ion-content>
        <ion-list>
          <ion-item-group>
            <ion-item lines="full" >
              <ion-label>
                <ion-text color="primary">
                  <h2>常规</h2>
                </ion-text>
              </ion-label>
            </ion-item>
            <ion-item @click="navigateTo('upload')">
              <ion-label>
                上传数据
              </ion-label>
            </ion-item>
            <ion-item @click="navigateTo('history')">
              <ion-label>
                历史数据
              </ion-label>
            </ion-item>
          </ion-item-group>
  
          <ion-item-group>
            <ion-item lines="full">
              <ion-label>
                <ion-text color="primary">
                  <h2>个人信息</h2>
                </ion-text>
              </ion-label>
            </ion-item>
            <ion-item @click="navigateTo('profile')">
              <ion-label>
                管理您的个人信息
              </ion-label>
            </ion-item>
          </ion-item-group>
  
          <ion-item-group>
            <ion-item lines="full">
              <ion-label>
                <ion-text color="primary">
                  <h2>社区</h2>
                </ion-text>
              </ion-label>
            </ion-item>
            <ion-item @click="navigateTo('forum')">
              <ion-label>
                参与社区讨论
              </ion-label>
            </ion-item>
          </ion-item-group>
  
          <ion-item-group>
            <ion-item lines="full">
              <ion-label>
                <ion-text color="primary">
                  <h2>反馈</h2>
                </ion-text>
              </ion-label>
            </ion-item>
            <ion-item @click="navigateTo('feedback')">
              <ion-label>
                提交您的反馈意见
              </ion-label>
            </ion-item>
            <ion-item @click="navigateTo('viewFeedback')">
              <ion-label>
                查看所有反馈意见
              </ion-label>
            </ion-item>
          </ion-item-group>
  
          <ion-item-group>
            <ion-item lines="full">
              <ion-label>
                <ion-text color="primary">
                  <h2>社交</h2>
                </ion-text>
              </ion-label>
            </ion-item>
            <ion-item @click="navigateTo('tweets')">
              <ion-label>
                查看最新推文
              </ion-label>
            </ion-item>
            <ion-item @click="navigateTo('friends')">
              <ion-label>
                查看您的好友列表
              </ion-label>
            </ion-item>
          </ion-item-group>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonPage, IonContent, IonList, IonItemGroup, IonItem, IonLabel, IonText } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    components: {
      IonPage,
      IonContent,
      IonList,
      IonItemGroup,
      IonItem,
      IonLabel,
      IonText
    },
    setup() {
      const router = useRouter();
  
      const navigateTo = (route: string) => {
        router.push(route);
      };
  
      return {
        navigateTo
      };
    }
  });
  </script>
  
  <style scoped>
  ion-item-group h2 {
    margin: 0;
    padding: 10px;
    background-color: #f0f0f0;
  }
  
  ion-item {
    --background: #ffffff;
    --background-activated: #e0e0e0;
  }
  </style>

/******************** 7692de77-00b3-45e8-87a6-f2997b7ab5ab ********************/