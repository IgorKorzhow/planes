import {useEffect, useRef, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useStateContext} from "../../context/contextProvider.jsx";
import FirmRepository from "../../repository/FirmRepository.jsx";
import PlaneRepository from "../../repository/PlaneRepository.jsx";
import LoadingSpinner from "../../components/LoaderSpinner.jsx";

function UpdatePlane() {

    const {role} = useStateContext();

    if (role === "user") {
        return <Navigate to="/" />
    }
    const [isLoadingFirms, setIsLoadingFirms] = useState(true);
    const [isLoadingPlane, setIsLoadingPlane] = useState(true);
    const [firms, setFirms] = useState([]);
    const [plane, setPlane] = useState();
    const navigate = useNavigate();
    const modelRef = useRef();
    const creationDateRef = useRef();
    const serialNumberRef = useRef();
    const basicPlacesRef = useRef();
    const premiumPlacesRef = useRef();
    const firmRef = useRef();
    const {id} = useParams();

    useEffect(() => {
        FirmRepository.getAll()
            .then((response) => {
                setFirms(response.data);
                setIsLoadingFirms(false);
            });
        PlaneRepository.getById(id)
            .then(response => {
                setPlane(response.data.plane);
                setIsLoadingPlane(false)
            })
    }, []);

    const onSubmit = (event) => {
        if (firmRef.current.value === 'default') {
            alert('Выберите фирму');
            return;
        }

        const data = {
            model: modelRef.current.value,
            creation_date: creationDateRef.current.value,
            serial_number: serialNumberRef.current.value,
            basic_seats_number: basicPlacesRef.current.value,
            premium_seats_number: premiumPlacesRef.current.value,
            firm_id: firmRef.current.value
        }

        PlaneRepository.update(data, id)
            .then(() => {
                navigate("/planes");
            })
        event.preventDefault();
    }

    return (
        <>
            {isLoadingPlane || isLoadingFirms ?
                <div className="mt-4 text-center">
                    <LoadingSpinner/>
                </div>
                :
                <div className="container mt-5 mb-5 w-50">
                    <div className="card p-4 bg-light">
                        <form onSubmit={onSubmit}>
                            <h4 className="text-center">Создать самолет</h4>
                            <select ref={firmRef} defaultValue={plane.firm_id}
                                    className="form-select form-select-md mb-3"
                                    id="plane">
                                <option value="desfault">Выберните фирму</option>
                                {firms.map((element) => {
                                    return <option key={element.id} value={element.id}
                                    >{element.name}</option>
                                })}
                            </select>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Модель :</label>
                                <input ref={modelRef} defaultValue={plane.model} type="text" className="form-control"
                                       required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Серийный номер :</label>
                                <input ref={serialNumberRef} defaultValue={plane.serial_number} type="number"
                                       className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Кол-во базовых мест :</label>
                                <input ref={basicPlacesRef} type="number" defaultValue={plane.basic_seats_number}
                                       className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Дата создания :</label>
                                <input ref={creationDateRef} type="date" defaultValue={plane.creation_date}
                                       className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Кол-во премиум мест :</label>
                                <input ref={premiumPlacesRef} type="number" defaultValue={plane.premium_seats_number}
                                       className="form-control" required/>
                            </div>
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

export default UpdatePlane;
