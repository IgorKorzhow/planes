import axiosClient from "../axios-client.js";

export default {
    get(callback) {
        return axiosClient.get(`/muscleGroup/index`)
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    }
}
