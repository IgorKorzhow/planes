import Searchbar from "../../components/Searchbar.jsx";
import {useEffect, useState} from "react";
import LoadingSpinner from "../../components/LoaderSpinner";
import {useStateContext} from "../../context/contextProvider.jsx";
import FlightsRepository from "../../repository/FlightsRepository.jsx";
import Dropdown from "../../components/Dropdown.jsx";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PlaceRepository from "../../repository/PlaceRepository.jsx";
import TicketRepository from "../../repository/TicketRepository.jsx";
import PlaneRepository from "../../repository/PlaneRepository.jsx";


function Flights() {

    const {role} = useStateContext();

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [isExistNewPlane, setExistNewPlane] = useState(true);
    const [searchField, setSearchField] = useState("");
    const [searchButton, setSearchButton] = useState(0);

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
                    setExistNewFlights(false);
                }
                setFlights(prev => [...prev, ...response.data.data]);
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
        setFlights([]);
        setExistNewFlights(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleOrderTicket = () => {
        if (!selectedPlace) {
            alert('Выберите место');
        }

        TicketRepository.buyTicket(selectedPlace.id, selectedFlight.id)
            .then(handleClose)
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Покупка билета</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="card-title">Из: {selectedFlight?.departure_city}</h5>
                    <h5 className="card-title">В: {selectedFlight?.arrival_city}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Дата
                        отправления {selectedFlight?.departure_date_time}</h6>
                    <p className="card-text">Цена за базовое
                        место: {selectedFlight?.ticket_price_basic_place} р.</p>
                    <p className="card-text">Цена за премиум
                        место: {selectedFlight?.ticket_price_premium_place} р.</p>
                    <div className="btn-group me-2" role="group" aria-label="First group">
                        {availablePlaces?.basic?.map((place) => {
                            return (
                                <button type="button"
                                        key={place.id}
                                        className={
                                            `btn ${selectedPlace?.id === place.id ? 'btn-secondary' : 'btn-outline-secondary'}`
                                        }
                                        onClick={() => handleSelectPlace(place)}
                                >
                                    {place.number}
                                </button>
                            )
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleOrderTicket}>
                        Купить
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>

            <Searchbar
                urlCreateLink="/flights/create" nameLink="Создать рейс"
                withSelect={false} value={searchField} setSearchField={setSearchField}
                clickSearchButton={clickSearchButton}/>
            <div className="container mt-5">
                <div className="p-2 me-3 w-100 d-flex justify-content-start flex-wrap">
                    {
                        flights.map((flight) => {
                            return (
                                <div className="card m-3" style={{width: 22 + '%'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">Из: {flight.departure_city}</h5>
                                        <h5 className="card-title">В: {flight.arrival_city}</h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">Дата
                                            отправления {flight.departure_date_time}</h6>
                                        <p className="card-text">Цена за базовое
                                            место: {flight.ticket_price_basic_place}</p>
                                        <p className="card-text">Цена за премиум
                                            место: {flight.ticket_price_premium_place}</p>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <Button variant="primary" onClick={() => handleShow(flight)}>
                                                    Заказать
                                                </Button>
                                            </div>
                                            {
                                                role === "admin" ?
                                                    <Dropdown
                                                        path={"/flights/update/" + flight.id}
                                                        setData={setFlights}
                                                        Repository={FlightsRepository}
                                                        id={flight.id}
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
                <LoadingSpinner/>
            </div>
        </>
    );
}

export default Flights;
