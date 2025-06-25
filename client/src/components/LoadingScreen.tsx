import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const phase1Timer = setTimeout(() => setAnimationPhase(1), 200);
    const phase2Timer = setTimeout(() => setAnimationPhase(2), 1500);
    const fadeOutTimer = setTimeout(() => setIsVisible(false), 3000);
    const completeTimer = setTimeout(() => onLoadingComplete(), 3500);

    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  const letters = "WIECODES".split("");

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-dots-gray-400/20"></div>
      </div>

      <div className="relative flex flex-col items-center">
        <div
          className={`transition-all duration-1000 ease-out ${
            animationPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1
            className="text-6xl md:text-8xl font-extrabold tracking-tight text-primary select-none flex gap-x-[2px]"
            style={{
              fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}
          >
            {letters.map((letter, index) => (
              <span
                key={index}
                className={`${animationPhase >= 2 ? 'animate-float' : ''}`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Spinner Icon from Lucide */}
        <div
          className={`mt-8 transition-all duration-500 delay-1000 ${
            animationPhase >= 1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Loader className="w-6 h-6 text-primary animate-spin" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
