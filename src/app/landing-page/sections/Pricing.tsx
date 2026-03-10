import { motion } from "motion/react";
import SectionHeader from "@/components/ui/Header/Header";

const PLANS = [
  {
    name: "Room Refresh",
    price: "$2,500",
    period: "per room",
    features: [
      "Furniture selection for 1 room",
      "Colour & material palette",
      "Layout plan",
      "2 revision rounds",
      "4-week delivery",
    ],
    highlighted: false,
  },
  {
    name: "Full Room Design",
    price: "$6,500",
    period: "per room",
    features: [
      "Custom furniture design",
      "Full interior styling",
      "Material sourcing",
      "3D visualization",
      "8-week delivery",
      "Installation included",
    ],
    highlighted: true,
  },
  {
    name: "Whole Home",
    price: "$18,000",
    period: "starting",
    features: [
      "Every room designed & furnished",
      "Bespoke pieces included",
      "Dedicated design lead",
      "Unlimited revisions",
      "12-week timeline",
      "White-glove installation",
    ],
    highlighted: false,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

export default function PricingSection() {
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
            label="Design Packages"
            labelJp="Plans"
            number="09"
            category="Pricing"
          />
        </motion.div>

        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-4xl font-bold text-white sm:text-5xl"
          >
            Invest in Spaces You Love
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            Transparent pricing for every scope — from a single statement piece
            to a completely furnished home.
          </motion.p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className={`flex flex-col justify-between rounded-2xl border p-8 transition-colors duration-500 ${
                plan.highlighted
                  ? "border-input bg-primary-foreground text-primary"
                  : "border-border/50 bg-card/50 text-foreground hover:border-border"
              }`}
            >
              <div>
                <p
                  className={`text-sm font-medium tracking-widest uppercase ${plan.highlighted ? "text-muted-foreground" : "text-muted-foreground"}`}
                >
                  {plan.name}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span
                    className={`text-sm ${plan.highlighted ? "text-muted-foreground" : "text-muted-foreground"}`}
                  >
                    {plan.period}
                  </span>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-3 text-sm ${plan.highlighted ? "text-label" : "text-subtle"}`}
                    >
                      <span
                        className={`text-xs ${plan.highlighted ? "text-black" : "text-white"}`}
                      >
                        &#10003;
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`mt-10 w-full rounded-full py-3 text-sm font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                    : "border border-border bg-transparent text-foreground hover:bg-primary-foreground hover:text-primary"
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
