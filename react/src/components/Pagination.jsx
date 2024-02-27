function Pagination({pageCount, setPage}) {

    const clickHandler = (event) => {
        event.preventDefault();
        setPage(event.target.value);
    }

    let rows = [];
    for (let i = 1; i <= pageCount; i++) {
        rows.push(
            <li key={i} className="page-item">
                <button className="page-link text-dark" value={i}
                        onClick={clickHandler}>{i}</button>
            </li>
        )
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {rows}
            </ul>
        </nav>
    );
}

export default Pagination;
