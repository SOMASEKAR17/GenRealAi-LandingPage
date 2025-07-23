import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What contents can be uploaded?',
    answer:
      'You can upload image (JPG, PNG), video (MP4, MOV), and audio (MP3, WAV) files. Our platform verifies news, videos, and voice clips to prevent misinformation and protect digital trust.',
  },
  {
    question: 'What are the pricing options?',
    answer:
      'We offer free basic features, with Pro upgrades for advanced tools, batch analysis, and priority support. Enterprise solutions are customized for organizational needs, including integration and enhanced security.',
  },
  {
    question: 'Is GenReal.ai suitable for personal and business use?',
    answer:
      'Yes, it\'s versatile for both. Individuals can verify social media and news. Businesses use it for brand protection, deepfake prevention, and ensuring secure digital communications.',
  },
  {
    question: 'How do you handle data privacy and security?',
    answer:
      'Data privacy is paramount. We use end-to-end encryption for all content and results, adhering to regulations like GDPR. User data is anonymized, and never shared. Our infrastructure features enterprise-grade security.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center relative text-white overflow-hidden p-0 m-0" id="faq">
      {/* Stunning Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-teal-400/15 to-cyan-500/15 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-indigo-500/10 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_2s]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <div className="text-center mb-16 mt-16">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-300 to-teal-200 text-[2.8rem] font-extrabold tracking-[2px] drop-shadow-lg animate-[glow_4s_ease-in-out_infinite_alternate]">
            GenReal.AI Your Digital Trust Partner
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6 animate-[shimmer_2s_ease-in-out_infinite]"></div>
          <p className="text-cyan-100/80 text-[1.1rem] leading-relaxed max-w-3xl mx-auto mt-8 px-4">
            Navigate the complex digital landscape with confidence. Our cutting-edge AI solutions accurately distinguish between authentic and generated content, combating deepfakes and misinformation while promoting digital trust and media literacy.
          </p>
        </div>

        {/* FAQ List */}
        <div className="w-[95vw] max-w-[980px] relative z-10">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`group px-8 py-8 transition-all duration-500 ease-out hover:bg-gradient-to-r hover:from-cyan-500/8 hover:to-blue-500/8 hover:backdrop-blur-sm ${
                idx !== faqs.length - 1 ? 'border-b border-cyan-300/15' : ''
              } ${openIndex === idx ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm' : ''} mb-2 rounded-xl`}
            >
              <div
                className="flex items-center justify-between w-full cursor-pointer group"
                onClick={() => toggleFAQ(idx)}
              >
                <p className="text-white text-[1.35rem] font-semibold tracking-wide group-hover:text-cyan-100 transition-colors duration-300">
                  {faq.question}
                </p>
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 shadow-[0_4px_20px_rgba(0,255,255,0.3)] transition-all duration-500 ease-out hover:shadow-[0_6px_30px_rgba(0,255,255,0.5)] hover:scale-110 ${
                    openIndex === idx ? 'rotate-180 scale-110' : ''
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="pt-6 text-cyan-100/90 text-[1.1rem] leading-relaxed whitespace-pre-wrap font-light"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes glow {
          0% { text-shadow: 0 0 4px rgba(34, 211, 238, 0.3); }
          100% { text-shadow: 0 0 10px rgba(34, 211, 238, 0.4), 0 0 14px rgba(59, 130, 246, 0.3); }
        }

        
        @keyframes shimmer {
          0% { opacity: 0.5; transform: scaleX(0.5); }
          50% { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0.5; transform: scaleX(0.5); }
        }
      `}</style>
    </div>
  );
};

export default FAQ;
