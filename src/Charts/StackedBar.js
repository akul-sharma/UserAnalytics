import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../css/StackedBar.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Location',
      color: 'white',
    },
    overlayLine: {
      dashed: true,
      lineColor: 'rgba(255, 255, 255, 0.7)',
      lineWidth: 2,
      yAxisID: 'y',
    },
  },
  responsive: false,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: true,
        color: 'rgba(70, 70, 135, 0.1)',
        borderDash: [5],
        lineWidth: 1,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      stacked: true,
      ticks: {
        stepSize: 30000,
        beginAtZero: true,
      },
      grid: {
        display: true,
        color: 'rgba(70, 70, 135, 0.1)',
        borderDash: [5],
        lineWidth: 1,
      },
    },
  },
  elements: {
    line: {
      fill: false,
    },
  },
};

export default function App(props) {
  console.log("in stacked", props.apiData);

  const data = {
    labels: props.apiData.labels,
    datasets: props.apiData.datasets,
  };

  return <Bar height={'250px'} options={options} data={data} />;
}
