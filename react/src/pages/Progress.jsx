import React, {useEffect, useState} from "react";
import MyChart from "../components/MyChart.jsx";
import CompletedExerciseRepository from "../repository/CompletedExerciseRepository.jsx";

function Progress() {

    const [exercise, setExercise] = useState("");
    const [sortedData, setSortedData] = useState();

    useEffect(() => {
        if (exercise === "") {
            return
        }
        let queryParams = {};
        queryParams.name_exercise = exercise;
        queryParams.per_page = 1000;
        let date1 = (new Date()).getFullYear() + "/1/1";
        let date2 = (new Date()).getFullYear() + "/12/31";
        queryParams["date"] = date1 + "," + date2;

        CompletedExerciseRepository.get(setSortedData, queryParams);
    },[exercise]);

    return (
        <div className="container mt-3">
            <div className="mb-3">
                <label htmlFor="exercise_name" className="form-label">Exercise name: </label>
                <input onChange={(event) => setExercise(event.target.value)}
                       value={exercise} type="text" className="form-control" id="exercise_name"/>
            </div>
            <MyChart data={sortedData?.data} />
        </div>
    );
}

export default Progress;
