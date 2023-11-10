import './App.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import { Card, CardBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp, faDollarSign, faUser } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import StackedBar from './Charts/StackedBar';
import GraphDoughnut from './Charts/GraphDoughnut';
import LinechartGraph from './Charts/LinechartGraph';
import BarLineGraph from './Charts/BarLineGraph';

function App() {

const [apiData,setApiData]=useState(null);
const [selectedWebsite, setSelectedWebsite] = useState('Ecommerce');
  
useEffect(()=>{
  fetch('https://654e289dcbc32535574272c2.mockapi.io/db')
    .then((response) => response.json())
    .then((apiData) => {
      const data=apiData[0].ApiData;
      console.log("The data coming is:",JSON.stringify(data));
      if(selectedWebsite==="Ecommerce")
        setApiData(data.Ecommerce);
      else
        setApiData(data.SocialMedia);
      console.log(apiData);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
},[selectedWebsite]);

  const handleWebsiteSelect = (website) => {
    setSelectedWebsite(website);
  };

  return (
    
    <>

    {apiData ? (
      <div className='container-fluid pt-3' style={{backgroundColor: '#1a022e'}}>
        <div className='row mb-3'>
          <div className='d-flex align-items-center justify-content-between'>
            <div className='text-white'>
              <h2>User Analytics</h2>
              <h6 style={{color: 'rgba(255,255,255,0.5)'}}>Lorem ipsum doter sit consectetur</h6>
            </div>
            <div>
              <select value={selectedWebsite} onChange={(e) => handleWebsiteSelect(e.target.value)} style={{ float: 'right', backgroundColor: '#20053F', color: '#747E9A', borderColor: '#8F9BB7', borderRadius: '5px' }}>
                <option value="Ecommerce">Ecommerce</option>
                <option value="SocialMedia">SocialMedia</option>
              </select>
            </div>
          </div>
        </div>

        <div>
        <div className='row'>
          <div className='col-md-3'>
          <Card className=" mb-2 myCard">
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='d-flex align-items-center'>
                    <div className='box ' style={{backgroundColor:'#3F46F7' }}>
                      <FontAwesomeIcon icon={faArrowDown} style={{color:'white'}} />
                    </div>
                    <div style={{marginLeft:'20px'}}>
                      <p className='text-nowrap' style={{color:'#8C89B4',margin:'0px',fontSize:'15px'}}>Total Subscribers</p>
                      <div style={{fontSize:'24px',margin:'0px',color:'white'}}>
                        {apiData.TotalVisits}
                      </div>
                    </div>
                  </div>
                  <div className='smallboxes' style={{backgroundColor: 'rgba(2, 177, 90, 0.15)', color:'#00CA65'}}>
                    +{apiData.TotalVisitPercent}%
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card className=" mb-2 myCard">
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='d-flex align-items-center'>
                    <div className='box ' style={{backgroundColor:'#FE8743' }}>
                      <FontAwesomeIcon icon={faArrowUp} style={{color:'white'}} />
                    </div>
                    <div style={{marginLeft:'20px'}}>
                      <p className='text-nowrap' style={{color:'#8C89B4',margin:'0px',fontSize:'15px'}}>Total Subscribers</p>
                      <div style={{fontSize:'24px',margin:'0px',color:'white'}}>
                        {apiData.TotalSubscribers}
                      </div>
                    </div>
                  </div>
                  <div className='smallboxes' style={{backgroundColor: 'rgba(232, 0, 27,0.15)', color:'#E41414'}}>
                     +{apiData.TotalSubscribersPercent}%
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card className=" mb-2 myCard">
              <Card.Body>
                <div className='d-flex'>
                  <div className='box ' style={{backgroundColor:'#00C543' }}>
                    <FontAwesomeIcon icon={faUser} style={{color:'white'}} />
                  </div>
                  <div style={{fontFamily: 'Space Grotesk',marginLeft:'20px'}}>
                    <div>
                      <p className='text-nowrap' style={{color:'#8C89B4',margin:'0px',fontSize:'15px'}}>Active Users</p>
                    </div>
                    <div style={{fontSize:'24px',margin:'0px',color:'white'}}>
                      {apiData.ActiveUsers}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card className=" mb-2 myCard">
              <Card.Body>
                <div className='d-flex'>
                  <div className='box ' style={{backgroundColor:'#8923D9' }}>
                    <FontAwesomeIcon icon={faDollarSign} style={{color:'white'}} />
                  </div>
                  <div style={{fontFamily: 'Space Grotesk',marginLeft:'20px'}}>
                    <div>
                      <p className='text-nowrap' style={{color:'#8C89B4',margin:'0px',fontSize:'15px'}}>Total Clicks</p>
                    </div>
                    <div style={{fontSize:'24px',margin:'0px',color:'white'}}>
                      {apiData.TotalClicks}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className='col-md-9'>
            <Card className="p-2 mb-2 myCard">
              <Card.Body>
                <BarLineGraph apiData={apiData.BarLineData} />
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4'>
              <Card className="p-2 myCard">
                <Card.Body>
                  <StackedBar apiData={apiData.StackedBarData} />
                </Card.Body>
              </Card>
          </div>
          <div className='col-md-4'>           
              <Card className="p-2 myCard">
                <Card.Body>
                  <GraphDoughnut apiData={apiData.DoughnutData} />
                </Card.Body>
              </Card>
          </div>
          <div className='col-md-4'>
              <Card className="p-2 myCard">
                <Card.Body>
                  <LinechartGraph apiData={apiData.LineChartData} />
                </Card.Body>
              </Card>
            
          </div>
        </div>
        </div>
      </div>
    ): <div>No data</div>}
    </>
  );
}

export default App;
