import axiosClient from "../axios-client.js";

export default {
    getAll() {
        return axiosClient.get(`/service-types`)
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    },
}
