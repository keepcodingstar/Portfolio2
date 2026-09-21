'use client';

import { useEffect, useId, useRef } from 'react';

interface ShootingStarsProps {
  paused?: boolean;
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

/** One decorative streak. DOM transforms avoid a React render every frame;
 * its timer and animation both stop when hidden or unmounted. */
export default function ShootingStars({
  paused = false,
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = '#9E00FF',
  trailColor = '#2EB9DF',
  starWidth = 10,
  starHeight = 1,
  className,
}: ShootingStarsProps) {
  const streak = useRef<SVGRectElement>(null);
  const gradient = useId();

  useEffect(() => {
    const element = streak.current;
    if (!element || paused) return;
    let timer = 0;
    let frame = 0;
    const createStar = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const side = Math.floor(Math.random() * 4);
      let x = side === 1 ? width : side === 3 ? 0 : Math.random() * width;
      let y = side === 0 ? 0 : side === 2 ? height : Math.random() * height;
      const angle = 45 + side * 90;
      const radians = angle * Math.PI / 180;
      const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
      let distance = 0;
      let previous = 0;
      const move = (now: number) => {
        const step = speed * (previous ? Math.min(now - previous, 32) / (1000 / 60) : 1);
        previous = now;
        x += step * Math.cos(radians);
        y += step * Math.sin(radians);
        distance += step;
        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) {
          element.style.opacity = '0';
          timer = window.setTimeout(createStar, minDelay + Math.random() * (maxDelay - minDelay));
          return;
        }
        element.setAttribute('transform', `translate(${x} ${y}) rotate(${angle}) scale(${1 + distance / 100} 1)`);
        element.style.opacity = '1';
        frame = requestAnimationFrame(move);
      };
      frame = requestAnimationFrame(move);
    };
    timer = window.setTimeout(createStar, minDelay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      element.style.opacity = '0';
    };
  }, [paused, minSpeed, maxSpeed, minDelay, maxDelay]);

  return (
    <svg className={`w-full h-full absolute inset-0${className ? ` ${className}` : ''}`}>
      <rect ref={streak} width={starWidth} height={starHeight} fill={`url(#${gradient})`} style={{ opacity: 0 }} />
      <defs>
        <linearGradient id={gradient} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={trailColor} stopOpacity={0} />
          <stop offset="100%" stopColor={starColor} stopOpacity={1} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export { ShootingStars };
