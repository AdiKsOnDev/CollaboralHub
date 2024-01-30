import React, { useState, useContext, useEffect } from 'react';
import { getMonth } from '../components/Planner/PlannerUtil.js'
import PlannerSidebar from '../components/Planner/PlannerSidebar.js';
import PlannerMonth from '../components/Planner/PlannerMonth.js';
import Navbar from '../components/Navbar.js';
import PlannerCalendarHeader from '../components/Planner/PlannerCalendarHeader.js';
import PlannerGlobalContext from '../PlannerContext/PlannerGlobalContext.js';
import EventModal from '../components/Planner/PlannerEventModal.js';
import StatusBar from '../components/StatusBar.js';

function PlannerCreate() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, showEventModal } = useContext(PlannerGlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);


  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <div className="flex">
        <Navbar />

        <div className="flex flex-columns bg-primary w-full flex-col">
          <StatusBar />

          <div className="p-12 pb-0 text-white h-full">
            <PlannerCalendarHeader />
            <div data-testid="calendar" className="flex flex-1 h-90 bg-secondary">
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
