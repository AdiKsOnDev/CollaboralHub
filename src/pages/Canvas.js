import CanvasBox from '../components/Canvas/CanvasBox.js';
import CanvasHeader from '../components/Canvas/CanvasHeader.js';
import { Excalidraw } from "@excalidraw/excalidraw";
import { THEME } from "@excalidraw/excalidraw";

function Canvas() {
  return (
    <div className="w-full h-full flex flex-col">
      <CanvasHeader />
      <Excalidraw theme="dark" />
    </div>
  );
}

export default Canvas;
