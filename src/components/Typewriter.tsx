import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}

const Typewriter = ({ text, speed = 60, className = "", delay = 300 }: TypewriterProps) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
      return () => clearTimeout(timer);
    }
  }, [displayed, text, speed, started]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default Typewriter;
