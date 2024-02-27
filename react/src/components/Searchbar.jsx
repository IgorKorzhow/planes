import {useStateContext} from "../context/contextProvider.jsx";
import {NavLink} from "react-router-dom";

function Searchbar({muscles, value, setSearchField, selectRef, clickSearchButton,
    urlCreateLink, nameLink, withSelect}) {

    const {token, role} = useStateContext();

    return (
        <nav className="navbar bg-light border border-end-0">
            {!!token ?
                <div className="container-fluid d-flex ">
                    <div className="d-flex w-50">
                        <input className="form-control me-2" type="search" placeholder="Search"
                               value={value} onChange={(event) => setSearchField(event.target.value)}
                               aria-label="Search" />
                        <button onClick={clickSearchButton} className="btn btn-outline-success" type="submit">Search</button>
                        {withSelect ?
                            <select ref={selectRef} defaultValue="default" className="form-select form-select-md ms-2" id="group">
                                <option value="default">Choose group of muscles</option>
                                {muscles.map((element) => {
                                    return <option key={element.id} value={element.id}
                                    >{element["muscle_group"]}</option>
                                })}
                            </select>
                            :
                            <></>
                        }
                    </div>
                    <div>
                        {role === "admin" ?
                            <NavLink className="btn btn-outline-dark" to={urlCreateLink}>{nameLink}</NavLink>
                            :
                            <></>
                        }
                        </div>
                </div>
            :
                <div className="container d-flex justify-content-center">
                    <div className="d-flex w-50">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                               value={value} onChange={(event) => setSearchField(event.target.value)}
                        />
                        <button onClick={clickSearchButton} className="btn btn-outline-success" type="submit">Search</button>
                        {withSelect ?
                            <select ref={selectRef} defaultValue="default" className="form-select form-select-md ms-2" id="group">
                                <option value="default">Choose group of muscles</option>
                                {muscles.map((element) => {
                                    return <option key={element.id} value={element.id}
                                    >{element["muscle_group"]}</option>
                                })}
                            </select>
                            :
                            <></>
                        }
                    </div>
                </div>
            }
        </nav>
    );
}

export default Searchbar;
