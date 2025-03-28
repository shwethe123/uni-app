<template>
  <view class="container">
    <view v-if="show_login" class="form-container">
      <h3 style="text-align: center; margin-bottom: 35px;">Login Form</h3>
      <view class="input-field">
        <input
          type="text"
          v-model="username"
          placeholder="အသုံးပြုသူအမည်"
          class="input"
        />
      </view>
      <view class="input-field">
        <input
          type="password"
          v-model="password"
          placeholder="လျှို့ဝှက်နံပါတ်"
          class="input"
        />
      </view>
      <view v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </view>
      <view class="button-container">
        <button @click="login" class="login-button">ဝင်ရောက်ရန်</button>
      </view>
    </view>

    <view v-else class="form-container">
      <h3 style="text-align: center; margin-bottom: 35px;">Register Form</h3>
      <view class="input-field">
        <input
          type="text"
          v-model="newUsername"
          placeholder="အသုံးပြုမည့်သူအမည်"
          class="input"
        />
      </view>
      <view class="input-field">
        <input
          type="password"
          v-model="newPassword"
          placeholder="လျှို့ဝှက်နံပါတ်"
          class="input"
        />
      </view>
      <view v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </view>
      <view class="button-container">
        <button @click="register" class="login-button">အကောင့်သစ်ဖွင့်ရန်</button>
      </view>
    </view>
    <span @click="show_login = !show_login" style="font-size: 12px;">
      {{ show_login ? 'No account yet?' : 'Already have an account?' }}
      <span style="font-weight: bold; text-decoration: underline;">
        {{ show_login ? 'create account' : 'Login account' }}
      </span>
    </span>
  </view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const show_login = ref(true);

const username = ref('');
const password = ref('');
const newUsername = ref('');
const newPassword = ref('');
const errorMessage = ref('');

const validateUsername = (username) => {
  if (!username.trim()) {
    return 'အသုံးပြုသူအမည်ကို ဖြည့်ပါ!';
  }
  if (/\s/.test(username)) {
    return 'အသုံးပြုသူအမည်တွင် ကွာဟချက် မရှိသင့်ပါ!';
  }
  return '';
};

const validatePassword = (password) => {
  if (!password.trim()) {
    return 'လျှို့ဝှက်နံပါတ်ကို ဖြည့်ပါ!';
  }
  if (password.length < 6) {
    return 'လျှို့ဝှက်နံပါတ်အနည်းဆုံး 6 လုံးဖြစ်ရမည်!';
  }
  return '';
};

const login = () => {
  errorMessage.value = '';

  const usernameError = validateUsername(username.value);
  const passwordError = validatePassword(password.value);

  if (usernameError || passwordError) {
    errorMessage.value = usernameError || passwordError;
    return;
  }

  uni.showToast({
    title: 'ဝင်ရောက်ရန် ကြိုးစားနေပါသည်...',
    icon: 'loading',
  });

  uni.request({
    url: 'http://192.168.16.31:4000/api/user_login',
    method: 'POST',
    data: {
      username: username.value,
      password: password.value,
    },
    withCredentials: true,
    success(res) {
      if (res.statusCode === 200 && res.data.msg === 'Login successful') {
		  console.log('my token',res.data.token);
        if (res.data.token) {
          uni.setStorageSync('my_token', res.data.token);
          uni.showToast({
            title: 'အောင်မြင်စွာ ဝင်ရောက်နိုင်ပါပြီ!',
            icon: 'success',
          });
          uni.reLaunch({ 
            url: '/pages/OverView/over_view',
          });
        }
      } else {
        uni.showToast({
          title: res.data.msg || 'Login ဝင်ရောက်မှုမအောင်မြင်ပါ',
          icon: 'none',
        });
      }
    },
    fail() {
      uni.showToast({
        title: 'Network error, please try again.',
        icon: 'none',
      });
    },
  });
};


const register = () => {
  errorMessage.value = '';

  const usernameError = validateUsername(newUsername.value);
  const passwordError = validatePassword(newPassword.value);

  if (usernameError || passwordError) {
    errorMessage.value = usernameError || passwordError;
    return;
  }

  uni.showToast({
    title: 'အကောင့်သစ်ဖွင့်ရန် ကြိုးစားနေပါသည်...',
    icon: 'loading',
  });

  uni.request({
    url: 'http://192.168.16.31:4000/api/user_register',
    method: 'POST',
    data: {
      username: newUsername.value,
      password: newPassword.value,
    },
	    withCredentials: true,
    success(res) {
      if (res.statusCode === 201 && res.data.msg === 'User created successfully') {
        uni.showToast({
          title: 'အကောင့်သစ်အောင်မြင်စွာဖွင့်နိုင်ပါပြီ!',
          icon: 'success',
        });
		uni.reLaunch({
		  url: '/pages/OverView/over_view',
		});
        show_login.value = true;
      } else {
        uni.showToast({
          title: res.data.msg || 'အကောင့်သစ်ဖွင့်ရန် မအောင်မြင်ပါ',
          icon: 'none',
        });
      }
    },
    fail() {
      uni.showToast({
        title: 'Network error, please try again.',
        icon: 'none',
      });
    },
  });
};

onMounted(() => {
  const token = uni.getStorageSync('token');
  if (token) {
    show_login.value = false;
    uni.reLaunch({
      url: '/pages/OverView/over_view',
    });
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-container {
  width: 80%;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.input-field {
  margin-bottom: 25px;
}

.input {
  width: 90%;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input:focus {
  border-color: #007aff;
  outline: none;
}

.input:hover {
  color: #007aff;
  border-color: #007aff;
}

.button-container {
  text-align: center;
}

.login-button {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background: linear-gradient(to right, #007aff, #66a6ff, #007aff);
  color: #fff;
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-weight: bold;
}

.login-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(0, 122, 255, 0.5);
}

.error-message {
  color: red;
  margin-left: 5px;
  margin-bottom: 10px;
  font-size: 14px;
}
</style>
