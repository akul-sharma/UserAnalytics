import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: false,
  responsive: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'User Traffic',
      color: 'white',
      fontSize: 16
    },
  },
  scales: {
    x:{
      grid:{
        display: true,
        color: 'rgba(70, 70, 135, 0.1)', // Specify the color with some transparency
        borderDash: [5], // Set the borderDash to create dashed lines
        lineWidth: 1, // Specify the line width
      }
    },
    y: {
      beginAtZero: true,
      min: -40,
      max: 70,
      stepSize: 10,
      grid: {
        display: true,
        color: 'rgba(70, 70, 135, 0.1)', // Specify the color with some transparency
        borderDash: [5], // Set the borderDash to create dashed lines
        lineWidth: 1, // Specify the line width
      },
    },
  },
};

  

export default function BarLineGraph(props) {
  const [selectedYear, setSelectedYear] = useState(2023);

  const handleChangeYear = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <div>
      <select value={selectedYear} onChange={handleChangeYear} className="year-dropdown" style={{float:'right',backgroundColor:'#20053F',color:'#747E9A',borderColor:'#8F9BB7',borderRadius:'5px'}}>
        <option value={2023}>2023</option>
        <option value={2022}>2022</option>
        <option value={2021}>2021</option>
      </select>
      <Bar height={'320px'} width={'900px'} options={options} data={{
        labels: props.apiData.labels,
        datasets: [
          {
            label: 'User Subscribed',
            data: props.apiData.datasets[0].data[selectedYear],
            backgroundColor: '#FB4540',
          },
          {
            label: 'User Sign Up',
            data: props.apiData.datasets[1].data[selectedYear],
            backgroundColor: '#0082CC',
          },
          {
            label: 'Line Data',
            data: props.apiData.datasets[2].data[selectedYear],
            borderColor: '#00F2DE',
            borderDash: [5, 5],
            pointRadius: 5,
            type: 'line',
          },
        ],
      }} />
    </div>
  );
}
