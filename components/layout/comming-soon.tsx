"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CountdownProps {
  targetDate: Date;
}

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit = ({ value, label }: TimeUnitProps) => (
  <div className="flex flex-col items-center">
    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-foreground mb-1 md:mb-2 min-w-[50px] sm:min-w-[60px] md:min-w-[80px]">
      {value.toString().padStart(2, "0")}
    </div>
    <div className="text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted">
      {label}
    </div>
  </div>
);

const CountdownTimer = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-8 mt-6 md:mt-8 px-2">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-muted">
        :
      </span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-muted">
        :
      </span>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-muted">
        :
      </span>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export const CommingSoon = () => {
  // Set target date to 30 days from now (you can change this)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 bg-background">
      <div className="text-center space-y-6 mb-8">
        <span className="block text-xs font-bold tracking-[0.2em] uppercase text-muted">
          Stay Tuned
        </span>
        <h1 className="text-5xl font-serif font-light text-foreground leading-tight">
          Coming Soon
        </h1>
        <p className="text-base text-muted font-light max-w-md mx-auto">
          We&apos;re crafting something special for you
        </p>
      </div>
      <CountdownTimer targetDate={targetDate} />
      <Image
        src="/commingsoon.svg"
        alt="Coming Soon"
        width={600}
        height={600}
        className="mt-8"
        priority
      />
    </div>
  );
};
