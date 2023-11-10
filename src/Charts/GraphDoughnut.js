import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function GraphDoughnut(props) {
  console.log(props.apiData);

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Conversion Rate',
        color:'white',
        align:'left',
        fontSize:18
      },
    },
    cutout: '80%', // Set the cutout percentage to create a hole in the center
    circumference: 115 * Math.PI, // Set the circumference to make it a full circle
    rotation: 1 * Math.PI, // Rotate to start from the top
    animation: false, // Disable animation for better control
    tooltips: {
      enabled: false, // Disable tooltips for the center label
    },
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;
  
      ctx.restore();
      const fontSize = (height / 10).toFixed(2);
      ctx.font = `${fontSize}em Arial`;
      ctx.textBaseline = 'middle';
  
      // Get data values
      const totalVisited = props.apiData.datasets[0].data[0];
      const usersSignedUp = props.apiData.datasets[0].data[1];
      const usersUnsubscribed = props.apiData.datasets[0].data[2];
  
      // Display values below the chart
      const textVisited = `Total Visited: ${totalVisited}`;
      const textSignedUp = `Users Signed Up: ${usersSignedUp}`;
      const textUnsubscribed = `Users Unsubscribed: ${usersUnsubscribed}`;
  
      const textVisitedY = height / 2 + fontSize;
      const textSignedUpY = height / 2 + fontSize * 2;
      const textUnsubscribedY = height / 2 + fontSize * 3;
  
      ctx.fillText(textVisited, width / 2, textVisitedY);
      ctx.fillText(textSignedUp, width / 2, textSignedUpY);
      ctx.fillText(textUnsubscribed, width / 2, textUnsubscribedY);
  
      ctx.save();
    },
  };

  const data = {
    labels: props.apiData.labels,
    datasets: props.apiData.datasets,
  };

  return <Doughnut height={'250px'} width={'350px'} options={options} data={data} />;
}
