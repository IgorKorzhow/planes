import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import {Filler} from 'chart.js'

ChartJS.register(
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({data}) => {
    console.log(data)
    const lineChartData = {
        labels: [(new Date()).getFullYear() - 1, (new Date()).getFullYear()],
        datasets: [
            {
                data: data,
                label: "Кол-во купленых билетов",
                borderColor: "#ff3333",
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                fill: true,
                lineTension: 0.5
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Статистика купленых билетов за год',
            },
        },
    };

    return (
        <Line
            width={160}
            height={50}
            options={options}
            data={lineChartData}
        />
    );
};
export default Chart;
