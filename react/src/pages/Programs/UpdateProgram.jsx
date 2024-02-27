import {useEffect, useRef, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import ExerciseRepository from "../../repository/ExerciseRepository.jsx";
import ProgramsRepository from "../../repository/ProgramsRepository.jsx";
import LoadingSpinner from "../../components/LoaderSpinner.jsx";
import {useStateContext} from "../../context/contextProvider.jsx";

function UpdateProgram() {

    const {role} = useStateContext();

    if (role === "user") {
        return <Navigate to="/" />
    }

    const [exercises, setExercises] = useState([]);
    const [program, setProgram] = useState();
    const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);
    const [isLoadingExercises, setIsLoadingExercises] = useState(true);
    const headerRef = useRef();
    const featuresRef = useRef();
    const descriptionRef = useRef();
    const exerciseRef = useRef();
    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        ExerciseRepository.get()
            .then((response) => {
                setIsLoadingExercises(false);
                setExercises(response.data.data);
            });
    }, []);

    useEffect(() => {
        ProgramsRepository.getProgram(id)
            .then(response => {
                setIsLoadingPrograms(false);
                setProgram(response.data);
            })
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        const exercisesId = Array.from(exerciseRef.current.selectedOptions, option => option.value)
        if ((exercisesId[0] === "default") && exercisesId.length === 1) {
            alert("You forgot about exercises. Plz choose thms");
            return
        }
        const data = [];
        data["header"] = headerRef.current.value;
        data["description"] = descriptionRef.current.value;
        data["exercises"] = [];
        exercisesId.forEach(exercise => data["exercises"].push(exercise));
        const arrayFeatures = (featuresRef.current.value).split(",");
        data["features"] = [];
        arrayFeatures.forEach(feature => data["features"].push(feature.trim()));
        ProgramsRepository.update(data, id)
            .then(() => {
                navigate("/programs");
            })
    }

    return (
        <>
            {isLoadingPrograms || isLoadingExercises ?
                <div className="mt-4 text-center">
                    <LoadingSpinner />
                </div>
                :
                <div className="container mt-5 mb-5 w-50">
                    <div className="card p-4 bg-light">
                        <form onSubmit={onSubmit}>
                            <h4 className="text-center">Update Program</h4>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Header :</label>
                                <input defaultValue={program.header} ref={headerRef} type="text" className="form-control" id="header" required/>
                            </div>
                            <div className="form-floating mb-3">
                        <textarea ref={descriptionRef} defaultValue={program.description} className="form-control" placeholder="Leave a description here" id="description"
                                  style={{height: "100px"}}></textarea>
                                <label htmlFor="description">Description</label>
                            </div>
                            <select ref={exerciseRef}
                                    className="form-select form-select-md mb-3"
                                    defaultValue={Array.from(program.exercises, x => x.id)}
                                    multiple id="exercise">
                                { exercises.map(item => {
                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                    }
                                )}
                            </select>
                            <div className="input-group mb-4">
                                <label htmlFor="features">Add features separated comma!</label>
                            </div>
                            <div className="form-floating mb-3">
                        <textarea ref={featuresRef} className="form-control" placeholder="Leave a description here" id="features"
                                  style={{height: "100px"}}
                                  defaultValue={
                                      program.features.map(feature => {
                                          return feature.name
                                      })
                                  }></textarea>
                                <label htmlFor="features">Features</label>
                            </div>
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

export default UpdateProgram;
