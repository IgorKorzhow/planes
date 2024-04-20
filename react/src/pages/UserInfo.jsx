import {useEffect, useRef, useState} from "react";
import LoadingSpinner from "../components/LoaderSpinner.jsx";
import UserRepository from "../repository/UserRepository.jsx";

function Main() {
    const [userInfo, setUserInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const firstNameRef = useRef();
    const secondNameRef = useRef();
    const lastNameRef = useRef();
    const countryRef = useRef();
    const passprotNumberRef = useRef();
    const registrationRef = useRef();
    const birthDateRef = useRef();

    useEffect(() => {
        UserRepository.getUserInfo()
            .then(response => {
                setUserInfo(response.data);
                setIsLoading(false);
            })
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        const data = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            second_name: secondNameRef.current.value,
            country: countryRef.current.value,
            passport_number: passprotNumberRef.current.value,
            registration: registrationRef.current.value,
            birth_date: birthDateRef.current.value
        };

        UserRepository.update(data)
            .then((response) => {
                setUserInfo(response.data);
            })
    }

    return (
        <>
            {isLoading ?
                <div className="mt-4 text-center" style={isLoading ? null : {visibility: "hidden"}}>
                    <LoadingSpinner/>
                </div>
                :
                <div className="container mt-5 mb-5 w-50">
                    <div className="card p-4 bg-light">
                        <form onSubmit={onSubmit}>
                            <h4 className="text-center">Информация пользователя</h4>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Имя:</label>
                                <input ref={firstNameRef} type="text" className="form-control" defaultValue={userInfo?.first_name} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Фамилия:</label>
                                <input ref={secondNameRef} type="text" className="form-control" defaultValue={userInfo?.second_name} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Отчество:</label>
                                <input ref={lastNameRef} type="text" className="form-control" defaultValue={userInfo?.last_name} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Страна:</label>
                                <input ref={countryRef} type="text" className="form-control" defaultValue={userInfo?.country} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Номер паспорта:</label>
                                <input ref={passprotNumberRef} type="text" className="form-control" defaultValue={userInfo?.passport_number} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Регистрация:</label>
                                <input ref={registrationRef} type="text" className="form-control" defaultValue={userInfo?.registration} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="header" className="form-label">Дата рождения:</label>
                                <input ref={birthDateRef} type="date" className="form-control" defaultValue={userInfo?.birth_date} required/>
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

export default Main;
