import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react'; // Ensure lucide-react is installed: npm install lucide-react

// Array of Frequently Asked Questions and their answers
const faqs = [
  {
    question: 'How does your detection work?',
    answer:
      'GenReal.ai is an AI-powered platform that helps users distinguish between authentic and generated content using advanced deepfake detection algorithms. It provides real-time analysis and educational resources to raise media literacy. Our proprietary AI models analyze subtle inconsistencies, digital artifacts, and behavioral patterns unique to synthetic media, ensuring a high degree of accuracy and reliability across various content formats.',
  },
  {
    question: 'What contents can be uploaded?',
    answer:
      'By using GenReal.ai, users can ensure the integrity of digital content. Whether it\'s verifying news, videos, or voice clips, our platform helps prevent misinformation and protects your digital trust. We support a wide range of media types including image files (JPG, PNG), video formats (MP4, MOV), and audio files (MP3, WAV). Our system is designed to handle both short clips and longer form content efficiently.',
  },
  {
    question: 'What is the accuracy of the detection model?',
    answer:
      'Our detection model boasts an industry-leading accuracy rate, consistently achieving over 95% on diverse and challenging datasets. This high accuracy is maintained through continuous learning and updates to our AI algorithms, which are trained on vast amounts of both authentic and deepfake content. We also implement a human-in-the-loop review process for edge cases to further enhance reliability.',
  },
  {
    question: 'What are the pricing options?',
    answer:
      'We offer flexible pricing for individuals, educators, and enterprises. Starting with a free tier that includes basic features and limited scans, users can upgrade to Pro for advanced tools, batch analysis, higher scan limits, and priority support. Enterprise solutions are tailored to specific organizational needs, offering custom integration, dedicated account management, and enhanced security features. Visit our pricing page for detailed plans and features.',
  },
  {
    question: 'Is GenReal.ai suitable for personal and business use?',
    answer:
      'Absolutely! GenReal.ai is designed to be versatile for both personal and professional applications. Individuals can use it to verify social media content, news, or messages. Businesses can leverage our platform for brand protection, preventing deepfake impersonation, ensuring compliance, and maintaining trust in their digital communications. Our robust API also allows for seamless integration into existing workflows.',
  },
  {
    question: 'How do you handle data privacy and security?',
    answer:
    'Data privacy and security are paramount at GenReal.ai. We adhere to strict data protection regulations (e.g., GDPR, CCPA) and employ end-to-end encryption for all uploaded content and analysis results. User data is anonymized where possible, and we never share or sell your information to third parties. Our infrastructure is built with enterprise-grade security measures to safeguard your digital assets and privacy.',
  },
];

/**
 * TypingAnswer component displays text with a typewriter effect.
 * The text appears character by character, simulating typing.
 * @param {object} props - Component props.
 * @param {string} props.text - The text to be displayed with the typing effect.
 */
const TypingAnswer = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    let interval;

    // Reset displayed text when the 'text' prop changes
    setDisplayedText('');

    // Set up an interval to add characters one by one
    interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      // Clear the interval once all characters are displayed
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 20); // Typing speed: 20 milliseconds per character

    // Cleanup function to clear the interval if the component unmounts or text changes
    return () => clearInterval(interval);
  }, [text]); // Dependency array: re-run effect if 'text' changes

  return (
    <p className="text-cyan-100/90 text-[0.95rem] pt-4 leading-relaxed whitespace-pre-wrap font-light">
      {displayedText}
    </p>
  );
};

/**
 * FAQ component displays a list of frequently asked questions with interactive,
 * collapsible answers, featuring a dynamic background and modern styling.
 */
const FAQ = () => {
  // State to manage which FAQ item is currently open (null if none are open)
  const [openIndex, setOpenIndex] = useState(null);

  /**
   * Toggles the open/closed state of an FAQ item.
   * If the clicked item is already open, it closes it. Otherwise, it opens it.
   * @param {number} idx - The index of the FAQ item to toggle.
   */
  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center relative text-white overflow-hidden p-0 m-0" id="faq">
      {/* Stunning Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        {/* Floating Orbs: Decorative elements that move subtly */}
        <div className="absolute top-[10%] left-[15%] w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-[float-subtle_10s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[5%] right-[10%] w-64 h-64 bg-gradient-to-r from-teal-400/15 to-cyan-500/15 rounded-full blur-3xl animate-[float-subtle_14s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute top-[30%] right-[5%] w-56 h-56 bg-gradient-to-r from-blue-400/10 to-indigo-500/10 rounded-full blur-3xl animate-[float-subtle_12s_ease-in-out_infinite_2s]"></div>
        <div className="absolute bottom-[20%] left-[20%] w-48 h-48 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-[float-subtle_11s_ease-in-out_infinite]"></div>
        
        {/* Subtle Grid: A faint grid pattern for a techy feel, with a subtle pulse */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-40 animate-pulse-subtle"></div>
        
        {/* Gradient Overlay: Adds depth and darkens the background for better content readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50"></div>

        {/* Abstract "Cyber" Lines/Particles: Thin lines flowing across the screen for a digital aesthetic */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-cyan-400 transform rotate-12 origin-top-left animate-[line-flow_20s_linear_infinite] opacity-5"></div>
          <div className="absolute bottom-0 right-0 w-full h-px bg-blue-500 transform -rotate-12 origin-bottom-right animate-[line-flow_25s_linear_infinite_reverse] opacity-5"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-16 pb-20">
        {/* Company Overview Section: Provides context about GenReal.ai and hints at the FAQs below */}
        <div className="bg-gradient-to-br from-slate-900/85 to-slate-800/70 backdrop-blur-xl border border-cyan-300/40 rounded-3xl shadow-[0_0_60px_rgba(0,255,255,0.15)] px-8 py-10 w-[95vw] max-w-[760px] mb-12 text-center animate-[fade-in-up_1s_ease-out]">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-teal-300 text-[2.5rem] font-black tracking-[3px] drop-shadow-lg mb-4">
            GenReal.ai: Your Digital Trust Partner
          </h1> {/* A more engaging heading than "FAQ" */}
          <p className="text-cyan-100/80 text-[1rem] leading-relaxed max-w-2xl mx-auto">
            At GenReal.ai, our mission is to empower individuals and organizations
            to navigate the complex digital landscape with confidence. In an era where
            digital trust is constantly challenged by sophisticated deepfakes and
            synthetic media, we provide cutting-edge AI solutions to accurately
            distinguish between authentic and generated content. We are committed
            to fostering media literacy and building a more secure and transparent
            digital future. To help you understand our platform better and address common concerns,
            we've compiled answers to the most frequently asked questions below.
            Your trust is our priority, and we are dedicated to answering all your queries with clarity and precision.
          </p>
        </div>
        
        {/* FAQ Container: Holds all the individual FAQ items */}
        <div className="bg-gradient-to-br from-slate-900/85 to-slate-800/70 backdrop-blur-xl border border-cyan-300/40 rounded-3xl shadow-[0_0_60px_rgba(0,255,255,0.15)] px-0 py-8 w-[95vw] max-w-[760px] relative overflow-hidden transform-gpu animate-[fade-in-up_1s_ease-out_0.2s]">
          {/* Inner glow effect: A subtle light effect within the container */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-transparent to-blue-500/8 rounded-3xl"></div>
          
          <div className="relative z-10">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`group px-6 sm:px-8 py-6 transition-all duration-700 ease-out 
                  hover:bg-gradient-to-r hover:from-cyan-500/8 hover:to-blue-500/8 
                  hover:shadow-[0_0_20px_rgba(0,255,255,0.08)] hover:scale-[1.002] ${
                    idx !== faqs.length - 1 ? 'border-b border-cyan-300/15' : ''
                  } ${openIndex === idx ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 shadow-[0_0_30px_rgba(0,255,255,0.1)]' : ''}
                  rounded-xl mx-4 mb-3
                  ${idx === 0 ? 'mt-0' : 'mt-3'}
                  `}
                // Custom cubic-bezier for smoother hover transitions
                style={{ transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
              >
                <div
                  className="flex items-center justify-between w-full cursor-pointer group"
                  onClick={() => toggleFAQ(idx)}
                >
                  <p className="text-white text-[1.1rem] sm:text-[1.2rem] font-semibold tracking-wide group-hover:text-cyan-200 transition-colors duration-300">
                    {faq.question}
                  </p>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 shadow-[0_3px_15px_rgba(0,255,255,0.2)] transition-all duration-500 ease-out hover:shadow-[0_4px_20px_rgba(0,255,255,0.4)] hover:scale-110 ${
                      openIndex === idx ? 'rotate-180 scale-110 shadow-[0_5px_30px_rgba(0,255,255,0.5)]' : ''
                    }`}
                  >
                    <ChevronDown size={20} className="font-bold" />
                  </div>
                </div>

                {/* Smooth Answer Reveal: Animates height and opacity for a smooth dropdown effect */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    openIndex === idx ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <TypingAnswer text={faq.answer} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        /* Keyframes for subtle floating blobs/orbs */
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 1; }
          25% { transform: translateY(-12px) translateX(8px) scale(1.01); opacity: 0.97; }
          50% { transform: translateY(-25px) translateX(-8px) scale(1.02); opacity: 0.95; }
          75% { transform: translateY(-12px) translateX(8px) scale(1.01); opacity: 0.97; }
        }
        
        /* Keyframes for strong glow effect on main titles */
        @keyframes glow-strong {
          0% { text-shadow: 0 0 15px rgba(34, 211, 238, 0.5), 0 0 25px rgba(59, 130, 246, 0.25); }
          50% { text-shadow: 0 0 28px rgba(34, 211, 238, 0.8), 0 0 40px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3); }
          100% { text-shadow: 0 0 15px rgba(34, 211, 238, 0.5), 0 0 25px rgba(59, 130, 246, 0.25); }
        }
        
        /* Keyframes for shimmer effect on separator lines */
        @keyframes shimmer-wide {
          0% { opacity: 0.2; transform: scaleX(0.2); }
          50% { opacity: 0.8; transform: scaleX(1); }
          100% { opacity: 0.2; transform: scaleX(0.2); }
        }

        /* Keyframes for subtle pulsing effect on background grid */
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.4; }
        }

        /* Keyframes for fade-in-up animation for content blocks */
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Keyframes for flowing cyber lines in the background */
        @keyframes line-flow {
          0% { transform: translateX(-100%) rotate(12deg); }
          100% { transform: translateX(100%) rotate(12deg); }
        }
      `}</style>
    </div>
  );
};

export default FAQ;
