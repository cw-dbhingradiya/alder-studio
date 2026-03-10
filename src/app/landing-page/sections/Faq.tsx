import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeader from "@/components/ui/Header/Header";

const FAQS = [
  {
    q: "What materials do you use?",
    a: "We work primarily with solid hardwoods — white oak, walnut, ash, and teak — all sourced from certified sustainable forests. We also use premium natural fabrics like linen, wool, and leather for upholstery.",
  },
  {
    q: "How long does custom furniture take?",
    a: "Most custom pieces take 8–12 weeks from design approval to delivery. Complex projects involving multiple rooms can take 16–20 weeks. We keep you updated throughout the entire process.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship worldwide. All furniture is professionally packed in custom crates and shipped via white-glove courier services to ensure every piece arrives in perfect condition.",
  },
  {
    q: "Can I visit your showroom?",
    a: "Absolutely. Our Copenhagen flagship showroom is open Monday–Saturday. We also have seasonal pop-ups in Stockholm and London. Book an appointment for a private walkthrough with one of our designers.",
  },
  {
    q: "What's your return policy?",
    a: "We offer a 30-day satisfaction guarantee on all stock pieces. Custom-made furniture is non-refundable but we work closely with you throughout the design process to ensure you love the final result.",
  },
  {
    q: "Do you offer interior design services?",
    a: "Yes — from single-room refreshes to full-home furnishing. Our design team handles everything: space planning, material selection, 3D rendering, sourcing, and white-glove installation.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <SectionHeader
            label="Common Questions"
            labelJp="FAQ"
            number="11"
            category="FAQ"
          />
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Frequently Asked <br /> Questions
              <span className="text-muted-foreground">.™</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Everything you need to know about our process, materials, and
              services. Don&apos;t see your question?{" "}
              <a
                href="#contact"
                className="text-foreground underline underline-offset-4 transition-colors duration-300 hover:text-label"
              >
                Get in touch.
              </a>
            </p>
          </motion.div>

          <div className="divide-y divide-divider">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="flex w-full items-center justify-between py-6 text-left"
                >
                  <span className="pr-4 text-base font-medium text-foreground transition-colors duration-300 hover:text-label">
                    {faq.q}
                  </span>
                  <motion.span
                    className="shrink-0 text-xl text-muted-foreground"
                    animate={{ rotate: openIdx === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIdx === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
