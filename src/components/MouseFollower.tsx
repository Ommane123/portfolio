import React, { useEffect, useRef, useState } from 'react';

export const MouseFollower: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device supports coarse pointer (touch device)
    const checkTouch = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
      setIsMobile(isTouch);
      if (!isTouch) {
        document.body.classList.add('custom-cursor-active');
      } else {
        document.body.classList.remove('custom-cursor-active');
      }
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isMobile) return;

    const mousePos = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check if mouse is hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = 
          target.closest('a') || 
          target.closest('button') || 
          target.closest('[role="button"]') || 
          target.closest('.interactive-card') ||
          window.getComputedStyle(target).cursor === 'pointer';
        
        setIsHovered(!!isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Damping/Spring loop
    let animationFrameId: number;
    const updatePosition = () => {
      // Small dot follows immediately with small delay
      dotPos.x += (mousePos.x - dotPos.x) * 0.3;
      dotPos.y += (mousePos.y - dotPos.y) * 0.3;

      // Outer ring follows with larger damping (lag/spring effect)
      ringPos.x += (mousePos.x - ringPos.x) * 0.15;
      ringPos.y += (mousePos.y - ringPos.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isMobile, isVisible]);

  if (isMobile) return null;

  return (
    <>
      {/* Small center dot */}
      <div
        ref={dotRef}
        style={{ opacity: isVisible ? 1 : 0 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-50 transition-opacity duration-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
      />
      {/* Larger lagging ring */}
      <div
        ref={ringRef}
        style={{ opacity: isVisible ? 1 : 0 }}
        className={`fixed top-0 left-0 rounded-full border-2 pointer-events-none z-50 transition-[width,height,background-color,border-color,opacity] duration-300 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center
          ${isHovered 
            ? 'w-14 h-14 border-cyan-400 bg-cyan-400/10 shadow-[0_0_20px_rgba(6,182,212,0.5)]' 
            : 'w-8 h-8 border-purple-500 bg-transparent shadow-[0_0_10px_rgba(188,59,255,0.2)]'
          }
        `}
      />
    </>
  );
};
