<template>
  <view class="content">
    <view class="header">
      <h5>လျှပ်စစ်မီး မီတာအချက်များအလက်ထည့်ရန်</h5>
    </view>
	
    <view class="input-area">
      <text class="label">Select user_id:</text>
      <picker :range="options" @change="onSelect_user">
        <view class="picker-box">
          <text>{{ user_id || 'ရွေးချယ်ရန်' }}</text>
          <view class="arrow"></view>
        </view>
      </picker>
      <text class="error-message" v-if="errorMessages.user_id">{{ errorMessages.user_id }}</text>
    </view>
    
    <view class="input-area">
      <text class="label">Select user_location:</text>
      <picker :range="user_location_list.map(location => location.user_location)" @change="onSelectChange">
        <view class="picker-box">
          <text v-if="loading">Loading...</text>
          <text v-else>{{ selectedUserLocation || 'ရွေးချယ်ရန်' }}</text>
          <view class="arrow"></view>
        </view>
      </picker>
      <text class="error-message" v-if="errorMessages.user_location">{{ errorMessages.user_location }}</text>
    </view>

    <view class="input-area">
      <text class="label">Current Price:</text>
      <input class="input-box" type="number" placeholder="Enter price" v-model="price" />
      <text class="error-message" v-if="errorMessages.price">{{ errorMessages.price }}</text>
    </view>

    <view class="input-area">
      <text class="label">Current Meter:</text>
      <input class="input-box" type="number" placeholder="Enter current meter" @input="onInputChange" v-model="current_meter" />
      <text class="error-message" v-if="errorMessages.current_meter">{{ errorMessages.current_meter }}</text>
    </view>

    <view class="switch-button">
      <text style="font-weight: bold; color: #3a6ea5;">မီး Meter စသုံးသူလာ ?</text>
      <switch :checked="showLastReading" @change="onSwitchChange" />
    </view>

    <view class="input-area" v-if="showLastReading">
      <text class="label">Last Reading:</text>
      <input class="input-box" type="number" placeholder="Enter last reading" @input="onInputChange" v-model="last_reading" />
      <text class="error-message" v-if="errorMessages.last_reading">{{ errorMessages.last_reading }}</text>
    </view>

    <view class="button-area">
      <button class="submit-btn" @click="onSubmit">Submit</button>
    </view>
  </view>
</template>

<script>
import { ref, reactive, watch, onMounted } from 'vue';

export default {
  setup() {
    const options = ref(['AG187', 'AG111', 'AL02']);
    const user_id = ref('');
    const user_location_list = ref([]); // Fetched locations
    const selectedUserLocation = ref('');
    const price = ref('');
    const current_meter = ref('');
    const last_reading = ref(0);
    const showLastReading = ref(false);
    const loading = ref(true);
    const errorMessages = reactive({
      user_id: '',
      user_location: '',
      price: '',
      current_meter: '',
      last_reading: '',
    });

    const onSelect_user = (event) => {
      user_id.value = options.value[event.detail.value];
      errorMessages.user_id = '';
    };

    const onSelectChange = (event) => {
      const selectedIndex = event.detail.value;
      selectedUserLocation.value = user_location_list.value[selectedIndex].user_location_id;
      errorMessages.user_location = '';
    };

    const onInputChange = (event) => {
      const { value, placeholder } = event.target;
      if (placeholder === 'Enter price') {
        price.value = value;
      } else if (placeholder === 'Enter current meter') {
        current_meter.value = value;
      } else if (placeholder === 'Enter last reading') {
        last_reading.value = value;
      }
      clearInputError(placeholder);
    };

    const clearInputError = (placeholder) => {
      if (placeholder === 'Enter price') {
        errorMessages.price = '';
      } else if (placeholder === 'Enter current meter') {
        errorMessages.current_meter = '';
      } else if (placeholder === 'Enter last reading') {
        errorMessages.last_reading = '';
      }
    };

const get_user_location = () => {
  uni.request({
    url: 'http://192.168.16.31:4000/api/user_location',
    method: 'GET',
    success(res) {
      if (res.statusCode === 200) {
        user_location_list.value = res.data;
      } else {
        console.log('Error response status:', res.statusCode);
      }
    },
    fail(err) {
      console.error('Request failed with error:', err);
      uni.showToast({
        title: 'Network request failed. Please check your connection.',
        icon: 'none',
      });
    },
    complete() {
      loading.value = false;
    }
  });
};


    const onSwitchChange = (event) => {
      showLastReading.value = event.detail.value;
    };

    const validateForm = () => {
      let isValid = true;
      errorMessages.user_id = '';
      errorMessages.user_location = '';
      errorMessages.price = '';
      errorMessages.current_meter = '';
      errorMessages.last_reading = '';

      if (!user_id.value) {
        errorMessages.user_id = 'Please select an option.';
        isValid = false;
      }

      if (!selectedUserLocation.value) {
        errorMessages.user_location = 'Please select an option.';
        isValid = false;
      }

      if (!price.value) {
        errorMessages.price = 'Price is required.';
        isValid = false;
      }

      if (!current_meter.value) {
        errorMessages.current_meter = 'Current meter is required.';
        isValid = false;
      }

      if (showLastReading.value && !last_reading.value) {
        errorMessages.last_reading = 'Last reading is required.';
        isValid = false;
      }

      return isValid;
    };

    const onSubmit = async () => {
      if (validateForm()) {
        try {
          const response = await uni.request({
            url: 'http://192.168.16.31:4000/api/eletricity_meter',
            method: 'POST',
            data: {
              user_id: user_id.value,
              user_location: selectedUserLocation.value,
              price: price.value,
              current_meter: current_meter.value,
              last_reading: last_reading.value,
            },
          });

          if (response.statusCode === 201) {
            uni.showToast({
              title: 'Form submitted successfully!',
              icon: 'success',
            });
            uni.navigateTo({
              url: '/pages/OverView/over_view',
            });
          } else {
            console.log('Unexpected response status:', response.statusCode);
            throw new Error(`Failed to submit. Status code: ${response.statusCode}`);
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          uni.showToast({
            title: 'Submission failed. Please try again.',
            icon: 'none',
          });
        }
      } else {
        console.log('Form contains errors.');
      }
    };

    watch(showLastReading, (newValue) => {
      if (!newValue) {
        last_reading.value = 0;
      }
    });

    onMounted(() => {
      get_user_location();
    });

    return {
      user_id,
      options,
      loading,
      user_location_list,
      selectedUserLocation,
      price,
      current_meter,
      last_reading,
      showLastReading,
      errorMessages,
	  onSelect_user,
      onSelectChange,
      onInputChange,
      onSwitchChange,
      onSubmit,
    };
  },
};
</script>

<style scoped>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 30rpx; 
    height: 100%;
    background-color: #f8f9fa; 
  }

  .header {
    margin-top: 20px;
    margin-bottom: 40px;
    background-color: #3498db;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  }

  .input-area {
    display: flex;
    flex-direction: column;
    margin-bottom: 40rpx; 
    width: 90%;
	margin-right: 22px;
  }

  .label {
    font-size: 32rpx;
    font-weight: 600; 
    color: #555; 
    margin-bottom: 10rpx;
    margin-left: 10px;
  }

  .input-box,
  .picker-box {
    width: 100%;
    padding: 25rpx; 
    padding-right: 10px;
    border-radius: 12rpx; 
    background-color: white;
    border: 1px solid white; 
    font-size: 32rpx; 
    transition: 0.3s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08); 
  }

  .input-box:focus,
  .picker-box:focus {
    border-color: #3498db;
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.2);
    outline: none;
  }

  .input-box:hover,
  .picker-box:hover {
    background-color: white;
    border-color: #3498db;
  }

  .error-message {
    color: #e74c3c;
    font-size: 28rpx;
    margin-top: 8rpx;
    font-weight: 500;
  }

  .button-area {
    margin-top: 50rpx;
    width: 90%;
  }

  .submit-btn {
    padding: 20rpx 30rpx;
    background: #3498db;
    color: white;
    font-size: 34rpx;
    border: none;
    border-radius: 10rpx;
    width: 100%;
    box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.15);
    transition: background-color 0.3s, box-shadow 0.3s;
  }

  .submit-btn:hover {
    background: #2980b9;
    box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.2);
  }

  .picker-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .arrow {
    width: 0;
    height: 0;
    margin-right: 20px;
    border-left: 8rpx solid transparent;
    border-right: 8rpx solid transparent;
    border-top: 10rpx solid #666;
  }
  
  .switch-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20rpx;
    width: 90%;
  }
</style>