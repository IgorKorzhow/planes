import axiosClient from "../axios-client.js";

export default {
    get(queryParams) {
        return axiosClient.get(`/programs`, {
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

    getProgram(id) {
        return axiosClient.get(`/programs/${id}`)
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    },

    getLastThreeRecords() {
        return axiosClient.get(`/programs`, {
            params: {
                per_page: 3,
                last: true
            }
        })
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    },

    post(formData) {
        return axiosClient.post("/programs", formData)
            .catch((error) => {
                console.log(error);
            })
    },

    update(data, id) {
        return axiosClient.patch(`/programs/${id}`, {
            header:  data["header"],
            description: data["description"],
            features: data["features"],
            exercises: data["exercises"]
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    },

    delete(id) {
        return axiosClient.delete(`/programs/${id}`)
            .catch((error) => {
                console.log(error);
            })
    },


}
