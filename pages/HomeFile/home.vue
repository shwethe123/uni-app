<template>
  <view class="home-page">
    <!-- Header Section -->
    <view class="header">
      <text class="logo">My App</text>
      <view class="icons">

        <view class="search-container">
          <icon class="search-icon" type="search" size="24" />
          <input class="search-input" type="text" placeholder="Search..." />
        </view>
        <icon type="person" size="24" />
      </view>
    </view>

    <view class="featured">
      <ProgressVue />
    </view>

    <view class="">
      <view class="span" @click="goToUserFile">
        <span class="see_span">See All</span>
      </view>
      <view class="categories">
        <view v-for="(item, index) in visibleItems" :key="index" class="category-item">
          <!-- <image class="icon" src="https://shorturl.at/hMn99" /> -->
		  <image class="icon" src="https://shorturl.at/o7eQW" style="width: 60px; height: 60px; border-radius: 10px;" />
		  <!-- <i class="fas fa-tachometer-alt card-icon" style="font-size: 40px; color:coral"></i> -->
		   <!-- <i class="fas fa-tachometer-alt card-icon" style="font-size: 50px; color: coral;"></i> -->
			<view class="user_price_box">
				<span class="user_span">{{ item.user_id }}</span>
				<span class="user_span">Price - {{ item.edit_price }} ฿</span>
			</view>
        </view>
		<view v-if="hasMoreItems" @click="loadMoreItems" class="read-more">
		  <span>Read More</span>
		</view>
      </view>

    </view>

    <view>
      <DataShow :items="visibleItems" />
    </view>
  </view>
</template>


<script>
import DataShow from '../user_detail/user_detail.vue';
import ProgressVue from '../progress/progress.vue';

export default {
  components: {
    DataShow, 
    ProgressVue
  },
  data() {
    return {
      itemList: [],
      visibleItems: [],
      itemsToShow: 5,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      uni.request({
        url: 'http://192.168.16.31:4000/api/eletricity_meter',
        data: { text: 'uni.request' },
        header: { 'custom-header': 'hello' },
        success: (res) => {
          console.log(res);
          if (res.statusCode === 200) {
            this.itemList = res.data; 
            this.updateVisibleItems();
          } else {
            console.error("Fetch API Failed", res.statusCode);
          }
        },
        fail: (err) => {
          console.error("Request Failed", err);
        }
      });
    },
    updateVisibleItems() {
      this.visibleItems = this.itemList.slice(0, this.itemsToShow);
    },
    loadMoreItems() {
      this.itemsToShow += 5;
      this.updateVisibleItems();
    },
    goToUserFile() {
      uni.navigateTo({
        url: '/pages/userFile/user_file'
      });
    },
  },
  computed: {
    hasMoreItems() {
      return this.visibleItems.length < this.itemList.length;
    }
  }
};
</script>


<style scoped>
	@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
.home-page {
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  font-family: 'Arial', sans-serif;
  padding-bottom: 60px;
  position: relative;
  min-height: 90vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
}

.icons {
  display: flex;
  align-items: center;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #ecf0f1;
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 20px;
}

.search-icon {
  color: #7f8c8d;
  margin-right: 10px;
}

.search-input {
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 16px;
  color: #2c3e50;
  width: 150px;
}

.search-input::placeholder {
  color: #7f8c8d;
}

.featured .banner {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
}

.see_all {
  /* padding: 10px 0 20px 0; */
  background-color: #ecf0f1;
}

.span {
  font-weight: bold;
  margin: 0px 14px 0px 0px;
  text-align: end;
}

.categories {
  display: flex;
  /* justify-content: center; */
  text-align: center;
  align-items: center;
  overflow-x: auto;
  gap: 10px;
  padding: 10px;
}

.category-item {
	display: flex;
	justify-content: space-around;
	align-items: center;
	text-align: center;
	padding-top: 10px;
	padding-bottom: 10px;
	border-radius: 10px;
	background-color: #ffffff;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	width: 200px;
	min-width: 200px;
}

.category-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.category-item .icon {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  /* margin-bottom: 10px; */
}

.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
}

.item {
  width: 48%;
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.item-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}

.item text {
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
}

.read-more {
  text-align: center;
  padding: 10px;
  font-size: 16px;
  color: #3498db;
  cursor: pointer;
  font-weight: bold;
}

.read-more:hover {
  text-decoration: underline;
}
.user_price_box {
	display: flex;
	flex-direction: column;
}
.user_span {
	font-size: 12px;
	font-weight: 800;
	margin: 3px;
}

.see_span {
	color: #2c3e50;
}
</style>
