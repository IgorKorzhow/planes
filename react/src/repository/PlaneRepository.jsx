import axiosClient from "../axios-client.js";

export default {
    getAll() {
        return axiosClient.get(`/planes`)
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    },


    get(queryParams) {
        return axiosClient.get(`/planes`, {
            params: {
                page: queryParams['page'],
                search: queryParams['search'],
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

    getById(id) {
        return axiosClient.get(`/planes/${id}`)
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    },

    post(formData) {
        return axiosClient.post("/planes", formData)
            .catch((error) => {
                console.log(error);
            })
    },

    update(data, id) {
        return axiosClient.put(`/planes/${id}`, data)
            .catch(error => {
                console.log(error);
            });
    },

    createService(data) {
        return axiosClient.post('planes/services', data)
            .catch(error => {
                console.log(error);
            });
    },

    delete(id) {
        return axiosClient.delete(`/planes/${id}`)
            .catch((error) => {
                console.log(error);
            })
    },


}
