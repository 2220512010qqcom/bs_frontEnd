<template>
    <ion-card class="forum-card">
        <ion-card-content>
            <p>这是帖子内容</p>
            <ion-list>
                <ion-item
                    v-for="post in posts"
                    :key="post.post_id"
                    class="post-card"
                >
                    <ion-grid>
                        <ion-row class="post-header">
                            <ion-col size="8">
                                <h3>User ID: {{ post.user_id }}</h3>
                            </ion-col>
                            <ion-col size="4" class="ion-text-right">
                                <p class="post-date">{{ formatDate(post.created_at) }}</p>
                            </ion-col>
                        </ion-row>
                        <ion-row class="post-content">
                            <ion-col>
                                <p>{{ post.content }}</p>
                                <ion-row
                                    v-if="post.image_count > 0"
                                    class="post-images"
                                >
                                    <ion-col
                                        size="4"
                                        v-for="(image, index) in post.images"
                                        :key="index"
                                    >
                                        <ion-img :src="image" alt="Post Image"></ion-img>
                                    </ion-col>
                                </ion-row>
                            </ion-col>
                        </ion-row>
                        <ion-row class="post-footer">
                            <ion-col>
                                <p>Comments: {{ post.comments_count }}</p>
                            </ion-col>
                            <ion-col class="ion-text-right">
                                <p>Likes: {{ post.likes_count }}</p>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-item>
            </ion-list>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonCard, IonCardContent, IonList, IonItem, IonGrid, IonRow, IonCol, IonImg } from "@ionic/vue";
import axios from "axios";

export default {
    name: "ForumCard",
    components: {
        IonCard,
        IonCardContent,
        IonList,
        IonItem,
        IonGrid,
        IonRow,
        IonCol,
        IonImg,
    },
    props: {
        offset: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            posts: [],
        };
    },
    methods: {
        async fetchPosts() {
            try {
                const response = await axios.get(
                    `https://aiql.cloud/getNewPost/${this.offset}`
                );
                this.posts = response.data.map((post) => ({
                    ...post,
                    images: this.generateImageUrls(post.post_id, post.image_count),
                }));
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        },
        generateImageUrls(postId, imageCount) {
            const urls = [];
            for (let i = 1; i <= imageCount; i++) {
                urls.push(`https://aiql.cloud/images/${postId}/${i}`);
            }
            return urls;
        },
        formatDate(dateString) {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },
    },
    mounted() {
        this.fetchPosts();
    },
};
</script>

<style scoped>
.forum-card {
    margin: 20px;
}

.post-header h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
}

.post-date {
    font-size: 14px;
    color: #888;
}

.post-content p {
    margin: 10px 0;
}

.post-images ion-img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
}

.post-footer p {
    font-size: 14px;
    color: #555;
}
</style>