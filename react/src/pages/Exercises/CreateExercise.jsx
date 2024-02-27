import {useEffect, useRef, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import MuscleGroup from "../../repository/MuscleGroupRepository.jsx";
import ExerciseRepository from "../../repository/ExerciseRepository.jsx";
import {useStateContext} from "../../context/contextProvider.jsx";

function CreateExercise() {

    const {role} = useStateContext();

    if (role === "user") {
        return <Navigate to="/" />
    }

    const [muscles, setMuscles] = useState([]);
    const nameRef = useRef();
    const muscleRef = useRef();
    const mainImageRef = useRef();
    const imageRef = useRef();
    const descriptionRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        MuscleGroup.get(setMuscles);
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        const muscleGroup = muscleRef.current.value;
        if (muscleGroup === "default") {
            alert("You forgot about group of muscles. Plz choose thms");
            return
        }
        const formData = new FormData();
        formData.append("name", nameRef.current.value);
        formData.append("muscle_id", muscleGroup);
        formData.append("main_image", mainImageRef.current.files[0]);
        const images = Object.values(imageRef.current.files);
        images.forEach(element => formData.append("images[]", element));
        formData.append("description", descriptionRef.current.value);
        ExerciseRepository.post(formData)
        .then(() => {
            navigate("/exercises");
        })
    }

    return (
        <div className="container mt-5 mb-5 w-50">
            <div className="card p-4 bg-light">
                <form onSubmit={onSubmit}>
                    <h4 className="text-center">Create Exercise</h4>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input ref={nameRef} type="text" className="form-control" id="name" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="group" className="form-label">Choose a muscle group: </label>
                        <select ref={muscleRef} defaultValue="default" className="form-select form-select-md mb-3" id="group">
                            <option value="default">Choose group of muscles</option>
                            {muscles.map((element) => {
                                return <option key={element.id} value={element.id}
                                >{element["muscle_group"]}</option>
                            })}
                        </select>
                    </div>
                    <div className="input-group mb-4">
                        <label className="input-group-text" htmlFor="mainInputImage">Main image</label>
                        <input ref={mainImageRef} type="file" className="form-control"
                               id="mainInputImage" required/>
                    </div>
                    <div className="input-group mb-4">
                        <label className="input-group-text" htmlFor="inputImage">Images</label>
                        <input ref={imageRef} type="file" className="form-control"
                               id="inputImage" multiple required/>
                    </div>

                    <div className="form-floating mb-3">
                        <textarea ref={descriptionRef} className="form-control" placeholder="Leave a description here" id="description"
                                  style={{height: "100px"}}></textarea>
                        <label htmlFor="description">Description</label>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateExercise;
