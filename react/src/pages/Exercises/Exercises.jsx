import Searchbar from "../../components/Searchbar.jsx";
import {useEffect, useRef, useState} from "react";
import ExerciseRepository from "../../repository/ExerciseRepository.jsx";
import LoadingSpinner from "../../components/LoaderSpinner";
import MuscleGroupRepository from "../../repository/MuscleGroupRepository.jsx";
import {NavLink} from "react-router-dom";
import Dropdown from "../../components/Dropdown.jsx";
import {useStateContext} from "../../context/contextProvider.jsx";

function Exercises() {

    const {role} = useStateContext();


    const [muscles, setMuscles] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [isExistNewExercise, setExistNewExercise] = useState(true);
    const selectRef = useRef();
    const [searchField, setSearchField] = useState("");
    const [searchButton, setSearchButton] = useState(0);
    const  fetchData = () => {
        if (!isExistNewExercise) {
            return
        }
        let queryParams = [];
        if (selectRef.current.value !== "default") {
            queryParams['group_of_muscles'] = selectRef.current.value;
        }
        queryParams['search'] = searchField;
        queryParams['page'] = page;
        queryParams['per_page'] = 9;
        setIsLoading(true);
        ExerciseRepository.get(queryParams)
            .then((response) => {
                if (response.data.last_page === page) {
                    setExistNewExercise(false);
                }
                setExercises(prev => [...prev, ...response.data.data]);
                setIsLoading(false);
        })
    }

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) + 1 > document.body.offsetHeight) {
            setPage(prevState => prevState + 1);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, searchButton]);

    const clickSearchButton = (event) => {
        event.preventDefault();
        setSearchButton(prevState => prevState + 1);
        setPage(1);
        setExercises([]);
        setExistNewExercise(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        MuscleGroupRepository.get(setMuscles)
    }, []);

    return (
        <>
            <Searchbar
                urlCreateLink="/exercises/create" nameLink="Create exercise"
                withSelect={true} value={searchField} setSearchField={setSearchField}
                selectRef={selectRef} muscles={muscles} clickSearchButton={clickSearchButton}/>
            <div className="container mt-5">
                <div className="p-2 me-3 w-100 d-flex justify-content-start flex-wrap">
                    {
                        exercises.map((exercise) => {
                            return (
                                <div key={exercise.id} className="card m-3" style={{width: "30%"}}>
                                    <img src={import.meta.env.VITE_API_URL + "/storage/images/" + exercise.main_image}
                                         className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{exercise.name}</h5>
                                        <p className="card-text">
                                            {
                                                exercise.description.length > 30 ?
                                                    exercise.description.substring(0, 30) + '...' : exercise.description
                                            }
                                        </p>
                                        <p className="card-text">
                                            Group of muscles: {exercise.muscle_group.muscle_group}
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <NavLink to={`/exercises/${exercise.id}`} className="btn btn-primary">Open exercise</NavLink>
                                            </div>
                                            {role === "admin" ?
                                                <Dropdown
                                                    path={"/exercises/update/" + exercise.id}
                                                    setData={setExercises}
                                                    Repository={ExerciseRepository}
                                                    id={exercise.id}
                                                />
                                            :
                                                <></>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="text-center" style={isLoading ? null : {visibility: "hidden"}}>
                <LoadingSpinner />
            </div>
        </>
    );
}

export default Exercises;
