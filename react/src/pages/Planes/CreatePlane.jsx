import {useEffect, useRef, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useStateContext} from "../../context/contextProvider.jsx";
import FirmRepository from "../../repository/FirmRepository.jsx";
import PlaneRepository from "../../repository/PlaneRepository.jsx";

function CreateFlight() {

    const {role} = useStateContext();

    if (role === "user") {
        return <Navigate to="/" />
    }

    const [firms, setFirms] = useState([]);
    const navigate = useNavigate();
    const modelRef = useRef();
    const creationDateRef = useRef();
    const serialNumberRef = useRef();
    const basicPlacesRef = useRef();
    const premiumPlacesRef = useRef();
    const imgRef = useRef();
    const firmRef = useRef();

    useEffect(() => {
        FirmRepository.getAll()
            .then((response) => {
                setFirms(response.data);
            });
    }, []);

    const onSubmit = (event) => {
        if (firmRef.current.value === 'default') {
            alert('Выберите фирму');
            return;
        }

        const formData = new FormData();
        formData.append("model", modelRef.current.value);
        formData.append("creation_date", creationDateRef.current.value);
        formData.append("image", imgRef.current.files[0]);
        formData.append("serial_number", serialNumberRef.current.value);
        formData.append('basic_seats_number', basicPlacesRef.current.value);
        formData.append('premium_seats_number', premiumPlacesRef.current.value);
        formData.append('firm_id', firmRef.current.value);

        PlaneRepository.post(formData)
            .then(() => {
                navigate("/planes");
            })
        event.preventDefault();
    }

    return (
        <div className="container mt-5 mb-5 w-50">
            <div className="card p-4 bg-light">
                <form onSubmit={onSubmit}>
                    <h4 className="text-center">Создать самолет</h4>
                    <select ref={firmRef} defaultValue={-1} className="form-select form-select-md mb-3"
                            id="plane">
                        <option value="default">Выберните фирму</option>
                        {firms.map((element) => {
                            return <option key={element.id} value={element.id}
                            >{element.name}</option>
                        })}
                    </select>
                    <div className="mb-3">
                        <label htmlFor="header" className="form-label">Модель :</label>
                        <input ref={modelRef} type="text" className="form-control" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="header" className="form-label">Серийный номер :</label>
                        <input ref={serialNumberRef} type="number" className="form-control" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="header" className="form-label">Кол-во базовых мест :</label>
                        <input ref={basicPlacesRef} type="number" className="form-control" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="header" className="form-label">Дата создания :</label>
                        <input ref={creationDateRef} type="date" className="form-control" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="header" className="form-label">Кол-во премиум мест :</label>
                        <input ref={premiumPlacesRef} type="number" className="form-control" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="header" className="form-label">Картинка :</label>
                        <input ref={imgRef} type="file" className="form-control"/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-primary">Создать</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateFlight;
