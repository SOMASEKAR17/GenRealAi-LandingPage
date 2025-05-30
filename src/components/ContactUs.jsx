import React, { useRef, useState } from 'react';
import Mail from "/email.png";
import Phone from "/phone.png";
import Instagram from "/instagram.png";

const ReachOutContact = () => {
  const contactFormRef = useRef(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const scrollToContactForm = () => {
    setShowContactForm(true);
    setTimeout(() => {
      contactFormRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full bg-no-repeat bg-top bg-[url('/contactus-reachout.png')] bg-cover">
      {/* Reach Out Section */}
      <div className="min-h-screen w-full flex items-center justify-center relative">
        <div className="text-center text-white">
          <h2 className="font-[Poppins] font-bold text-[52px] leading-[1.2] tracking-[9%] text-center">
            Reach Out– We're Listening
          </h2>
          <p className="font-[Raleway] font-medium text-[27px] leading-[1.4] tracking-[9%] mb-8">
            Your first step toward fighting deepfakes starts here
          </p>
          <button 
            onClick={scrollToContactForm}
            className="bg-[#FA9A40] hover:bg-[#FA9A40]/90 text-white font-normal py-2 md:py-3 px-6 md:px-8 rounded-md transition-all duration-300 text-sm md:text-base transform hover:scale-105 font-[Raleway]"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Contact Form Section */}
      {showContactForm && (
        <div
          ref={contactFormRef}
          className="min-h-screen w-full flex items-center justify-center relative"
        >
          <div className="w-11/12 max-w-7xl">
            <div className="mb-8">
              <h2 className="text-white text-4xl font-bold font-[Poppins] mb-4">Contact Us</h2>
              <p className="text-white font-[Raleway] text-lg font-medium tracking-wide">
                Your first step toward fighting deepfakes starts here
              </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-6">
              {/* Left Section: Contact Form */}
              <div className="w-full max-w-lg">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Name"
                    className="bg-transparent border border-white text-white px-4 py-3 rounded-lg placeholder:text-gray-400 font-[Raleway] focus:outline-none focus:scale-105 transition-all duration-300"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="bg-transparent border border-white text-white px-4 py-3 rounded-lg placeholder:text-gray-400 font-[Raleway] focus:outline-none focus:scale-105 transition-all duration-300"
                  />
                  <textarea
                    placeholder="Message"
                    rows="5"
                    className="bg-transparent border border-white text-white px-4 py-3 rounded-lg resize-none placeholder:text-gray-400 font-[Raleway] focus:outline-none focus:scale-105 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="w-[150px] h-[55px] rounded-2xl text-white text-lg font-[Raleway] transition-all duration-300 transform hover:scale-105 bg-[#FA9A40] hover:bg-[#FA9A40]/90"
                  >
                    Submit
                  </button>
                </form>
              </div>

              {/* Right Section: Contact Info */}
              <div className="flex flex-col gap-8 text-white items-center lg:items-start lg:ml-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2">
                    <img src={Mail} alt="Email" className="w-6 h-6" />
                  </div>
                  <span className="font-[Raleway] text-lg">genrealia@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2">
                    <img src={Phone} alt="Phone" className="w-6 h-6" />
                  </div>
                  <span className="font-[Raleway] text-lg">+91 3927629420</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2">
                    <img src={Instagram} alt="Instagram" className="w-6 h-6" />
                  </div>
                  <span className="font-[Raleway] text-lg">@genreal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReachOutContact;
