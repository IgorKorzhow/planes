import {NavLink} from "react-router-dom";

function Dropdown({Repository, id, setData, path}) {

    const deleteButtonHandler = (event) => {
        event.preventDefault();
        Repository.delete(id);
        setData(prev => prev.filter(el => el.id !== id));
    }

    return (
        <div className="btn-group">
            <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown"
                    aria-expanded="false">
                Action
            </button>
            <ul className="dropdown-menu">
                <li>
                    <NavLink className="dropdown-item" to={path} >Update</NavLink>
                </li>
                <li>
                    <button onClick={deleteButtonHandler} className="dropdown-item">Delete</button>
                </li>
            </ul>
        </div>
    );
}

export default Dropdown;
