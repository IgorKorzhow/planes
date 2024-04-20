import React, {useEffect, useState} from 'react';
import TicketRepository from "../repository/TicketRepository.jsx";
import MyChart from "../components/MyChart.jsx";

function ChartBoughtTickets() {

    const [sortedData, setSortedData] = useState();

    useEffect(() => {
        TicketRepository.getStatistics()
            .then(response => setSortedData(response.data))
    },[]);

    return (
        <div className="container mt-3">
            <MyChart data={sortedData}/>
        </div>
    );
}

export default ChartBoughtTickets;
