import { motion } from "motion/react";

import Marquee from "../Marquee";

const TAGS = ["Sustainable", "Handcrafted", "Scandinavian", "Premium Oak"];
const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

const IMAGES = [
  {
    src: "/furniture/furniture_01.jpg",
    alt: "Modern sofa in living room",
  },
  {
    src: "/furniture/furniture_02.jpg",
    alt: "Minimalist interior design",
  },
  {
    src: "/furniture/furniture_03.jpg",
    alt: "Styled living space",
  },
  {
    src: "/furniture/furniture_04.jpg",
    alt: "Modern furniture detail",
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function AboutSection() {
  return (
    <section className="bg-[#0A0A0A] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* <Header
            label="Curated Interiors"
            labelJp="Interior"
            number="02"
            category="Furniture Design"
          /> */}
        </motion.div>

        <Marquee className="mb-16 border-y border-neutral-800/50 py-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="text-5xl font-bold tracking-tight text-neutral-800 sm:text-7xl"
            >
              Alder&Co™
            </span>
          ))}
        </Marquee>

        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl">
              Alder<span className="align-super text-lg">®</span>
            </h2>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {TAGS.map((tag) => (
                <motion.span
                  key={tag}
                  variants={staggerItem}
                  className="rounded-full border border-neutral-700 px-4 py-1.5 text-xs tracking-wide text-neutral-400 transition-colors duration-300 hover:border-neutral-500 hover:text-neutral-300"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            <p className="text-2xl font-medium leading-relaxed text-white sm:text-3xl">
              <span className="text-neutral-500">15+</span> years
              <span className="align-super text-xs text-neutral-600">™</span> of
              crafting furniture that turns houses into homes, with an obsession
              for natural materials and timeless form.
            </p>

            <motion.div className="mt-10" whileHover={{ scale: 1.02 }}>
              <a
                href="#collection"
                className="inline-block rounded-full border border-neutral-600 px-8 py-3 text-sm font-medium text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-black"
              >
                Explore Collection
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.6, ease: EASE },
                },
              }}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className="aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
