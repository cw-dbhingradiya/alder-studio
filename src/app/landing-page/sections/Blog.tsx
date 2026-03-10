import { motion } from "motion/react";
import SectionHeader from "@/components/ui/Header/Header";

const ARTICLES = [
  {
    title: "The Art of Living with Natural Wood",
    date: "Feb 2026",
    tag: "Materials",
    image:
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=800&q=80",
    alt: "Close-up of natural wood grain",
  },
  {
    title: "Scandinavian Minimalism: Less is Home",
    date: "Jan 2026",
    tag: "Design",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    alt: "Clean Scandinavian living room",
  },
  {
    title: "Choosing the Right Sofa for Your Space",
    date: "Dec 2025",
    tag: "Guide",
    image:
      "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=800&q=80",
    alt: "Selection of modern sofas",
  },
  {
    title: "Sustainable Furniture: Why It Matters",
    date: "Nov 2025",
    tag: "Sustainability",
    image:
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=800&q=80",
    alt: "Sustainable woodworking workshop",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function BlogSection() {
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
            label="Design Journal"
            labelJp="Journal"
            number="10"
            category="Insights"
          />
        </motion.div>

        <div className="mb-16 flex items-end justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-4xl font-bold text-white sm:text-5xl"
          >
            Latest Articles
          </motion.h2>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            href="#"
            className="hidden rounded-full border border-neutral-600 px-8 py-3 text-sm font-medium text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-black sm:inline-block"
          >
            VIEW ALL
          </motion.a>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {ARTICLES.map((article) => (
            <motion.article
              key={article.title}
              variants={cardVariant}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-neutral-800/50 transition-colors duration-500 hover:border-neutral-700"
            >
              <div className="aspect-[4/3] overflow-hidden bg-neutral-900">
                <motion.img
                  src={article.image}
                  alt={article.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-neutral-700 px-3 py-1 text-[10px] tracking-wide text-neutral-400 uppercase">
                    {article.tag}
                  </span>
                  <span className="text-xs text-neutral-600">
                    {article.date}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug text-white transition-all duration-500 group-hover:translate-x-1 group-hover:text-neutral-200">
                  {article.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
