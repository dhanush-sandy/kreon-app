import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Loader2Icon, Save, Trash, UndoIcon, Palette, XIcon } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const DrawingCanvas = ({ onClose, onSave, initialData = null }) => {
  const { userId } = useAuth();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [title, setTitle] = useState(initialData?.title || "");
  const [loading, setLoading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colors = [
    "#000000", "#ff0000", "#0000ff", "#00ff00",
    "#ffff00", "#ff00ff", "#00ffff", "#ff9900"
  ];

  const brushSizes = [2, 5, 10, 15, 20];

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const ctx = canvas.getContext("2d");
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      setContext(ctx);

      // Load existing drawing if any
      if (initialData?.drawingData) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.src = initialData.drawingData;
      }
    }
  }, [canvasRef, color, brushSize, initialData]);

  const startDrawing = (e) => {
    if (!context) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !context) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!context) return;

    if (isDrawing) {
      context.closePath();
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    if (!context) return;

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const saveDrawing = async () => {
    if (!canvasRef.current || !title.trim()) return;

    setLoading(true);

    try {
      const drawingData = canvasRef.current.toDataURL("image/png");

      const noteData = {
        userId,
        title,
        description: "Drawing note",
        color: "blue-200",
        type: "drawing",
        drawingData
      };

      let response;

      if (initialData?._id) {
        // Update existing note
        response = await axios.put(
          `http://localhost:3000/api/v1/notes/update-note/${initialData._id}`,
          noteData
        );
      } else {
        // Create new note
        response = await axios.post(
          "http://localhost:3000/api/v1/notes/create-notes",
          noteData
        );
      }

      if (onSave && response.data.success) {
        onSave(response.data.data);
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error saving drawing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-3">
          <input
            type="text"
            placeholder="Drawing Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-0 text-lg font-medium focus:ring-0 focus:outline-none w-full"
          />
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
          >
            <XIcon size={20} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2 border rounded hover:bg-gray-50"
            >
              <Palette size={18} style={{ color }} />
            </button>

            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1 p-2 bg-white border rounded-lg shadow-lg z-10 flex flex-wrap gap-2 w-40">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setColor(c);
                      setShowColorPicker(false);
                      if (context) context.strokeStyle = c;
                    }}
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex border rounded overflow-hidden">
            {brushSizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setBrushSize(size);
                  if (context) context.lineWidth = size;
                }}
                className={`p-2 ${brushSize === size ? 'bg-gray-200' : 'hover:bg-gray-50'}`}
              >
                <div
                  className="rounded-full bg-black"
                  style={{ width: size, height: size }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={clearCanvas}
            className="p-2 border rounded hover:bg-gray-50 ml-auto"
          >
            <Trash size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      <div className="relative bg-gray-50 overflow-hidden" style={{ height: "400px" }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="absolute inset-0 w-full h-full cursor-crosshair"
          style={{ touchAction: "none" }}
        />
      </div>

      <div className="p-4 border-t flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={saveDrawing}
          disabled={loading || !title.trim()}
          className={`px-4 py-2 rounded-lg flex items-center gap-1 ${loading || !title.trim()
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
        >
          {loading ? (
            <Loader2Icon size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          Save Drawing
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;