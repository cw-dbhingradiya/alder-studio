import { motion } from "motion/react";
import SectionHeader from "@/components/ui/Header/Header";

const SERVICES = [
  {
    number: "01",
    title: "Custom Furniture",
    description:
      "Bespoke pieces designed and built to your exact specifications — from hand-selected hardwoods to custom finishes that match your home perfectly.",
  },
  {
    number: "02",
    title: "Interior Styling",
    description:
      "Expert curation of furniture, textiles, and decor to create cohesive living spaces that feel both intentional and effortlessly natural.",
  },
  {
    number: "03",
    title: "Material Sourcing",
    description:
      "Ethically sourced hardwoods, premium fabrics, and natural materials — every choice reflects our commitment to sustainability and quality.",
  },
  {
    number: "04",
    title: "Space Planning",
    description:
      "Precision layouts that maximize flow, function, and beauty — ensuring every piece sits exactly where it belongs in your space.",
  },
];

const TAGS = ["Quality", "Craftsmanship", "Natural", "Made to Order"];
const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

export default function ServicesSection() {
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
            label="Our Craft"
            labelJp="Handcraft"
            number="04"
            category="What We Do"
          />
        </motion.div>

        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="text-6xl font-bold tracking-tight text-white sm:text-7xl">
              Services
            </h2>
            <p className="mt-2 text-2xl text-neutral-500">(4)</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="flex flex-wrap gap-3"
          >
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-700 px-4 py-1.5 text-xs tracking-wide text-neutral-400 transition-colors duration-300 hover:border-neutral-500 hover:text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="grid gap-0 divide-y divide-neutral-800 w-[64%] ml-auto relative">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className="group grid gap-6 py-8 transition-colors md:grid-cols-12"
            >
              <div className="md:col-span-1">
                <span className="text-sm font-medium text-neutral-600 transition-colors duration-300 group-hover:text-neutral-400">
                  {service.number}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-semibold text-white transition-all duration-500 group-hover:translate-x-2 group-hover:text-neutral-200">
                  {service.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-base leading-relaxed text-neutral-500 transition-colors duration-300 group-hover:text-neutral-400">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
