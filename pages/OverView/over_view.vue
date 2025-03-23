<template>
  <view class="tabs-container">
    
    <view class="tab-content">
      <view v-if="selectedTab === 'home'">
        <HomePage />
      </view>
      <view v-if="selectedTab === 'revenue'">
        <Revenue/>
      </view>
      <view v-if="selectedTab === 'products'">
        <progressVue/>
      </view>
      <view v-if="selectedTab === 'feedback'">
        <feedbackVue/>
      </view>
    </view>
    <view @click="goToUserCreate" class="add_new">
    	<createVue/>
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
          :class="{ active: selectedTab === 'feedback' }"
          @click="selectTab('feedback')"
        >
          <i class="fa fa-comments"></i>
          <text>Feedback</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import HomePage from '../HomeFile/home.vue'
import Revenue from '../Revenue/revenue.vue'
import feedbackVue from '../Feedback/feedback.vue'
import progressVue from '../progress/progress.vue'
import createVue from '../Create/create.vue'
import { ref } from 'vue'

const selectedTab = ref('home')

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
  font-size: 18px;
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
  padding: 10px 0;
  display: flex;
  justify-content: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.footer-icons {
  display: flex;
  justify-content: space-between;
  width: 90%;
}

.footer-icon {
  text-align: center;
  color: #7f8c8d;
  font-size: 14px;
  padding: 10px;
  border-radius: 25px;
  background-color: #ecf0f1;
  transition: background-color 0.3s ease, transform 0.3s ease, color 0.3s ease;
}

.footer-icon i {
  font-size: 20px;
  margin-bottom: 5px;
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
