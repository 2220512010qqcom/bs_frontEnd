<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="page-title">推文中心</ion-title>
        <!-- <ion-buttons slot="start">
          <ion-back-button defaultHref="/home" text="返回"></ion-back-button>
        </ion-buttons> -->
        <!-- <ion-buttons slot="end">
          <ion-button @click="createPost">发布帖子</ion-button>
        </ion-buttons> -->
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list v-if="posts.length" class="post-list">
        <ion-item
          v-for="post in posts"
          :key="post.post_id"
          lines="none"
          class="post-item"
          button
        >
          <ion-card class="post-card" @click="viewDetails(post)">
            <!-- <ion-card-header> -->
              <!-- <ion-avatar slot="start"  class="post-avatar"> -->
                <!-- <ion-img :src="post.avatar_url"></ion-img> -->
                <!-- <ion-img src="post.avatar_url"></ion-img> -->
              <!-- </ion-avatar> -->
              <!-- <ion-card-title class="post-title">{{ post.content }}</ion-card-title> -->
            <!-- </ion-card-header> -->
            <ion-card-content>
              <div style="display: flex; align-items: center;">
              <ion-avatar class="post-avatar">
                <ion-img :src="post.avatar_url"></ion-img>
              </ion-avatar>
              <ion-text class="post-username" style="margin-left: 10px; font-weight: bold;">
                {{ post.user_name }}
              </ion-text>
        
              </div>
              <p class="post-content">{{ post.title }}</p>
              <ion-text color="medium" class="post-meta">
              <small>时间: {{ post.created_at }}</small>
              </ion-text>
              <div class="post-stats">
                <ion-text color="primary">
                  <small @click.stop="likePost(post)">👍 {{ post.likes_count }} 点赞</small>
                </ion-text>
                <ion-text color="secondary" style="margin-left: 10px;">
                  <small>💬 {{ post.comments_count }} 评论</small>
                </ion-text>
              </div>
              <!-- <ion-button
                size="small"
                color="primary"
                @click.stop="likePost(post)"
                class="like-button"
              >
                点赞
              </ion-button> -->
            </ion-card-content>
          </ion-card>
        </ion-item>
      </ion-list>
      <div v-else class="no-posts">
        <ion-text color="medium">
          <p>暂无帖子</p>
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "@/stores/userInfo";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonCard,
  IonCardContent,
  IonText,
  IonAvatar,
  IonImg,
} from "@ionic/vue";


type Post = {
  post_id: number;
  avatar_url: string;
  user_name: string;
  title: string;
  content: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
};

const posts = ref<Post[]>([]);
const router = useRouter();
const userStore = useUserStore();

const fetchPosts = async () => {
  try {
    const response = await axios.get("https://aiql.cloud/getNewPost/0");
    posts.value = response.data;
    console.log("获取帖子成功:", posts.value);
    alert("获取成功")
    alert(posts.value)
    posts.value.map(post => {
      console.log(post.avatar_url)
    })
  } catch (error) {
    if (typeof error === "object" && error !== null) {
      for (const key in error) {
      if (Object.prototype.hasOwnProperty.call(error, key)) {
        console.log(`error[${key}]:`, (error as any)[key]);
      }
      }
    }
    console.error("获取帖子失败:", error);
    alert("获取失败")
  }
};

const likePost = async (post: Post) => {
  console.log("点赞的帖子:", post);
  if (!userStore.userLogin.user_id) {
    alert("请先登录");
    return;
  }
  try {
    await axios.post(`https://aiql.cloud/likePost`, {
      post_id: post.post_id,
      user_id: userStore.userLogin.user_id,
    });
    post.likes_count++;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as any).response === "object" &&
      (error as any).response !== null
    ) {
      const response = (error as any).response;
      if (response.status === 400) {
        alert("您已经点赞过了");
        return;
      }
      if (response.status === 404) {
        alert("帖子不存在或已被删除");
        return;
      }
    }
    console.error("点赞失败:", error);
    alert("点赞失败，请稍后再试");
  }
};

const viewDetails = (post: Post) => {
  console.log("帖子详情:", post);
  router.push({
    name: "PostPage",
    params: { id: post.post_id },
  });
};

onMounted(() => {
  fetchPosts();
});
</script>

<style>
.post-item {
  margin-bottom: 16px;
}

.post-card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.post-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.post-content {
  font-size: 1rem;
  color: #555;
  margin: 8px 0;
}

.post-meta {
  display: block;
  margin-top: 12px;
  font-size: 0.85rem;
  color: #888;
}

.post-stats {
  margin-top: 12px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
}

.like-button {
  margin-top: 12px;
}

.no-posts {
  text-align: center;
  margin-top: 20px;
  font-size: 1.1rem;
  color: #666;
}
.post-avatar {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.page-title {
  text-align: center;
}
</style>
