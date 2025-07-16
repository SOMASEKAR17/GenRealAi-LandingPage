import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";


const fadeInVariant = (direction = "up") => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
    y: direction === "up" ? 50 : 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
});

const AboutUsSection = () => {
  const pRef = useRef(null);
  const block1Ref = useRef(null);
  const h2Ref = useRef(null);
  const block2Ref = useRef(null);

  const pInView = useInView(pRef, { once: true, margin: "-100px" });
  const block1InView = useInView(block1Ref, { once: true, margin: "-100px" });
  const h2InView = useInView(h2Ref, { once: true, margin: "-100px" });
  const block2InView = useInView(block2Ref, { once: true, margin: "-100px" });

  return (
    <section
      data-scroll
      data-scroll-section
      data-scroll-speed="-.6"
      className="bg-black text-white pb-10 lg:pb-30 pt-30 px-6 md:px-20"
    >
      <div className="max-w-5xl mx-auto" id="about">
        <motion.p
          ref={pRef}
          variants={fadeInVariant("left")}
          initial="hidden"
          animate={pInView ? "visible" : "hidden"}
          className="text-lg md:text-xl font-semibold leading-loose"
        >
          Our mission is to assist in creating a safer, more reliable digital environment where trust isn’t compromised.
          Whether you’re moderating user content or safeguarding public communications,{" "}
          <span className="text-cyan-400 font-semibold">GenReal.ai</span> is here to help you lead with confidence.
        </motion.p>

        <motion.div
          ref={block1Ref}
          variants={fadeInVariant("right")}
          initial="hidden"
          animate={block1InView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row items-center gap-6 mt-12"
        >
          <div className="min-w-[120px] min-h-[120px] border-2 border-cyan-400 rounded-full flex items-center justify-center text-cyan-400 font-bold text-center">
            What We Do
          </div>
          <div className="border-2 border-cyan-400 rounded-xl p-4 leading-relaxed max-w-xl">
            We offer a robust suite of tools, including real-time APIs, batch processing systems,
            and a full-featured platform tailored to industries like fintech, media, law enforcement,
            and social media. Our solutions detect visual and audio manipulation using cutting-edge
            deep learning, enabling high-speed and high-accuracy verification of user-generated and public content.
          </div>
        </motion.div>

        <motion.h2
          ref={h2Ref}
          variants={fadeInVariant("up")}
          initial="hidden"
          animate={h2InView ? "visible" : "hidden"}
          className="text-center text-[10vw] md:text-5xl font-bold text-cyan-100 mt-18 mb-6"
        >
          See beyond the surface. Spot Deepfakes easily.
        </motion.h2>

        <motion.div
          ref={block2Ref}
          variants={fadeInVariant("left")}
          initial="hidden"
          animate={block2InView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row-reverse mt-20 items-center md:mr-10 gap-6"
        >
          <div className="min-w-[120px] min-h-[120px] border-2 border-cyan-400 rounded-full flex items-center justify-center text-cyan-400 font-bold text-center">
            What Makes <br /> Us Unique
          </div>
          <div className="border-2 border-cyan-400 rounded-xl p-4 leading-relaxed max-w-xl">
            The algorithms, accuracy and the real-time detection at scale makes our services ideal
            for detecting the reliability of live video streams, social media moderation,
            and virtual conferencing tools. Beyond tech, we’re also committed to fighting misinformation
            and helping the public be more educated on deepfake technology.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
