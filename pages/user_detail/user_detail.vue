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
        <!-- Add icon for Total Price -->
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

    <!-- Other Data Cards -->
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
  // { title: 'Total User', value: 65, icon: 'fa fa-users', details: 'Total number of Users in stock' },
  { title: 'Customer Rating', value: '4.7/5', icon: 'fa fa-star', details: 'Customer feedback rating on products' }
]);

const dashboardData = ref([]);
const total_meter = ref(0);
const total_user = ref(0);
const total_price = ref(0);

// Fetch data from the API when component is mounted
onMounted(() => {
  const apiUrl = 'http://192.168.16.31:4000/api/eletricity_meter'; 
  
  uni.request({
    url: apiUrl,
    method: 'GET',
    success: (response) => {
      if (response.statusCode === 200) {
        dashboardData.value = response.data;
        
        console.log(dashboardData);

        // Initialize the total variables
        let userCount = new Set(); // Use a Set to count unique users
        let priceTotal = 0;        // Total price
        let meterTotal = 0;        // Total meter count

        // Loop through the fetched data and calculate totals
        dashboardData.value.forEach((item) => {
          // Adding user_id to Set to count unique users
          userCount.add(item);  

          // Calculate the total price
          let price = 0;
          if (typeof item.edit_price === 'string') {
            // Remove currency symbol and commas, then parse as a number
            price = parseFloat(item.edit_price.replace('฿', '').replace(',', ''));  
          } else if (typeof item.edit_price === 'number') {
            // If it's already a number, we can directly use it
            price = item.edit_price;
          }

          // Add price to total if it's valid
          if (!isNaN(price)) {
            priceTotal += price;  // Adding to total price
          } else {
            console.error("Invalid price value:", item.edit_price);
          }

          // Calculate total meters (sum up total_meter values)
          let meter = parseInt(item.total_meter) || 0;  // Make sure it's a valid number
          meterTotal += meter;
        });

        // Set the calculated values to the ref variables
        total_user.value = userCount.size;  // Get the total number of unique users
        total_price.value = priceTotal.toFixed(2);  // Set the total price with two decimal places
        total_meter.value = meterTotal;  // Set the total meter count

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
  padding: 20px;
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