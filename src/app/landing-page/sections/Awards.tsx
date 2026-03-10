import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "motion/react";
import SectionHeader from "@/components/ui/Header/Header";

const AWARDS = [
  { label: "Red Dot", count: 12 },
  { label: "IF Design", count: 8 },
  { label: "Good Design", count: 15 },
  { label: "German Design", count: 6 },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = String(Math.round(v)).padStart(2, "0");
      },
    });
    return () => controls.stop();
  }, [isInView, to]);

  return <span ref={ref}>00</span>;
}

export default function AwardsSection() {
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
            label="Recognition"
            labelJp="Awards"
            number="08"
            category="Awards"
          />
        </motion.div>

        <div className="mb-16 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Award-Winning Design
              <span className="text-2xl text-muted-foreground">.™</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Our commitment to quality and innovation has been recognized by
              the world&apos;s most prestigious design institutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="flex items-center justify-end"
          >
            <div className="aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl bg-card">
              <img
                src="/furniture/furniture_05.jpg"
                alt="Award-winning furniture design piece"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {AWARDS.map((award, i) => (
            <motion.div
              key={award.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="flex flex-col items-center rounded-2xl border border-border/50 bg-card/50 p-8 text-center"
            >
              <p className="text-5xl font-bold text-white sm:text-6xl">
                <CountUp to={award.count} />
              </p>
              <p className="mt-2 text-sm tracking-widest text-muted-foreground uppercase">
                {award.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
