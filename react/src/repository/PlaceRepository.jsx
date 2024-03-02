import axiosClient from "../axios-client.js";

export default {
    getAvailablePlaces(flightId) {
        return axiosClient.get(`/places/available/${flightId}`)
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    },
}
