import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Eraser, Square, Circle, Trash2 } from 'lucide-react';

const DrawingCanvas = ({ onSave, onCancel }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [ctx, setCtx] = useState(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Set default styles
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    
    // Fill with white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    setCtx(context);
  }, []);
  
  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    }
  }, [color, lineWidth, ctx]);
  
  const startDrawing = (e) => {
    const { offsetX, offsetY } = getCoordinates(e);
    
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    
    if (tool === 'square' || tool === 'circle') {
      ctx.fillStyle = color;
    }
  };
  
  const draw = (e) => {
    if (!isDrawing) return;
    
    const { offsetX, offsetY } = getCoordinates(e);
    
    if (tool === 'pencil') {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.strokeStyle = 'white';
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      ctx.strokeStyle = color; // Reset stroke style
    }
  };
  
  const stopDrawing = (e) => {
    if (!isDrawing) return;
    
    const { offsetX, offsetY } = getCoordinates(e);
    
    if (tool === 'square') {
      const startX = ctx.getLineDash()[0] || offsetX - 30;
      const startY = ctx.getLineDash()[1] || offsetY - 30;
      ctx.fillRect(startX, startY, 60, 60);
    } else if (tool === 'circle') {
      ctx.beginPath();
      ctx.arc(offsetX, offsetY, 30, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.closePath();
    }
    
    setIsDrawing(false);
  };
  
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // For touch events
    if (e.touches && e.touches[0]) {
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top
      };
    }
    
    // For mouse events
    return {
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY
    };
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  
  const handleSave = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL('image/png');
    onSave(imageData);
  };
  
  const colorOptions = [
    '#000000', '#FF0000', '#FFA500', '#FFFF00', 
    '#008000', '#0000FF', '#4B0082', '#800080'
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Drawing Canvas</h2>
        <div className="flex space-x-2">
          <button 
            onClick={onCancel}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-3 py-1 text-sm bg-amber-500 text-white rounded hover:bg-amber-600"
          >
            Save
          </button>
        </div>
      </div>
      
      <div className="flex space-x-4 mb-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => setTool('pencil')}
            className={`p-2 rounded ${tool === 'pencil' ? 'bg-amber-100' : 'hover:bg-gray-100'}`}
          >
            <Pencil size={20} />
          </button>
          <button 
            onClick={() => setTool('eraser')}
            className={`p-2 rounded ${tool === 'eraser' ? 'bg-amber-100' : 'hover:bg-gray-100'}`}
          >
            <Eraser size={20} />
          </button>
          <button 
            onClick={() => setTool('square')}
            className={`p-2 rounded ${tool === 'square' ? 'bg-amber-100' : 'hover:bg-gray-100'}`}
          >
            <Square size={20} />
          </button>
          <button 
            onClick={() => setTool('circle')}
            className={`p-2 rounded ${tool === 'circle' ? 'bg-amber-100' : 'hover:bg-gray-100'}`}
          >
            <Circle size={20} />
          </button>
          <button 
            onClick={clearCanvas}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Trash2 size={20} />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={lineWidth} 
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
            className="w-24"
          />
          <div className="flex space-x-1">
            {colorOptions.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded-full ${color === c ? 'ring-2 ring-offset-1 ring-gray-400' : ''}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-[400px] touch-none"
        />
      </div>
    </div>
  );
};

export default DrawingCanvas;