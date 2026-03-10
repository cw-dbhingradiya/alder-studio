import { motion } from "motion/react";
import SectionHeader from "@/components/ui/Header/Header";
import Marquee from "../Marquee";

const MILESTONES = [
  {
    name: "Copenhagen Flagship",
    period: "2022 – present",
    role: "Design Studio & Showroom",
    location: "Copenhagen",
  },
  {
    name: "Stockholm Showroom",
    period: "2020 – 2022",
    role: "Retail & Exhibition Space",
    location: "Stockholm",
  },
  {
    name: "Berlin Workshop",
    period: "2018 – 2020",
    role: "Production & Prototyping",
    location: "Berlin",
  },
  {
    name: "London Pop-Up",
    period: "2016 – 2018",
    role: "Seasonal Collections",
    location: "London",
  },
  {
    name: "Oslo Studio",
    period: "2014 – 2016",
    role: "Founding Atelier",
    location: "Oslo",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

export default function ExperienceSection() {
  return (
    <section className="bg-[#0C0C0C] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <SectionHeader
            label="Our Journey"
            labelJp="History"
            number="06"
            category="Milestones"
          />
        </motion.div>

        <div className="mb-16 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="text-6xl font-bold leading-none tracking-tight text-white sm:text-8xl">
              Heritage.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <div className="flex flex-wrap gap-3">
              {["Global", "Showrooms", "Ateliers", "Craftsmanship"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-700 px-4 py-1.5 text-xs tracking-wide text-neutral-400 transition-colors duration-300 hover:border-neutral-500 hover:text-neutral-300"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </motion.div>
        </div>

        <Marquee slow className="mb-12 border-y border-neutral-800/50 py-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="text-3xl font-bold tracking-tight text-neutral-800 sm:text-5xl"
            >
              Since 2014.
            </span>
          ))}
        </Marquee>

        <div className="divide-y divide-neutral-800">
          {MILESTONES.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className="group grid gap-4 py-8 transition-colors sm:grid-cols-12"
            >
              <div className="sm:col-span-4">
                <h3 className="text-lg font-semibold text-white transition-all duration-500 group-hover:translate-x-2">
                  {item.name}
                </h3>
              </div>
              <div className="sm:col-span-3">
                <p className="text-sm text-neutral-500">{item.period}</p>
              </div>
              <div className="sm:col-span-3">
                <p className="text-sm text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300">
                  {item.role}
                </p>
              </div>
              <div className="sm:col-span-2 sm:text-right">
                <p className="text-sm text-neutral-600">{item.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
