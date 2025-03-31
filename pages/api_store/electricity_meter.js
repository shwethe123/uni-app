import { ref } from 'vue';

const electricityMeterApi = () => {
  const meter_data = ref([]);
  const error = ref('');

  const load = async () => {
    try {
      const res = await new Promise((resolve, reject) => {
        uni.request({
          url: 'http://192.168.16.31:4000/api/eletricity_meter',
          data: {
            text: 'uni.requiest'
          },
          header: {
            'custom-header': 'hello'
          },
          success(res) {
            resolve(res);
          },
          fail(error) {
            reject(error);
          }
        });
      });

      if (res.statusCode === 200) {
        meter_data.value = res.data;
      } else {
        error.value = `Error: ${res.statusCode}`;
        console.log("Fetch API Failed", res.statusCode);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      error.value = 'An error occurred while fetching data';
    }
  };

  return { meter_data, error, load };
};

export default electricityMeterApi;
