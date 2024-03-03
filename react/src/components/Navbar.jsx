import {NavLink} from "react-router-dom";
import {useStateContext} from "../context/contextProvider.jsx";
import axiosClient from "../axios-client.js";

function Navbar() {

    const {token, setToken} = useStateContext();
    const Logout = (event) => {
        event.preventDefault();
        axiosClient.post("/logout")
            .then(() => {
                setToken();
            })
            .catch((error) => {
                const response = error.response;
                if (response) {
                    console.log(response.data.errors);
                }
            })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">AirlineCompany</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Рейсы</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/planes">Самолеты</NavLink>
                        </li>
                        {!!token ?
                            <>
                            </>
                            : null
                        }
                    </ul>
                    <div className="navbar-nav mb-2 mb-lg-0">
                        {!!token ?
                            <NavLink onClick={Logout} className="nav-link" to="/logout">Logout</NavLink>
                            :
                            <>
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
