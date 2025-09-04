import React, { useEffect, useState } from 'react';

export default function RetroCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    addEventListeners();
    return () => {
      removeEventListeners();
      document.body.style.cursor = 'auto'; // Restore default cursor
    };
  }, []);

  return (
    <div className={`fixed z-[9999] pointer-events-none ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150`}>
      {/* Outer cursor */}
      <div
        className={`absolute w-6 h-6 border-2 border-primary ${
          clicked ? 'scale-75 border-accent' : 'scale-100'
        } transition-transform duration-150`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Inner cursor - pixel dot */}
      <div
        className={`absolute w-1 h-1 bg-accent ${
          clicked ? 'scale-150' : 'scale-100'
        } transition-transform duration-150`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}