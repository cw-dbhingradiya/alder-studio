import { motion } from "motion/react";
import SectionHeader from "@/components/ui/Header/Header";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=800&q=80",
    alt: "Woodworking craftsmanship in workshop",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=400&q=80",
    alt: "Natural wood grain texture",
    span: "",
  },
  {
    src: "/furniture/furniture_06.jpg",
    alt: "Finished furniture in sunlit room",
    span: "",
  },
];

export default function ProfileSection() {
  return (
    <section id="about" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <SectionHeader
            label="Our Philosophy"
            labelJp="Materials"
            number="05"
            category="Craftsmanship"
          />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            className="grid grid-cols-3 gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {IMAGES.map((img, i) => (
              <motion.div
                key={i}
                className={img.span || ""}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.7, ease: EASE },
                  },
                }}
                whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
              >
                <div className="h-full overflow-hidden rounded-xl bg-card">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              Every joint, curve, and surface tells a story of patience and
              precision. We believe furniture should age gracefully — growing
              more beautiful with each year of use, not less.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
              className="mt-8 text-2xl font-medium leading-relaxed text-white sm:text-3xl"
            >
              We bridge traditional woodworking with modern design, combining
              hand tools and digital precision into one{" "}
              <span className="font-semibold">seamless craft</span> to create
              furniture that is honest, functional, and built to last
              generations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
              className="mt-10"
            >
              <a
                href="#collection"
                className="rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground transition-all duration-500 hover:border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                VIEW COLLECTIONS
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
