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
      id="faq"
      className="w-full min-h-screen relative text-white bg-gradient-to-br from-black to-cyan-950"
      style={{
        backgroundImage: `url('/faq.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black to-cyan-950  z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <h2 className=" md:text-5xl mb-12 tracking-wider text-white font-bold text-4xl text-center">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center lg:items-start">
          {/* Image Section */}
          <div className="w-full max-w-[400px] flex justify-center lg:justify-start">
            <img
              src="/faq-image.jpg"
              alt="FAQ Visual"
              className="w-full h-[320px] object-cover rounded-3xl shadow-[0_0_30px_rgba(0,255,255,0.2)] border border-cyan-500"
            />
          </div>

          {/* FAQ List Section */}
          <div className="w-full flex-1 border-t-2 lg:border-t-0 lg:border-l-2 border-cyan-500/20 pt-8 lg:pt-0 lg:pl-12">
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[#001f23] border border-cyan-500 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,255,0.25)] transition-all duration-300"
                >
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleFAQ(idx)}
                  >
                    <span className="text-lg md:text-xl font-semibold tracking-wide text-cyan-100">
                      {faq.question}
                    </span>
                    <span
                      className={`flex items-center justify-center w-9 h-9 rounded-full bg-cyan-100 text-[#001f23] text-lg shadow-md transform transition-transform duration-300 ${
                        openIndex === idx ? 'rotate-180' : ''
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openIndex === idx ? 'max-h-40 mt-4' : 'max-h-0'
                    }`}
                  >
                    <p className="text-cyan-200 text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
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
