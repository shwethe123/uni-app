<template>
  <view class="fab-container">
<!--    <view class="fab" @click="openSettings">
      <text class="fab-icon">⚙️</text>
    </view> -->
    <view class="fab" @click="addItem">
      <text class="fab-icon">+</text>
    </view>
  </view>
</template>

<script setup>
const openSettings = () => {
  uni.navigateTo({ url: '/pages/settings/settings' })
}

const addItem = () => {
  uni.navigateTo({ url: '/pages/add-item/add-item' })
}
</script>

<style scoped>
.fab-container {
  position: fixed;
  bottom: 70px;
  right: 2px;
  z-index: 100;
}

.fab {
  background-color: #ff6600;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  margin-bottom: 15px;
}

.fab:hover {
  background-color: #ff8533;
}
</style>