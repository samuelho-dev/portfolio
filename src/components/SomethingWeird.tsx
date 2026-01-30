import React, { useEffect, useRef, useState } from 'react';

function SomethingWeird() {
  const eyesRef = useRef<HTMLDivElement>(null);
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  const handleEyesMove = () => {
    if (eyesRef.current) {
      const rect = eyesRef.current.getBoundingClientRect();
      const mouseX = mouseCoordinates.x - rect.left - rect.width / 2;
      const mouseY = mouseCoordinates.y - rect.top - rect.height / 2;

      const offsetX = Math.max(0, Math.min(mouseX, rect.width));
      const offsetY = Math.max(0, Math.min(mouseY, rect.height));

      return { left: offsetX, top: offsetY + 5 };
    }
  };
  const handleMouseMove = (e: MouseEvent) => {
    setMouseCoordinates({ x: e.clientX, y: e.clientY });
    handleEyesMove();
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });

  return (
    <div className="flex h-fit w-fit items-center gap-4">
      <div className="relative h-10 w-6 rounded-full bg-white">
        <div
          ref={eyesRef}
          className="relative h-4 w-4 rounded-full bg-black outline outline-1 outline-custom-white"
          style={handleEyesMove()}
        />
      </div>
      <div className=" h-10 w-6 rounded-full bg-white">
        <div
          className="relative h-4 w-4 rounded-full bg-black outline outline-1 outline-custom-white"
          style={handleEyesMove()}
        />
      </div>
    </div>
  );
}

export default SomethingWeird;
