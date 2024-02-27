import {useEffect, useState} from "react";
import ExerciseRepository from "../../repository/ExerciseRepository.jsx";
import {useParams} from "react-router-dom";
import LoadingSpinner from "../../components/LoaderSpinner.jsx";

function ShowExercise() {

    const [exercise, setExercise] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const {id} = useParams();

    useEffect(() => {
        ExerciseRepository.getExercise(id)
            .then(response => {
                setExercise(response.data);
                setIsLoading(false);
            })
    }, []);

    return (
        <>
            {isLoading ?
                <div className="mt-4 text-center" style={isLoading ? null : {visibility: "hidden"}}>
                    <LoadingSpinner />
                </div>
                :
                <div className="container m-4 w-100 d-flex justify-content-around">
                    <div className="w-25">
                        <img src={import.meta.env.VITE_API_URL + "/storage/images/" + exercise.main_image}
                             className="img-thumbnail" alt="..." />
                        {exercise?.images?.map((image) => {
                            return (
                                <div>
                                    <img src={import.meta.env.VITE_API_URL + "/storage/images/" + image.img_name}
                                         className="img-thumbnail" alt="..." />
                                </div>)
                        })}
                    </div>
                    <div className="ms-3 w-75">
                        <div className="card">
                            <div className="card-header">
                                {exercise.name}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Group of muscles : {exercise?.muscle_group?.muscle_group}</h5>
                                <p className="card-text">{exercise.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ShowExercise;
