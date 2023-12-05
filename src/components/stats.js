import React from 'react';
import Playerstats from '../sub-components/playerstats';
//import ScheduleComponent from '../sub-components/schedule';
import '../styles/stats.css'

function StatPage() {
  return (
    <div className="StatPage">
      <h2>Stats Page</h2> 
      <Playerstats />
    </div>
  );
}

export default StatPage;