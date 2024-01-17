function ToolBox({ action, tool }) {
  return (
     <div style = {{position: "fixed"}}>
        <input
            type = "radio"
            id = "selection"
            checked = {tool === "selection"}
            onChange = {() => {action("selection")}}
        />
        <label  htmlFor = "selection">Selection</label>

        <input
            type = "radio"
            id = "line"
            checked = {tool === "line"}
            onChange = {() => {action("line")}}
        />
        <label  htmlFor = "line">Line</label>

        <input
            type = "radio"
            id = "rectangle"
            checked = {tool === "rectangle"}
            onChange = {() => {action("rectangle")}}
        />
        <label htmlFor = "rectangle">Rectangle</label>

        <input
            type = "radio"
            id = "pencil"
            checked = {tool === "pencil"}
            onChange = {() => {action("pencil")}}
        />
        <label htmlFor = "pencil">Pencil</label>
    </div>
  )
};

export default ToolBox;
