import {Link, Navigate} from "react-router-dom";
import {useRef} from "react";
import {useStateContext} from "../context/contextProvider.jsx";
import axiosClient from "../axios-client.js";

function Login() {

    const {token} = useStateContext();

    if (token) {
        return <Navigate to="/" />
    }

    const emailRef = useRef();
    const passwordRef = useRef();
    const {setToken, setRole} = useStateContext();

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            email : emailRef.current.value,
            password : passwordRef.current.value
        }
        axiosClient.post("/login", payload)
            .then((response) => {
                setToken(response.data.token);
                setRole(response.data.user.role);
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
                        <div id="emailHelp" className="form-text">Мы не отправим ваш email куда-то еще.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input ref={passwordRef} type="password" className="form-control" id="password" required/>
                    </div>
                    <div className="mb-3">
                        <Link to="/register">Создать новый аккаунт</Link>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-primary">Войти</button>
                    </div>
                </form>

            </div>
        </div>);
}

export default Login;
