"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const leaves = [
  { id: 1, x: 10, size: 20, delay: 0, duration: 15, rotation: 0 },
  { id: 2, x: 30, size: 15, delay: 2, duration: 18, rotation: 45 },
  { id: 3, x: 50, size: 25, delay: 4, duration: 20, rotation: 90 },
  { id: 4, x: 70, size: 18, delay: 1, duration: 16, rotation: 135 },
  { id: 5, x: 85, size: 22, delay: 3, duration: 19, rotation: 180 },
  { id: 6, x: 20, size: 12, delay: 5, duration: 22, rotation: 225 },
  { id: 7, x: 60, size: 16, delay: 6, duration: 17, rotation: 270 },
  { id: 8, x: 90, size: 14, delay: 2.5, duration: 21, rotation: 315 },
];

export default function FloatingLeaves() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute top-0 opacity-20 dark:opacity-10"
          style={{ left: `${leaf.x}%` }}
          animate={{
            y: ["-10vh", "110vh"],
            x: [0, 30, -20, 10, 0],
            rotate: [leaf.rotation, leaf.rotation + 360],
            opacity: [0, 0.3, 0.5, 0.3, 0],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: "linear",
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-forest-600"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
