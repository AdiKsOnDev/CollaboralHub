import CanvasBox from '../components/CanvasBox';
import CanvasHeader from '../components/CanvasHeader.js';
import { Excalidraw } from "@excalidraw/excalidraw";

function Canvas() {
  return (
    <div className="w-full h-full flex flex-col">
      <CanvasHeader />
      <Excalidraw />
    </div>
  );
}

export default Canvas;
