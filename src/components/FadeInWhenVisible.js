import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
export const FadeInWhenVisible = ({ children, motionProps, className, }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    return (_jsx(motion.div, { ref: ref, initial: { opacity: 0, y: 24 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.6, ease: 'easeOut' }, className: className, ...motionProps, children: children }));
};
