import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import "./Pie-Chart.css"

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    names: Array<string>
    price: Array<number>
    value: number
}

export function PieChart(props: PieChartProps) {


    const data = {
        labels: props.names,
        datasets: [
            {
                label: 'Percentage',
                data: props.price,
                backgroundColor: [
                    'rgba(255,99,132,0.6)',
                    'rgba(54,162,235,0.6)',
                    'rgba(255,206,86,0.6)',
                    'rgba(75,192,192,0.6)',
                    'rgba(153,102,255,0.6)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgb(255,37,84)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return  (
        <div className={"Pie-Chart"}>
            <  Pie data={data} />
        <h2 className={"Total-Value"}><p>Total value: {props.value.toFixed(2)}$</p></h2>
        </div>
        )

}