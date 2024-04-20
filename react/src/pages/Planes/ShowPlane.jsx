import React, {useEffect, useRef, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";

import {useStateContext} from "../../context/contextProvider.jsx";
import PlaneRepository from "../../repository/PlaneRepository.jsx";
import LoadingSpinner from "../../components/LoaderSpinner.jsx";
import ServiceTable from "../../components/ServiceTable.jsx";
import ServiceRepository from "../../repository/ServiceRepository.jsx";

function ShowPlane() {
    const [isLoadingPlane, setIsLoadingPlane] = useState(true);
    const [isLoadingServices, setIsLoadingServices] = useState([]);
    const {role} = useStateContext();
    const [plane, setPlane] = useState();
    const [services, setServices] = useState();
    const {id} = useParams();
    const serviceTypeRef = useRef();
    const serviceDateRef = useRef();
    const specialInfoRef = useRef();

    if (role === "user") {
        return <Navigate to="/"/>
    }

    useEffect(() => {
        PlaneRepository.getById(id)
            .then(response => {
                setPlane(response.data);
                setIsLoadingPlane(false);
            });
        ServiceRepository.getAll()
            .then(response => {
                setServices(response.data);
                setIsLoadingServices(false);
            });
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        if (serviceTypeRef.current.value === 'default') {
            alert("Вы забыли о сомлете. Пожалуйста выберите его");
            return
        }

        PlaneRepository.createService({
            plane_id: plane.id,
            service_type_id: serviceTypeRef.current.value,
            service_date: serviceDateRef.current.value,
            special_info: specialInfoRef.current.value
        }).then((response) => {
            setPlane(response.data);
            serviceDateRef.current.value = '';
            serviceTypeRef.current.value = 'default';
            specialInfoRef.current.value = '';
        });
    }


    return (
        <>
            {isLoadingPlane || isLoadingServices ?
                <div className="mt-4 text-center">
                    <LoadingSpinner/>
                </div>
                :
                <div className="card mb-3" style={{margin: '50px 150px'}}>
                    <div className="d-flex justify-content-center mt-3">
                        <img src={'http://localhost:8000/' + plane.img_url} height="400px" className="card-img-top w-75"
                             alt="..."/>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Модель: {plane.model}</h5>
                        <p className="card-text">Дата создания: {plane.creation_date}</p>
                        <p className="card-text">Серийный номер: {plane.serial_number}</p>
                        <div className="d-flex justify-content-around">
                            <div>
                                <form onSubmit={onSubmit}>
                                    <h4 className="text-center">Создать обслуживание</h4>
                                    <select ref={serviceTypeRef} defaultValue={-1} className="form-select form-select-md mb-3"
                                            id="plane">
                                        <option value="default">Выберните тип обслуживания</option>
                                        {services.map((element) => {
                                            return <option key={element.id} value={element.id}
                                            >{element.name}</option>
                                        })}
                                    </select>
                                    <div className="mb-3">
                                        <label htmlFor="header" className="form-label">Введите дату обслуживания
                                            :</label>
                                        <input ref={serviceDateRef} type="date" className="form-control" required/>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <textarea ref={specialInfoRef} className="form-control" placeholder="Leave a comment here"
                                                  id="floatingTextarea2"></textarea>
                                        <label htmlFor="floatingTextarea2">Особая информация</label>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-outline-primary">Создать</button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <ServiceTable services={plane.services}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ShowPlane;
