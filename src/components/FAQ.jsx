import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  { question: 'What does GenReal.ai do?', answer: 'Not yet decided.' },
  { question: 'Why use GenReal.ai?', answer: 'Not yet decided.' },
  { question: 'What are the pricing options?', answer: 'Not yet decided.' },
  { question: 'When do I use GenReal.ai?', answer: 'Not yet decided.' },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div
      className="w-full min-h-screen relative text-[#e3eaf0] font-['Montserrat']"
      style={{
        backgroundImage: `url('/faq.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2327]/90 via-[#0e2e36]/90 to-[#0a2327]/90 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-16 py-12 md:py-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 sm:mb-12 tracking-wider text-white text-center lg:text-left">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-40 items-center lg:items-start">
          {/* Image Section */}
          <div className="w-full max-w-[400px] flex justify-center lg:justify-start">
            <img
              src="/faq-image.jpg"
              alt="FAQ Visual"
              className="w-full max-w-[400px] h-[240px] sm:h-[280px] md:h-[300px] lg:h-[320px] object-cover rounded-3xl shadow-2xl"
            />
          </div>

          {/* FAQ List Section */}
          <div className="w-full flex-1 border-t-2 lg:border-t-0 lg:border-l-2 border-white/10 pt-8 lg:pt-0 lg:pl-12">
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="w-full">
                  <div
                    className="flex items-center justify-between cursor-pointer py-4 border-b border-white/10 transition-colors duration-200"
                    onClick={() => toggleFAQ(idx)}
                  >
                    <span className="text-base sm:text-lg font-semibold tracking-wide">
                      {faq.question}
                    </span>
                    <span
                      className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#222e36] text-lg shadow-md transition-all duration-250 ${
                        openIndex === idx ? 'rotate-180 bg-[#e3eaf0] text-[#168c8c]' : ''
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>
                  {openIndex === idx && (
                    <div className="mt-2 text-[#b0bec5] text-sm sm:text-base pl-0.5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
