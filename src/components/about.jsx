import React, { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import arrow from "/arrow.png";
import arrowLeft from "/arrowleft.png";
import aboutUsImage from "/about-ellipse.png";

gsap.registerPlugin(ScrollTrigger);

const AboutUsSection = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const rotate = useMotionValue(0); // Framer motion value for rotation

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: "top center",
        end: "bottom+=200 center",
        scrub: true,
        pin: true,
      },
    });

    tl.to(rotate, {
      value: 60,
      duration: 1,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#0A0F1F] text-white py-16 font-sans overflow-hidden"
    >
      {/* Mission Statement */}
      <div className="max-w-full mx-auto text-center mb-20">
        <p className="text-xl md:text-2xl px-[10vw] leading-15 text-[#C9D1D9]">
          Our mission is to assist in creating a safer, more reliable digital
          environment where trust isn’t compromised. Whether you’re moderating
          user content or safeguarding public communications,&nbsp;
          <span className="text-[#00D1FF] font-semibold">GenReal.ai</span> is
          here to help you lead with confidence.
        </p>
      </div>

      {/* What we do */}
      <div className="mt-20 relative max-w-full mx-auto">
        <div className="flex justify-between">
          <h2
            className="text-4xl md:text-[5vw] pl-[10vw] font-extrabold mb-6
                       bg-gradient-to-t from-[#3a3a3a] to-white text-transparent
                       bg-clip-text"
          >
            What we do
          </h2>
          <img src={arrow} alt="Arrow pointing right" />
        </div>
        <div
          className="bg-[#1E2A38] w-[80%] mx-auto mt-20 text-[#C9D1D9]
                     text-base md:text-lg rounded-4xl p-6 shadow-lg"
        >
          We offer a robust suite of tools, including real-time APIs, batch
          processing systems, and a full-featured platform tailored to
          industries like fintech, media, law enforcement, and social media.
          Our solutions detect visual and audio manipulation using
          cutting-edge deep learning, enabling high-speed and high-accuracy
          verification of user-generated and public content.
        </div>
      </div>

      {/* Rotating image section */}
      <motion.div
        ref={imageContainerRef}
        style={{
          rotateZ: rotate,
          width: "min(45vw, 600px)",
          height: "min(45vw, 600px)",
        }}
        className="relative mx-auto mt-20 flex justify-center items-center"
      >
        <img
          src={aboutUsImage}
          alt="See beyond the surface. Spot Deepfakes easily."
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* What makes us unique */}
      <div className="mt-20 relative max-w-full mx-auto">
        <div className="flex justify-between">
          <img src={arrowLeft} alt="Arrow pointing left" className="mt-15" />
          <h2 className="text-4xl md:text-[5vw] font-extrabold mb-6">
            What Makes
            <br />
            <span
              className="bg-gradient-to-t from-[#3a3a3a] to-white
                         text-transparent bg-clip-text"
            >
              Us Unique
            </span>
          </h2>
        </div>
        <div
          className="bg-[#1E2A38] w-[80%] mx-auto mt-20 text-[#C9D1D9]
                     text-base md:text-lg rounded-4xl p-6 shadow-lg"
        >
          Our unique approach combines cutting-edge deep learning models
          with a focus on real-world applicability. We prioritize speed,
          accuracy, and ease of integration, ensuring our clients can
          rapidly deploy and effectively combat the evolving threat of
          deepfakes and manipulated content across various digital
          platforms.
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
