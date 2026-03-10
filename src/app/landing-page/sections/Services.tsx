"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import SectionHeader from "@/components/ui/Header/Header";

const SERVICES = [
  {
    number: "01",
    title: "Custom Furniture",
    description:
      "Bespoke pieces designed and built to your exact specifications — from hand-selected hardwoods to custom finishes that match your home perfectly.",
    image: "/service/service_01.jpg",
    alt: "Custom furniture craftsmanship",
  },
  {
    number: "02",
    title: "Interior Styling",
    description:
      "Expert curation of furniture, textiles, and decor to create cohesive living spaces that feel both intentional and effortlessly natural.",
    image: "/service/service_02.jpg",
    alt: "Interior styling and curation",
  },
  {
    number: "03",
    title: "Material Sourcing",
    description:
      "Ethically sourced hardwoods, premium fabrics, and natural materials — every choice reflects our commitment to sustainability and quality.",
    image: "/service/service_03.jpg",
    alt: "Ethically sourced materials",
  },
  {
    number: "04",
    title: "Space Planning",
    description:
      "Precision layouts that maximize flow, function, and beauty — ensuring every piece sits exactly where it belongs in your space.",
    image: "/service/service_04.jpg",
    alt: "Space planning and layout",
  },
];

const TAGS = ["Quality", "Craftsmanship", "Natural", "Made to Order"];
const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

const IMAGE_PREVIEW_VARIANTS = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.3, ease: EASE },
  },
};

const CURSOR_IMAGE_SIZE = { width: 200, height: 150 };

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null,
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredIndex === null) return;
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setCursorPos(null);
  };

  const handleRowEnter = (i: number, e: React.MouseEvent) => {
    setHoveredIndex(i);
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

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
              className="group grid cursor-none gap-4 py-10 transition-colors md:grid-cols-12"
              onMouseEnter={(e) => handleRowEnter(i, e)}
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

        {/* Cursor-following image preview: small image that follows mouse when hovering a service row */}
        <AnimatePresence>
          {hoveredIndex !== null && cursorPos && (
            <motion.div
              key={hoveredIndex}
              variants={IMAGE_PREVIEW_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pointer-events-none fixed z-50 overflow-hidden rounded-lg border border-border bg-card shadow-lg"
              style={{
                left: cursorPos.x - CURSOR_IMAGE_SIZE.width / 2,
                top: cursorPos.y - CURSOR_IMAGE_SIZE.height / 2,
                width: CURSOR_IMAGE_SIZE.width,
                height: CURSOR_IMAGE_SIZE.height,
              }}
            >
              <Image
                src={SERVICES[hoveredIndex].image}
                alt={SERVICES[hoveredIndex].alt}
                fill
                className="object-cover"
                sizes="200px"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
