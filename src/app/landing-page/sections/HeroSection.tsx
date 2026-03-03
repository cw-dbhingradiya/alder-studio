import { motion } from "motion/react";

const TAGS = ["Handcrafted", "Sustainable", "Scandinavian", "Timeless"];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-end bg-[#0A0A0A] px-6 pb-20 pt-32"
    >
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/furniture/furniture_07.jpg"
          alt="Modern living room with designer sofa"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-12 flex flex-wrap gap-3">
          {TAGS.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.5 + i * 0.1 }}
              className="rounded-full border border-neutral-700 px-4 py-1.5 text-xs tracking-wide text-neutral-400"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 60, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          className="max-w-4xl text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Timeless Furniture
          <br />
          <span className="text-neutral-500">Designed for the</span>
          <br />
          Way You Live
          <br />
          <span className="text-white">
            Every Day{" "}
            <span className="font-light text-neutral-400">Furniture.</span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1.2 }}
          className="mt-16 flex items-end justify-between border-t border-neutral-800 pt-6"
        >
          <p className="text-xs tracking-widest text-neutral-600 uppercase">
            Based in Copenhagen
          </p>
          <p className="text-xs tracking-widest text-neutral-600 uppercase">
            Furniture Design Studio
          </p>
        </motion.div>
      </div>
    </section>
  );
}
