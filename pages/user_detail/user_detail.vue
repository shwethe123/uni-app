<template>
  <view class="card-container">
    <view class="card">
      <view class="card-header">
        <i class="fa fa-tachometer-alt card-icon"></i>
        <text class="card-title">Total Meter</text>
      </view>
      <view class="card-body">
        <text class="card-value">{{ total_meter }} kW-h</text>
      </view>
      <view class="card-footer">
        <text class="card-detail">Total number of meters in stock</text>
      </view>
    </view>

    <view class="card">
      <view class="card-header">
        <i class="fa fa-dollar-sign card-icon"></i>
        <text class="card-title">Total Price</text>
      </view>
      <view class="card-body">
        <text class="card-value">{{ total_price }}฿</text>
      </view>
      <view class="card-footer">
        <text class="card-detail">Total revenue from all orders</text>
      </view>
    </view>
 
 <view class="card">
   <view class="card-header">
     <i class="fa fa-users card-icon"></i>
     <text class="card-title">Total User</text>
   </view>
   <view class="card-body">
     <text class="card-value">{{ total_user }}</text>
   </view>
   <view class="card-footer">
     <text class="card-detail">Total number of Users in stock</text>
   </view>
 </view>

    <view class="card" v-for="(item, index) in Data" :key="index">
      <view class="card-header">
        <i :class="item.icon" class="card-icon"></i>
        <text class="card-title">{{ item.title }}</text>
      </view>
      <view class="card-body">
        <text class="card-value">{{ item.value }}</text>
      </view>
      <view class="card-footer">
        <text class="card-detail">{{ item.details }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const Data = ref([
  { title: 'Customer Rating', value: '4.7/5', icon: 'fa fa-star', details: 'Customer feedback rating on products' }
]);

const dashboardData = ref([]);
const total_meter = ref(0);
const total_user = ref(0);
const total_price = ref(0);

onMounted(() => {
  const apiUrl = 'http://192.168.16.31:4000/api/eletricity_meter'; 
  
  uni.request({
    url: apiUrl,
    method: 'GET',
    success: (response) => {
      if (response.statusCode === 200) {
        dashboardData.value = response.data;
        
        console.log(dashboardData);

        let userCount = new Set();
        let priceTotal = 0;   
        let meterTotal = 0;   

        dashboardData.value.forEach((item) => {
          userCount.add(item);  

          let price = 0;
          if (typeof item.edit_price === 'string') {
            price = parseFloat(item.edit_price.replace('฿', '').replace(',', ''));  
          } else if (typeof item.edit_price === 'number') {
            price = item.edit_price;
          }

          if (!isNaN(price)) {
            priceTotal += price;
          } else {
            console.error("Invalid price value:", item.edit_price);
          }

          let meter = parseInt(item.total_meter) || 0;
          meterTotal += meter;
        });

        total_user.value = userCount.size;
        total_price.value = priceTotal.toFixed(2);  
        total_meter.value = meterTotal;

      } else {
        console.error('Failed to load data', response);
      }
    },
    fail: (error) => {
      console.error('API request failed', error);
    }
  });
});

</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.card-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 10px;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: transform 0.3s ease;
  position: relative;
}

.card:hover {
  transform: translateY(-10px);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.card-icon {
  font-size: 30px;
  color: #3498db;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
}

.card-body {
  margin-top: 10px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #28a745;
}

.card-footer {
  margin-top: 10px;
}

.card-detail {
  font-size: 12px;
  color: #555;
}
</style>