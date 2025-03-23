<template>
  <view class="card-container">
    <view 
      class="data-card"
      v-for="(item, index) in cardData"
      :key="index"
    >
      <view class="card-header">
        <image class="card-icon" :src="item.icon" />
        <text class="card-title">{{ item.title }}</text>
      </view>
      <view class="card-body">
        <text class="card-value">{{ item.value }}</text>
      </view>
      <view class="card-footer">
        <text>{{ item.details }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const cardData = ref([
  { title: 'Total Revenue', value: '$75,000', icon: '/assets/icons/revenue.svg', details: 'Total revenue generated this month' },
  { title: 'Orders Processed', value: 1850, icon: '/assets/icons/orders.svg', details: 'Total orders processed this week' },
  { title: 'Active Users', value: 1320, icon: '/assets/icons/users.svg', details: 'Users actively browsing your site' },
  { title: 'Customer Feedback', value: '4.9/5', icon: '/assets/icons/feedback.svg', details: 'Customer satisfaction rating' }
])
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.data-card {
  background: linear-gradient(145deg, #6e7dff, #8a9cff);
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 25px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.data-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.card-icon {
  width: 50px;
  height: 50px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-left: 12px;
}

.card-body {
  margin-top: 15px;
}

.card-value {
  font-size: 30px;
  font-weight: 600;
  color: #ffffff;
}

.card-footer {
  margin-top: 15px;
  font-size: 14px;
  color: #e0e0e0;
  margin-top: auto;
}

@media (max-width: 768px) {
  .card-container {
    grid-template-columns: 1fr;
  }

  .data-card {
    padding: 20px;
  }
}
</style>