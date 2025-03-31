import { ref } from 'vue';

const get_user_id = () => {
    let user_data = ref([]);
    let error = ref('');
    
    const load = async () => {
        try {
            const res = await new Promise((resolve, reject) => {
                uni.request({
                    url: 'http://192.168.16.31:4000/api/user_id',
                    data: {
                        text: 'uni.request'
                    },
                    header: {
                        'custom-header': 'hello'
                    },
                    success(response) {
                        resolve(response);
                    },
                    fail(err) {
                        reject(err);
                    }
                });
            });

            if (res.statusCode === 200) {
                user_data.value = res.data;
            } else {
                error.value = `Error: ${res.statusCode}`;
                console.log("Fetch API failed", res.statusCode);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            error.value = 'An error occurred while fetching data';
        }
    };

    return {
        user_data,
        error,
        load
    };
};

export default get_user_id;
