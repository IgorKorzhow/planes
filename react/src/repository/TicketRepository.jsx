import axiosClient from "../axios-client.js";

export default {
    buyTicket(placeId, flightId) {
        return axiosClient.post(`/tickets/${flightId}/buy`, {place_id: placeId})
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    },
    getTickets() {
        return axiosClient.get('/tickets')
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    }
}
