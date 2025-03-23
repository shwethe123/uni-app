<template>
  <div class="list-page">
    <div class="header">
      <p class="title">User List</p>
    </div>

    <div class="list-container">
      <div
        class="list-item"
        v-for="(item, index) in displayedItems"
        :key="index"
        @click="goToDetailPage(item._id)"
      >
        <!-- <i class="fas fa-tachometer-alt item-image" style="font-size: 50px; color: coral;"></i> -->
  <image class="icon" src="https://shorturl.at/MlXfI" style="width: 60px; height: 60px; border-radius: 10px; margin-right: 10px;" />
        <div class="item-info">
          <p class="item-title">User Name - {{ item.user_id }}</p>
          <p class="item-description">{{ formatPrice(item.edit_price) }} kW-h</p>
        </div>
  <view style="padding: 5px;">
   <h5 style="font-size: 16px; margin-bottom: 8px;">Price</h5>
   <span style="color: #38b000; font-weight: bold;">{{ item.edit_price }} ฿</span>
  </view>
      </div>
    </div>

    <div v-if="expandedUserId !== null" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h2 class="modal-title">User Details</h2>
        <div class="modal-content">
          <p class="modal-item">
            <i class="fas fa-user modal-icon"></i>
            <span class="modal-label">User name:</span>
   <span style="color: blueviolet; font-weight: bolder;">
    {{ selectedUser ? selectedUser.user_id : 'N/A' }}
   </span>
          </p>
          <p class="modal-item">
            <i class="fas fa-dollar-sign modal-icon"></i>
            <span class="modal-label">Price:</span>
            <span style="color: green; font-weight: bold;">
    {{ selectedUser ? selectedUser.edit_price : 'N/A' }} ฿
   </span>
          </p>
          <p class="modal-item">
            <i class="fas fa-tachometer-alt modal-icon"></i>
            <span class="modal-label">Current meter:</span>
   <span style="color: green; font-weight: bold;">
    {{ selectedUser ? selectedUser.current_meter : 'N/A' }} kW-h
   </span>
          </p>
          <p class="modal-item">
            <i class="fas fa-history modal-icon"></i>
            <span class="modal-label">Last reading:</span>
   <span style="color: orangered; font-weight: bold;">
            {{ selectedUser ? selectedUser.last_reading : 'N/A' }} kW-h
   </span>
          </p>
        </div>
        <button @click="closeModal" class="close-btn">Close</button>
      </div>
    </div>

    <div v-if="hasMoreItems" class="load-more-container">
      <button class="load-more-btn" @click="loadMoreItems">Read More</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemList: [],
      displayedItems: [],
      itemsToShow: 10,
      hasMoreItems: true,
      expandedUserId: null, // To track the currently expanded user's ID
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    // Find the selected user from itemList based on expandedUserId
    selectedUser() {
      console.log('Searching for user with ID:', this.expandedUserId);
      return this.itemList.find(item => item._id === this.expandedUserId); // Use _id for matching
    }
  },
  methods: {
    fetchData() {
      uni.request({
        url: 'http://192.168.16.31:4000/api/eletricity_meter',
        // url: 'http://localhost:4000/api/eletricity_meter',
        data: {
          text: 'uni.request'
        },
        header: {
          'custom-header': 'hello'
        },
        success: (res) => {
          console.log('API Response:', res); // Log the API response
          if (res.statusCode === 200) {
            this.itemList = res.data;

            // Ensure the values are correctly formatted
            this.itemList.forEach(item => {
              console.log('Item edit_price:', item.edit_price); // Check the edit_price value
            });

            this.displayedItems = this.itemList.slice(0, this.itemsToShow);
            if (this.itemList.length <= this.itemsToShow) {
              this.hasMoreItems = false;
            }
          } else {
            console.error("Fetch API failed", res.statusCode);
          }
        }
      });
    },

    goToDetailPage(itemId) {
      console.log('Item clicked:', itemId); 
      if (this.expandedUserId === itemId) { // Check if the user is already expanded
        this.expandedUserId = null; // Collapse if already expanded
      } else {
        this.expandedUserId = itemId; // Expand selected user's details
      }
    },

    // Method to close the modal
    closeModal() {
      this.expandedUserId = null; // Close the modal by setting expandedUserId to null
    },

    loadMoreItems() {
      const nextItems = this.itemList.slice(this.displayedItems.length, this.displayedItems.length + this.itemsToShow);
      this.displayedItems.push(...nextItems);

      if (this.displayedItems.length >= this.itemList.length) {
        this.hasMoreItems = false;
      }
    },

    // Utility method to format price as a valid number
    formatPrice(price) {
      const numericPrice = parseFloat(price);
      return isNaN(numericPrice) ? 'Invalid Price' : numericPrice.toFixed(2);
    }
  },
};
</script>

<style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

  .list-page {
    display: flex;
    flex-direction: column;
    background-color: #f8f9fa;
    padding: 20px;
  }

  .header {
    text-align: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
  }

  .list-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .list-item {
    display: flex;
 justify-content: space-between;
    align-items: center;
    text-align: center;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .list-item:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .item-image {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 20px;
  }

  .item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .item-title {
    font-size: 16px;
    font-weight: bold;
    color: #5aa9e6;
  }

  .item-description {
    font-size: 14px;
    color: #7f8c8d;
    margin-top: 5px;
  }

  .load-more-container {
    text-align: center;
    margin-top: 20px;
  }

  .load-more-btn {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .load-more-btn:hover {
    background-color: #2980b9;
  }

  /* Modal styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .close-btn {
    margin-top: 15px;
    padding: 10px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }

  .close-btn:hover {
    background-color: #c0392b;
  }
  .modal-label {
   margin: 2px;
   padding: 2px;
  }
    .modal-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 8px;
      /* background-color: #f9f9f9; */
      /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
    }
  
    .modal-icon {
      margin-right: 10px;
      color: #3498db;
      font-size: 18px;
      width: 20px;
      text-align: center;
    }
  
    .modal-label {
      font-weight: bold;
   color: #1b4965;
      /* color: #333; */
      width: 120px;
    }
  
    .modal-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      text-align: center;
      color: #2c3e50;
    }
  
    .modal-content {
      margin-bottom: 20px;
    }
  
    .close-btn {
      padding: 12px 20px;
      font-size: 16px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      width: 100%;
    }
  
    .close-btn:hover {
      background-color: #2980b9;
    }
 
</style>