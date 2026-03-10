import { motion } from "motion/react";

const FOOTER_LINKS = {
  Collections: ["Sofas", "Dining", "Bedroom", "Office", "Outdoor"],
  Services: [
    "Custom Design",
    "Interior Styling",
    "Space Planning",
    "Consultation",
  ],
  Company: ["About", "Showrooms", "Sustainability", "Careers", "Press"],
  Support: ["Contact", "FAQ", "Shipping", "Returns", "Care Guide"],
};

const SOCIAL = ["Instagram", "Pinterest", "LinkedIn"];
const EASE = [0.16, 1, 0.3, 1] as const;
/* Trigger as soon as any part of footer enters view so it's visible when user scrolls to bottom. */
const VIEWPORT = { once: true, amount: 0 };

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 shrink-0 border-t border-border bg-background px-6 pt-20 pb-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
            className="sm:col-span-2 lg:col-span-2"
          >
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Alder<span className="align-super text-sm">®</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Timeless Scandinavian furniture, handcrafted with sustainably
              sourced materials. Designed in Copenhagen, delivered worldwide.
            </p>
            <div className="mt-6 flex gap-4">
              {SOCIAL.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {s}
                </a>
              ))}
            </div>
          </motion.div>

          {Object.entries(FOOTER_LINKS).map(([title, links], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.06 }}
            >
              <h3 className="mb-4 text-xs font-semibold tracking-widest text-subtle uppercase">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row"
        >
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Alder&Co. All rights reserved.
          </p>
          <p className="text-xs text-subtle">
            Crafted with care in Copenhagen
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
