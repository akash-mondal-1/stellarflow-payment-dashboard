import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({
  value,
  decimals = 4,
  duration = 1,
  className = '',
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState('0.0000');
  const prevValue = useRef(0);

  const spring = useSpring(prevValue.current, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  });

  const display = useTransform(spring, (latest) =>
    latest.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );

  useEffect(() => {
    spring.set(value);
    prevValue.current = value;
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => setDisplayValue(v));
    return unsubscribe;
  }, [display]);

  return (
    <motion.span className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
}
