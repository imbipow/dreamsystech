"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";
import { useHasMounted } from "@/hooks/useHasMounted";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animate?: boolean;
}

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  animate: shouldAnimate = true
}: AnimatedSectionProps) => {
  const hasMounted = useHasMounted();

  if (!hasMounted || !shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
