<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>帖子详情</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="post-page">
                <ion-card v-if="post" class="post-details">
                    <ion-card-header>
                        <ion-card-title>帖子详情</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-card-subtitle>作者: {{ post ? post.user_name : '加载中...' }}</ion-card-subtitle>
                        <ion-card-subtitle>时间: {{ post ? post.created_at : '加载中...' }}</ion-card-subtitle>
                        <strong>内容:</strong><br>
                        <!-- <ion-card  class="text-container">
                            <ion-card-content>
                                <ion-text>{{ post ? post.content : '加载中...' }}</ion-text>
                            </ion-card-content>
                        </ion-card> -->
                        <ion-text class="text-container"> {{ post ? post.content : '加载中...' }}</ion-text>
                        <div class="post-stats">
                            <p><strong>点赞数:</strong> {{ post ? post.likes_count : '加载中...' }}</p>
                            <p><strong>评论数:</strong> {{ post ? post.comments_count : '加载中...' }}</p>
                        </div>
                        
                        <div v-if="post && post.images && post.images.length">
                            <ion-card-subtitle>图片</ion-card-subtitle>
                            <div class="image-gallery">
                                <ion-img
                                    v-for="(image, index) in post.images"
                                    :key="index"
                                    :src="image"
                                    alt="Post Image"
                                    @click="openImageModal(image)"
                                />
                            </div>
                        </div>
                        <ion-button expand="block" color="primary" @click="likePost">
                            点赞
                        </ion-button>
                        <div v-if="images && images.length">
                            <ion-card-subtitle>图片区</ion-card-subtitle>
                            <ion-grid>
                                <ion-row>
                                    <ion-col
                                        size="6"
                                        size-sm="4"
                                        size-md="3"
                                        v-for="(image, index) in images"
                                        :key="index"
                                    >
                                        <ion-img
                                            :src="image.image_url"
                                            alt="Additional Image"
                                            class="image-thumbnail"
                                            @click="openImageModal(image.image_url)"
                                        />
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </div>
                    </ion-card-content>
                </ion-card>
                <ion-card class="comments-section" v-if="userStore.userLogin.user_id">
                    <ion-card-header>
                        <ion-card-title>评论</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-list>
                            <ion-item
                                v-for="comment in comments"
                                :key="comment.comment_id"
                                lines="none"
                            >
                                <ion-label>
                                    <div class="comment">
                                        <ion-avatar>
                                            <ion-img :src="comment.avatar_url" class="avatar"></ion-img>
                                        </ion-avatar>
                                        <div class="comment-content">
                                            <h3>{{ comment ? comment.user_name : '加载中...' }}</h3>
                                            <ion-note>{{ comment ? comment.created_at : '加载中...' }}</ion-note>
                                            <p>{{ comment ? comment.comment_content : '加载中...' }}</p>
                                        </div>
                                    </div>
                                </ion-label>
                            </ion-item>
                        </ion-list>
                        <ion-textarea
                            v-model="newComment"
                            placeholder="添加评论"
                            :rows="4"
                        ></ion-textarea>
                        <ion-button expand="block" color="secondary" @click="addComment">
                            提交评论
                        </ion-button>
                    </ion-card-content>
                </ion-card>
                <div v-else>
                    <ion-text color="medium">
                        <p>请登录以查看评论和添加评论</p>
                    </ion-text>
                </div>
            </div>
        </ion-content>

        <ion-modal :is-open="isImageModalOpen" @didDismiss="closeImageModal">
            <div class="image-modal">
                <ion-img :src="selectedImage" alt="Preview Image" class="image-in-modal"/>
                <ion-button expand="block" color="light" @click="closeImageModal">
                    关闭
                </ion-button>
            </div>
        </ion-modal>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { IonPage, IonHeader ,IonText , IonNote, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
    IonButton, IonList, IonItem, IonLabel, IonTextarea, IonImg, IonModal, IonAvatar, IonGrid, IonRow, IonCol, IonCardSubtitle } from "@ionic/vue";

import axios from "axios";
import { useUserStore } from "@/stores/userInfo";
import { useRoute } from "vue-router";

const route = useRoute();
const userStore = useUserStore();

const { id } = route.params;

interface Post {
    post_id: number;
    user_name: string;
    created_at: string;
    content: string;
    likes_count: number;
    comments_count: number;
    images?: string[];
    is_liked?: boolean;
}

interface Comment {
    comment_id: number;
    user_name: string;
    avatar_url: string;
    created_at: string;
    comment_content: string;
}

interface Image {
    image_url: string;
}

const post = ref<Post | null>(null);
const comments = ref<Comment[]>([]);
const newComment = ref<string>("");
const images = ref<Image[]>([]);

const isImageModalOpen = ref<boolean>(false);
const selectedImage = ref<string>("");

const openImageModal = (image: string) => {
    selectedImage.value = image;
    isImageModalOpen.value = true;
};

const closeImageModal = () => {
    isImageModalOpen.value = false;
    selectedImage.value = "";
};

const fetchComments = async () => {
    try {
    const response = await axios.get<Comment[]>(`https://aiql.cloud/getComments/${id}`);
    comments.value = response.data;
    comments.value.forEach((comment: Comment) => {
        comment.created_at = new Date(comment.created_at).toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        });
    });
    } catch (error) {
    console.error("获取评论失败:", error);
    }
};

const fetchPostDetails = async () => {
    try {
    const response = await axios.get(`https://aiql.cloud/getPostContent/${id}`);
    if (response.data && response.data.post && response.data.post.length > 0) {
        post.value = response.data.post[0];
        if (post.value && post.value.images && typeof post.value.images === "string") {
        post.value.images = JSON.parse(post.value.images);
        }
    }
    if (response.data && response.data.images) {
        images.value = response.data.images;
    }
    console.log("获取帖子详情成功:", response.data.post[0]);
    } catch (error) {
    console.error("获取帖子详情失败:", error);
    }
};

const likePost = async () => {
    if (!post.value) {
    alert("帖子信息未加载，请稍后再试");
    return;
    }
    if (!userStore.userLogin.user_id) {
    alert("请先登录");
    return;
    }
    if (post.value.is_liked) {
    alert("您已经点赞过了");
    return;
    }

    try {
    await axios.post(`https://aiql.cloud/likePost`, {
        post_id: id,
        user_id: userStore.userLogin.user_id,
    });
    if (post.value) post.value.likes_count++;
    post.value.is_liked = true;
    } catch (error: unknown) {
    if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response === "object"
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

const addComment = async () => {
    if (!newComment.value.trim()) {
    alert("评论内容不能为空");
    return;
    }
    if (newComment.value.length > 200) {
    alert("评论内容过长，请限制在200个字符以内");
    return;
    }

    if (!userStore.userLogin.user_id) {
    alert("请先登录");
    return;
    }

    try {
    await axios.post(`https://aiql.cloud/addComment`, {
        post_id: id,
        user_id: userStore.userLogin.user_id,
        comment_content: newComment.value,
    });
    newComment.value = "";
    fetchComments();
    } catch (error) {
    console.error("添加评论失败:", error);
    }
};

onMounted(async () => {
    await fetchPostDetails();
    await fetchComments();
});

onUnmounted(() => {
    console.log("清理数据");
});
</script>


<style scoped>
.post-page {
    padding: 16px;
    background-color: #f9f9f9;
}
.post-details {
    margin-bottom: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.image-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
ion-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
}
.image-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
}
.image-modal ion-img {
    max-width: 100%;
    max-height: 80vh;
    border-radius: 8px;
}
.image-in-modal {
    width: 100%;
    height: auto;
    object-fit: cover;
}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.comment {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    margin-bottom: 12px;
    padding: 12px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.comment-content {
    flex: 1;
}
.comment-content h3 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
}
.comment-content ion-note {
    font-size: 12px;
    color: #888;
}
.comment-content p {
    margin: 4px 0 0;
    font-size: 14px;
    line-height: 1.5;
}
.comments-section {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
ion-textarea {
    margin-top: 12px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.post-stats{
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    font-size: 14px;
    color: #555;
}
.text-container{
    /* height: 1vh; */
    width:  100vw;
    white-space: pre-wrap; /* 保持换行 */
    word-break: break-word; /* 防止长单词溢出 */
    font-size: 16px;
    color: #333;
    margin-top: 8px;
    margin-left: 0;
    margin-right: 0;
    box-shadow: none;
}
</style>
