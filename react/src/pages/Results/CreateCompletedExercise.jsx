import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import MuscleGroupRepository from "../../repository/MuscleGroupRepository.jsx";
import MyCalendar from "../../components/MyCalendar.jsx";
import CompletedExerciseRepository from "../../repository/CompletedExerciseRepository.jsx";

function CreateCompletedExercise() {

    const [muscleGroup, setMuscleGroup] = useState([]);
    const [date, setDate] = useState(null);
    const exerciseRef = useRef();
    const muscleGroupRef = useRef();
    const approachesRef = useRef();
    const avgRef = useRef();
    const navigate = useNavigate();


    useEffect(() => {
        MuscleGroupRepository.get(setMuscleGroup);
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            name_exercise : exerciseRef.current.value,
            number_of_approaches: approachesRef.current.value,
            avg_number_of_repetitions: avgRef.current.value
        }
        if (date === null) {
            alert("Plz choose date");
            return
        }
        payload.date_of_completion = date.toLocaleDateString();
        if (muscleGroupRef.current.value === "default") {
            alert("Plz choose muscle group");
            return
        }
        payload.muscle_group_id = muscleGroupRef.current.value;
        CompletedExerciseRepository.post(payload)
            .then(() => {
                navigate("/results");
            })
    }

    return (
        <div className="container mt-5 mb-5" style={{width: "35%"}}>
            <div className="card p-3 bg-light">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exercise_name" className="form-label">Exercise name: </label>
                        <input ref={exerciseRef} type="text" className="form-control" id="exercise_name" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="muscleGroup" className="form-label">Select group of muscles for sorting: </label>
                        <select className="form-select form-select-md mb-3" id="muscleGroup"
                        defaultValue="default" ref={muscleGroupRef}>
                            <option value="default">default</option>
                            {muscleGroup.map((element) => {
                                return <option key={element.id} value={element.id}
                                >{element["muscle_group"]}</option>
                            })}
                        </select>
                    </div>
                    <div className="mb-4">
                        <MyCalendar date={date} setDate={setDate}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="number_of_approaches" className="form-label">Number of approaches: </label>
                        <input ref={approachesRef} type="number" className="form-control" id="number_of_approaches" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="avg_number_of_repetitions" className="form-label">Avg number of repetitions: </label>
                        <input ref={avgRef} type="text" className="form-control" id="avg_number_of_repetitions" required/>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>);
}

export default CreateCompletedExercise;
