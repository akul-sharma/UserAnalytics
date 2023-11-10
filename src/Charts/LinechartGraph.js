import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
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
        text: 'Website Analytics',
        color:'white',
        align:'left',
        fontSize:18
      },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: true,
        drawBorder: false,
        color: 'rgba(70, 70, 135, 0.1)',
        borderDash: [5],
        lineWidth: 1,
      },
    },
    y: {
      beginAtZero: true,
      maxTicksLimit: 10,
      grid: {
        display: true,
        drawBorder: false,
        color: 'rgba(70, 70, 135, 0.1)',
        borderDash: [5],
        lineWidth: 1,
      },
    },
  },
};




const labels = {
  weekly: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  monthly: ['November', 'December', 'January', 'February', 'March', 'April'],
  yearly: ['2022', '2023', '2024', '2025'],
};



export default function LinechartGraph(props) {
 
  const [activeTab, setActiveTab] = useState('weekly');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const data = {
    weekly: props.apiData.weekly,
    monthly: props.apiData.monthly,
    yearly: props.apiData.yearly,
  };


  return (
    <div>
      <div style={{backgroundColor:'#290C51',display:'inline-block',borderRadius:'6px',marginBottom:'8px'}}>
        <Button variant="outline" size="sm" style={{color:'white',backgroundColor: activeTab==='weekly'?'#250442':''}} onClick={() => handleTabChange('weekly')}>Weekly</Button>
        <Button variant="outline" size="sm" style={{color:'white',backgroundColor: activeTab==='monthly'?'#250442':''}} onClick={() => handleTabChange('monthly')}>Monthly</Button>
        <Button variant="outline" size="sm" style={{color:'white',backgroundColor: activeTab==='yearly'?'#250442':''}} onClick={() => handleTabChange('yearly')}>Yearly</Button>
      </div>
      <Line height={'220px'} options={options} data={data[activeTab]} />
    </div>
  );
}
