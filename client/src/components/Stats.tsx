
import React, { useState, useEffect, useRef } from 'react';
import { Users, Download, Star, Code } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Happy Developers"
  },
  {
    icon: Download,
    value: 2000000,
    suffix: "+",
    label: "Downloads"
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    label: "Average Rating"
  },
  {
    icon: Code,
    value: 1200,
    suffix: "+",
    label: "Code Templates"
  }
];

const AnimatedCounter = ({ value, suffix, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * value);
      
      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value, duration]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k';
    }
    return num.toString();
  };

  return (
    <div ref={ref} className="count-animation">
      {value === 4.9 ? count.toFixed(1) : formatNumber(count)}{suffix}
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-primary-foreground rounded-full floating-animation"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-primary-foreground rounded-lg transform rotate-45 floating-animation" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-primary-foreground floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-primary-foreground rounded-full floating-animation" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="flex justify-center mb-4">
                <div className="bg-primary-foreground/10 p-4 rounded-full hover-scale pulse-glow">
                  <stat.icon className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <div className="text-4xl lg:text-5xl font-heading font-bold mb-2">
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix}
                  duration={2000 + index * 200}
                />
              </div>
              <div className="text-primary-foreground/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
