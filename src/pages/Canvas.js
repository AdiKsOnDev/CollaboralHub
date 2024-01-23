import CanvasBox from '../components/CanvasBox';
import CanvasHeader from '../components/CanvasHeader.js';
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
