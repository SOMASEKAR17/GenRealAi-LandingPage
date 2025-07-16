import React, { useState } from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [agree, setAgree] = useState(false);
  const [hover, setHover] = useState(null);
  const [buttonHover, setButtonHover] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !agree) {
      alert('Please fill out all fields and agree to the terms.');
      return;
    }
    alert('Message sent!');
    setFormData({ name: '', email: '', message: '' });
    setAgree(false);
  };

  const iconList = [
    { icon: <FaLinkedin />, label: 'LinkedIn' },
    { icon: <FaInstagram />, label: 'Instagram' },
    { icon: <FaEnvelope />, label: 'Email' },
  ];

  const [refForm, inViewForm] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [refInfo, inViewInfo] = useInView({ triggerOnce: false, threshold: 0.1 });


  return (
    <div className="min-h-screen w-screen bg-black flex items-center justify-center relative font-exo" id="contact-us">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-400 opacity-20 blur-[100px] rounded-full pointer-events-none animate-pulseGlow" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-400 opacity-20 blur-[100px] rounded-full pointer-events-none animate-pulseGlow" />

      <div className="bg-[#0a2327e0] border-2 border-cyan-400 rounded-3xl shadow-[0_0_12px_#00ffff33,0_4px_16px_#00ffff11] p-12 md:p-8 w-[95vw] max-w-[980px] flex flex-col-reverse md:flex-row gap-8 md:gap-16 backdrop-blur-md z-10">

        {/* Left Form */}
        <motion.form
          ref={refForm}
          initial={{ opacity: 0, x: -40 }}
          animate={inViewForm ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col w-full font-exo"
        >
          <label className="text-[#e3eaf0] text-lg font-medium mb-2 mt-4">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-black/30 border border-cyan-400 text-white text-lg p-4 rounded-xl mb-4 shadow-inner shadow-cyan-200/10 focus:outline-none"
          />
          <label className="text-[#e3eaf0] text-lg font-medium mb-2">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-black/30 border border-cyan-400 text-white text-lg p-4 rounded-xl mb-4 shadow-inner shadow-cyan-200/10 focus:outline-none"
          />
          <label className="text-[#e3eaf0] text-lg font-medium mb-2">Enter description</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="bg-black/30 border border-cyan-400 text-white text-lg p-4 rounded-xl mb-6 shadow-inner shadow-cyan-200/10 min-h-[100px] resize-none focus:outline-none"
          />

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="accent-cyan-400 w-5 h-5 mr-3 rounded focus:outline-none"
              id="agree"
            />
            <label htmlFor="agree" className="text-[#e3eaf0] text-base">
              I agree to the <span className="text-cyan-400 underline cursor-pointer">processing</span> of the personal data provided
            </label>
          </div>

          <button
            type="submit"
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            className={`w-full py-4 rounded-2xl text-white font-orbitron text-lg font-extrabold uppercase tracking-wide transition-all duration-200 ${
              buttonHover
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-700 shadow-lg scale-[1.03]'
                : 'bg-gradient-to-r from-cyan-700 to-cyan-500 shadow-md'
            }`}
          >
            Send
          </button>
        </motion.form>

        {/* Right Info */}
        <motion.div
          ref={refInfo}
          initial={{ opacity: 0, x: 40 }}
          animate={inViewInfo ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' ,delay:0.3}}
          className="flex-1 flex flex-col items-center justify-center text-center"
        >
          <div className="text-white text-3xl font-extrabold font-orbitron uppercase mb-4">
            Contact Us
          </div>
          <p className="text-[#e3eaf0] text-base md:text-lg leading-relaxed mb-6">
            Customer satisfaction is our top priority! Our support service is available 24/7 to assist you with any questions you may have about our Platform: not yet decided.
            <br /><br />
            You can contact us any way you prefer:
          </p>
          <div className="flex flex-row gap-8">
            {iconList.map((item, idx) => (
              <span
                key={item.label}
                onMouseEnter={() => setHover(idx)}
                onMouseLeave={() => setHover(null)}
                title={item.label}
                className={`text-cyan-400 text-2xl p-3 rounded-full bg-cyan-400/10 shadow-md transition-transform duration-200 cursor-pointer ${
                  hover === idx ? 'scale-110 shadow-cyan-400/60 animate-pulse' : ''
                }`}
              >
                {item.icon}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
