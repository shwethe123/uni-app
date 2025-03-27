if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$b = {
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const username = vue.ref("");
      const password = vue.ref("");
      const errorMessage = vue.ref("");
      const validateUsername = (username2) => {
        if (!username2.trim()) {
          return "အသုံးပြုသူအမည်ကို ဖြည့်ပါ!";
        }
        if (/\s/.test(username2)) {
          return "အသုံးပြုသူအမည်တွင် ကွာဟချက် မရှိသင့်ပါ!";
        }
        return "";
      };
      const validatePassword = (password2) => {
        if (!password2.trim()) {
          return "လျှို့ဝှက်နံပါတ်ကို ဖြည့်ပါ!";
        }
        if (password2.length < 6) {
          return "လျှို့ဝှက်နံပါတ်အနည်းဆုံး 6 လုံးဖြစ်ရမည်!";
        }
        return "";
      };
      const login = () => {
        errorMessage.value = "";
        const usernameError = validateUsername(username.value);
        const passwordError = validatePassword(password.value);
        if (usernameError || passwordError) {
          errorMessage.value = usernameError || passwordError;
          return;
        }
        uni.showToast({
          title: "ဝင်ရောက်ရန် ကြိုးစားနေပါသည်...",
          icon: "loading"
        });
        uni.request({
          url: "http://192.168.16.31:4000/api/user_login",
          method: "POST",
          data: {
            username: username.value,
            password: password.value
          },
          success(res) {
            if (res.statusCode === 200 && res.data.msg === "Login successful") {
              uni.navigateTo({
                url: "/pages/OverView/over_view"
              });
              formatAppLog("log", "at pages/loginPage/login.vue:85", res.statusCode);
              if (res.data.token) {
                uni.setStorageSync("token", res.data.token);
                uni.showToast({
                  title: "အောင်မြင်စွာ ဝင်ရောက်နိုင်ပါပြီ!",
                  icon: "success"
                });
                uni.navigateTo({
                  url: "/pages/OverView/over_view"
                });
              }
            } else {
              uni.showToast({
                title: res.data.msg || "Login ဝင်ရောက်မှုမအောင်မြင်ပါ",
                icon: "none"
              });
            }
          },
          fail() {
            uni.showToast({
              title: "Network error, please try again.",
              icon: "none"
            });
          }
        });
      };
      const __returned__ = { username, password, errorMessage, validateUsername, validatePassword, login, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "form-container" }, [
        vue.createElementVNode("view", { class: "input-field" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              type: "text",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.username = $event),
              placeholder: "အသုံးပြုသူအမည်",
              class: "input"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.username]
          ])
        ]),
        vue.createElementVNode("view", { class: "input-field" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              type: "password",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.password = $event),
              placeholder: "လျှို့ဝှက်နံပါတ်",
              class: "input"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.password]
          ])
        ]),
        $setup.errorMessage ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "error-message"
          },
          vue.toDisplayString($setup.errorMessage),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "button-container" }, [
          vue.createElementVNode("button", {
            onClick: $setup.login,
            class: "login-button"
          }, "ဝင်ရောက်ရန်")
        ])
      ])
    ]);
  }
  const PagesLoginPageLogin = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-f60a0104"], ["__file", "C:/Users/shwethe/Desktop/Hbuilder/Electricity_meter/pages/loginPage/login.vue"]]);
  const _sfc_main$a = {
    __name: "user_detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const Data = vue.ref([
        // { title: 'Total User', value: 65, icon: 'fa fa-users', details: 'Total number of Users in stock' },
        { title: "Customer Rating", value: "4.7/5", icon: "fa fa-star", details: "Customer feedback rating on products" }
      ]);
      const dashboardData = vue.ref([]);
      const total_meter = vue.ref(0);
      const total_user = vue.ref(0);
      const total_price = vue.ref(0);
      vue.onMounted(() => {
        const apiUrl = "http://192.168.16.31:4000/api/eletricity_meter";
        uni.request({
          url: apiUrl,
          method: "GET",
          success: (response) => {
            if (response.statusCode === 200) {
              dashboardData.value = response.data;
              formatAppLog("log", "at pages/user_detail/user_detail.vue:83", dashboardData);
              let userCount = /* @__PURE__ */ new Set();
              let priceTotal = 0;
              let meterTotal = 0;
              dashboardData.value.forEach((item) => {
                userCount.add(item);
                let price = 0;
                if (typeof item.edit_price === "string") {
                  price = parseFloat(item.edit_price.replace("฿", "").replace(",", ""));
                } else if (typeof item.edit_price === "number") {
                  price = item.edit_price;
                }
                if (!isNaN(price)) {
                  priceTotal += price;
                } else {
                  formatAppLog("error", "at pages/user_detail/user_detail.vue:109", "Invalid price value:", item.edit_price);
                }
                let meter = parseInt(item.total_meter) || 0;
                meterTotal += meter;
              });
              total_user.value = userCount.size;
              total_price.value = priceTotal.toFixed(2);
              total_meter.value = meterTotal;
            } else {
              formatAppLog("error", "at pages/user_detail/user_detail.vue:123", "Failed to load data", response);
            }
          },
          fail: (error) => {
            formatAppLog("error", "at pages/user_detail/user_detail.vue:127", "API request failed", error);
          }
        });
      });
      const __returned__ = { Data, dashboardData, total_meter, total_user, total_price, onMounted: vue.onMounted, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "card-container" }, [
      vue.createElementVNode("view", { class: "card" }, [
        vue.createElementVNode("view", { class: "card-header" }, [
          vue.createElementVNode("i", { class: "fa fa-tachometer-alt card-icon" }),
          vue.createElementVNode("text", { class: "card-title" }, "Total Meter")
        ]),
        vue.createElementVNode("view", { class: "card-body" }, [
          vue.createElementVNode(
            "text",
            { class: "card-value" },
            vue.toDisplayString($setup.total_meter) + " kW-h",
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "card-footer" }, [
          vue.createElementVNode("text", { class: "card-detail" }, "Total number of meters in stock")
        ])
      ]),
      vue.createElementVNode("view", { class: "card" }, [
        vue.createElementVNode("view", { class: "card-header" }, [
          vue.createCommentVNode(" Add icon for Total Price "),
          vue.createElementVNode("i", { class: "fa fa-dollar-sign card-icon" }),
          vue.createElementVNode("text", { class: "card-title" }, "Total Price")
        ]),
        vue.createElementVNode("view", { class: "card-body" }, [
          vue.createElementVNode(
            "text",
            { class: "card-value" },
            vue.toDisplayString($setup.total_price) + "฿",
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "card-footer" }, [
          vue.createElementVNode("text", { class: "card-detail" }, "Total revenue from all orders")
        ])
      ]),
      vue.createElementVNode("view", { class: "card" }, [
        vue.createElementVNode("view", { class: "card-header" }, [
          vue.createElementVNode("i", { class: "fa fa-users card-icon" }),
          vue.createElementVNode("text", { class: "card-title" }, "Total User")
        ]),
        vue.createElementVNode("view", { class: "card-body" }, [
          vue.createElementVNode(
            "text",
            { class: "card-value" },
            vue.toDisplayString($setup.total_user),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "card-footer" }, [
          vue.createElementVNode("text", { class: "card-detail" }, "Total number of Users in stock")
        ])
      ]),
      vue.createCommentVNode(" Other Data Cards "),
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($setup.Data, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "card",
            key: index
          }, [
            vue.createElementVNode("view", { class: "card-header" }, [
              vue.createElementVNode(
                "i",
                {
                  class: vue.normalizeClass([item.icon, "card-icon"])
                },
                null,
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "text",
                { class: "card-title" },
                vue.toDisplayString(item.title),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "card-body" }, [
              vue.createElementVNode(
                "text",
                { class: "card-value" },
                vue.toDisplayString(item.value),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "card-footer" }, [
              vue.createElementVNode(
                "text",
                { class: "card-detail" },
                vue.toDisplayString(item.details),
                1
                /* TEXT */
              )
            ])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesUserDetailUserDetail = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-6c6fd421"], ["__file", "C:/Users/shwethe/Desktop/Hbuilder/Electricity_meter/pages/user_detail/user_detail.vue"]]);
  const _sfc_main$9 = {
    __name: "progress",
    setup(__props, { expose: __expose }) {
      __expose();
      const dashboardData = vue.ref([
        { title: "Total Orders", data: 120, icon: "fa fa-shopping-cart", progress: 0, maxProgress: 100 },
        { title: "Total Revenue", data: "$4500", icon: "fa fa-dollar-sign", progress: 0, maxProgress: 100 }
      ]);
      const updateProgressBasedOnTime = () => {
        const intervalTime = 1e3;
        const startTime = Date.now();
        setInterval(() => {
          const elapsedSeconds = Math.floor((Date.now() - startTime) / 1e3);
          dashboardData.value.forEach((item) => {
            if (item.progress < item.maxProgress) {
              item.progress = Math.min(elapsedSeconds / 60 * 100, item.maxProgress);
            }
          });
        }, intervalTime);
      };
      vue.onMounted(() => {
        updateProgressBasedOnTime();
      });
      const __returned__ = { dashboardData, updateProgressBasedOnTime, ref: vue.ref, onMounted: vue.onMounted };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "dashboard" }, [
      vue.createElementVNode("view", { class: "overview-box" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.dashboardData, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "card",
              key: index
            }, [
              vue.createElementVNode("view", { class: "card-header" }, [
                vue.createElementVNode(
                  "i",
                  {
                    class: vue.normalizeClass([item.icon, "card-icon"])
                  },
                  null,
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "card-title" },
                  vue.toDisplayString(item.title),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "card-body" }, [
                vue.createElementVNode(
                  "text",
                  { class: "card-data" },
                  vue.toDisplayString(item.data),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "progress-bar" }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: "progress",
                      style: vue.normalizeStyle({ width: item.progress + "%" })
                    },
                    null,
                    4
                    /* STYLE */
                  )
                ])
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const progressVue = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-a8082451"], ["__file", "C:/Users/shwethe/Desktop/Hbuilder/Electricity_meter/pages/progress/progress.vue"]]);
  const _sfc_main$8 = {
    components: {
      DataShow: PagesUserDetailUserDetail,
      ProgressVue: progressVue
    },
    data() {
      return {
        itemList: [],
        visibleItems: [],
        itemsToShow: 5
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        uni.request({
          url: "http://192.168.16.31:4000/api/eletricity_meter",
          data: { text: "uni.request" },
          header: { "custom-header": "hello" },
          success: (res) => {
            formatAppLog("log", "at pages/HomeFile/home.vue:75", res);
            if (res.statusCode === 200) {
              this.itemList = res.data;
              this.updateVisibleItems();
            } else {
              formatAppLog("error", "at pages/HomeFile/home.vue:80", "Fetch API Failed", res.statusCode);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/HomeFile/home.vue:84", "Request Failed", err);
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
          url: "/pages/userFile/user_file"
        });
      }
    },
    computed: {
      hasMoreItems() {
        return this.visibleItems.length < this.itemList.length;
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_ProgressVue = vue.resolveComponent("ProgressVue");
    const _component_DataShow = vue.resolveComponent("DataShow");
    return vue.openBlock(), vue.createElementBlock("view", { class: "home-page" }, [
      vue.createCommentVNode(" Header Section "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("text", { class: "logo" }, "My App"),
        vue.createElementVNode("view", { class: "icons" }, [
          vue.createElementVNode("view", { class: "search-container" }, [
            vue.createElementVNode("icon", {
              class: "search-icon",
              type: "search",
              size: "24"
            }),
            vue.createElementVNode("input", {
              class: "search-input",
              type: "text",
              placeholder: "Search..."
            })
          ]),
          vue.createElementVNode("icon", {
            type: "person",
            size: "24"
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "featured" }, [
        vue.createVNode(_component_ProgressVue)
      ]),
      vue.createElementVNode("view", { class: "" }, [
        vue.createElementVNode("view", {
          class: "span",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.goToUserFile && $options.goToUserFile(...args))
        }, [
          vue.createElementVNode("span", { class: "see_span" }, "See All")
        ]),
        vue.createElementVNode("view", { class: "categories" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.visibleItems, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                class: "category-item"
              }, [
                vue.createCommentVNode(' <image class="icon" src="https://shorturl.at/hMn99" /> '),
                vue.createElementVNode("image", {
                  class: "icon",
                  src: "https://shorturl.at/o7eQW",
                  style: { "width": "60px", "height": "60px", "border-radius": "10px" }
                }),
                vue.createCommentVNode(' <i class="fas fa-tachometer-alt card-icon" style="font-size: 40px; color:coral"></i> '),
                vue.createCommentVNode(' <i class="fas fa-tachometer-alt card-icon" style="font-size: 50px; color: coral;"></i> '),
                vue.createElementVNode("view", { class: "user_price_box" }, [
                  vue.createElementVNode(
                    "span",
                    { class: "user_span" },
                    vue.toDisplayString(item.user_id),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "span",
                    { class: "user_span" },
                    "Price - " + vue.toDisplayString(item.edit_price) + " ฿",
                    1
                    /* TEXT */
                  )
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          $options.hasMoreItems ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            onClick: _cache[1] || (_cache[1] = (...args) => $options.loadMoreItems && $options.loadMoreItems(...args)),
            class: "read-more"
          }, [
            vue.createElementVNode("span", null, "Read More")
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_DataShow, { items: $data.visibleItems }, null, 8, ["items"])
      ])
    ]);
  }
  const PagesHomeFileHome = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-9c3e9dfb"], ["__file", "C:/Users/shwethe/Desktop/Hbuilder/Electricity_meter/pages/HomeFile/home.vue"]]);
  const _sfc_main$7 = {
    __name: "revenue",
    setup(__props, { expose: __expose }) {
      __expose();
      const cardData = vue.ref([
        { title: "Total Revenue", value: "$75,000", icon: "/assets/icons/revenue.svg", details: "Total revenue generated this month" },
        { title: "Orders Processed", value: 1850, icon: "/assets/icons/orders.svg", details: "Total orders processed this week" },
        { title: "Active Users", value: 1320, icon: "/assets/icons/users.svg", details: "Users actively browsing your site" },
        { title: "Customer Feedback", value: "4.9/5", icon: "/assets/icons/feedback.svg", details: "Customer satisfaction rating" }
      ]);
      const __returned__ = { cardData, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "card-container" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($setup.cardData, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "data-card",
            key: index
          }, [
            vue.createElementVNode("view", { class: "card-header" }, [
              vue.createElementVNode("image", {
                class: "card-icon",
                src: item.icon
              }, null, 8, ["src"]),
              vue.createElementVNode(
                "text",
                { class: "card-title" },
                vue.toDisplayString(item.title),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "card-body" }, [
              vue.createElementVNode(
                "text",
                { class: "card-value" },
                vue.toDisplayString(item.value),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "card-footer" }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(item.details),
                1
                /* TEXT */
              )
            ])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const Revenue = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-5f0b319b"], ["__file", "C:/Users/shwethe/Desktop/Hbuilder/Electricity_meter/pages/Revenue/revenue.vue"]]);
  const _sfc_main$6 = {
    __name: "feedback",
    setup(__props, { expose: __expose }) {
      __expose();
      const post = vue.ref({
        userAvatar: "/static/user1.jpg",
        userName: "Salai Chai Naing",
        timeAgo: "2 hours ago",
        content: "Hello, this is my first post!",
        likes: 25,
        comments: 10,
        commentsList: [
          { author: "Alice", text: "Great post!" },
          { author: "Bob", text: "Welcome to the app!" }
        ]
      });
      const newComment = vue.ref("");
      const likePost = (post2) => {
        post2.likes++;
      };
      const commentPost = (post2) => {
        formatAppLog("log", "at pages/Feedback/feedback.vue:55", "Commented on post:", post2);
      };
      const sharePost = (post2) => {
        formatAppLog("log", "at pages/Feedback/feedback.vue:59", "Shared post:", post2);
      };
      const submitComment = () => {
        post.value.commentsList.push({ author: "You", text: newComment.value });
        newComment.value = "";
      };
      const __returned__ = { post, newComment, likePost, commentPost, sharePost, submitComment, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "post-details-container" }, [
      vue.createElementVNode("view", { class: "post-header" }, [
        vue.createElementVNode("image", {
          class: "user-avatar",
          src: "https://shorturl.at/QuLrA",
          alt: "User Avatar"
        }),
        vue.createElementVNode("view", { class: "post-user" }, [
          vue.createElementVNode(
            "text",
            { class: "user-name" },
            vue.toDisplayString($setup.post.userName),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "post-time" },
            vue.toDisplayString($setup.post.timeAgo),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createElementVNode(
        "text",
        { class: "post-content" },
        vue.toDisplayString($setup.post.content),
        1
        /* TEXT */
      ),
      vue.createElementVNode("view", { class: "post-actions" }, [
        vue.createElementVNode(
          "button",
          {
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.likePost($setup.post))
          },
          "👍 " + vue.toDisplayString($setup.post.likes) + " Likes",
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "button",
          {
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.commentPost($setup.post))
          },
          "💬 " + vue.toDisplayString($setup.post.comments) + " Comments",
          1
          /* TEXT */
        ),
        vue.createElementVNode("button", {
          onClick: _cache[2] || (_cache[2] = ($event) => $setup.sharePost($setup.post))
        }, "🔗 Share")
      ]),
      vue.createElementVNode("view", { class: "comments-section" }, [
        vue.createElementVNode("text", { class: "comments-title" }, "Comments"),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.post.commentsList, (comment, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: "comment"
            }, [
              vue.createElementVNode(
                "text",
                { class: "comment-author" },
                vue.toDisplayString(comment.author) + ":",
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                { class: "comment-text" },
                vue.toDisplayString(comment.text),
                1
                /* TEXT */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.newComment = $event),
          placeholder: "Add a comment...",
          class: "comment-input"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $setup.newComment]
      ]),
      vue.createElementVNode("button", {
        class: "comment-submit",
        onClick: $setup.submitComment
      }, "Post Comment")
    ]);
  }
  const feedbackVue = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-6167f87a"], ["__file", "C:/Users/shwethe/Desktop/Hbuilder/Electricity_meter/pages/Feedback/feedback.vue"]]);
  const _sfc_main$5 = {
    __name: "create",
    setup(__props, { expose: __expose }) {
      __expose();
      const openSettings = () => {
        uni.navigateTo({ url: "/pages/settings/settings" });
      };
      const addItem = () => {
        uni.navigateTo({ url: "/pages/add-item/add-item" });
      };
      const __returned__ = { openSettings, addItem };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "fab-container" }, [
      vue.createCommentVNode('    <view class="fab" @click="openSettings">\n      <text class="fab-icon">⚙️</text>\n    </view> '),
      vue.createElementVNode("view", {
        class: "fab",
        onClick: $setup.addItem
      }, [
        vue.createElementVNode("text", { class: "fab-icon" }, "+")
      ])
    ]);
  }
  const createVue = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-854d8a34"], ["__file", "C:/Users/shwethe/Desktop/Hbuilder/Electricity_meter/pages/Create/create.vue"]]);
  const _sfc_main$4 = {
    __name: "over_view",
    setup(__props, { expose: __expose }) {
      __expose();
      const selectedTab = vue.ref("home");
      const goToUserCreate = () => {
        uni.navigateTo({
          url: "/pages/index/index"
        });
      };
      const selectTab = (tab) => {
        selectedTab.value = tab;
      };
      const __returned__ = { selectedTab, goToUserCreate, selectTab, HomePage: PagesHomeFileHome, Revenue, feedbackVue, progressVue, createVue, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "tabs-container" }, [
      vue.createElementVNode("view", { class: "tab-content" }, [
        $setup.selectedTab === "home" ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.createVNode($setup["HomePage"])
        ])) : vue.createCommentVNode("v-if", true),
        $setup.selectedTab === "revenue" ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
          vue.createVNode($setup["Revenue"])
        ])) : vue.createCommentVNode("v-if", true),
        $setup.selectedTab === "products" ? (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
          vue.createVNode($setup["progressVue"])
        ])) : vue.createCommentVNode("v-if", true),
        $setup.selectedTab === "feedback" ? (vue.openBlock(), vue.createElementBlock("view", { key: 3 }, [
          vue.createVNode($setup["feedbackVue"])
        ])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode("view", {
        onClick: $setup.goToUserCreate,
        class: "add_new"
      }, [
        vue.createVNode($setup["createVue"])
      ]),
      vue.createElementVNode("view", { class: "footer" }, [
        vue.createElementVNode("view", { class: "footer-icons" }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["footer-icon", { active: $setup.selectedTab === "home" }]),
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.selectTab("home"))
            },
            [
              vue.createElementVNode("i", { class: "fa fa-home" }),
              vue.createElementVNode("text", null, "Home")
            ],
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["footer-icon", { active: $setup.selectedTab === "revenue" }]),
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.selectTab("revenue"))
            },
            [
              vue.createElementVNode("i", { class: "fa fa-dollar-sign" }),
              vue.createElementVNode("text", null, "Revenue")
            ],
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["footer-icon", { active: $setup.selectedTab === "products" }]),
              onClick: _cache[2] || (_cache[2] = ($event) => $setup.selectTab("products"))
            },
            [
              vue.createElementVNode("i", { class: "fa fa-box" }),
              vue.createElementVNode("text", null, "Products")
            ],
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["footer-icon", { active: $setup.selectedTab === "feedback" }]),
              onClick: _cache[3] || (_cache[3] = ($event) => $setup.selectTab("feedback"))
            },
            [
              vue.createElementVNode("i", { class: "fa fa-comments" }),
              vue.createElementVNode("text", null, "Feedback")
            ],
            2
            /* CLASS */
          )
        ])
      ])
    ]);
  }
  const PagesOverViewOverView = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-38022e64"], ["__file", "C:/Users/shwethe/Desktop/Hbuilder/Electricity_meter/pages/OverView/over_view.vue"]]);
  const _sfc_main$3 = {
    setup() {
      const options = vue.ref(["AG187", "AG111", "AL02"]);
      const user_id = vue.ref("");
      const user_location_list = vue.ref([]);
      const selectedUserLocation = vue.ref("");
      const price = vue.ref("");
      const current_meter = vue.ref("");
      const last_reading = vue.ref(0);
      const showLastReading = vue.ref(false);
      const loading = vue.ref(true);
      const errorMessages = vue.reactive({
        user_id: "",
        user_location: "",
        price: "",
        current_meter: "",
        last_reading: ""
      });
      const onSelect_user = (event) => {
        user_id.value = options.value[event.detail.value];
        errorMessages.user_id = "";
      };
      const onSelectChange = (event) => {
        const selectedIndex = event.detail.value;
        selectedUserLocation.value = user_location_list.value[selectedIndex].user_location_id;
        errorMessages.user_location = "";
      };
      const onInputChange = (event) => {
        const { value, placeholder } = event.target;
        if (placeholder === "Enter price") {
          price.value = value;
        } else if (placeholder === "Enter current meter") {
          current_meter.value = value;
        } else if (placeholder === "Enter last reading") {
          last_reading.value = value;
        }
        clearInputError(placeholder);
      };
      const clearInputError = (placeholder) => {
        if (placeholder === "Enter price") {
          errorMessages.price = "";
        } else if (placeholder === "Enter current meter") {
          errorMessages.current_meter = "";
        } else if (placeholder === "Enter last reading") {
          errorMessages.last_reading = "";
        }
      };
      const get_user_location = () => {
        uni.request({
          url: "http://192.168.16.31:4000/api/user_location",
          method: "GET",
          success(res) {
            if (res.statusCode === 200) {
              user_location_list.value = res.data;
            } else {
              formatAppLog("log", "at pages/index/index.vue:122", "Error response status:", res.statusCode);
            }
          },
          fail(err) {
            formatAppLog("error", "at pages/index/index.vue:126", "Request failed with error:", err);
            uni.showToast({
              title: "Network request failed. Please check your connection.",
              icon: "none"
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
        errorMessages.user_id = "";
        errorMessages.user_location = "";
        errorMessages.price = "";
        errorMessages.current_meter = "";
        errorMessages.last_reading = "";
        if (!user_id.value) {
          errorMessages.user_id = "Please select an option.";
          isValid = false;
        }
        if (!selectedUserLocation.value) {
          errorMessages.user_location = "Please select an option.";
          isValid = false;
        }
        if (!price.value) {
          errorMessages.price = "Price is required.";
          isValid = false;
        }
        if (!current_meter.value) {
          errorMessages.current_meter = "Current meter is required.";
          isValid = false;
        }
        if (showLastReading.value && !last_reading.value) {
          errorMessages.last_reading = "Last reading is required.";
          isValid = false;
        }
        return isValid;
      };
      const onSubmit = async () => {
        if (validateForm()) {
          try {
            const response = await uni.request({
              url: "http://192.168.16.31:4000/api/eletricity_meter",
              method: "POST",
              data: {
                user_id: user_id.value,
                user_location: selectedUserLocation.value,
                price: price.value,
                current_meter: current_meter.value,
                last_reading: last_reading.value
              }
            });
            if (response.statusCode === 201) {
              uni.showToast({
                title: "Form submitted successfully!",
                icon: "success"
              });
              uni.navigateTo({
                url: "/pages/OverView/over_view"
              });
            } else {
              formatAppLog("log", "at pages/index/index.vue:203", "Unexpected response status:", response.statusCode);
              throw new Error(`Failed to submit. Status code: ${response.statusCode}`);
            }
          } catch (error) {
            formatAppLog("error", "at pages/index/index.vue:207", "Error submitting form:", error);
            uni.showToast({
              title: "Submission failed. Please try again.",
              icon: "none"
            });
          }
        } else {
          formatAppLog("log", "at pages/index/index.vue:214", "Form contains errors.");
        }
      };
      vue.watch(showLastReading, (newValue) => {
        if (!newValue) {
          last_reading.value = 0;
        }
      });
      vue.onMounted(() => {
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
        onSubmit
      };
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("h5", null, "လျှပ်စစ်မီး မီတာအချက်များအလက်ထည့်ရန်")
      ]),
      vue.createElementVNode("view", { class: "input-area" }, [
        vue.createElementVNode("text", { class: "label" }, "Select user_id:"),
        vue.createElementVNode("picker", {
          range: $setup.options,
          onChange: _cache[0] || (_cache[0] = (...args) => $setup.onSelect_user && $setup.onSelect_user(...args))
        }, [
          vue.createElementVNode("view", { class: "picker-box" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.user_id || "ရွေးချယ်ရန်"),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "arrow" })
          ])
        ], 40, ["range"]),
        $setup.errorMessages.user_id ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "error-message"
          },
          vue.toDisplayString($setup.errorMessages.user_id),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode("view", { class: "input-area" }, [
        vue.createElementVNode("text", { class: "label" }, "Select user_location:"),
        vue.createElementVNode("picker", {
          range: $setup.user_location_list.map((location) => location.user_location),
          onChange: _cache[1] || (_cache[1] = (...args) => $setup.onSelectChange && $setup.onSelectChange(...args))
        }, [
          vue.createElementVNode("view", { class: "picker-box" }, [
            $setup.loading ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "Loading...")) : (vue.openBlock(), vue.createElementBlock(
              "text",
              { key: 1 },
              vue.toDisplayString($setup.selectedUserLocation || "ရွေးချယ်ရန်"),
              1
              /* TEXT */
            )),
            vue.createElementVNode("view", { class: "arrow" })
          ])
        ], 40, ["range"]),
        $setup.errorMessages.user_location ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "error-message"
          },
          vue.toDisplayString($setup.errorMessages.user_location),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode("view", { class: "input-area" }, [
        vue.createElementVNode("text", { class: "label" }, "Current Price:"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "input-box",
            type: "number",
            placeholder: "Enter price",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.price = $event)
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.price]
        ]),
        $setup.errorMessages.price ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "error-message"
          },
          vue.toDisplayString($setup.errorMessages.price),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode("view", { class: "input-area" }, [
        vue.createElementVNode("text", { class: "label" }, "Current Meter:"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "input-box",
            type: "number",
            placeholder: "Enter current meter",
            onInput: _cache[3] || (_cache[3] = (...args) => $setup.onInputChange && $setup.onInputChange(...args)),
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.current_meter = $event)
          },
          null,
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [vue.vModelText, $setup.current_meter]
        ]),
        $setup.errorMessages.current_meter ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "error-message"
          },
          vue.toDisplayString($setup.errorMessages.current_meter),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode("view", { class: "switch-button" }, [
        vue.createElementVNode("text", { style: { "font-weight": "bold", "color": "#3a6ea5" } }, "မီး Meter စသုံးသူလာ ?"),
        vue.createElementVNode("switch", {
          checked: $setup.showLastReading,
          onChange: _cache[5] || (_cache[5] = (...args) => $setup.onSwitchChange && $setup.onSwitchChange(...args))
        }, null, 40, ["checked"])
      ]),
      $setup.showLastReading ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "input-area"
      }, [
        vue.createElementVNode("text", { class: "label" }, "Last Reading:"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "input-box",
            type: "number",
            placeholder: "Enter last reading",
            onInput: _cache[6] || (_cache[6] = (...args) => $setup.onInputChange && $setup.onInputChange(...args)),
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.last_reading = $event)
          },
          null,
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [vue.vModelText, $setup.last_reading]
        ]),
        $setup.errorMessages.last_reading ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "error-message"
          },
          vue.toDisplayString($setup.errorMessages.last_reading),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "button-area" }, [
        vue.createElementVNode("button", {
          class: "submit-btn",
          onClick: _cache[8] || (_cache[8] = (...args) => $setup.onSubmit && $setup.onSubmit(...args))
        }, "Submit")
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/Users/shwethe/Desktop/Hbuilder/Electricity_meter/pages/index/index.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        itemList: [],
        displayedItems: [],
        itemsToShow: 10,
        hasMoreItems: true,
        expandedUserId: null
        // To track the currently expanded user's ID
      };
    },
    mounted() {
      this.fetchData();
    },
    computed: {
      // Find the selected user from itemList based on expandedUserId
      selectedUser() {
        formatAppLog("log", "at pages/userFile/user_file.vue:87", "Searching for user with ID:", this.expandedUserId);
        return this.itemList.find((item) => item._id === this.expandedUserId);
      }
    },
    methods: {
      fetchData() {
        uni.request({
          url: "http://192.168.16.31:4000/api/eletricity_meter",
          // url: 'http://localhost:4000/api/eletricity_meter',
          data: {
            text: "uni.request"
          },
          header: {
            "custom-header": "hello"
          },
          success: (res) => {
            formatAppLog("log", "at pages/userFile/user_file.vue:103", "API Response:", res);
            if (res.statusCode === 200) {
              this.itemList = res.data;
              this.itemList.forEach((item) => {
                formatAppLog("log", "at pages/userFile/user_file.vue:109", "Item edit_price:", item.edit_price);
              });
              this.displayedItems = this.itemList.slice(0, this.itemsToShow);
              if (this.itemList.length <= this.itemsToShow) {
                this.hasMoreItems = false;
              }
            } else {
              formatAppLog("error", "at pages/userFile/user_file.vue:117", "Fetch API failed", res.statusCode);
            }
          }
        });
      },
      goToDetailPage(itemId) {
        formatAppLog("log", "at pages/userFile/user_file.vue:124", "Item clicked:", itemId);
        if (this.expandedUserId === itemId) {
          this.expandedUserId = null;
        } else {
          this.expandedUserId = itemId;
        }
      },
      // Method to close the modal
      closeModal() {
        this.expandedUserId = null;
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
        return isNaN(numericPrice) ? "Invalid Price" : numericPrice.toFixed(2);
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", { class: "list-page" }, [
      vue.createElementVNode("div", { class: "header" }, [
        vue.createElementVNode("p", { class: "title" }, "User List")
      ]),
      vue.createElementVNode("div", { class: "list-container" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.displayedItems, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              class: "list-item",
              key: index,
              onClick: ($event) => $options.goToDetailPage(item._id)
            }, [
              vue.createCommentVNode(' <i class="fas fa-tachometer-alt item-image" style="font-size: 50px; color: coral;"></i> '),
              vue.createElementVNode("image", {
                class: "icon",
                src: "https://shorturl.at/MlXfI",
                style: { "width": "60px", "height": "60px", "border-radius": "10px", "margin-right": "10px" }
              }),
              vue.createElementVNode("div", { class: "item-info" }, [
                vue.createElementVNode(
                  "p",
                  { class: "item-title" },
                  "User Name - " + vue.toDisplayString(item.user_id),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "p",
                  { class: "item-description" },
                  vue.toDisplayString($options.formatPrice(item.edit_price)) + " kW-h",
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { style: { "padding": "5px" } }, [
                vue.createElementVNode("h5", { style: { "font-size": "16px", "margin-bottom": "8px" } }, "Price"),
                vue.createElementVNode(
                  "span",
                  { style: { "color": "#38b000", "font-weight": "bold" } },
                  vue.toDisplayString(item.edit_price) + " ฿",
                  1
                  /* TEXT */
                )
              ])
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      $data.expandedUserId !== null ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: "modal-overlay",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.closeModal && $options.closeModal(...args))
      }, [
        vue.createElementVNode("div", {
          class: "modal",
          onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("h2", { class: "modal-title" }, "User Details"),
          vue.createElementVNode("div", { class: "modal-content" }, [
            vue.createElementVNode("p", { class: "modal-item" }, [
              vue.createElementVNode("i", { class: "fas fa-user modal-icon" }),
              vue.createElementVNode("span", { class: "modal-label" }, "User name:"),
              vue.createElementVNode(
                "span",
                { style: { "color": "blueviolet", "font-weight": "bolder" } },
                vue.toDisplayString($options.selectedUser ? $options.selectedUser.user_id : "N/A"),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("p", { class: "modal-item" }, [
              vue.createElementVNode("i", { class: "fas fa-dollar-sign modal-icon" }),
              vue.createElementVNode("span", { class: "modal-label" }, "Price:"),
              vue.createElementVNode(
                "span",
                { style: { "color": "green", "font-weight": "bold" } },
                vue.toDisplayString($options.selectedUser ? $options.selectedUser.edit_price : "N/A") + " ฿ ",
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("p", { class: "modal-item" }, [
              vue.createElementVNode("i", { class: "fas fa-tachometer-alt modal-icon" }),
              vue.createElementVNode("span", { class: "modal-label" }, "Current meter:"),
              vue.createElementVNode(
                "span",
                { style: { "color": "green", "font-weight": "bold" } },
                vue.toDisplayString($options.selectedUser ? $options.selectedUser.current_meter : "N/A") + " kW-h ",
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("p", { class: "modal-item" }, [
              vue.createElementVNode("i", { class: "fas fa-history modal-icon" }),
              vue.createElementVNode("span", { class: "modal-label" }, "Last reading:"),
              vue.createElementVNode(
                "span",
                { style: { "color": "orangered", "font-weight": "bold" } },
                vue.toDisplayString($options.selectedUser ? $options.selectedUser.last_reading : "N/A") + " kW-h ",
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode("button", {
            onClick: _cache[0] || (_cache[0] = (...args) => $options.closeModal && $options.closeModal(...args)),
            class: "close-btn"
          }, "Close")
        ])
      ])) : vue.createCommentVNode("v-if", true),
      $data.hasMoreItems ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 1,
        class: "load-more-container"
      }, [
        vue.createElementVNode("button", {
          class: "load-more-btn",
          onClick: _cache[3] || (_cache[3] = (...args) => $options.loadMoreItems && $options.loadMoreItems(...args))
        }, "Read More")
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesUserFileUserFile = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-1a15d095"], ["__file", "C:/Users/shwethe/Desktop/Hbuilder/Electricity_meter/pages/userFile/user_file.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        users: [
          {
            id: "user1",
            name: "John Doe",
            occupation: "Software Engineer",
            bio: "A passionate coder with 5 years of experience.",
            contact: "johndoe@example.com",
            location: "New York"
          },
          {
            id: "user2",
            name: "Jane Smith",
            occupation: "Product Manager",
            bio: "Experienced in product development and team management.",
            contact: "janesmith@example.com",
            location: "San Francisco"
          },
          {
            id: "user3",
            name: "Michael Lee",
            occupation: "UX Designer",
            bio: "Designing intuitive user experiences for mobile apps.",
            contact: "michaellee@example.com",
            location: "Chicago"
          }
        ],
        expandedUserId: null
        // To track which user's details are expanded
      };
    },
    methods: {
      toggleDetails(userId) {
        if (this.expandedUserId === userId) {
          this.expandedUserId = null;
        } else {
          this.expandedUserId = userId;
        }
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "user-accordion-page" }, [
      vue.createElementVNode("text", { class: "page-title" }, "User Accordion List"),
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.users, (user) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            key: user.id
          }, [
            vue.createElementVNode("view", {
              class: "user-item",
              onClick: ($event) => $options.toggleDetails(user.id)
            }, [
              vue.createElementVNode(
                "text",
                { class: "user-name" },
                vue.toDisplayString(user.name),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                { class: "user-occupation" },
                vue.toDisplayString(user.occupation),
                1
                /* TEXT */
              )
            ], 8, ["onClick"]),
            vue.createCommentVNode(" Expandable Details "),
            user.id === $data.expandedUserId ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "user-details"
            }, [
              vue.createElementVNode(
                "text",
                { class: "user-bio" },
                "Bio: " + vue.toDisplayString(user.bio),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                { class: "user-contact" },
                "Contact: " + vue.toDisplayString(user.contact),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                { class: "user-location" },
                "Location: " + vue.toDisplayString(user.location),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true)
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesUserProfileUserProfile = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-f88c3c28"], ["__file", "C:/Users/shwethe/Desktop/Hbuilder/Electricity_meter/pages/user_profile/user_profile.vue"]]);
  __definePage("pages/loginPage/login", PagesLoginPageLogin);
  __definePage("pages/OverView/over_view", PagesOverViewOverView);
  __definePage("pages/HomeFile/home", PagesHomeFileHome);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/userFile/user_file", PagesUserFileUserFile);
  __definePage("pages/user_detail/user_detail", PagesUserDetailUserDetail);
  __definePage("pages/user_profile/user_profile", PagesUserProfileUserProfile);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/shwethe/Desktop/Hbuilder/Electricity_meter/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
