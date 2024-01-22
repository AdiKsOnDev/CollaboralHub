import React, { useContext } from "react";
import GlobalContext from "../../PlannerContext/PlannerGlobalContext";
export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border border-accent-red p-2 rounded-full flex items-center bg-accent-red font-semibold hover:bg-accent-blue hover:border-accent-blue duration-300"
    >
      <span className="px-3">Create</span>
    </button>
  );
}
