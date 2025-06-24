<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>论坛</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card>
          <ion-card-header>
            <ion-card-title>创建帖子</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-textarea
              v-model="newPost.content"
              placeholder="输入帖子内容"
              auto-grow
            ></ion-textarea>
            <ion-item>
              <ion-label>上传图片</ion-label>
              <input type="file" multiple @change="handleFileUpload" />
            </ion-item>
            <ion-button expand="block" @click="createPost">发布</ion-button>
          </ion-card-content>
        </ion-card>
  
        <ion-list>
          <ion-list-header>
            <ion-label>最新帖子</ion-label>
          </ion-list-header>
          <ion-card v-for="post in posts" :key="post.post_id">
            <forum-card :post="post" @view-comments="fetchComments(post.post_id)" />
            <ion-card-content v-if="comments[post.post_id]">
              <ion-list>
                <ion-list-header>
                  <ion-label>评论</ion-label>
                </ion-list-header>
                <ion-item
                  v-for="comment in comments[post.post_id]"
                  :key="comment.comment_id"
                >
                  <ion-label>{{ comment.comment_content }}</ion-label>
                </ion-item>
              </ion-list>
              <ion-textarea
                v-model="newComment[post.post_id]"
                placeholder="添加评论"
                auto-grow
              ></ion-textarea>
              <ion-button expand="block" @click="addComment(post.post_id)">
                评论
              </ion-button>
              <ForumCard></ForumCard>
            </ion-card-content>
          </ion-card>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonTextarea, IonItem, IonLabel, IonButton, IonList, IonListHeader } from "@ionic/vue";
  import forumCard from "./forumCard.vue";
  import axios from "axios";
  import ForumCard from "./forumCard.vue";
  
  export default {
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardContent,
      IonTextarea,
      IonItem,
      IonLabel,
      IonButton,
      IonList,
      IonListHeader,
      forumCard,
    },
    data() {
      return {
        newPost: {
          content: "",
          images: [],
        },
        posts: [],
        comments: {},
        newComment: {},
      };
    },
    methods: {
      async createPost() {
        try {
          const response = await axios.post("https://aiql.cloud/createPost", {
            user_id: "123", // Replace with actual user ID
            content: this.newPost.content,
            images: this.newPost.images,
          });
          alert("帖子创建成功，ID: " + response.data.post_id);
          this.fetchPosts();
        } catch (error) {
          console.error(error);
          alert("创建帖子失败");
        }
      },
      handleFileUpload(event) {
        const files = event.target.files;
        this.newPost.images = Array.from(files).map((file) => URL.createObjectURL(file));
      },
      async fetchPosts(offset = 0) {
        try {
          const response = await axios.get(`https://aiql.cloud/getNewPost/${offset}`);
          this.posts = response.data;
        } catch (error) {
          console.error(error);
          alert("获取帖子失败");
        }
      },
      async fetchComments(postId) {
        try {
          const response = await axios.get(`https://aiql.cloud/getComments/${postId}`);
          this.$set(this.comments, postId, response.data);
        } catch (error) {
          console.error(error);
          alert("获取评论失败");
        }
      },
      async addComment(postId) {
        try {
          await axios.post("https://aiql.cloud/addComment", {
            post_id: postId,
            user_id: "123", // Replace with actual user ID
            comment_content: this.newComment[postId],
          });
          alert("评论添加成功");
          this.fetchComments(postId);
          this.newComment[postId] = "";
        } catch (error) {
          console.error(error);
          alert("添加评论失败");
        }
      },
    },
    mounted() {
      this.fetchPosts();
    },
  };
  </script>
  
  <style scoped>
  ion-card {
    margin: 10px;
  }
  ion-textarea {
    margin-bottom: 10px;
  }
  ion-button {
    margin-top: 10px;
  }
  </style>