import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import arrow from "/arrow.png";
import arrowLeft from "/arrowleft.png";
import aboutUsImage from "/about-ellipse.png";

const AboutUsSection = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const missionRef = useRef(null);
  const whatWeDoRef = useRef(null);
  const uniqueRef = useRef(null);

  // Track mouse position safely after component mounts
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const mouseX = useSpring(mousePosition.x, { stiffness: 150, damping: 30 });
  const mouseY = useSpring(mousePosition.y, { stiffness: 150, damping: 30 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: missionProgress } = useScroll({
    target: missionRef,
    offset: ["start 0.8", "end 0.2"]
  });

  const { scrollYProgress: imageProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start 0.9", "end 0.1"]
  });

  const { scrollYProgress: whatWeDoProgress } = useScroll({
    target: whatWeDoRef,
    offset: ["start 0.8", "end 0.2"]
  });

  const { scrollYProgress: uniqueProgress } = useScroll({
    target: uniqueRef,
    offset: ["start 0.8", "end 0.2"]
  });

  const rotate = useTransform(imageProgress, [0, 1], [0, 60]);
  const scale = useTransform(imageProgress, [0, 0.5, 1], [0.5, 1.2, 0.8]);
  const imageY = useTransform(imageProgress, [0, 1], [100, -100]);

  const missionY = useTransform(missionProgress, [0, 1], [80, -80]);
  const missionOpacity = useTransform(missionProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const missionScale = useTransform(missionProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);

  const whatWeDoY = useTransform(whatWeDoProgress, [0, 1], [60, -60]);
  const whatWeDoOpacity = useTransform(whatWeDoProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  // Original had rotateX, keeping it for "What we do" as per previous discussion.
  const whatWeDoRotateX = useTransform(whatWeDoProgress, [0, 0.5, 1], [45, 0, -45]); 

  const uniqueY = useTransform(uniqueProgress, [0, 1], [80, -80]);
  const uniqueOpacity = useTransform(uniqueProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  // Changed from uniqueSkewY to uniqueX for 2D horizontal movement
  const uniqueX = useTransform(uniqueProgress, [0, 0.5, 1], [-100, 0, 100]); 

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const smoothRotate = useSpring(rotate, { stiffness: 80, damping: 25 });
  const smoothScale = useSpring(scale, { stiffness: 80, damping: 25 });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#0A0F1F] text-white py-16 font-sans overflow-hidden relative"
    >
      {/* Mouse-following particle */}
      <motion.div
        className="absolute w-3 h-3 bg-[#00D1FF] rounded-full opacity-60 pointer-events-none z-10"
        style={{
          x: mouseX,
          y: mouseY,
          left: 0,
          top: 0,
        }}
      />
      <motion.div
        className="absolute w-6 h-6 border border-[#00D1FF]/30 rounded-full pointer-events-none z-10"
        style={{
          x: useTransform(mouseX, x => x * 0.5),
          y: useTransform(mouseY, y => y * 0.5),
          left: 0,
          top: 0,
        }}
      />

      <motion.div
        className="absolute w-6 h-6 border border-[#00D1FF]/30 rounded-full pointer-events-none z-10"
        style={{
          x: useTransform(mouseX, x => x * 0.5),
          y: useTransform(mouseY, y => y * 0.5),
          left: '50%',
          top: '50%',
        }}
      />

      {/* Mission Statement with Scroll Animation */}
      <motion.div
        ref={missionRef}
        className="max-w-full mx-auto text-center mb-20"
        style={{
          y: missionY,
          opacity: missionOpacity,
          scale: missionScale,
        }}
      >
        <motion.p
          className="text-xl md:text-2xl px-[10vw] leading-15 text-[#C9D1D9]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Our mission is to assist in creating a safer, more reliable digital
          environment where trust isn't compromised. Whether you're moderating
          user content or safeguarding public communications,&nbsp;
          <motion.span 
            className="text-[#00D1FF] font-semibold"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            GenReal.ai
          </motion.span> is
          here to help you lead with confidence.
        </motion.p>
      </motion.div>

      {/* What we do with Enhanced Scroll Animation */}
      <motion.div
        ref={whatWeDoRef}
        className="mt-20 relative max-w-full mx-auto"
        style={{
          y: whatWeDoY,
          opacity: whatWeDoOpacity,
          rotateX: whatWeDoRotateX,
        }}
      >
        <motion.div 
          className="flex justify-between"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl md:text-[5vw] pl-[10vw] font-extrabold mb-6
                        bg-gradient-to-t from-[#3a3a3a] to-white text-transparent
                        bg-clip-text"
            initial={{ opacity: 0, y: 30, rotateY: -90 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            What we do
          </motion.h2>
          
          <img 
            src={arrow} 
            alt="Arrow pointing right" 
            className="mr-[10vw] mt-4"
          />
        </motion.div>
        
        <motion.div
          className="bg-[#1E2A38] w-[80%] mx-auto mt-20 text-[#C9D1D9]
                      text-base md:text-lg rounded-4xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 100, rotateX: 45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            We offer a robust suite of tools, including real-time APIs, batch
            processing systems, and a full-featured platform tailored to
            industries like fintech, media, law enforcement, and social media.
            Our solutions detect visual and audio manipulation using
            cutting-edge deep learning, enabling high-speed and high-accuracy
            verification of user-generated and public content.
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Rotating image section with Enhanced Animations */}
      <motion.div
        ref={imageContainerRef}
        style={{
          rotateZ: smoothRotate,
          scale: smoothScale,
          y: imageY,
          width: "min(45vw, 600px)",
          height: "min(45vw, 600px)",
        }}
        className="relative mx-auto mt-20 flex justify-center items-center"
      >
        {/* Orbital Rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute border border-[#00D1FF]/20 rounded-full"
            style={{
              width: `${100 + ring * 15}%`,
              height: `${100 + ring * 15}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ rotate: 360 }}
            whileInView={{ opacity: 0.3, scale: 1 }}
            viewport={{ once: false }}
            transition={{
              delay: ring * 0.2,
              duration: 12 + ring * 6,
              type: "spring",
              stiffness: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        
        <motion.div
          className="w-full h-full flex items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
        >
          <img
            src={aboutUsImage}
            alt="See beyond the surface. Spot Deepfakes easily."
            className="w-full h-full object-contain"
          />
        </motion.div>
      </motion.div>

      {/* What makes us unique with Creative Scroll Animation (2D) */}
      <motion.div
        ref={uniqueRef}
        className="mt-20 relative max-w-full mx-auto"
        style={{
          y: uniqueY,
          opacity: uniqueOpacity,
          x: uniqueX, // Apply the new 2D horizontal animation
        }}
      >
        <motion.div 
          className="flex justify-between"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img 
            src={arrowLeft} 
            alt="Arrow pointing left" 
            className="ml-[10vw] mt-4"
          />
          
          <motion.h2 
            className="text-4xl md:text-[5vw] font-extrabold mb-6"
            initial={{ opacity: 0, y: 30 }} // Removed rotateY for 2D
            whileInView={{ opacity: 1, y: 0 }} // Removed rotateY for 2D
            viewport={{ once: false }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            What Makes
            <br />
            <span
              className="bg-gradient-to-t from-[#3a3a3a] to-white
                          text-transparent bg-clip-text"
            >
              Us Unique
            </span>
          </motion.h2>
        </motion.div>
        
        <motion.div
          className="bg-[#1E2A38] w-[80%] mx-auto mt-20 text-[#C9D1D9]
                      text-base md:text-lg rounded-4xl p-6 shadow-lg"
          initial={{ opacity: 0, y: -50, scale: 0.9 }} // Adjusted initial animation for 2D
          whileInView={{ opacity: 1, y: 0, scale: 1 }} // Adjusted whileInView for 2D
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Our unique approach combines cutting-edge deep learning models
            with a focus on real-world applicability. We prioritize speed,
            accuracy, and ease of integration, ensuring our clients can
            rapidly deploy and effectively combat the evolving threat of
            deepfakes and manipulated content across various digital
            platforms.
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUsSection;