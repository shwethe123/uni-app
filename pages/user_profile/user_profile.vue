<template>
  <view class="user-accordion-page">
    <text class="page-title">User Accordion List</text>

    <view v-for="user in users" :key="user.id">
      <view class="user-item" @click="toggleDetails(user.id)">
        <text class="user-name">{{ user.name }}</text>
        <text class="user-occupation">{{ user.occupation }}</text>
      </view>
      
      <!-- Expandable Details -->
      <view v-if="user.id === expandedUserId" class="user-details">
        <text class="user-bio">Bio: {{ user.bio }}</text>
        <text class="user-contact">Contact: {{ user.contact }}</text>
        <text class="user-location">Location: {{ user.location }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          id: 'user1',
          name: 'John Doe',
          occupation: 'Software Engineer',
          bio: 'A passionate coder with 5 years of experience.',
          contact: 'johndoe@example.com',
          location: 'New York'
        },
        {
          id: 'user2',
          name: 'Jane Smith',
          occupation: 'Product Manager',
          bio: 'Experienced in product development and team management.',
          contact: 'janesmith@example.com',
          location: 'San Francisco'
        },
        {
          id: 'user3',
          name: 'Michael Lee',
          occupation: 'UX Designer',
          bio: 'Designing intuitive user experiences for mobile apps.',
          contact: 'michaellee@example.com',
          location: 'Chicago'
        },
      ],
      expandedUserId: null // To track which user's details are expanded
    };
  },
  methods: {
    toggleDetails(userId) {
      if (this.expandedUserId === userId) {
        this.expandedUserId = null; // Collapse if already expanded
      } else {
        this.expandedUserId = userId; // Expand selected user's details
      }
    }
  }
}
</script>

<style scoped>
.user-accordion-page {
  padding: 20px;
  background-color: #f4f4f4;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.user-item {
  background-color: #fff;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.user-item:hover {
  background-color: #e0e0e0;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
}

.user-occupation {
  color: #777;
}

.user-details {
  background-color: #f9f9f9;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
}

.user-bio,
.user-contact,
.user-location {
  color: #333;
  margin-bottom: 8px;
}
</style>