import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, VolumeX, Play, Pause, ChevronDown, Compass, PhoneCall } from 'lucide-react';

export const Hero: React.FC = () => {
  const { navigateToSection, setCurrentView } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const videoSources = [
    '/assets/aistudio/WhatsApp_Video_2026-11-01_at_12.09.18_AM_f179ca0d.mp4',
    '/assets/aistudio/WhatsApp_Video_2026-11-01_at_12.09.17_AM_27cc9320.mp4'
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay may be restricted without user interaction
        setIsPlaying(false);
      });
    }
  }, [activeVideoIndex]);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]">
      {/* Background Video with Fallback */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Fallback Image */}
        <img
          src="/assets/aistudio/image_d0c4bca0.png"
          alt="VANTERRA Luxury Estate"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Cinematic Video Element */}
        <video
          ref={videoRef}
          src={videoSources[activeVideoIndex]}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-10000 ease-out"
        />

        {/* Multi-layered cinematic gradient scrims for pristine text legibility */}
        <div className="absolute inset-0 bg-[#080808]/65 backdrop-contrast-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/30 to-[#080808]/80 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center flex flex-col items-center">
        {/* Brand Kicker */}
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-8 sm:w-12 h-[1px] bg-[#C6A66B]/60" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#C6A66B] font-medium font-sans">
            VANTERRA PROPERTIES
          </span>
          <span className="w-8 sm:w-12 h-[1px] bg-[#C6A66B]/60" />
        </div>

        {/* Primary Tagline */}
        <p className="text-xs sm:text-sm font-mono tracking-[0.3em] text-[#A7A7A7] uppercase mb-4">
          LUXURY · POWER · PRESTIGE
        </p>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#F5F1E8] max-w-4xl leading-[1.12] mb-6 text-balance">
          Discover Exceptional Properties.{' '}
          <span className="italic text-[#C6A66B] font-normal">Invest in Extraordinary Possibilities.</span>
        </h1>

        {/* Supporting Description */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#F5F1E8]/85 font-light leading-relaxed mb-10 text-balance">
          Explore an exclusive collection of exceptional residences, prestigious addresses, and international real estate opportunities designed for those who expect more.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={() => navigateToSection('properties-section')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#C6A66B] text-[#080808] hover:bg-[#d8b97d] transition-all duration-300 text-xs font-semibold tracking-[0.22em] uppercase cursor-pointer shadow-lg shadow-[#C6A66B]/20"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Properties</span>
          </button>

          <button
            onClick={() => {
              setCurrentView('consultation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-[#C6A66B]/70 text-[#F5F1E8] hover:border-[#C6A66B] hover:bg-[#C6A66B]/15 transition-all duration-300 text-xs font-semibold tracking-[0.22em] uppercase cursor-pointer backdrop-blur-xs"
          >
            <PhoneCall className="w-4 h-4 text-[#C6A66B]" />
            <span>Private Consultation</span>
          </button>
        </div>

        {/* Key International Locations Ticker */}
        <div className="mt-14 pt-8 border-t border-[#C6A66B]/20 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] uppercase tracking-[0.25em] text-[#A7A7A7]">
          <span>New York HQ</span>
          <span className="w-1 h-1 rounded-full bg-[#C6A66B]" />
          <span>Milan Office</span>
          <span className="w-1 h-1 rounded-full bg-[#C6A66B]" />
          <span>London</span>
          <span className="w-1 h-1 rounded-full bg-[#C6A66B]" />
          <span>Miami</span>
          <span className="w-1 h-1 rounded-full bg-[#C6A66B]" />
          <span>Palm Beach</span>
        </div>
      </div>

      {/* Cinematic Controls (Bottom Right) */}
      <div className="absolute bottom-8 right-6 z-20 hidden md:flex items-center gap-2 bg-[#080808]/80 backdrop-blur-md px-3 py-1.5 border border-[#C6A66B]/30 rounded-none text-xs">
        <button
          onClick={toggleSound}
          className="p-1.5 text-[#F5F1E8] hover:text-[#C6A66B] transition-colors focus:outline-none cursor-pointer"
          title={isMuted ? 'Unmute walkthrough audio' : 'Mute audio'}
          aria-label="Toggle sound"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#C6A66B]" />}
        </button>

        <span className="w-[1px] h-3 bg-[#333]" />

        <button
          onClick={togglePlay}
          className="p-1.5 text-[#F5F1E8] hover:text-[#C6A66B] transition-colors focus:outline-none cursor-pointer"
          title={isPlaying ? 'Pause cinematic reel' : 'Play cinematic reel'}
          aria-label="Toggle playback"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#C6A66B]" />}
        </button>

        <span className="w-[1px] h-3 bg-[#333]" />

        <button
          onClick={() => setActiveVideoIndex((prev) => (prev === 0 ? 1 : 0))}
          className="px-2 py-1 text-[10px] uppercase tracking-wider text-[#A7A7A7] hover:text-[#C6A66B] transition-colors focus:outline-none cursor-pointer font-mono"
          title="Switch property reel"
        >
          Reel {activeVideoIndex + 1}/2
        </button>
      </div>

      {/* Scroll Down Indicator (Bottom Center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6A66B]/70 mb-2 font-mono">
          Scroll
        </span>
        <div className="w-5 h-8 border border-[#C6A66B]/40 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-[#C6A66B] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
