import {useEffect, useRef, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import ExerciseRepository from "../../repository/ExerciseRepository.jsx";
import LoadingSpinner from "../../components/LoaderSpinner.jsx";
import MuscleGroupRepository from "../../repository/MuscleGroupRepository.jsx";
import {useStateContext} from "../../context/contextProvider.jsx";

function UpdateExercise() {

    const {role} = useStateContext();

    if (role === "user") {
        return <Navigate to="/" />
    }

    const [exercise, setExercise] = useState();
    const [muscleGroup, setMuscleGroup] = useState();
    const [isLoadingExercises, setIsLoadingExercises] = useState(true);
    const [isLoadingMuscleGroup, setIsLoadingMuscleGroup] = useState(true);
    const nameRef = useRef();
    const descriptionRef = useRef();
    const muscleGroupRef = useRef();
    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        ExerciseRepository.getExercise(id)
            .then((response) => {
                setIsLoadingExercises(false);
                setExercise(response.data);
            });
    }, []);

    useEffect(() => {
        MuscleGroupRepository.get(setMuscleGroup)
            .then(() => {
                setIsLoadingMuscleGroup(false);
            })
    }, []);


    const onSubmit = (event) => {
        event.preventDefault();
        const data = [];
        data["name"] = nameRef.current.value;
        data["description"] = descriptionRef.current.value;
        data["muscle_id"] = muscleGroupRef.current.value;
        ExerciseRepository.update(data, id)
            .then(() => {
                navigate("/exercises");
            })
    }

    return (
        <>
            { isLoadingExercises || isLoadingMuscleGroup ?
                <div className="mt-4 text-center">
                    <LoadingSpinner />
                </div>
                :
                <div className="container mt-5 mb-5 w-50">
                    <div className="card p-4 bg-light">
                        <form onSubmit={onSubmit}>
                            <h4 className="text-center">Update Exercise</h4>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name :</label>
                                <input defaultValue={exercise.name} ref={nameRef} type="text" className="form-control" id="name" required/>
                            </div>
                            <div className="form-floating mb-3">
                        <textarea ref={descriptionRef} defaultValue={exercise.description} className="form-control" placeholder="Leave a description here" id="description"
                                  style={{height: "100px"}}></textarea>
                                <label htmlFor="description">Description</label>
                            </div>
                            <select ref={muscleGroupRef}
                                    className="form-select form-select-md mb-3"
                                    defaultValue={exercise.muscle_id}
                                    id="muscle-group">
                                { muscleGroup.map(item => {
                                        return <option key={item.id} value={item.id}>{item.muscle_group}</option>
                                    }
                                )}
                            </select>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-outline-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}

export default UpdateExercise;
