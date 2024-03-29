import React, { useContext, useState } from "react";
import PlannerGlobalContext from "../../PlannerContext/PlannerGlobalContext";
import { FaCheck } from "react-icons/fa6";

const labelsClasses = [
  "accent-indigo",
  "accent-gray",
  "accent-green",
  "accent-blue",
  "accent-red",
  "accent-purple",
];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(PlannerGlobalContext);

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-primary rounded-lg shadow-2xl w-1/4">
        <header className="bg-secondary px-4 py-2 flex justify-between">
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
          </div>
          <div>
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-white ">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <span className="material-icons-outlined text-white md:font-bold text-lg ">
              Title:
            </span>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 bg-secondary text-white text-xl font-semibold pb-2 w-full border-b-2 border-white focus:outline-none focus:ring-0 focus:border-accent-red"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-white md:font-bold text-lg ">
              Date Selected:
            </span>
            <p className="text-white">{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-white md:font-bold text-lg ">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 bg-secondary text-white pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-accent-red"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-white md:font-bold text-lg">
              Priority:
            </span>
            <div className="flex gap-x-2 justify-start">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring focus:border-secondary`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-black text-sm">
                      <FaCheck />
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-accent-red hover:bg-secondary px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
