import {useEffect, useState} from "react";
import LoadingSpinner from "../components/LoaderSpinner.jsx";
import TicketRepository from "../repository/TicketRepository.jsx";
import TicketTable from "../components/TicketTable.jsx";


function Tickets() {
    const [isLoading, setIsLoading] = useState(true);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        TicketRepository.getTickets()
            .then((response) => {
                setTickets(response.data);
                console.log(response.data);
            });
        setIsLoading(false);
    }, []);

    return (
        <>
            {isLoading ?
                <div className="mt-4 text-center" style={isLoading ? null : {visibility: "hidden"}}>
                    <LoadingSpinner/>
                </div>
                :
                <div className="container mt-5 mb-5 w-50">
                    <TicketTable tickets={tickets} />
                </div>
            }
        </>
    );
}

export default Tickets;
