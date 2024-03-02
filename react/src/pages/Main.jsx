import Carousel from "../components/Carousel.jsx";
import {useEffect, useState} from "react";
import ProgramsRepository from "../repository/FlightsRepository.jsx";
import LoadingSpinner from "../components/LoaderSpinner.jsx";

function Main() {

    const [latestPrograms, setLatestPrograms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        ProgramsRepository.getLastThreeRecords()
            .then(response => {
                setLatestPrograms(response.data.data);
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
                <div className="d-flex justify-content-center mt-5">
                    <Carousel programs={latestPrograms} isLoading={isLoading}/>
                </div>
            }
        </>
    );
}

export default Main;
