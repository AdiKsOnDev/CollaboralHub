import React from "react";
import PlannerCreateEventButton from "./PlannerCreateEventButton";
import PlannerSmallCalendar from "./PlannerSmallCalendar";
import PlannerLabels from "./PlannerLabels";
export default function Sidebar() {
  return (
    <aside className="border flex flex-col items-center p-5 w-64">
      <PlannerCreateEventButton />
      <PlannerSmallCalendar />
      <PlannerLabels />
    </aside>
  );
}
