import { useEffect, useRef, useState } from "react";
    
    interface Point {
      point: [number, number];
      label: string;
    }
    
    interface ImageWithPointsProps {
      imageSrc: string;
      points?: Point[];
      canvasRef: React.RefObject<HTMLCanvasElement>;
    }
    
    export const ImageWithPoints = ({ imageSrc, points = [], canvasRef }: ImageWithPointsProps) => {
      const containerRef = useRef<HTMLDivElement>(null);
      const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
    
      useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container || !points.length) return;
    
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
    
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
          // Set canvas size to match container
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
    
          // Draw image
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
          setImageDimensions({ width: canvas.width, height: canvas.height });
        };
      }, [imageSrc, points, canvasRef]);
    
      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !points.length || !imageDimensions) return;
    
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
    
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
          // Draw image
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
          // Draw points and labels
          points.forEach(({ point, label }) => {
            const [y, x] = point;
            // Convert normalized coordinates to canvas coordinates
            const canvasX = (x / 1000) * imageDimensions.width;
            const canvasY = (y / 1000) * imageDimensions.height;
    
            // Draw point
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
    
            // Draw label
            ctx.font = "14px Arial";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.strokeText(label, canvasX + 10, canvasY);
            ctx.fillText(label, canvasX + 10, canvasY);
          });
        };
      }, [imageSrc, points, canvasRef, imageDimensions]);
    
      return (
        <div ref={containerRef} className="relative w-full h-full">
          <img src={imageSrc} alt="Uploaded" className="w-full rounded-lg" />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          />
        </div>
      );
    };
