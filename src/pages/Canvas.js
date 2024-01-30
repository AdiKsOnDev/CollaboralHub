import CanvasHeader from '../components/Canvas/CanvasHeader.js';
import { Excalidraw } from "@excalidraw/excalidraw";

function Canvas() {
  return (
    <div data-testid="excalidraw-canvas" className="w-full h-full flex flex-col">
      <CanvasHeader />
      <Excalidraw  theme="dark" />
    </div>
  );
}

export default Canvas;
