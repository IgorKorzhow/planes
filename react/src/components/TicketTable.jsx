import React from 'react';

function TicketTable(props) {
    return (
        <table className="table table-dark table-hover">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Откуда</th>
                <th scope="col">Куда</th>
                <th scope="col">Дата отправления</th>
                <th scope="col">Дата прибытия</th>
                <th scope="col">Номер места</th>
            </tr>
            </thead>
            <tbody>
            {props?.tickets?.map(ticket => {
                return <tr key={ticket.id}>
                        <td>{ticket.id}</td>
                        <td>{ticket.flight.departure_city}</td>
                        <td>{ticket.flight.arrival_city}</td>
                        <td>{ticket.flight.departure_date_time}</td>
                        <td>{ticket.flight.arrival_date_time}</td>
                        <td>{ticket.place.number}</td>
                    </tr>
            })}
            </tbody>
        </table>
    );
}

export default TicketTable;
