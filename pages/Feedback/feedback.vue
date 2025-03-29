<template>
  <view class="profile-container">
    <view class="profile-header">
      <image class="profile-image" src="https://shorturl.at/cbQCd" />
      <text class="profile-name">Salai Chai Naing</text>
      <text class="profile-job">Software developer</text>
    </view>

    <view class="edit-profile-button">
      <button @click="editProfile" class="edit-btn">Edit Profile</button>
    </view>

    <view class="personal-info">
      <text class="section-title">Personal Information</text>
      <view class="info-item">
        <text class="info-label">Email</text>
        <text class="info-value">salai@gmail.com</text>
      </view>
      <view class="info-item">
        <text class="info-label">Phone</text>
        <text class="info-value">+1 234 567 890</text>
      </view>
      <view class="info-item">
        <text class="info-label">Location</text>
        <text class="info-value">Myanmar Tachileik</text>
      </view>
    </view>

    <view class="activity-feed">
      <text class="section-title">Recent Activity</text>
      <view class="activity-item" v-for="(activity, index) in activities" :key="index">
        <text class="activity-time">{{ activity.time }}</text>
        <text class="activity-description">{{ activity.description }}</text>
      </view>
    </view>

    <view class="logout-button">
      <button @click="logout" class="logout-btn">Logout</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activities: [
        { time: 'March 18, 2025 - 10:00 AM', description: 'Liked a post' },
        { time: 'March 17, 2025 - 3:00 PM', description: 'Updated profile picture.' },
        { time: 'March 16, 2025 - 1:00 PM', description: 'Commented on a technology blog post.' },
      ],
      privacy: true,
      notifications: false,
    };
  },
  methods: {
    editProfile() {
      console.log('User clicked Edit Profile!');
    },
	logout() {
	  console.log('Logging out...');
	  
	  uni.removeStorageSync('token');
	  uni.removeStorageSync('userSession');
	  
	  uni.showToast({
		title: 'Logout',
		icon: 'success'
	  });
	  
	  uni.reLaunch({
		url: '/pages/loginPage/login',
	  });
	}
  },
};
</script>

<style scoped>
.profile-container {
  padding: 20px;
  background-color: #f9f9f9;
}

.profile-header {
	display: flex;
	flex-direction: column;
  text-align: center;
}

.profile-image {
  width: 100%;
  height: 180px;
  border-radius: 0%;
  margin-bottom: 10px;
}

.profile-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.profile-job {
  font-size: 14px;
  color: #888;
}

.edit-profile-button {
  text-align: center;
  margin-top: 10px;
}

.edit-btn {
  background-color: #4CAF50;
  color: white;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-btn:hover {
  background-color: #45a049;
}

.personal-info {
  margin-top: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.info-label {
  font-size: 14px;
  color: #555;
}

.info-value {
  font-size: 14px;
  color: #333;
}

.activity-feed {
  margin-top: 20px;
}

.activity-item {
	display: flex;
	flex-direction: column;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.activity-time {
  font-size: 12px;
  margin-bottom: 4px;
  color: #888;
}

.activity-description {
  font-size: 14px;
  color: #333;
}

.logout-button {
  text-align: center;
  margin-top: 15px;
	padding-bottom: 80px;
}

.logout-btn {
  background-color: #f44336;
  color: white;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #e53935;
}
</style>
