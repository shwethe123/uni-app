<template>
  <view class="dashboard">
    <view class="overview-box">
      <view class="card" v-for="(item, index) in dashboardData" :key="index">
        <view class="card-header">
          <i :class="item.icon" class="card-icon"></i>
          <text class="card-title">{{ item.title }}</text>
        </view>
        <view class="card-body">
          <text class="card-data">{{ item.data }}</text>
          <view class="progress-bar">
            <view class="progress" :style="{ width: item.progress + '%' }"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const dashboardData = ref([
  { title: "Total Orders", data: 120, icon: "fa fa-shopping-cart", progress: 0, maxProgress: 100 },
  { title: "Total Revenue", data: "$4500", icon: "fa fa-dollar-sign", progress: 0, maxProgress: 100 },
]);


const updateProgressBasedOnTime = () => {
  const intervalTime = 1000;
  
  const startTime = Date.now();
  
  setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    
    dashboardData.value.forEach(item => {

      if (item.progress < item.maxProgress) {
        item.progress = Math.min((elapsedSeconds / 60) * 100, item.maxProgress);
      }
    });
  }, intervalTime);
};

onMounted(() => {
  updateProgressBasedOnTime();
});
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.dashboard {
  padding: 10px;
}

.overview-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  position: relative;
}

.card:hover {
  transform: translateY(-10px);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-icon {
  font-size: 30px;
  color: #3498db;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.card-body {
  margin-top: 15px;
}

.card-data {
  font-size: 24px;
  font-weight: bold;
  color: #4caf50;
}

.progress-bar {
  height: 6px;
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 3px;
  margin-top: 10px;
}

.progress {
  height: 100%;
  background-color: #ff7f50;
  border-radius: 3px;
}
</style>
