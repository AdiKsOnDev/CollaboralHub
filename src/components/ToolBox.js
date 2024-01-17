import { ReactComponent as PencilSVG } from "../Assets/Tool _ Pencil.svg";
import { ReactComponent as RectangleSVG } from "../Assets/Tool _ Figures.svg";
import { ReactComponent as SelectionSVG } from "../Assets/Tool _ Selection.svg";
import { ReactComponent as LineSVG } from "../Assets/Tool _ Line.svg";

function ToolBox({ action, tool }) {
  return (
     <div className="fixed left-8 bottom-1/4 flex flex-col bg-secondary rounded-lg h-1/2 p-5">
      <label>
        <input
            className=""
            type = "radio"
            id = "selection"
            checked = {tool === "selection"}
            onChange = {() => {action("selection")}}
        />

        <SelectionSVG className="w-7 h-7" />
      </label>

      <label>
        <input
            type = "radio" 
            id = "line"
            checked = {tool === "line"}
            onChange = {() => {action("line")}}
        />

        <LineSVG className="w-7 h-7" />
      </label>

      <label>
        <input
            type = "radio"
            id = "rectangle"
            checked = {tool === "rectangle"}
            onChange = {() => {action("rectangle")}}
        />
        <RectangleSVG className="w-7 h-7" />
      </label>

      <label>
        <input
            className=""
            type = "radio"
            id = "pencil"
            checked = {tool === "pencil"}
            onChange = {() => {action("pencil")}}
        />
        <PencilSVG className="w-8 h-8" />
      </label>
    </div>
  )
};

export default ToolBox;
