import {useEffect, useRef, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import ExerciseRepository from "../../repository/ExerciseRepository.jsx";
import ProgramsRepository from "../../repository/ProgramsRepository.jsx";
import {useStateContext} from "../../context/contextProvider.jsx";

function CreateProgram() {

    const {role} = useStateContext();

    if (role === "user") {
        return <Navigate to="/" />
    }

    const [exercises, setExercises] = useState([]);
    const headerRef = useRef();
    const featuresRef = useRef();
    const descriptionRef = useRef();
    const exerciseRef = useRef();
    const imageRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        ExerciseRepository.get()
            .then((response) => {
                setExercises(response.data.data);
            });
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        const exercisesId = Array.from(exerciseRef.current.selectedOptions, option => option.value)
        if ((exercisesId[0] === "default") && exercisesId.length === 1) {
            alert("You forgot about exercises. Plz choose thms");
            return
        }
        const formData = new FormData();
        formData.append("header", headerRef.current.value);
        formData.append("description", descriptionRef.current.value);
        formData.append("image", imageRef.current.files[0]);
        exercisesId.forEach(exercise => formData.append("exercises[]", exercise));
        const arrayFeatures = (featuresRef.current.value).split(",");
        arrayFeatures.forEach(feature => formData.append("features[]", feature.trim()))
        ProgramsRepository.post(formData)
            .then(() => {
                navigate("/programs");
            })
    }

    return (
        <div className="container mt-5 mb-5 w-50">
            <div className="card p-4 bg-light">
                <form onSubmit={onSubmit}>
                    <h4 className="text-center">Create Program</h4>
                    <div className="mb-3">
                        <label htmlFor="header" className="form-label">Header :</label>
                        <input ref={headerRef} type="text" className="form-control" id="header" required/>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea ref={descriptionRef} className="form-control" placeholder="Leave a description here" id="description"
                                  style={{height: "100px"}}></textarea>
                        <label htmlFor="description">Description</label>
                    </div>
                    <div className="input-group mb-4">
                        <label className="input-group-text" htmlFor="image">Image</label>
                        <input ref={imageRef} type="file" className="form-control"
                               id="image" required/>
                    </div>
                    <select ref={exerciseRef} defaultValue={["default"]} className="form-select form-select-md mb-3"
                            multiple id="exercise">
                        <option value="default">Choose exercise</option>
                        {exercises.map((element) => {
                            return <option key={element.id} value={element.id}
                            >{element.name}</option>
                        })}
                    </select>
                    <div className="input-group mb-4">
                        <label htmlFor="features">Add features separated comma!</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea ref={featuresRef} className="form-control" placeholder="Leave a description here" id="features"
                                  style={{height: "100px"}}></textarea>
                        <label htmlFor="features">Features</label>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProgram;
