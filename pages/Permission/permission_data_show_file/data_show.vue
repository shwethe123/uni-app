<template>
  <view class="container">
    <text class="title">တင်ပြထားသော ခွင့်တောင်းချက်များ</text>

    <!-- Empty State if no requests have been submitted -->
    <view v-if="requests.length === 0" class="empty-state">
      <text class="empty-text">အခုထိ တင်ပြထားသော ခွင့်တောင်းချက်များ မရှိပါ</text>
    </view>

    <!-- Display Submitted Requests -->
    <view v-else>
      <view v-for="(request, index) in requests" :key="index" class="request-item">
        <view class="request-header">
          <text class="request-id"><strong>ID:</strong> {{ request.id }}</text>
          <text class="request-name"><strong>နာမည်:</strong> {{ request.name }}</text>
        </view>
        <view class="request-details">
          <text class="request-role"><strong>အသုံးပြုသူအမျိုးအစား:</strong> {{ request.role }}</text>
          <text class="request-reason"><strong>အကြောင်းအရာ:</strong> {{ request.reason }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// Sample data - In real application, this data can be passed via props or fetched from an API
const requests = ref([
  {
    id: '123',
    name: 'John Doe',
    role: 'worker',
    reason: 'Requesting leave for personal matters'
  },
  {
    id: '124',
    name: 'Jane Smith',
    role: 'user',
    reason: 'Requesting leave for medical reasons'
  },
  // More sample requests can be added here
]);
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
}

.title {
  font-size: 26px;
  font-weight: bold;
  color: #333;
  margin-bottom: 25px;
}

.empty-state {
  text-align: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.empty-text {
  font-size: 18px;
  color: #888;
}

.request-item {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.request-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.request-id,
.request-name {
  font-size: 16px;
  color: #333;
}

.request-details {
  padding-top: 10px;
}

.request-role,
.request-reason {
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
}
</style>
