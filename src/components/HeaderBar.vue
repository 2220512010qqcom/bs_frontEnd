<template>
  <div class="header-bar">
    <img :src="userAvatar" alt="User Avatar" class="user-avatar">
    <span class="user-name">{{ userName }}</span>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue';

defineComponent({
  name: 'HeaderBar',
  props: {
    userAvatar: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.header-bar {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e0e0e0;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  font-size: 16px;
  font-weight: bold;
}
</style>

