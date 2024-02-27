import axiosClient from "../axios-client.js";

export default {
    get(callback, queryParams) {
        return axiosClient.get("/completedExercises", {
            params: {
                current_page: queryParams?.current_page,
                per_page: queryParams?.per_page ?? 6,
                group_of_muscles: queryParams?.group_of_muscles ?? null,
                date: queryParams?.date ?? null,
                name_exercise: queryParams?.name_exercise ?? null,
            }
        })
            .then((response) => {
                callback(response.data.data);
            })
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    },

    post(data) {
        return axiosClient.post("/completedExercises", data)
            .catch((error) => {
                console.log(error);
            })
    },

    delete(id) {
        return axiosClient.delete(`/completedExercises/${id}`)
            .catch((error) => {
                console.log(error);
            })
    },


}
