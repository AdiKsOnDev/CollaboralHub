import React from 'react';

function Canvas() {
  return (
    <>
      <div className="mt-12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <iframe
          src='https://www.tldraw.com'
          title='Web Whiteboard'
          width="1300"
          height="600"
        />
      </div>
    </>
  );
}

export default Canvas;
