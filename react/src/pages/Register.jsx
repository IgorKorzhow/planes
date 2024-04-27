import {Link, Navigate} from "react-router-dom";
import {useRef} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/contextProvider.jsx";

function Register() {

    const {token} = useStateContext();

    if (token) {
        return <Navigate to="/" />
    }

    const emailRef = useRef();
    const passwordRef = useRef();
    const repeatPasswordRef = useRef();
    const {setToken, setUser} = useStateContext();

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            email : emailRef.current.value,
            password : passwordRef.current.value,
            password_confirmation : repeatPasswordRef.current.value
        }
        axiosClient.post("/register", payload)
            .then((response) => {
                setToken(response.data.token);
                setUser(response.data.user);
        })
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    }

    return (
        <div className="container mt-5" style={{width: "35%"}}>
            <div className="card p-5 bg-light">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input ref={emailRef} type="email" className="form-control" id="email" aria-describedby="emailHelp" required/>
                        <div id="emailHelp" className="form-text">Мы не отправим ваш email куда-то еще..</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input ref={passwordRef} type="password" className="form-control" id="password" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password_repeat" className="form-label">Повторите пароль</label>
                        <input ref={repeatPasswordRef} type="password" className="form-control" id="password_repeat" required/>
                    </div>
                    <div className="mb-3">
                        <Link to="/login">Уже есть аккаунт</Link>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-primary">Зарегистрироваться</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
