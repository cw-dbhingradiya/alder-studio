import { motion } from "motion/react";
import SectionHeader from "@/components/ui/Header/Header";

const COLLECTIONS = [
  {
    name: "Nordic Living",
    number: "01",
    category: "Sofa Collection",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=80",
    alt: "Modern Scandinavian sofa in bright room",
  },
  {
    name: "Elm Series",
    number: "02",
    category: "Dining Tables",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1400&q=80",
    alt: "Solid wood dining table setting",
  },
  {
    name: "Birch Line",
    number: "03",
    category: "Bedroom Furniture",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    alt: "Minimal bedroom with wooden bed frame",
  },
  {
    name: "Terra Collection",
    number: "04",
    category: "Office Desks",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1400&q=80",
    alt: "Clean workspace with wooden desk",
  },
  {
    name: "Moss Series",
    number: "05",
    category: "Outdoor Living",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    alt: "Outdoor patio with modern furniture",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

export default function ProjectsSection() {
  return (
    <section id="collection" className="bg-[#0A0A0A] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <SectionHeader
            label="Featured Collections"
            labelJp="Collection"
            number="03"
            category="Furniture Design"
          />
        </motion.div>

        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="text-3xl font-medium leading-snug text-white sm:text-4xl">
              Every piece is a chance to blend craftsmanship and design, shaping
              bold ideas into{" "}
              <span className="font-semibold">beautiful living spaces</span> —
              built with intent, quality, and natural materials.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="flex items-end justify-end"
          >
            <a
              href="#collection"
              className="rounded-full border border-neutral-600 px-8 py-3 text-sm font-medium text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-black"
            >
              VIEW ALL
            </a>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6">
          {COLLECTIONS.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
            >
              <motion.div
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-800/50"
                whileHover={{ borderColor: "rgba(163,163,163,0.5)" }}
                transition={{ duration: 0.4 }}
              >
                <div className="aspect-[21/9] w-full overflow-hidden bg-neutral-900">
                  <motion.img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  />
                </div>

                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-8">
                  <div className="flex w-full items-end justify-between">
                    <div>
                      <p className="text-xs text-neutral-400">
                        ({item.number})
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold text-white transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                        {item.name}
                      </h3>
                    </div>
                    <span className="translate-y-2 rounded-full border border-neutral-500 px-4 py-1.5 text-xs text-neutral-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
