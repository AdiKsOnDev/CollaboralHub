import React, { useState } from 'react';

function Choice() {
  return (
    <div className="min-h-screen bg-primary flex justify-center items-center">
      <div className="bg-secondary p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-8 text-white">Choose a File Type</h1>
        <div className="flex justify-center space-x-4">
          <a
            className="px-6 py-3 bg-accent-red text-white font-semibold rounded-md hover:bg-opacity-75 duration-300"
            href="/DocxEditor"
          >
            Document Editor
          </a>
          <a
            className="px-6 py-3 bg-accent-blue text-white font-semibold rounded-md hover:bg-opacity-75 duration-300"
            href="/Canvas"
          >
            Canvas
          </a>
        </div>
      </div>
    </div>
  );
}

export default Choice;
