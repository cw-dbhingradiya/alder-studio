"use client";

import Link from "next/link";
import { motion } from "motion/react";

/**
 * Testimonial cards data: quote, author, role, avatar and optional logo.
 * Matches the Framer-style layout with card body, divider, and user block.
 */
const TESTIMONIALS = [
  {
    quote:
      "Akihiko elevated every layer of our brand's online presence. From motion details to structural layout, every piece felt crafted and intentional. The site not only looked beautiful but performed well too — and the entire collaboration process was smooth.",
    name: "Lisa Kuroda",
    role: "Founder, Studio Analog",
    image:
      "https://framerusercontent.com/images/nfHihiND3hFVe8PsrYPUstbAcQ.jpg?width=512&height=512",
    logo: "https://framerusercontent.com/images/liDp6RqOmZpoiyriU2da9i9ZRNM.png",
  },
  {
    quote:
      "Akihiko approaches every project with a deep sense of purpose. His work is never just about the surface — it's about how each element functions, connects, and flows. He brings logic, sharpness, and confidence to every decision, and his build quality.",
    name: "Daniel Reyes",
    role: "Director, Framehaus",
    image:
      "https://framerusercontent.com/images/1NojF9yywMvqzHNbp79Nt0uTs.png?width=512&height=512",
    logo: "https://framerusercontent.com/images/liDp6RqOmZpoiyriU2da9i9ZRNM.png",
  },
  {
    quote:
      "His ability to merge storytelling with clean interaction design is unmatched. Akihiko understands not just how things should look, but why they should look that way — and that insight came through in every part of the work.",
    name: "Mei Tanaka",
    role: "UX Designer, Nuro",
    image:
      "https://framerusercontent.com/images/3I9yi7BmKFs7ilmb0ijcCQZSZfo.png?width=512&height=512",
    logo: "https://framerusercontent.com/images/liDp6RqOmZpoiyriU2da9i9ZRNM.png",
  },
  {
    quote:
      "Working with Akihiko was more than just hiring a designer — it felt like bringing on a creative partner who truly understood our goals. He took our raw ideas, added clarity, and transformed them into something that not only looked stunning.",
    name: "Julian Pierce",
    role: "Director, Vektor Inc.",
    image:
      "https://framerusercontent.com/images/CqJ0xMtE2jw5wg8qA63IwRzImN0.png?width=512&height=512",
    logo: "https://framerusercontent.com/images/liDp6RqOmZpoiyriU2da9i9ZRNM.png",
  },
  {
    quote:
      "Akihiko brings a rare balance of creativity and discipline. He's incredibly fast without ever sacrificing attention to detail. From early ideation to the final product, his process is intentional, his communication is clear.",
    name: "Hana Samoto",
    role: "CEO, Willow Studio",
    image:
      "https://framerusercontent.com/images/vYFurv3Bhpru2Pn28GNGdN5WOk.png?width=512&height=512",
    logo: "https://framerusercontent.com/images/liDp6RqOmZpoiyriU2da9i9ZRNM.png",
  },
];

/** Placeholder logos for background slider (can be replaced with real brand logos). */
const LOGO_SLIDER_ITEMS = [
  "Studio Analog",
  "Framehaus",
  "Nuro",
  "Vektor Inc.",
  "Willow Studio",
  "Alder",
  "Studio Analog",
  "Framehaus",
  "Nuro",
  "Vektor Inc.",
  "Willow Studio",
  "Alder",
];

const EASE = [0.16, 1, 0.3, 1] as const;
/** Each card animates when it enters view; amount 0.2 gives one-by-one feel as user scrolls. */
const CARD_VIEWPORT = { once: true, amount: 0.2 };

/** Checkmark icon for verified user (inline SVG to avoid extra assets). */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M225.86 102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28 23.51 138.44 16 128 16s-18.27 7.51-25.18 14.14c-3.94 3.77-8 7.67-11.57 9.14C88 40.64 82.56 40.72 77.31 40.8c-9.76.15-20.82.31-28.51 8S41 67.55 40.8 77.31c-.08 5.25-.16 10.67-1.52 13.94-1.47 3.56-5.37 7.63-9.14 11.57C23.51 109.72 16 117.56 16 128s7.51 18.27 14.14 25.18c3.77 3.94 7.67 8 9.14 11.57 1.36 3.27 1.44 8.69 1.52 13.94.15 9.76.31 20.82 8 28.51s18.75 7.85 28.51 8c5.25.08 10.67.16 13.94 1.52 3.56 1.47 7.63 5.37 11.57 9.14C109.72 232.49 117.56 240 128 240s18.27-7.51 25.18-14.14c3.94-3.77 8-7.67 11.57-9.14 3.27-1.36 8.69-1.44 13.94-1.52 9.76-.15 20.82-.31 28.51-8s7.85-18.75 8-28.51c.08-5.25.16-10.67 1.52-13.94 1.47-3.56 5.37-7.63 9.14-11.57C232.49 146.28 240 138.44 240 128s-7.51-18.27-14.14-25.18zm-52.2 6.84l-56 56a8 8 0 01-11.32 0l-24-24a8 8 0 0111.32-11.32L112 148.69l50.34-50.35a8 8 0 0111.32 11.32z"
      />
    </svg>
  );
}

type Testimonial = (typeof TESTIMONIALS)[number];

function TestimonialCard({
  testimonial: t,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={CARD_VIEWPORT}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.1 }}
      className="flex flex-col rounded-[10px] border border-border/20 bg-card"
    >
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-subtle">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>
      <div className="border-t border-border/20" />
      <div className="flex items-center gap-4 p-6">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[5px] bg-muted">
          <img
            src={t.image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-medium text-foreground">
              {t.name}
            </p>
            <span className="text-primary" aria-hidden>
              <CheckIcon className="h-4 w-4" />
            </span>
          </div>
          <p className="truncate text-xs text-muted-foreground">{t.role}</p>
        </div>
        {t.logo && (
          <div className="relative h-8 w-14 shrink-0 overflow-hidden rounded object-contain">
            <img
              src={t.logo}
              alt=""
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative bg-[#0A0A0A]">
      {/* 1) Logo slider first — sticky so it stays visible while cards scroll in below. */}
      <div className="sticky top-16 z-0 flex min-h-[70vh] w-full flex-col justify-center overflow-hidden border-b border-neutral-800/10 bg-[#0A0A0A]">
        <div
          className="flex flex-col justify-center gap-12 py-16 opacity-[0.08] md:gap-16 md:opacity-[0.1]"
          aria-hidden
        >
          <div className="flex w-max animate-logo-slider items-center gap-16 md:gap-24">
            {[...LOGO_SLIDER_ITEMS, ...LOGO_SLIDER_ITEMS].map((label, i) => (
              <span
                key={`row1-${i}`}
                className="shrink-0 text-3xl font-bold tracking-tight text-white md:text-[72px]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2) Cards scroll in one by one with scroll-triggered animation. */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-48">
          {/* Row 1: first two cards */}
          {TESTIMONIALS.slice(0, 2).map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
          {/* Row 2: single centered card */}
          <div className="md:col-span-2 md:flex md:justify-center">
            <div className="w-full md:max-w-[480px]">
              <TestimonialCard testimonial={TESTIMONIALS[2]} index={2} />
            </div>
          </div>
          {/* Row 3: last two cards */}
          {TESTIMONIALS.slice(3, 5).map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
