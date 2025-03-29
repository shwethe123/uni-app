<template>
  <view class="card-container">
    <view 
      class="data-card"
      v-for="(item, index) in cardData"
      :key="index"
    >
      <view class="card-header">
        <i class="card-icon" :class="item.icon"></i>
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
  { title: 'Total Revenue', value: '$90,000', icon: 'fas fa-chart-line', details: 'Revenue growth over the past quarter' },
  { title: 'Orders Processed', value: 2200, icon: 'fas fa-shipping-fast', details: 'Orders shipped this week' },
  { title: 'Active Users', value: 1500, icon: 'fas fa-users-cog', details: 'Users managing their accounts' },
  { title: 'Customer Feedback', value: '4.8/5', icon: 'fas fa-star', details: 'Average customer satisfaction rating' }
])
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

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
  font-size: 30px;
  color: #fff;
  margin-right: 12px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
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

  .card-icon {
    font-size: 24px; 
  }

  .card-title {
    font-size: 18px; 
  }

  .card-value {
    font-size: 24px; 
  }

  .card-footer {
    font-size: 12px; 
  }
}
</style>
