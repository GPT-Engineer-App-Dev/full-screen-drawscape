// Update this page (the content is just a fallback if you fail to update the page)

import { useState, useRef, useEffect } from 'react';

const Index = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    setLastPosition(getMousePos(e));
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const currentPosition = getMousePos(e);

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(currentPosition.x, currentPosition.y);
    ctx.stroke();

    setLastPosition(currentPosition);
  };

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseOut={stopDrawing}
      />
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <Label htmlFor="color-picker">Pen Color</Label>
          <Input
            id="color-picker"
            type="color"
            value={penColor}
            onChange={(e) => setPenColor(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="size-picker">Pen Size</Label>
          <Input
            id="size-picker"
            type="range"
            min="1"
            max="20"
            value={penSize}
            onChange={(e) => setPenSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <Button onClick={clearCanvas} className="w-full">Clear Canvas</Button>
      </div>
    </div>
  );
};

export default Index;
