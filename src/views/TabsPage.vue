<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <!-- <ion-icon :icon="triangle" /> -->
          <ion-icon :icon="homeOutline" />
          <ion-label>首页</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="bookOutline" />
          <ion-label>推文中心</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
        <!-- <ion-tab-button tab="tab3" href="/forum"> -->
          <ion-icon :icon="headsetOutline" />
          <ion-label>个人中心</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { bookOutline, ellipse, headset, headsetOutline, headsetSharp, homeOutline, square, triangle } from 'ionicons/icons';
</script>
