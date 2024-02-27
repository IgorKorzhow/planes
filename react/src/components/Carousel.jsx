import {NavLink} from "react-router-dom";

function Carousel({programs}) {
    return (
        <div id="carouselExampleCaptions" className="carousel slide w-50" data-bs-ride="false">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"
                        aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                {programs.map((program, index) => {
                    return (
                        <div className={"carousel-item" + " " + (index === 0 ? "active" : "")}>
                            <NavLink to={"programs/" + program.id}>
                                <img src={import.meta.env.VITE_API_URL + "/storage/images/" + program.image}
                                     className="d-block w-100" alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{program.header}</h5>
                                    <p>
                                        {
                                            program.description.length > 30 ?
                                                program.description.substring(0, 30) + '...'
                                                :
                                                program.description
                                        }
                                    </p>
                                </div>
                            </NavLink>
                    </div>
                    )
                })}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;
