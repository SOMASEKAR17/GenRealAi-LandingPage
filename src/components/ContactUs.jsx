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
    <div className="w-full bg-no-repeat bg-top bg-[url('/contactus-reachout.png')] bg-cover" id="contact-us">
      {/* Reach Out Section */}
      <div className="min-h-screen w-full flex items-center justify-center relative bg-no-repeat bg-cover bg-center bg-[url('/ReachOut.png')] px-4">
        <div className="text-center text-white">
          <h2 className="font-[Poppins] font-bold text-[clamp(28px,6vw,52px)] leading-[1.2] tracking-wide mb-4">
            Reach Out– We're Listening
          </h2>
          <p className="font-[Raleway] font-medium text-[clamp(16px,4vw,27px)] leading-[1.4] tracking-wide mb-6">
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
          className="min-h-screen w-full flex items-center justify-center relative bg-no-repeat bg-cover bg-center bg-[url('/contactus.png')] px-4 py-12"
        >
          <div className="w-full max-w-7xl">
            <div className="mb-8">
              <h2 className="text-white text-3xl sm:text-4xl font-bold font-[Poppins] mb-4">
                Contact Us
              </h2>
              <p className="text-white font-[Raleway] text-base sm:text-lg font-medium tracking-wide">
                Your first step toward fighting deepfakes starts here
              </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-10">
              {/* Left Section: Contact Form */}
              <div className="w-full lg:max-w-lg">
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
                    className="w-[150px] h-[50px] rounded-2xl text-white text-lg font-[Raleway] transition-all duration-300 transform hover:scale-105 bg-[#FA9A40] hover:bg-[#FA9A40]/90"
                  >
                    Submit
                  </button>
                </form>
              </div>

              {/* Right Section: Contact Info */}
              <div className="flex flex-col gap-6 text-white items-start">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-2">
                    <img src={Mail} alt="Email" className="w-5 h-5" />
                  </div>
                  <span className="font-[Raleway] text-base sm:text-lg">genrealia@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-2">
                    <img src={Phone} alt="Phone" className="w-5 h-5" />
                  </div>
                  <span className="font-[Raleway] text-base sm:text-lg">+91 3927629420</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-2">
                    <img src={Instagram} alt="Instagram" className="w-5 h-5" />
                  </div>
                  <span className="font-[Raleway] text-base sm:text-lg">@genreal</span>
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
