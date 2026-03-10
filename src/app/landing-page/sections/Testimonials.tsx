import { motion } from "motion/react";
import SectionHeader from "@/components/ui/Header/Header";

const TESTIMONIALS = [
  {
    quote:
      "The dining table Alder crafted for us is the heart of our home now. Every meal feels special. The walnut grain is stunning and the joinery is flawless — you can feel the craftsmanship in every detail.",
    name: "Emma Lindström",
    title: "Homeowner, Stockholm",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    quote:
      "We furnished our entire office with Alder pieces. The team understood our vision instantly — clean lines, warm materials, functional beauty. Six months in and everything still looks brand new.",
    name: "Marcus Holt",
    title: "Founder, Haus Studio",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
  {
    quote:
      "What sets Alder apart is their obsession with material quality. They flew me to their workshop to pick the exact slab of oak for my bookshelf. That level of care is incredibly rare.",
    name: "Sofia Nakamura",
    title: "Interior Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
  },
  {
    quote:
      "From initial sketch to final delivery, working with Alder felt like a true partnership. They transformed our living room from empty space into the warmest room in our apartment.",
    name: "Thomas Eriksen",
    title: "Architect, Oslo",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
  },
  {
    quote:
      "Sustainable, beautiful, and built to last — Alder delivered on every promise. Our bedroom set is a masterpiece of Scandinavian design. We couldn't be happier with the result.",
    name: "Ingrid Voss",
    title: "Homeowner, Copenhagen",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.1 };

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function TestimonialsSection() {
  return (
    <section className="bg-[#0A0A0A] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <SectionHeader
            label="Testimonials"
            labelJp="Voices"
            number="07"
            category="Happy Homes"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12 flex items-center justify-between"
        >
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            What Our Clients Say<span className="align-super text-sm">©</span>
          </h2>
          <a
            href="#contact"
            className="hidden rounded-full border border-neutral-600 px-8 py-3 text-sm font-medium text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-black sm:inline-block"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariant}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-800/50 bg-neutral-900/50 p-8 transition-colors duration-500 hover:border-neutral-700 hover:bg-neutral-900/80"
            >
              <blockquote className="text-base leading-relaxed text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-800">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-neutral-500">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
