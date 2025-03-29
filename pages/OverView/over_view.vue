<template>
  <view class="tabs-container">
    <view class="tab-content">
      <view v-if="selectedTab === 'home'">
        <HomePage />
      </view>
      <view v-if="selectedTab === 'revenue'">
        <Revenue />
      </view>
      <view v-if="selectedTab === 'products'">
        <progressVue />
      </view>
      <view v-if="selectedTab === 'logout'">
        <feedbackVue />
      </view>
    </view>
    
    <view v-if="show_create" @click="goToUserCreate" class="add_new">
      <createVue />
    </view>

    <view class="footer">
      <view class="footer-icons">
        <view
          class="footer-icon"
          :class="{ active: selectedTab === 'home' }"
          @click="selectTab('home')"
        >
          <i class="fa fa-home"></i>
          <text>Home</text>
        </view>
        <view
          class="footer-icon"
          :class="{ active: selectedTab === 'revenue' }"
          @click="selectTab('revenue')"
        >
          <i class="fa fa-dollar-sign"></i>
          <text>Revenue</text>
        </view>
        <view
          class="footer-icon"
          :class="{ active: selectedTab === 'products' }"
          @click="selectTab('products')"
        >
          <i class="fa fa-box"></i>
          <text>Products</text>
        </view>
        <view
          class="footer-icon"
          :class="{ active: selectedTab === 'logout' }"
          @click="selectTab('logout')"
        >
          <i class="fa fa-car"></i>
          <text>Logout</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import jwt_decode from 'jwt-decode' 

import HomePage from '../HomeFile/home.vue'
import Revenue from '../Revenue/revenue.vue'
import feedbackVue from '../Feedback/feedback.vue'
import progressVue from '../progress/progress.vue'
import createVue from '../Create/create.vue'

const selectedTab = ref('home')
const show_create = ref(false)

const myToken = ref("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMzM0MzkiLCJkZXBhcnRtZW50X2lkIjoiMSIsImpvYl9pZCI6IjMiLCJmZW5fZGlhbl9pZCI6IjEiLCJleHAiOjE3NDI3MDM2NDV9.9ZBvXlaKAzBAFGhwEZe_jILJ67vdb872GO1pONB91aQ")

onMounted(() => {
  const token = uni.getStorageSync('token'); 

  if (token) {
    try {
      const decoded = jwt_decode(token); 
	  
	  const myToken_decoded = jwt_decode(myToken.value);
	  console.log('myToken_decoded', myToken_decoded);
	  
      console.log('Decoded token:', decoded);
      
      const userRole = decoded.role; 
	  
	  const main_user_id = myToken_decoded.user_id;
      if (userRole) {
        console.log('User Role:', userRole);

        // if (userRole === "admin") {
		if (main_user_id === 33439) {
          show_create.value = true;
        } else {
          show_create.value = false;
        }
      } else {
        console.log('No role in the token');
      }
    } catch (error) {
      console.error('Error decoding token', error);
    }
  } else {
    console.log('No token found');
  }
});


const goToUserCreate = () => {
  uni.navigateTo({
    url: '/pages/index/index'
  })
}

const selectTab = (tab) => {
  selectedTab.value = tab
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.tab-content {
  font-size: 14px;
  color: #333;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f7f7f7;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.footer-icons {
  display: flex;
  justify-content: space-between;
  width: 85%;
}

.footer-icon {
  text-align: center;
  color: #7f8c8d;
  font-size: 12px;
  padding: 12px;
  border-radius: 25px;
  background-color: #ecf0f1;
  transition: background-color 0.3s ease, transform 0.3s ease, color 0.3s ease;
}

.footer-icon i {
  font-size: 16px;
  margin-bottom: 4px;
  display: block;
}

.footer-icon:hover {
  background-color: #e74c3c;
  color: white;
  transform: scale(1.1);
}

.footer-icon.active {
  background-color: #3498db;
  color: white;
  font-weight: bold;
}
</style>
