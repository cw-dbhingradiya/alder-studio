"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const images = [
  {
    src: "/furniture/gallery_01.jpg",
    imageClass: "-rotate-y-90",
    style: {
      top: "calc(49.6241% - 107.5px)",
      left: "calc(-.161551% - 160px)",
    },
  },
  {
    src: "/furniture/gallery_02.jpg",
    wrapperClass: "rotate-y-45",
    imageClass: "top-[18px] -left-[161px] -rotate-y-90",
  },
  {
    src: "/furniture/gallery_03.jpg",
    wrapperClass: "rotate-y-90",
    imageClass: "top-[58px] -left-[161px] -rotate-y-90",
  },
  {
    src: "/furniture/gallery_04.jpg",
    wrapperClass: "rotate-y-135",
    imageClass: "top-[98px] -left-[161px] -rotate-y-90",
  },
  {
    src: "/furniture/gallery_05.jpg",
    wrapperClass: "rotate-y-180",
    imageClass: "top-[138px] -left-[161px] -rotate-y-90",
  },
];

const ScrollGallery = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0.4, 0.6], [240, -200]);
  const rotateY = useTransform(scrollYProgress, [0.4, 0.6], [90, -90]);

  return (
    <section ref={sectionRef} className="bg-black relative">
      <div className="sticky top-0 z-1 flex h-screen w-full flex-col items-center justify-center gap-[36px]">
        <div className="relative flex h-px w-full flex-1 flex-col items-center justify-center gap-[10px] overflow-hidden pb-[350px]">
          <motion.div
            className="relative flex h-min w-min flex-col items-center justify-center transform-3d opacity-100 will-change-transform"
            style={{
              translateY,
              rotateY,
              transformPerspective: 1200,
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className={`relative flex h-[151px] w-[865px] flex-row items-center justify-center gap-[10px] transform-3d ${img.wrapperClass}`}
              >
                <div
                  className={`absolute h-[215px] w-[320px] ${img.imageClass}`}
                  style={img.style}
                >
                  <div className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden">
                    <Image
                      src={img.src}
                      className="h-full w-full object-cover rounded-lg"
                      width={640}
                      height={430}
                      alt={`Image ${i + 1}`}
                      sizes="320px"
                      quality={100}
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScrollGallery;
