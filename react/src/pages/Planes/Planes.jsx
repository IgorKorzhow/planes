import Searchbar from "../../components/Searchbar.jsx";
import {useEffect, useState} from "react";
import LoadingSpinner from "../../components/LoaderSpinner";
import {useStateContext} from "../../context/contextProvider.jsx";
import PlaneRepository from "../../repository/PlaneRepository.jsx";
import Dropdown from "../../components/Dropdown.jsx";


function Flights() {

    const {role, token} = useStateContext();

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [isExistNewPlane, setIsExistingNewPlane] = useState(true);
    const [searchField, setSearchField] = useState("");
    const [searchButton, setSearchButton] = useState(0);
    const [planes, setPlanes] = useState([]);

    const fetchData = () => {
        if (!isExistNewPlane) {
            return
        }
        let queryParams = [];
        queryParams['search'] = searchField;
        queryParams['page'] = page;
        setIsLoading(true);
        PlaneRepository.get(queryParams)
            .then((response) => {
                if (response.data.last_page === page) {
                    setIsExistingNewPlane(false);
                }
                setPlanes(prev => [...prev, ...response.data.data]);
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
        setPlanes([]);
        setIsExistingNewPlane(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Searchbar
                urlCreateLink="/planes/create" nameLink="Создать самолет"
                withSelect={false} value={searchField} setSearchField={setSearchField}
                clickSearchButton={clickSearchButton}/>
            <div className="container mt-5">
                <div className="p-2 me-3 w-100 d-flex justify-content-start flex-wrap">
                    {
                        planes.map((plane) => {
                            return (
                                <div key={plane.id} className="card m-2" style={{width: 23.5 + '%'}}>
                                    <img src={'http://localhost:8000/' + plane.img_url} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h6 className="card-title">Фирма {plane.firm.name}</h6>
                                            <h6 className="card-title">Модель {plane.model}</h6>
                                            <p>Серийный номер {plane.serial_number}</p>
                                            <p>Число базовых сидений {plane.basic_seats_number}</p>
                                            <p>Число премиумных сидений {plane.premium_seats_number}</p>
                                            {
                                                role === "admin" &&  token ?
                                                    <Dropdown
                                                        path={"/planes/update/" + plane.id}
                                                        setData={setPlanes}
                                                        Repository={PlaneRepository}
                                                        id={plane.id}
                                                    />
                                                    :
                                                    <></>
                                            }
                                        </div>
                                </div>
                        )
                        })
                    }
                </div>
            </div>
            <div className="text-center" style={isLoading ? null : {visibility: "hidden"}}>
                <LoadingSpinner/>
            </div>
        </>
    );
}

export default Flights;
