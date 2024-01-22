import CanvasBox from '../components/CanvasBox';
import CanvasHeader from '../components/CanvasHeader.js';

function Canvas() {
  return (
    <div className="w-full h-full flex flex-col">
      <CanvasHeader />
      <CanvasBox />
    </div>
  );
}

export default Canvas;
