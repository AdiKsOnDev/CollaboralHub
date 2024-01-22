import React, { useState } from 'react';
import { getMonth } from '../components/Planner/PlannerUtil.js'
import PlannerSidebar from '../components/Planner/PlannerSidebar.js';
import PlannerMonth from '../components/Planner/PlannerMonth.js';
import Navbar from '../components/Navbar.js';
import StatusBar from '../components/StatusBar.js';

function PlannerCreate() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())

  return (
    <React.Fragment>
      <div className="h-screen flex">
        <Navbar />

        <div className="flex flex-columns bg-primary w-full flex-col">
          <StatusBar />

          <div className="p-12 pb-0 h-full">
            <div className="flex flex-1 h-full bg-secondary">
              <PlannerSidebar />
              <PlannerMonth month={currentMonth} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
}

export default PlannerCreate;
