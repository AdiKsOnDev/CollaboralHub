import React, { useContext } from "react";
import PlannerGlobalContext from "../../PlannerContext/PlannerGlobalContext";

export default function Labels() {
  const { labels, updateLabel } = useContext(PlannerGlobalContext);
  return (
    <React.Fragment>
      <p className="text-white-500 font-bold mt-10">Label</p>
      <div className="items-start block w-48">
        {labels.map(({ label: lbl, checked }, idx) => (
          <label key={idx} className="flex items-start mt-3">
            <input
              type="checkbox"
              checked={checked}
              onChange={() =>
                updateLabel({ label: lbl, checked: !checked })
              }
              className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
            />
            <span className="ml-2 text-white capitalize ">{lbl}</span>
          </label>

        ))}
      </div>
    </React.Fragment>
  );
}