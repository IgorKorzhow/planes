import {useEffect, useRef, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import LoadingSpinner from "../../components/LoaderSpinner.jsx";
import {useStateContext} from "../../context/contextProvider.jsx";
import FlightsRepository from "../../repository/FlightsRepository.jsx";
import PlaneRepository from "../../repository/PlaneRepository.jsx";

function UpdateFlight() {

    const {role} = useStateContext();

    if (role === "user") {
        return <Navigate to="/" />
    }

    const [isLoadingPlanes, setIsLoadingPlanes] = useState(true);
    const [isLoadingFlight, setIsLoadingFlight] = useState(true);
    const [flight, setFlight] = useState();
    const [planes, setPlanes] = useState([]);
    const depurtureRef = useRef();
    const arrivalRef = useRef();
    const depurtureDateRef = useRef();
    const  arrivalDateRef = useRef();
    const basicPlacePriceRef = useRef();
    const premiumPlacePriceRef = useRef();
    const planeRef = useRef();
    const statusRef = useRef();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        PlaneRepository.getAll()
            .then((response) => {
                setIsLoadingPlanes(false);
                setPlanes(response.data.data);
            });
    }, []);

    useEffect(() => {
        FlightsRepository.getFlight(id)
            .then(response => {
                setIsLoadingFlight(false);

                const flight = response.data;
                flight.arrival_date_time = new Date(flight.arrival_date_time).toISOString().slice(0, 16);
                flight.departure_date_time = new Date(flight.departure_date_time).toISOString().slice(0, 16);

                setFlight(flight);
            })
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        if (planeRef.current.value === 'default') {
            alert("Вы забыли о сомлете. Пожалуйста выберите его");
            return
        }
        if (statusRef.current.value === 'default') {
            alert("Вы забыли о статусе. Пожалуйста выберите его");
            return
        }
        FlightsRepository.update({
            plane_id: planeRef.current.value,
            departure_city: depurtureRef.current.value,
            arrival_city: arrivalRef.current.value,
            departure_date_time: depurtureDateRef.current.value,
            arrival_date_time: arrivalDateRef.current.value,
            ticket_price_basic_place: basicPlacePriceRef.current.value,
            ticket_price_premium_place: premiumPlacePriceRef.current.value,
            status: statusRef.current.value
        }, id)
            .then(() => {
                navigate("/");
            })
    }

    return (
        <>
            {isLoadingFlight || isLoadingPlanes ?
                <div className="mt-4 text-center">
                    <LoadingSpinner/>
                </div>
                :
                <div className="container mt-5 mb-5 w-50">
                    <div className="card p-4 bg-light">
                        <form onSubmit={onSubmit}>
                            <h4 className="text-center">Обновить рейс</h4>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Город отправления :</label>
                                <input ref={depurtureRef} type="text" defaultValue={flight.departure_city} className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Город прибытия :</label>
                                <input ref={arrivalRef} type="text" defaultValue={flight.arrival_city} className="form-control" required/>
                            </div>
                            <select ref={planeRef} defaultValue={flight.plane_id} className="form-select form-select-md mb-3"
                                    id="plane">
                                <option value="default">Выберните самолет</option>
                                {planes.map((element) => {
                                    return <option key={element.id} value={element.id}
                                                   selected={element.id === flight.plane_id}
                                    >Серийный номер: {element.serial_number}, Модель: {element.model}</option>
                                })}
                            </select>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Дата и время отправления:</label>
                                <input ref={depurtureDateRef} type="datetime-local" defaultValue={flight.departure_date_time} className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Дата и время прибытия:</label>
                                <input ref={arrivalDateRef} type="datetime-local" defaultValue={flight.arrival_date_time} className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Цена за базовое место:</label>
                                <input ref={basicPlacePriceRef} type="number" defaultValue={flight.ticket_price_basic_place} className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Цена за премиум место:</label>
                                <input ref={premiumPlacePriceRef} type="number" defaultValue={flight.ticket_price_premium_place} className="form-control" required/>
                            </div>
                            <select ref={statusRef} defaultValue={flight.status} className="form-select form-select-md mb-3"
                                    id="plane">
                                <option value="default">Выберите статус</option>
                                {['history', 'cancelled', 'upcoming'].map((element, index) => {
                                    return <option key={index} value={element}
                                    >{element}</option>
                                })}
                            </select>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-outline-primary">Обновить</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}

export default UpdateFlight;
