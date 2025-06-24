<template>
  <div class="avatar">
    <img :src="src || defaultAvatar" alt="用户头像">
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserAvatar',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      defaultAvatar: 'path_to_default_avatar.png' // 默认头像图片地址
    };
  },
  watch: {
    src(newVal) {
      if (typeof newVal === 'string' && newVal.startsWith('http://127.0.0.1:5000')) {
        this.$emit(
          'update:src',
          newVal.replace('http://127.0.0.1:5000', 'https://aiql.cloud:3000')
        );
      }
    }
  },
  mounted() {
    if (
      typeof this.src === 'string' &&
      this.src.startsWith('http://127.0.0.1:5000')
    ) {
      this.$emit(
        'update:src',
        this.src.replace('http://127.0.0.1:5000', 'https://aiql.cloud:3000')
      );
    }
  }
});
</script>

<style scoped>
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

