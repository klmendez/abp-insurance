import { motion, type MotionProps } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { PropsWithChildren } from 'react';

type FadeInWhenVisibleProps = PropsWithChildren<{
  motionProps?: MotionProps;
  className?: string;
}>;

export const FadeInWhenVisible = ({
  children,
  motionProps,
  className,
}: FadeInWhenVisibleProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};
