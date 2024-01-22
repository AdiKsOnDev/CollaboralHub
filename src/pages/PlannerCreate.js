import React, { useState } from 'react';
import { getMonth } from '../components/PlannerUtil'
import CalendarHeader from '../components/PlannerCalendarHeader';
import PlannerSidebar from '../components/PlannerSidebar';
import PlannerMonth from '../components/PlannerMonth';
import PlannerCalendarHeader from '../components/PlannerCalendarHeader';

function PlannerCreate() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())

  return (
    <React.Fragment>
      <div className="h-screen flex flex flex-columns">
        <PlannerCalendarHeader />
        <div className="flex flex-1">
          <PlannerSidebar />
          <PlannerMonth month={currentMonth} />
        </div>
      </div>
    </React.Fragment>

  );
}

export default PlannerCreate;
