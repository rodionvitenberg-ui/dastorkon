'use client';

import { useRef, useEffect, useState, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Particles } from '@/components/ui/particles';
import { Button } from '@/components/ui/button';
import { useAppShell } from '@/components/ui/AppShellContext';

interface NotFoundProps {
  particleCount?: number;
  particleSize?: number;
  /** HSL color cycle — keep false to preserve white particles */
  animate?: boolean;
  /** Optional illustration for light theme. Omit to use typography-only hero. */
  imageLight?: string;
  /** Optional illustration for dark theme. Omit to use typography-only hero. */
  imageDark?: string;
  titleText?: string;
  descriptionText?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
  onButtonClick?: () => void;
}

export default function NotFound({
  particleCount = 4000,
  particleSize = 4,
  animate = false,
  imageLight,
  imageDark,
  titleText = 'Page Not Found',
  descriptionText = "Looks like you've wandered into the nomad steppe. This page doesn't exist.",
  buttonText = 'Back to Home',
  buttonHref = '/',
  className = '',
  onButtonClick,
}: NotFoundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { setChromeHidden } = useAppShell();
  const hasImages = Boolean(imageLight || imageDark);

  // Fullscreen 404: hide global Header/Footer for this page only
  useEffect(() => {
    setChromeHidden(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      setChromeHidden(false);
      document.body.style.overflow = prevOverflow;
    };
  }, [setChromeHidden]);

  const handleMouseMove = (e: MouseEvent) => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / height) * -10;
    const rotateY = ((x - width / 2) / width) * 10;

    image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={hasImages ? handleMouseMove : undefined}
      onMouseLeave={hasImages ? handleMouseLeave : undefined}
      className={`fixed inset-0 z-[60] h-dvh w-full flex items-center justify-center overflow-hidden bg-black ${className}`}
      style={{ perspective: '1000px' }}
    >
      <Particles
        color="#ffffff"
        particleCount={particleCount}
        particleSize={particleSize}
        animate={animate}
        className="absolute inset-0 z-0"
      />

      {hasImages && (
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out will-change-transform pointer-events-none z-10"
        >
          {imageLight && (
            <Image
              src={imageLight}
              alt=""
              fill
              className="object-contain dark:hidden"
              priority
            />
          )}
          {imageDark && (
            <Image
              src={imageDark}
              alt=""
              fill
              className="object-contain hidden dark:block"
              priority
            />
          )}
        </div>
      )}

      <Particles
        color="#ffffff"
        particleCount={Math.floor(particleCount / 2)}
        particleSize={particleSize}
        animate={animate}
        className="absolute inset-0 z-20 pointer-events-none"
      />

      <div className="relative z-30 flex flex-col items-center gap-4 px-4 text-center">
        <h1 className="font-heading text-7xl md:text-9xl font-black text-white/20 select-none tracking-tight">
          404
        </h1>
        <p className="text-lg md:text-xl font-semibold text-white/90">
          {titleText}
        </p>
        <p className="text-sm md:text-base text-white/50 max-w-md">
          {descriptionText}
        </p>
        <Link href={buttonHref} onClick={onButtonClick} className="mt-4">
          <Button
            variant="outline"
            className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
}
