import React, {useEffect, useState} from 'react';

import {NavLink} from "react-router-dom";
import MuscleGroupRepository from "../../repository/MuscleGroupRepository.jsx";
import CompletedExerciseRepository from "../../repository/CompletedExerciseRepository.jsx";
import MyCalendar from "../../components/MyCalendar.jsx";
import Table from "../../components/Table.jsx";
import Pagination from "../../components/Pagination.jsx";

function Results() {

    const [muscleGroup, setMuscleGroup] = useState([]);
    const [typeCalendar, setTypeCalendar] = useState("default");
    const [date, setDate] = useState(null);
    const [completedExercises, setCompletedExercises] = useState([]);
    const [page, setPage] = useState(1);
    const [muscleGroupSelector, setMuscleGroupSelector] = useState("default");
    const [flag, setFlag] = useState(null);

    useEffect(() => {
        MuscleGroupRepository.get(setMuscleGroup);
    }, []);

    useEffect(() => {
        let queryParams = [];
        if (muscleGroupSelector !== "default") {
            queryParams["group_of_muscles"] = muscleGroupSelector;
        }
        if (date?.length > 1) {
            let date1 = date[0].toLocaleDateString();
            let date2 = date[1].toLocaleDateString();
            queryParams["date"] = date1 + "," + date2;
        } else if (date !=  null) {
            queryParams["date"] = date.toLocaleDateString();
        }
        queryParams["current_page"] = page;
        CompletedExerciseRepository.get(setCompletedExercises, queryParams);
        setFlag(null);
    }, [page, date, muscleGroupSelector, flag]);

    return (
        <div className="d-flex justify-content-around mt-4">
            <div>
                <div className="d-flex mb-4 justify-content-around">
                    <div>
                        <label htmlFor="calendar" className="form-label">Select calendar mode: </label>
                        <select className="form-select form-select-md mb-3"
                                value={typeCalendar} id="calendar"
                                onChange={event => setTypeCalendar(event.target.value)}>
                            <option value="default">default</option>
                            <option value="dateRange">date range</option>
                        </select>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={(event) => {
                            event.preventDefault();
                            setDate(null);
                        }}>Set date null</button>
                        <NavLink className="btn btn-primary ms-2" to="/results/createCompletedExercise" >Create</NavLink>
                    </div>
                </div>
                <MyCalendar type={typeCalendar} date={date} setDate={setDate}/>
            </div>
            <div>
                <div className="mb-4">
                    <label htmlFor="muscleGroup" className="form-label">Select group of muscles for sorting: </label>
                    <select className="form-select form-select-md mb-3" id="muscleGroup"
                        value={muscleGroupSelector}
                        onChange={event => setMuscleGroupSelector(event.target.value)}>
                        <option value="default">default</option>
                        {muscleGroup.map((element) => {
                            return <option key={element.id} value={element.id}
                            >{element["muscle_group"]}</option>
                        })}
                    </select>
                </div>
                <div>
                    <Table headers={["#", "Exercise name",  "Muscle group", "Date",
                        "Numb approaches", "Avg nmbr repetitions", "Delete"]}
                           completedExercises={completedExercises}
                           setCompletedExercises={setCompletedExercises}
                           setFlag={setFlag}
                    />
                    <Pagination setPage={setPage} pageCount={completedExercises.last_page} />
                </div>
            </div>
        </div>
    );
}

export default Results;
