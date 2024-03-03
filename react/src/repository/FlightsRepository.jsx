import axiosClient from "../axios-client.js";

export default {
    get(queryParams) {
        console.log(queryParams['search']);
        return axiosClient.get(`/flights`, {
            params: {
                searchField: queryParams['search_field'],
                page: queryParams['page'],
                search: queryParams['search_value'],
                per_page: queryParams['per_page'] ?? 9,
            }
        })
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    },

    getFlight(id) {
        return axiosClient.get(`/flights/${id}`)
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    },

    post(formData) {
        return axiosClient.post("/flights", formData)
            .catch((error) => {
                console.log(error);
            })
    },

    update(data, id) {
        return axiosClient.put(`/flights/${id}`, data)
            .catch(error => {
                console.log(error);
            });
    },

    delete(id) {
        return axiosClient.delete(`/flights/${id}`)
            .catch((error) => {
                console.log(error);
            })
    },


}
