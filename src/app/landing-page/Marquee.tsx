import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Use slower speed variant. Default false */
  slow?: boolean;
  className?: string;
}

/**
 * Infinite horizontal scrolling text marquee.
 * Content is duplicated to create seamless loop effect.
 */
export default function Marquee({
  children,
  slow = false,
  className = "",
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`flex w-max ${slow ? "anim-marquee-slow" : "anim-marquee"}`}>
        <div className="flex shrink-0 items-center gap-8">{children}</div>
        <div className="flex shrink-0 items-center gap-8" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
