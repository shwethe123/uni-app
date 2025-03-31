<template>
  <view class="container">
    <text class="title">ခွင့်တောင်းရန်</text>

    <!-- ID Input -->
    <view class="input-container">
      <text class="input-label">ID:</text>
      <input v-model="id" type="text" placeholder="ID ကိုရိုက်ထည့်ပါ" class="input-field" />
    </view>

    <!-- Name Input -->
    <view class="input-container">
      <text class="input-label">နာမည်:</text>
      <input v-model="name" type="text" placeholder="နာမည်ကိုရိုက်ထည့်ပါ" class="input-field" />
    </view>

    <!-- Role Selector -->
    <picker mode="selector" :range="roles" v-model="selectedRole">
      <view class="picker">
        <text class="picker-label">အသုံးပြုသူအမျိုးအစား:</text>
        <text class="picker-value">{{ roles[selectedRole] }}</text>
      </view>
    </picker>

    <!-- Reason Textarea -->
    <textarea v-model="reason" placeholder="ခွင့်တောင်းရန် အကြောင်းအရာ" class="textarea"></textarea>

    <button @click="submitRequest" class="submit-btn">ခွင့်တောင်းမည်</button>

    <!-- Display Submitted Requests -->
    <view v-if="requests.length > 0" class="submitted-requests">
      <text class="submitted-title">တင်ပြထားသော ခွင့်တောင်းချက်များ</text>
      <view v-for="(request, index) in requests" :key="index" class="request-item">
        <view class="request-detail">
          <text class="request-text"><strong>ID:</strong> {{ request.id }}</text>
          <text class="request-text"><strong>နာမည်:</strong> {{ request.name }}</text>
          <text class="request-text"><strong>အသုံးပြုသူအမျိုးအစား:</strong> {{ request.role }}</text>
          <text class="request-text"><strong>အကြောင်းအရာ:</strong> {{ request.reason }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const roles = ['worker', 'user'];
const selectedRole = ref(0);
const reason = ref('');
const id = ref('');
const name = ref('');

const requests = ref([]);

const submitRequest = () => {
  if (id.value.trim() === '' || name.value.trim() === '' || reason.value.trim() === '') {
    uni.showToast({
      title: 'ကျေးဇူးပြု၍ ID, နာမည်နှင့် အကြောင်းအရာကိုထည့်ပါ',
      icon: 'none'
    });
    return;
  }

  // Add request to the list
  requests.value.push({
    id: id.value,
    name: name.value,
    role: roles[selectedRole.value],
    reason: reason.value
  });

  // Clear input fields after submission
  id.value = '';
  name.value = '';
  reason.value = '';
  selectedRole.value = 0;

  uni.showToast({
    title: `ခွင့်တောင်းမည်: ${roles[selectedRole.value]} - ${reason.value}`,
    icon: 'success'
  });
};
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
  margin-bottom: 25px;
  color: #333;
}

.input-container {
  margin-bottom: 20px;
}

.input-label {
  font-size: 17px;
  margin-bottom: 8px;
  color: #333;
}

.input-field {
  width: 100%;
  height: 45px;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  padding: 12px;
  font-size: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.picker {
  margin-bottom: 20px;
}

.picker-label {
  font-size: 17px;
  margin-bottom: 8px;
  color: #333;
}

.picker-value {
  font-size: 16px;
  color: #666;
}

.textarea {
  width: 100%;
  height: 120px;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  padding: 12px;
  font-size: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
}

.submit-btn {
  background-color: #007aff;
  color: white;
  padding: 12px;
  text-align: center;
  border-radius: 12px;
  font-size: 18px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.submitted-requests {
  margin-top: 30px;
}

.submitted-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.request-item {
  background-color: #fff;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.request-detail {
  font-size: 16px;
}

.request-text {
  margin-bottom: 8px;
  color: #333;
}
</style>
