import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What does GenReal.ai do?',
    answer:
      'G enReal.ai is an AI-powered platform that helps users distinguish between authentic and generated content using advanced deepfake detection algorithms. It provides real-time analysis and educational resources to raise media literacy.',
  },
  {
    question: 'Why use GenReal.ai?',
    answer:
      'B y using GenReal.ai, users can ensure the integrity of digital content. Whether it’s verifying news, videos, or voice clips, our platform helps prevent misinformation and protects your digital trust.',
  },
  {
    question: 'What are the pricing options?',
    answer:
      'W e offer flexible pricing for individuals, educators, and enterprises. Starting with a free tier that includes basic features, users can upgrade to Pro for advanced tools, batch analysis, and priority support.',
  },
  {
    question: 'When do I use GenReal.ai?',
    answer:
      'G enReal.ai is ideal anytime you come across suspicious digital content — such as social media videos, viral images, or even deepfake threats in business settings. Stay informed and ahead of deception.',
  },
];

const TypingAnswer = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    let interval;

    setDisplayedText(''); // Clear before typing

    interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 15); // smoother and faster than 20-30ms

    return () => clearInterval(interval); // cleanup
  }, [text]);

  return (
    <p className="text-[#b0bec5] text-[1.08rem] pt-4 leading-relaxed whitespace-pre-wrap">
      {displayedText}
    </p>
  );
};


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_rgba(11,151,132,0.708)_0%,_rgba(0,255,255,0.12)_8%,_rgba(0,40,50,0.18)_14%,_rgba(10,30,35,0.65)_18%,_rgba(5,15,20,0.92)_22%,_#01080d_32%,_#000b10_100%)] text-[#e3eaf0] p-0 m-0">
      <h2 className="text-white text-[2.8rem] font-extrabold tracking-[2.5px] text-center mt-16 mb-12">
        Frequently Asked Questions
      </h2>
      <div className="bg-[#000b10] border-[2.5px] border-cyan-300 rounded-[24px] shadow-[0_0_32px_4px_#00ffff44] px-0 py-8 w-[95vw] max-w-[950px] flex flex-col">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`bg-black px-10 py-7 border-b-[1.5px] border-cyan-300 ${
              idx === faqs.length - 1 ? 'border-b-0' : ''
            }`}
          >
            <div
              className="flex items-center justify-between w-full cursor-pointer"
              onClick={() => toggleFAQ(idx)}
            >
              <p className="text-white text-[1.25rem] font-medium tracking-wide">
                {faq.question}
              </p>
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#222e36] text-[1.5rem] shadow-[0_2px_8px_rgba(0,255,255,0.1)] transition-transform duration-300 ${
                  openIndex === idx ? 'rotate-180' : ''
                }`}
              >
                <FaChevronDown />
              </span>
            </div>

            <AnimatePresence mode="wait">
              {openIndex === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden"
                  key={`faq-${idx}`}
                >
                  <TypingAnswer text={faq.answer} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
