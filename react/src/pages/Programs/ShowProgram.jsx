import {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import LoadingSpinner from "../../components/LoaderSpinner.jsx";
import ProgramsRepository from "../../repository/ProgramsRepository.jsx";

function ShowProgram() {
    const [program, setProgram] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const {id} = useParams();

    useEffect(() => {
        ProgramsRepository.getProgram(id)
            .then(response => {
                setProgram(response.data);
                setIsLoading(false);
            })
    }, []);

    return (
        <>
            {isLoading ?
                <div className="mt-4 text-center" style={isLoading ? null : {visibility: "hidden"}}>
                    <LoadingSpinner/>
                </div>
                :
                <div>
                    <div className="container m-4 w-100 d-flex justify-content-around">
                        <div className="w-25">
                            <img src={import.meta.env.VITE_API_URL + "/storage/images/" + program.image}
                                 className="img-thumbnail" alt="..." />
                        </div>
                        <div className="ms-3 w-75">
                            <div className="card">
                                <div className="card-header">
                                    {program.header}
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{program.description}</p>
                                    <p className="card-text">
                                        Features:
                                        <ul>
                                            {program.features.map((feature => {
                                                return <li>{feature.name}</li>
                                            }))}
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-start flex-wrap">
                        {program.exercises.map(exercise => {
                            return (
                                <NavLink className="w-25" to={`/exercises/${exercise.id}`}>
                                    <div className="card m-3">
                                            <div className="card-header">
                                                {exercise.name}
                                            </div>
                                            <div className="card-body">
                                                {exercise.images.map(image => {
                                                    return <img src={import.meta.env.VITE_API_URL + "/storage/images/" + image.img_name}
                                                                className="img-thumbnail" alt="..." />
                                                })
                                                }
                                            </div>
                                    </div>
                                </NavLink>
                            )
                            }
                            )}
                    </div>
                </div>
            }
        </>
    );
}

export default ShowProgram;
