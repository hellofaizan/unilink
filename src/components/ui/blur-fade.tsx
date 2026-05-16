"use client"

import { useRef } from "react"
import {
  motion,
  useInView,
  type MotionProps,
  type UseInViewOptions,
  type Variants,
} from "motion/react"

type MarginType = UseInViewOptions["margin"]

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode
  className?: string
  duration?: number
  delay?: number
  offset?: number
  direction?: "up" | "down" | "left" | "right"
  /** Only animate when scrolled into view. Off = show immediately (no flicker above the fold). */
  inView?: boolean
  inViewMargin?: MarginType
}

export function BlurFade({
  children,
  className,
  duration = 0.45,
  delay = 0,
  offset = 12,
  direction = "up",
  inView = true,
  inViewMargin = "-80px",
  ...props
}: BlurFadeProps) {
  const ref = useRef(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const shouldAnimate = inView ? inViewResult : true

  const axis = direction === "left" || direction === "right" ? "x" : "y"
  const hiddenOffset =
    direction === "right" || direction === "down" ? -offset : offset

  const variants: Variants = {
    hidden: {
      [axis]: hiddenOffset,
      opacity: 0,
    },
    visible: {
      [axis]: 0,
      opacity: 1,
    },
  }

  return (
    <motion.div
      ref={ref}
      initial={inView ? "hidden" : false}
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={variants}
      transition={{
        delay,
        duration,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
