import React, { useState } from 'react';
import { getMonth } from '../components/Planner/PlannerUtil.js'
import PlannerSidebar from '../components/Planner/PlannerSidebar.js';
import PlannerMonth from '../components/Planner/PlannerMonth.js';
import Navbar from '../components/Navbar.js';

function PlannerCreate() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())

  return (
    <React.Fragment>
      <div className="h-screen flex flex-columns">
        <Navbar />
        <div className="flex flex-1 p-10">
          <PlannerSidebar />
          <PlannerMonth month={currentMonth} />
        </div>
      </div>
    </React.Fragment>

  );
}

export default PlannerCreate;
