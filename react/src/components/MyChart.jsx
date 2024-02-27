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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({data}) => {
    console.log(data);
    const lineChartData = {
        labels: [(new Date()).getFullYear() - 1, (new Date()).getFullYear()],
        datasets: [
            {
                data: data?.map(e => e.avg_number_of_repetitions),
                label: "Вес",
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
                text: 'Your progress in repetition',
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
