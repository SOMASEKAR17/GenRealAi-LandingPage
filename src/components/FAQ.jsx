import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is DeepfakeQuiz?",
    answer:
      " DeepfakeQuiz is an interactive platform that tests your ability to identify deepfakes. It uses real and AI-generated content to raise awareness about misinformation.",
  },
  {
    question: "How does the quiz work?",
    answer:
      " You’ll be shown a series of media clips — your task is to decide whether each is real or generated. You’ll receive feedback on your accuracy and learn tips for identifying fakes.",
  },
  {
    question: "Why should I take this quiz?",
    answer:
      " The rise of AI-generated media makes it harder to distinguish real from fake. This quiz helps sharpen your detection skills in a fun, engaging way.",
  },
  {
    question: "Is my data safe?",
    answer:
      " Yes, we don’t collect any personal data from the quiz. It’s designed solely for education and awareness.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  const toggleFAQ = (index) => {
    if (index === openIndex) {
      setOpenIndex(null);
      setTypedText("");
    } else {
      setOpenIndex(index);
      setTypedText("");
      setTypingDone(false);
    }
  };

  useEffect(() => {
    if (openIndex !== null) {
      const answer = faqs[openIndex].answer;
      let i = 0;
      const typingInterval = setInterval(() => {
        setTypedText((prev) => prev + answer.charAt(i));
        i++;
        if (i >= answer.length) {
          clearInterval(typingInterval);
          setTypingDone(true);
        }
      }, 15); // speed of typing

      return () => clearInterval(typingInterval);
    }
  }, [openIndex]);

  return (
    <div
      className="w-screen min-h-screen flex flex-col items-center justify-center relative text-white overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"
      id="faq"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.2, scale: 1.2 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl -top-[300px] -left-[300px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.15, scale: 1.1 }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute w-[900px] h-[900px] bg-indigo-400/10 rounded-full blur-3xl -bottom-[350px] -right-[350px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.2, scale: 1.3 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute w-[600px] h-[600px] bg-teal-400/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.01)_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-10 pt-32 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-cyan-100 mb-2 sm:mb-3">
            Frequently <span className="text-cyan-400">Asked Questions</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1,
              ease: [0.25, 1, 0.5, 1],
              delay: 0.4,
            }}
            className="text-white/80 text-[1.1rem] leading-relaxed max-w-4xl mx-auto mt-8 px-4"
          >
            Navigate the complex digital landscape with confidence. Our
            cutting-edge AI solutions accurately distinguish between authentic
            and generated content, combating deepfakes and misinformation while
            promoting digital trust and media literacy.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-10 max-w-6xl mx-auto">
          {/* FAQ List */}
          <div className="w-full lg:w-3/5">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="mb-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-md transition hover:bg-white/10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <button
                  className="flex justify-between items-center w-full text-left focus:outline-none p-6"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    } text-cyan-400`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        paddingTop: 24,
                        paddingBottom: 24,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 text-white/70 text-[1.05rem] min-h-[80px]">
                        {typedText}
                        {!typingDone && <span className="animate-pulse">|</span>}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="hidden lg:flex items-stretch justify-center p-4 lg:p-0"
          >
            <img
              src="/faq image-2.jpg"
              alt="AI Robot Answering Questions"
              className="w-full h-full object-cover rounded-lg shadow-2xl max-h-full"
              style={{ maxWidth: "400px" }}
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}