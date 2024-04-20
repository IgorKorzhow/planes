import axiosClient from "../axios-client.js";

export default {
    getUserInfo() {
        return axiosClient.get(`/user/personal_info`)
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    },

    update(data) {
        return axiosClient.put('/user/personal_info', data)
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    }
}
