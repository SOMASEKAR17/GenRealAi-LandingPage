import React, { useRef, useState, useEffect } from 'react';
import Mail from "/email.png";
import Phone from "/phone.png";
import Instagram from "/instagram.png";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const ReachOutContact = () => {
  const contactFormRef = useRef(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const scrollToContactForm = () => {
    setShowContactForm(true);
    setTimeout(() => {
      contactFormRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    // Here you could send form data to backend
    console.log(formData);
    alert("Message sent!");

    // Reset form and close modal
    setFormData({ name: '', email: '', message: '' });
    setShowContactForm(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowContactForm(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-no-repeat bg-top bg-cover" id="contact-us">
      {/* Reach Out Section */}
      <div className="h-[70vh] w-full flex items-center justify-center relative bg-cover bg-center px-4">
        <div className="absolute w-full h-full inset-0 bg-gradient-to-b from-black to-cyan-950 from-0% to-60% z-0" />
        <div className="relative z-10 w-full md:w-5/6 h-5/6 flex flex-col justify-center items-center rounded-[40px] backdrop-blur-[300px] text-center text-white">
          <h2 className="font-bold text-[clamp(28px,6vw,52px)] leading-[1.2] tracking-wide mb-4">
            Reach Out - We're Listening
          </h2>
          <p className="font-medium text-[clamp(16px,4vw,27px)] text-cyan-200 leading-[1.4] tracking-wide mb-6">
            Your first step toward fighting deepfakes starts here
          </p>
          <button
            onClick={scrollToContactForm}
            className="bg-[#FA9A40] hover:bg-[#fa9a40]/90 text-white font-normal py-2 md:py-3 px-6 md:px-8 rounded-xl shadow-[0_0_15px_#fa9a40] hover:shadow-[0_0_25px_#fa9a40aa] transition-all duration-300 text-sm md:text-base transform hover:scale-105"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Contact Form Section */}
      {showContactForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: `
              radial-gradient(circle at top right, rgba(32, 58, 67, 0.8) 0%, transparent 25%),
              radial-gradient(circle at bottom left, rgba(32, 58, 67, 0.8) 0%, transparent 17%),
              linear-gradient(to bottom right, rgba(5, 6, 7, 0.9), rgba(8, 16, 21, 0.9), rgba(14, 28, 36, 0.9))
            `,
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Modal Content */}
          <motion.div
            ref={contactFormRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative z-10 w-full max-w-7xl max-h-[90vh] overflow-y-auto bg-cover bg-center rounded-lg shadow-lg p-8"
            style={{ backgroundImage: `url('/contactus.png')` }}
          >
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-20"
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* Optional overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-cyan-950 z-0 rounded-lg" />
            <div className="relative z-10">
              {/* Heading */}
              <div className="mb-10">
                <h2 className="text-white text-4xl font-bold mb-4">Contact Us</h2>
                <p className="text-white text-lg font-medium tracking-wide">
                  Your first step toward fighting deepfakes starts here
                </p>
              </div>

              {/* Form and Contact Info */}
              <div className="flex flex-col h-fit lg:flex-row justify-center lg:justify-between gap-12">
                {/* Contact Form */}
                <div className="w-full lg:max-w-lg">
                  <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="bg-transparent border border-cyan-500 text-white px-4 py-3 rounded-lg placeholder:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition-all duration-300"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="bg-transparent border border-cyan-500 text-white px-4 py-3 rounded-lg placeholder:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition-all duration-300"
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message"
                      rows="5"
                      className="bg-transparent border border-cyan-500 text-white px-4 py-3 rounded-lg resize-none placeholder:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition-all duration-300"
                    />
                    <button
                      type="submit"
                      className="w-[150px] h-[50px] rounded-2xl text-white text-lg transition-all duration-300 transform hover:scale-105 bg-[#FA9A40] hover:bg-[#fa9a40]/90 shadow-[0_0_10px_#FA9A40]"
                    >
                      Submit
                    </button>
                  </form>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-6 text-white items-start">
                  {[
                    { icon: Mail, text: "genrealia@gmail.com", alt: "Email" },
                    { icon: Phone, text: "+91 3927629420", alt: "Phone" },
                    { icon: Instagram, text: "@genreal", alt: "Instagram" },
                  ].map((info, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center p-2">
                        <img src={info.icon} alt={`${info.alt} icon`} className="w-5 h-5" />
                      </div>
                      <span className="text-base sm:text-lg text-white">
                        {info.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ReachOutContact;
