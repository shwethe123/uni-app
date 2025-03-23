<template>
  <view class="post-details-container">
    <view class="post-header">
      <image class="user-avatar" src="https://shorturl.at/QuLrA" alt="User Avatar"/>
      <view class="post-user">
        <text class="user-name">{{ post.userName }}</text>
        <text class="post-time">{{ post.timeAgo }}</text>
      </view>
    </view>

    <text class="post-content">{{ post.content }}</text>

    <view class="post-actions">
      <button @click="likePost(post)">👍 {{ post.likes }} Likes</button>
      <button @click="commentPost(post)">💬 {{ post.comments }} Comments</button>
      <button @click="sharePost(post)">🔗 Share</button>
    </view>

    <view class="comments-section">
      <text class="comments-title">Comments</text>
      <view v-for="(comment, index) in post.commentsList" :key="index" class="comment">
        <text class="comment-author">{{ comment.author }}:</text>
        <text class="comment-text">{{ comment.text }}</text>
      </view>
    </view>

    <input v-model="newComment" placeholder="Add a comment..." class="comment-input"/>
    <button class="comment-submit" @click="submitComment">Post Comment</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const post = ref({
  userAvatar: '/static/user1.jpg',
  userName: 'Salai Chai Naing',
  timeAgo: '2 hours ago',
  content: 'Hello, this is my first post!',
  likes: 25,
  comments: 10,
  commentsList: [
    { author: 'Alice', text: 'Great post!' },
    { author: 'Bob', text: 'Welcome to the app!' }
  ]
});

const newComment = ref('');

const likePost = (post) => {
  post.likes++;
};

const commentPost = (post) => {
  console.log('Commented on post:', post);
};

const sharePost = (post) => {
  console.log('Shared post:', post);
};

const submitComment = () => {
  post.value.commentsList.push({ author: 'You', text: newComment.value });
  newComment.value = '';
};
</script>

<style scoped>
.post-details-container {
  padding: 15px;
}

.post-header {
  display: flex;
  gap: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.post-user {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
}

.post-time {
  font-size: 12px;
  color: #777;
}

.post-content {
  font-size: 16px;
  margin-top: 10px;
}

.post-actions {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.comments-section {
  margin-top: 20px;
}

.comment {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.comment-author {
  font-weight: bold;
}

.comment-input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 10px;
}

.comment-submit {
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}
</style>