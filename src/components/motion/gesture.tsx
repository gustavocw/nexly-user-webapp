import * as motion from "motion/react-client";
import { ReactNode } from "react";

interface GesturesProps {
  children: ReactNode;
}

export default function Gestures({ children }: GesturesProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.div>
  );
}
