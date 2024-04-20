import React from 'react';

function ServiceTable(props) {
    return (
        <table className="table table-dark table-hover">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Тип обслуживания</th>
                <th scope="col">Дата обслуживания</th>
                <th scope="col">Доп. информация</th>
            </tr>
            </thead>
            <tbody>
            {props?.services?.map(service => {
                return <tr key={service.id}>
                        <td>{service.id}</td>
                        <td>{service.service_type.name}</td>
                        <td>{service.service_date}</td>
                        <td>{service.special_info}</td>
                    </tr>
            })}
            </tbody>
        </table>
    );
}

export default ServiceTable;
