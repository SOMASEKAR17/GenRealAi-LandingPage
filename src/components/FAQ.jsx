import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const faqs = [
  {
    question: "What contents can be uploaded?",
    answer:
      "You can upload image (JPG, PNG), video (MP4, MOV), and audio (MP3, WAV) files. Our platform verifies news, videos, and voice clips to prevent misinformation and protect digital trust.",
  },
  {
    question: "What are the pricing options?",
    answer:
      "We offer free basic features, with Pro upgrades for advanced tools, batch analysis, and priority support. Enterprise solutions are customized for organizational needs, including integration and enhanced security.",
  },
  {
    question: "Is GenReal.ai suitable for personal and business use?",
    answer:
      "Yes, it's versatile for both. Individuals can verify social media and news. Businesses use it for brand protection, deepfake prevention, and ensuring secure digital communications.",
  },
  {
    question: "How do you handle data privacy and security?",
    answer:
      "Data privacy is paramount. We use end-to-end encryption for all content and results, adhering to regulations like GDPR. User data is anonymized, and never shared. Our infrastructure features enterprise-grade security.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className="w-screen min-h-screen flex flex-col items-center justify-center relative text-white overflow-hidden p-0 m-0"
      id="faq"
    >
      {/* Refined Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px] animate-[float_9s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-400/15 rounded-full blur-[130px] animate-[float_11s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-[100px] animate-[float_10s_ease-in-out_infinite_2s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <div className="text-center mb-16 mt-16">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-300 to-teal-200 text-[2.8rem] font-extrabold tracking-[2px] drop-shadow-lg animate-[glow_4s_ease-in-out_infinite_alternate]">
            GenReal.AI Your Digital Trust Partner
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6 animate-[shimmer_2s_ease-in-out_infinite]" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white text-[1.1rem] leading-relaxed max-w-3xl mx-auto mt-8 px-4"
          >
            Navigate the complex digital landscape with confidence. Our
            cutting-edge AI solutions accurately distinguish between authentic
            and generated content, combating deepfakes and misinformation while
            promoting digital trust and media literacy.
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="w-[95vw] max-w-[980px] relative z-10">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`group px-8 py-8 transition-all duration-500 ease-out hover:bg-cyan-800/10 hover:backdrop-blur-sm ${
                idx !== faqs.length - 1 ? "border-b border-cyan-300/15" : ""
              } ${
                openIndex === idx
                  ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm"
                  : ""
              } mb-2 rounded-xl`}
            >
              <div
                className="flex items-center justify-between w-full cursor-pointer"
                onClick={() => toggleFAQ(idx)}
              >
                <p className="text-white text-[1.35rem] font-semibold tracking-wide group-hover:text-cyan-100 transition-colors duration-300">
                  {faq.question}
                </p>
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 shadow-[0_4px_20px_rgba(0,255,255,0.3)] transition-transform duration-500 ease-out hover:shadow-[0_6px_30px_rgba(0,255,255,0.5)] hover:scale-110 ${
                    openIndex === idx ? "rotate-180 scale-110" : ""
                  }`}
                >
                  <ChevronDown size={20} className="font-bold" />
                </div>
              </div>

              {/* Framer Motion Answer Reveal */}
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 text-cyan-100/90 text-[1.1rem] leading-relaxed whitespace-pre-wrap font-light">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes glow {
          0% {
            text-shadow: 0 0 4px rgba(34, 211, 238, 0.3);
          }
          100% {
            text-shadow: 0 0 10px rgba(34, 211, 238, 0.4),
              0 0 14px rgba(59, 130, 246, 0.3);
          }
        }
        @keyframes shimmer {
          0% {
            opacity: 0.5;
            transform: scaleX(0.5);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
          100% {
            opacity: 0.5;
            transform: scaleX(0.5);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default FAQ;
